import { re, spam as m } from '@bablr/helpers/shorthand';
import {
  Node,
  CoveredBy,
  InjectFrom,
  Attributes,
  UnboundAttributes,
  AllowEmpty,
} from '@bablr/helpers/decorators';
import { o, eat, eatMatch, match, bindAttribute, notNull } from '@bablr/helpers/grammar';
import { buildIdentifier, buildString } from '@bablr/helpers/builders';
import * as productions from '@bablr/helpers/productions';
import * as Space from '@bablr/language-en-blank-space';
import * as JSON from '@bablr/language-en-cstml-json';
import { getEmbeddedObject } from '@bablr/agast-vm-helpers/deembed';

export const canonicalURL = 'https://bablr.org/languages/core/en/cstml';

export const dependencies = { Space, JSON };

const escapables = new Map(
  Object.entries({
    n: '\n',
    r: '\r',
    t: '\t',
    0: '\0',
  }),
);

export const getCooked = (escapeNode, span, ctx) => {
  let cooked;
  const codeNode = escapeNode.get('code');
  const type = ctx.sourceTextFor(codeNode.get('typeToken'));
  const value = ctx.sourceTextFor(codeNode.get('value'));

  if (!span.startsWith('String')) {
    throw new Error('not implemented');
  }

  if (!type) {
    const match_ = ctx.sourceTextFor(codeNode);

    cooked = escapables.get(match_) || match_;
  } else if (type === 'u') {
    cooked = parseInt(value, 16);
  } else {
    throw new Error();
  }

  return cooked.toString(10);
};

export function* eatMatchTrivia() {
  if (yield match(re`/[ \t\r\n]/`)) {
    return yield eat(m`#: <*Space:Space />`);
  }
  return null;
}

