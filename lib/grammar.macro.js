import { re, spam as m } from '@bablr/helpers/shorthand';
import {
  Node,
  CoveredBy,
  InjectFrom,
  Attributes,
  UndefinedAttributes,
  AllowEmpty,
  Literal,
} from '@bablr/helpers/decorators';
import { o, eat, eatMatch, match, defineAttribute, notNull, fail } from '@bablr/helpers/grammar';
import { buildString } from '@bablr/helpers/builders';
import * as productions from '@bablr/helpers/productions';
import * as Space from '@bablr/language-en-blank-space';
import * as JSON from '@bablr/language-en-cstml-json';

export const type = Symbol.for('@bablr/language');

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

function first(iter) {
  for (let value of iter) return value;
}

export const getCooked = (escapeNode, span, ctx) => {
  let cooked;
  const codeNode = escapeNode.get('code');

  if (first(codeNode.children)?.value.flags.token) {
    const match_ = ctx.sourceTextFor(codeNode);

    cooked = escapables.get(match_) || match_;
  } else {
    const type = ctx.sourceTextFor(codeNode.get('typeToken'));
    const value = ctx.sourceTextFor(codeNode.get('value'));

    if (span !== 'Identifier') {
      throw new Error('not implemented');
    }

    if (type === 'u') {
      cooked = String.fromCharCode(parseInt(value, 16));
    } else {
      throw new Error();
    }
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
  *[Symbol.for('@bablr/fragment')]({ props: { rootMatcher } }) {
    yield* eatMatchTrivia();
    yield eat(rootMatcher);
    yield* eatMatchTrivia();
  }

  *Stream() {
    while (yield eatMatch(m`.[]: <__Tag />`));
  }

  *Expression() {
    yield eat(m`<_Any />`, [m`<Document '<!' />`, m`<Node '<' />`]);
  }

  *Tag() {
    yield eat(m`<_Any />`, [
      m`<NullTag 'null' />`,
      m`<InitializerTag /\[\]|undefined/ />`,
      m`<ReferenceTag /[.#@a-zA-Z\u0060\u{80}-\u{10ffff}]/ />`,
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
    yield eatMatch(m`attributes$: <JSON:Object />`, o({}), o({ bind: true }));
    yield eat(m`closeToken: <*Punctuator '>' { balancer: true } />`);
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  *ReferenceTag({ ctx }) {
    let kw;
    if ((kw = yield match(re`/[.#@]/`))) {
      yield eat(m`type: <*Punctuator ${buildString(ctx.sourceTextFor(kw))} />`);
      yield eat(m`name$: null`);
    } else {
      yield eat(m`type: null`);
      yield eat(m`name$: <Identifier />`);
    }
    yield* eatMatchTrivia();
    if (
      yield eatMatch(
        m`openIndexToken: <*Punctuator '[' { balanced: ']' } />`,
        o({}),
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
    yield eatMatch(m`expressionToken: <*Punctuator '+' />`, o({}), o({ bind: true }));
    yield eatMatch(m`hasGapToken: <*Punctuator '$' />`, o({}), o({ bind: true }));
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

  @UndefinedAttributes(['isArray'])
  @Node
  @CoveredBy('Tag')
  @CoveredBy('PropertyValue')
  *InitializerTag() {
    let arr;
    if ((arr = yield eatMatch(m`sigilToken: <*Punctuator '[]' />`))) {
    } else if (yield eat(m`sigilToken: <*Keyword 'undefined' />`)) {
    }
    yield defineAttribute('isArray', !!arr);
  }

  @Node
  @CoveredBy('PropertyValue')
  *Node({ props }) {
    let open = yield eat(m`open: <OpenNodeTag />`, o(props));
    yield* eatMatchTrivia();

    const flags = open.get('flags');
    const selfClosingTagToken = open.get('selfClosingTagToken');
    const token = !!flags?.get('tokenToken');
    const selfClosing = notNull(selfClosingTagToken);

    yield eat(m`children[]$: []`);

    if (selfClosing) {
      yield eat(m`close: null`);
    } else {
      while ((yield match(re`/./s`)) && !(yield match('</'))) {
        yield eat(m`children[]$: <__NodeChild />`, o({ token }));

        yield* eatMatchTrivia();
      }

      yield eat(m`close: <CloseNodeTag />`);
    }
  }

  *NodeChild({ props: { token } }) {
    if (token) {
      yield eat(m`<_Any />`, [m`<Property '@' />`, m`<LiteralTag /['"]/ />`]);
    } else {
      yield eat(m`<_Any />`, [
        m`<Property /[.#\\a-zA-Z\u0060\u{80}-\u{10ffff}]/ />`,
        m`<ShiftTag '^^^' />`,
      ]);
    }
  }

  @Node
  @CoveredBy('NodeChild')
  *Property() {
    yield eat(m`reference$: <ReferenceTag />`);
    yield* eatMatchTrivia();
    yield eat(m`value$: <__PropertyValue />`);
  }

  *PropertyValue() {
    yield eat(m`<_Any />`, [
      m`<NullTag 'null' />`,
      m`<GapTag '<//>' />`,
      m`<InitializerTag /\[\]|undefined/ />`,
      m`<Node /\<[^#@]/ />`,
    ]);
  }

  @Node
  @AllowEmpty
  *NodeFlags() {
    yield eatMatch(m`tokenToken: <*Punctuator '*' />`, o({}), o({ bind: true }));
    yield eatMatch(m`hasGapToken: <*Punctuator '$' />`, o({}), o({ bind: true }));
    yield eatMatch(m`fragmentToken: <*Punctuator '_' />`, o({}), o({ bind: true }));
    yield eatMatch(m`coverFragmentToken: <*Punctuator '_' />`, o({}), o({ bind: true }));
  }

  @UndefinedAttributes(['balanced', 'balancedSpan'])
  @Node
  @CoveredBy('Tag')
  *OpenNodeTag({ s, props: { fragment } }) {
    const outerSpan = s.span;

    yield eat(m`openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />`);

    let flags = yield eat(m`flags: <NodeFlags />`);

    let type;
    let fragment_ = fragment || flags.get('fragmentToken');

    if (fragment_) {
      yield eat(m`language$: null>`);
      yield eat(m`type$: null>`);
    } else {
      type = yield eatMatch(m`<_TagType />`);
    }

    if (fragment && !flags.get('fragmentToken')) {
      yield fail();
    }

    if (!type && !flags.get('fragmentToken')) {
      yield fail();
    }

    let sp = type ? yield* eatMatchTrivia() : null;

    if (type && sp && flags.get('tokenToken') && (yield match(re`/['"]/`))) {
      yield eat(m`intrinsicValue$: <JSON:String />`);
      sp = yield* eatMatchTrivia();
    } else {
      yield eat(m`intrinsicValue$: null`);
    }

    if (type) {
      yield eatMatch(m`attributes$: <JSON:Object />`, o({}), o({ bind: true }));
      yield* eatMatchTrivia();
    } else {
      yield eat(m`attributes$: null`);
    }

    let sc;
    if (!fragment_) {
      sc = yield eatMatch(m`selfClosingTagToken: <*Punctuator '/' />`, o({}), o({ bind: true }));
    } else {
      sc = yield eat(m`selfClosingTagToken: null`);
    }

    const balanced = !sc && (s.depths.path > 0 || outerSpan !== 'Bare');

    yield defineAttribute('balanced', balanced);
    yield defineAttribute('balancedSpan', balanced ? 'NodeChildren' : null);

    yield eat(m`closeToken: <*Punctuator '>' { balancer: true } />`);
  }

  @Attributes({ balancer: true })
  @Node
  @CoveredBy('Tag')
  *CloseNodeTag() {
    yield eat(m`openToken: <*Punctuator '</' { balanced: '>' } />`);
    yield eat(m`closeToken: <*Punctuator '>' { balancer: true } />`);
  }

  *TagType() {
    if (yield match(re`/['"]|([\\a-zA-Z\u0060\u{80}-\u{10ffff}.]+|\g):/`)) {
      yield eat(m`language$: <__Language />`);
      yield eat(m`namespaceSeparatorToken: <*Punctuator ':' />`);
      yield eat(m`type$: <Identifier />`);
    } else if (yield match(re`/[\\a-zA-Z\u0060\u{80}-\u{10ffff}]/`)) {
      yield eat(m`language$: null`);
      yield eat(m`type$: <Identifier />`);
    } else {
      yield eat(m`language$: null`);
      yield eat(m`type$: null`);
    }
  }

  *Language() {
    yield eat(m`<_Any />`, [
      m`<JSON:String /['"]/ />`,
      m`<IdentifierPath /[\\a-zA-Z\u0060\u{80}-\u{10ffff}]/ />`,
    ]);
  }

  @CoveredBy('Language')
  @Node
  *IdentifierPath() {
    yield eat(m`segments[]$: <Identifier />`);
    while (yield match('.')) {
      yield eat(m`separatorTokens[]: <*Punctuator '.' />`);
      yield eat(m`segments[]$: <Identifier />`);
    }
  }

  @Node
  *Identifier() {
    let q;
    q = yield eatMatch(
      m`openToken: <*Punctuator ${buildString('`')} { balanced: ${buildString('`')} } />`,
      o({}),
      o({ bind: true }),
    );

    yield eat(m`content: <*IdentifierContent { span: 'Identifier' } />`, o({ quoted: !!q }));
    if (q) {
      yield eat(
        m`closeToken: <*Punctuator ${buildString('`')} { balancer: true } />`,
        o({}),
        o({ bind: true }),
      );
    } else {
      yield eat(m`closeToken: null`);
    }
  }

  @Node
  *IdentifierContent({ props: { quoted = false } }) {
    let lit, esc;
    do {
      if ((esc = yield match('\\'))) {
        esc = yield eatMatch(m`@: <EscapeSequence />`);
      } else {
        if (!quoted) {
          lit = yield eatMatch(re`/[a-zA-Z\u{80}-\u{10ffff}][a-zA-Z0-9_\u{80}-\u{10ffff}-]*/`);
        } else {
          lit = yield eatMatch(re`/[^\u0060\r\n]+/`);
        }
      }
    } while (lit || esc);
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  @CoveredBy('NodeChild')
  *LiteralTag() {
    yield eat(m`value: <JSON:String />`);
  }

  @Literal
  @Node
  @InjectFrom(productions)
  *Punctuator() {}

  @Node
  *EscapeSequence({ state: { span } }) {
    if (!span.startsWith('Identifier')) {
      yield fail();
    }

    yield eat(m`sigilToken: <*Punctuator '\\' { openSpan: 'Escape' } />`);

    yield eat(m`code: <EscapeCode { closeSpan: 'Escape' } />`);
  }

  @Node
  *EscapeCode() {
    if (yield eatMatch(m`typeToken: <*Keyword 'u' />`)) {
      if (
        yield eatMatch(
          m`openToken: <*Punctuator '{' { balanced: '}' } />`,
          o({}),
          o({ bind: true }),
        )
      ) {
        yield eat(m`value$: <*JSON:UnsignedHexInteger />`);
        yield eat(m`closeToken: <*Punctuator '}' { balancer: true } />`);
      } else {
        yield eat(m`value$: <*JSON:UnsignedHexInteger /[\da-fA-F]{4}/ />`);
        yield eat(m`closeToken: null`);
      }
    }
  }

  @Literal
  @Node
  @InjectFrom(productions)
  *Keyword() {}

  @InjectFrom(productions)
  *Any() {}
};
