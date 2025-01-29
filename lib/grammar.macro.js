import { re, spam as m } from '@bablr/boot';
import {
  Node,
  CoveredBy,
  InjectFrom,
  Attributes,
  UnboundAttributes,
  AllowEmpty,
} from '@bablr/helpers/decorators';
import {
  e,
  eat,
  eatMatch,
  match,
  bindAttribute,
  fail,
  extendLanguage,
} from '@bablr/helpers/grammar';
import { notNull } from '@bablr/agast-helpers/tree';
import { buildBoolean, buildIdentifier, buildNull, buildString } from '@bablr/helpers/builders';
import * as productions from '@bablr/helpers/productions';
import * as Space from '@bablr/language-en-blank-space';
import * as JSON from '@bablr/language-en-cstml-json';

export const canonicalURL = 'https://bablr.org/languages/core/en/cstml';

const CSTMLJSON = extendLanguage(JSON, {
  dependencies: {
    CSTML: canonicalURL,
  },
  grammar: class CSTMLJSON extends JSON.grammar {
    *Expression(props) {
      if (yield match('<')) {
        yield eat(m`<CSTML:Expression />`);
      } else {
        yield* super.Expression(props);
      }
    }
  },
});

export const dependencies = { Space, JSON: CSTMLJSON };

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
    yield eat(m`<Any />`, e([m`<Document '<!' />`, m`<Node '<' />`]));
  }

  *Tag() {
    yield eat(
      m`<Any />`,
      e([
        m`<NullTag 'null' />`,
        m`<ArrayInitializerTag '[]' />`,
        m`<ReferenceTag /\.|[a-zA-Z]/ />`,
        m`<LiteralTag /['"]/ />`,
        m`<DoctypeTag '<!' />`,
        m`<GapTag '<//>' />`,
        m`<ShiftTag '^^^' />`,
        m`<CloseTag '</' />`,
        m`<OpenTag '<' />`,
      ]),
    );
  }

  @Node
  *Document() {
    yield eat(m`doctype$: <DoctypeTag />`);
    yield* eatMatchTrivia();
    yield eat(m`tree$: <Fragment />`);
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
    yield eatMatch(m`attributes$: <JSON:Object />`);
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
    if (yield eatMatch(m`openIndexToken: <*Punctuator '[' { balanced: ']' } />`)) {
      yield* eatMatchTrivia();
      yield eatMatch(m`index: <JSON:UnsignedInteger />`);
      yield* eatMatchTrivia();
      yield eatMatch(m`closeIndexToken: <*Punctuator ']' { balancer: true } />`);
    } else {
      yield eatMatch(m`closeIndexToken: null`);
    }
    yield* eatMatchTrivia();
    yield eat(m`flags: <ReferenceFlags />`);
    yield* eatMatchTrivia();
    yield eat(m`sigilToken: <*Punctuator ':' />`);
  }

  @AllowEmpty
  @Node
  *ReferenceFlags() {
    yield eatMatch(m`expressionToken: <*Punctuator '+' />`);
    yield eatMatch(m`hasGapToken: <*Punctuator '$' />`);
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
  *ArrayInitializerTag() {
    yield eat(m`sigilToken: <*Punctuator '[]' />`);
  }

  @Node
  @CoveredBy('PropertyValue')
  *Node() {
    let open = yield eat(m`open: <OpenNodeTag />`);
    yield* eatMatchTrivia();

    // Problem: not handling gaps
    //   gaps have a non-nullish representation
    //

    const flags = open.get('flags');
    const selfClosingTagToken = open.get('selfClosingTagToken');
    const token = notNull(flags.get('tokenToken'));
    const selfClosing = notNull(selfClosingTagToken);

    yield eat(m`children[]$: []`);

    if (selfClosing) {
      yield eat(m`close: null`);
    } else {
      while ((yield match(re`/./`)) && !(yield match('</'))) {
        yield eat(m`children[]$: <NodeChild />`, e({ token: buildBoolean(token) }));

        yield* eatMatchTrivia();
      }

      yield eat(m`close: <CloseNodeTag />`);
    }
  }

  @Node
  *Fragment() {
    let open = yield eat(m`open: <OpenFragmentTag />`);
    yield* eatMatchTrivia();

    const flags = open.get('flags');
    const token = notNull(flags.get('tokenToken'));

    yield eat(m`children[]$: []`);

    while ((yield match(re`/./`)) && !(yield match('</'))) {
      yield eat(m`children[]$: <FragmentChild />`, e({ token: buildBoolean(token) }));

      yield* eatMatchTrivia();
    }

    yield eat(m`close: <CloseFragmentTag />`);
  }

  *NodeChild({ value: props, ctx }) {
    const { token } = ctx.unbox(props || {});

    if (token && ctx.unbox(token)) {
      yield eat(m`<Any />`, e([m`<Property '@' />`, m`<LiteralTag /['"]/ />`]));
    } else {
      yield eat(m`<Any />`, e([m`<Property /[.#]|[a-zA-Z]/ />`, m`<ShiftTag '^^^' />`]));
    }
  }

  *FragmentChild({ value: props, ctx }) {
    const { token } = ctx.unbox(props || {});

    if (token && ctx.unbox(token)) {
      yield eat(m`<Any />`, e([m`<Property '@' />`, m`<LiteralTag /['"]/ />`]));
    } else {
      yield eat(m`<Any />`, e([m`<Property /[.#]|[a-zA-Z]/ />`]));
    }
  }

  @Node
  @CoveredBy('NodeChild')
  @CoveredBy('FragmentChild')
  *Property() {
    yield eat(m`reference$: <ReferenceTag />`);
    yield* eatMatchTrivia();
    yield eat(m`value$: <PropertyValue />`);
  }

  *PropertyValue() {
    yield eat(
      m`<Any />`,
      e([
        m`<NullTag 'null' />`,
        m`<GapTag '<//>' />`,
        m`<ArrayInitializerTag '[]' />`,
        m`<Node /\<[^#@]/ />`,
      ]),
    );
  }

  @Node
  @AllowEmpty
  *NodeFlags() {
    yield eatMatch(m`tokenToken: <*Punctuator '*' />`);
    yield eatMatch(m`hasGapToken: <*Punctuator '$' />`);
  }

  *OpenTag({ s }) {
    if (s.span === 'NodeChildren' || s.span === 'FragmentChildren') {
      yield eat(m`<OpenNodeTag />`);
    } else if (s.span === 'Bare' || s.span === 'Stream') {
      yield eat(m`<OpenFragmentTag />`);
    } else {
      yield fail();
    }
  }

  @UnboundAttributes(['balanced', 'balancedSpan'])
  @Node
  @CoveredBy('Tag')
  @CoveredBy('OpenTag')
  *OpenNodeTag({ s }) {
    const outerSpan = s.span;

    yield eat(m`openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />`);

    let flags = yield eat(m`flags: <NodeFlags />`);

    yield eat(m`<TagType />`);
    let sp = yield* eatMatchTrivia();

    if (sp && flags.get('tokenToken') && (yield match(re`/['"]/`))) {
      yield eat(m`intrinsicValue$: <JSON:String />`);
      sp = yield* eatMatchTrivia();
    } else {
      yield eat(m`intrinsicValue$: null`);
    }

    yield eatMatch(m`attributes$: <JSON:Object />`);

    let sc = yield eatMatch(m`selfClosingTagToken: <*Punctuator '/' />`);

    const balanced = !sc && (s.depths.path > 0 || outerSpan !== 'Bare');

    yield bindAttribute('balanced', buildBoolean(balanced));
    yield bindAttribute('balancedSpan', balanced ? buildString('NodeChildren') : buildNull());

    yield eat(m`closeToken: <*Punctuator '>' { balancer: true } />`);
  }

  @Attributes({ balanced: true, balancedSpan: 'FragmentChildren' })
  @Node
  @CoveredBy('Tag')
  @CoveredBy('OpenTag')
  *OpenFragmentTag() {
    yield eat(m`openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />`);

    yield eat(m`flags: <NodeFlags />`);

    yield eat(m`closeToken: <*Punctuator '>' { balancer: true } />`);
  }

  *CloseTag({ s }) {
    if (s.span === 'NodeChildren') {
      yield eat(m`<CloseNodeTag />`);
    } else if (s.span === 'FragmentChildren') {
      yield eat(m`<CloseFragmentTag />`);
    } else {
      yield fail();
    }
  }

  @Attributes({ balancer: true })
  @Node
  @CoveredBy('Tag')
  @CoveredBy('CloseTag')
  *CloseNodeTag() {
    yield eat(m`openToken: <*Punctuator '</' { balanced: '>' } />`);
    yield eat(m`closeToken: <*Punctuator '>' { balancer: true } />`);
  }

  @Attributes({ balancer: true })
  @Node
  @CoveredBy('Tag')
  @CoveredBy('CloseTag')
  *CloseFragmentTag() {
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
    yield eat(m`<Any />`, e([m`<JSON:String /['"]/ />`, m`<IdentifierPath /[a-zA-Z]/ />`]));
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
  @CoveredBy('FragmentChild')
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