export const grammar = class CSTMLGrammar {
  *[Symbol.for('@bablr/fragment')]({ value: { productionName } }) {
    yield* eatMatchTrivia();
    yield eat(m`<${buildIdentifier(productionName)} />`);
    yield* eatMatchTrivia();
  }

  *Stream() {
    while (yield eatMatch(m`.[]: <Tag />`));
  }

  *Expression() {
    yield eat(m`<Any />`, [m`<Document '<!' />`, m`<Node '<' />`]);
  }

  *Tag() {
    yield eat(m`<Any />`, [
      m`<NullTag 'null' />`,
      m`<InitializerTag '[]' />`,
      m`<ReferenceTag /[.#@]|[a-zA-Z]/ />`,
      m`<LiteralTag /['"]/ />`,
      m`<DoctypeTag '<!' />`,
      m`<GapTag '<//>' />`,
      m`<ShiftTag '^^^' />`,
      m`<CloseNodeTag '</' />`,
      m`<OpenNodeTag '<' />`,
    ]);
  }

  @Node
  *Document() {
    yield eat(m`doctype$: <DoctypeTag />`);
    yield* eatMatchTrivia();
    yield eat(m`tree$: <Node />`, o({ fragment: true }));
  }

  @CoveredBy('Tag')
  @CoveredBy('Expression')
  @Node
  *DoctypeTag() {
    yield eat(m`openToken: <*Punctuator '<!' { balancedSpan: 'Tag', balanced: '>' } />`);
    yield eat(m`version$: <*JSON:UnsignedInteger />`);
    yield eat(m`versionSeparatorToken: <*Punctuator ':' />`);
    yield eat(m`doctypeToken$: <*Keyword 'cstml' />`);
    yield* eatMatchTrivia();
    yield eatMatch(m`attributes$: <JSON:Object />`, null, o({ bind: true }));
    yield eat(m`closeToken: <*Punctuator '>' { balancer: true } />`);
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  *ReferenceTag({ ctx }) {
    let quot;
    if ((quot = yield match(re`/[.#@]/`))) {
      yield eat(m`name$: <*Punctuator ${buildString(ctx.sourceTextFor(quot))} />`);
    } else {
      yield eat(m`name$: <*Identifier />`);
    }
    yield* eatMatchTrivia();
    if (
      yield eatMatch(
        m`openIndexToken: <*Punctuator '[' { balanced: ']' } />`,
        null,
        o({ bind: true }),
      )
    ) {
      yield* eatMatchTrivia();
      yield eatMatch(m`index: <JSON:UnsignedInteger />`);
      yield* eatMatchTrivia();
      yield eat(m`closeIndexToken: <*Punctuator ']' { balancer: true } />`);
    } else {
      yield eat(m`closeIndexToken: null`);
    }
    yield* eatMatchTrivia();
    yield eat(m`flags: <ReferenceFlags />`);
    yield* eatMatchTrivia();
    yield eat(m`sigilToken: <*Punctuator ':' />`);
  }

  @AllowEmpty
  @Node
  *ReferenceFlags() {
    yield eatMatch(m`expressionToken: <*Punctuator '+' />`, null, o({ bind: true }));
    yield eatMatch(m`hasGapToken: <*Punctuator '$' />`, null, o({ bind: true }));
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  @CoveredBy('PropertyValue')
  *GapTag() {
    yield eat(m`sigilToken: <*Punctuator '<//>' />`);
  }

  @Node
  @CoveredBy('Tag')
  *ShiftTag() {
    yield eat(m`sigilToken: <*Punctuator '^^^' />`);
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  @CoveredBy('PropertyValue')
  *NullTag() {
    yield eat(m`sigilToken: <*Keyword 'null' />`);
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('PropertyValue')
  *InitializerTag() {
    yield eat(m`sigilToken: <*Punctuator '[]' />`);
  }

  @Node
  @CoveredBy('PropertyValue')
  *Node({ value: options }) {
    let open = yield eat(m`open: <OpenNodeTag />`, options);
    yield* eatMatchTrivia();

    // Problem: not handling gaps
    //   gaps have a non-nullish representation
    //

    const flags = open.get('flags');
    const selfClosingTagToken = open.get('selfClosingTagToken');
    const token = !!flags?.get('tokenToken');
    const selfClosing = notNull(selfClosingTagToken);

    yield eat(m`children[]$: []`);

    if (selfClosing) {
      yield eat(m`close: null`);
    } else {
      while ((yield match(re`/./s`)) && !(yield match('</'))) {
        yield eat(m`children[]$: <NodeChild />`, o({ token }));

        yield* eatMatchTrivia();
      }

      yield eat(m`close: <CloseNodeTag />`);
    }
  }

  *NodeChild({ value: props }) {
    const { token } = props ? getEmbeddedObject(props) : {};

    if (token) {
      yield eat(m`<Any />`, [m`<Property '@' />`, m`<LiteralTag /['"]/ />`]);
    } else {
      yield eat(m`<Any />`, [m`<Property /[.#]|[a-zA-Z]/ />`, m`<ShiftTag '^^^' />`]);
    }
  }

  @Node
  @CoveredBy('NodeChild')
  *Property() {
    yield eat(m`reference$: <ReferenceTag />`);
    yield* eatMatchTrivia();
    yield eat(m`value$: <PropertyValue />`);
  }

  *PropertyValue() {
    yield eat(m`<Any />`, [
      m`<NullTag 'null' />`,
      m`<GapTag '<//>' />`,
      m`<InitializerTag '[]' />`,
      m`<Node /\<[^#@]/ />`,
    ]);
  }

  @Node
  @AllowEmpty
  *NodeFlags() {
    yield eatMatch(m`tokenToken: <*Punctuator '*' />`, null, o({ bind: true }));
    yield eatMatch(m`hasGapToken: <*Punctuator '$' />`, null, o({ bind: true }));
  }

  @UnboundAttributes(['balanced', 'balancedSpan'])
  @Node
  @CoveredBy('Tag')
  *OpenNodeTag({ s, value: options }) {
    const outerSpan = s.span;

    yield eat(m`openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />`);

    let flags = yield eat(m`flags: <NodeFlags />`);

    let type;

    if (options?.value.fragment) {
      yield eat(m`language$: null>`);
      yield eat(m`type$: null>`);
    } else {
      type = yield eatMatch(m`<TagType />`);
    }
    let sp = type ? yield* eatMatchTrivia() : null;

    if (type && sp && flags.get('tokenToken') && (yield match(re`/['"]/`))) {
      yield eat(m`intrinsicValue$: <JSON:String />`);
      sp = yield* eatMatchTrivia();
    } else {
      yield eat(m`intrinsicValue$: null`);
    }

    if (type) {
      yield eatMatch(m`attributes$: <JSON:Object />`, null, o({ bind: true }));
      yield* eatMatchTrivia();
    } else {
      yield eat(m`attributes$: null`);
    }

    let sc = yield eatMatch(m`selfClosingTagToken: <*Punctuator '/' />`, null, o({ bind: true }));

    const balanced = !sc && (s.depths.path > 0 || outerSpan !== 'Bare');

    yield bindAttribute('balanced', balanced);
    yield bindAttribute('balancedSpan', balanced ? 'NodeChildren' : null);

    yield eat(m`closeToken: <*Punctuator '>' { balancer: true } />`);
  }

  @Attributes({ balancer: true })
  @Node
  @CoveredBy('Tag')
  *CloseNodeTag() {
    yield eat(m`openToken: <*Punctuator '</' { balanced: '>' } />`);
    yield eat(m`closeToken: <*Punctuator '>' { balancer: true } />`);
  }

  @AllowEmpty
  *TagType() {
    if (yield match(re`/['"]|([a-zA-Z.]+|\g):/`)) {
      yield eat(m`language$: <Language />`);
      yield eat(m`namespaceSeparatorToken: <*Punctuator ':' />`);
      yield eat(m`type$: <*Identifier />`);
    } else if (yield match(re`/[a-zA-Z]/`)) {
      yield eat(m`language$: null`);
      yield eat(m`type$: <*Identifier />`);
    } else {
      yield eat(m`language$: null`);
      yield eat(m`type$: null`);
    }
  }

  *Language() {
    yield eat(m`<Any />`, [m`<JSON:String /['"]/ />`, m`<IdentifierPath /[a-zA-Z]/ />`]);
  }

  @CoveredBy('Language')
  @Node
  *IdentifierPath() {
    yield eat(m`segments[]$: <*Identifier />`);
    while (yield match('.')) {
      yield eat(m`separatorTokens[]: <*Punctuator '.' />`);
      yield eat(m`segments[]$: <*Identifier />`);
    }
  }

  @Node
  *Identifier() {
    yield eat(re`/[a-zA-Z][a-zA-Z_-]*/`);
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  @CoveredBy('NodeChild')
  *LiteralTag() {
    yield eat(m`value: <JSON:String />`);
  }

  @Node
  @InjectFrom(productions)
  *Punctuator() {}

  @Node
  @InjectFrom(productions)
  *Keyword() {}

  @InjectFrom(productions)
  *Any() {}
};
