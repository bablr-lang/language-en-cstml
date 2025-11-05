import { re, spam as m } from '@bablr/helpers/shorthand';
import { o, eat, eatMatch, match, defineAttribute, fail } from '@bablr/helpers/grammar';
import { buildString } from '@bablr/helpers/builders';
import Space from '@bablr/language-en-blank-space';
import JSON from '@bablr/language-en-cstml-json';

export const canonicalURL = 'https://bablr.org/languages/core/en/cstml';

export const dependencies = { Space, JSON };

export const defaultMatcher = m`<Node />`;

const escapables = new Map(
  Object.entries({
    n: '\n',
    r: '\r',
    t: '\t',
    0: '\0',
  }),
);

export function* eatMatchTrivia() {
  let trivia = null;
  while (yield match(re`/[ \t\r\n]/`)) {
    trivia = yield eat(m`#: :Space: <_Blank />`);
  }
  return trivia;
}

export const grammar = class CSTMLGrammar {
  constructor() {
    this.literals = new Set(['Punctuator', 'Keyword']);
    this.emptyables = new Set(['NodeFlags', 'ReferenceFlags']);
    this.attributes = new Map(
      Object.entries({
        OpenNodeTag: { balanced: undefined, balancedSpan: undefined },
        CloseNodeTag: { balancer: true },
      }),
    );
  }

  *[Symbol.for('@bablr/fragment')]({ props: { rootMatcher } }) {
    yield* eatMatchTrivia();
    yield eat(rootMatcher);
    yield* eatMatchTrivia();
  }

  *Stream() {
    while (yield eatMatch(m`.[]*: <_Tag />`));
  }

  *Expression() {
    if (yield eatMatch(m`<Document '<!' />`)) {
    } else {
      yield eat(m`<Node '<' />`);
    }
  }

  *Tag() {
    if (yield eatMatch(m`<NullTag 'null' />`)) {
    } else if (yield eatMatch(m`<AttributeDefinition '{' />`)) {
    } else if (yield eatMatch(m`<ReferenceTag /[.#@a-zA-Z\u0060\u{80}-\u{10ffff}]/ />`)) {
    } else if (yield eatMatch(m`<BindingTag ':' />`)) {
    } else if (yield eatMatch(m`<LiteralTag /['"]/ />`)) {
    } else if (yield eatMatch(m`<DoctypeTag '<!' />`)) {
    } else if (yield eatMatch(m`<GapTag '<//>' />`)) {
    } else if (yield eatMatch(m`<ShiftTag '^^^' />`)) {
    } else if (yield eatMatch(m`<CloseNodeTag '</' />`)) {
    } else {
      yield eat(m`<OpenNodeTag '<' />)`);
    }
  }

  *Document() {
    yield eatMatch(m`doctype$: <DoctypeTag '<!' />`);
    yield* eatMatchTrivia();
    yield eat(m`tree$: <Node />`, o({ forceFragment: true }));
  }

  *DoctypeTag() {
    yield eat(m`openToken*: <* '<!' { balancedSpan: 'Tag', balanced: '>' } />`);
    yield eat(m`version$: :JSON: <*UnsignedInteger />`);
    yield eat(m`versionSeparatorToken*: <* ':' />`);
    yield eat(m`doctypeToken$: <*Keyword 'cstml' />`);
    yield* eatMatchTrivia();
    if (yield eatMatch(m`attributes$: :JSON: <Object '{' />`, o({}), o({ bind: true }))) {
      yield* eatMatchTrivia();
    }
    yield eat(m`closeToken*: <* '>' { balancer: true } />`);
  }

  *ReferenceTag({ ctx }) {
    let type;
    if ((type = yield match(re`/[.#@_]/`))) {
      yield eat(m`type*: <* ${buildString(ctx.sourceTextFor(type))} />`);
    } else {
      yield eat(m`type*: null`);
    }

    if (!type || ctx.sourceTextFor(type) === '#') {
      if (type) {
        yield eatMatch(m`name$: <Identifier />`, o({}), o({ bind: true }));
      } else {
        yield eat(m`name$: <Identifier />`);
      }
    } else {
      yield eat(m`name$: null`, o({}), o({ bind: true }));
    }

    yield* eatMatchTrivia();
    if (yield eatMatch(m`openIndexToken*: <* '[' { balanced: ']' } />`, o({}), o({ bind: true }))) {
      yield* eatMatchTrivia();
      yield eat(m`closeIndexToken*: <* ']' { balancer: true } />`);
    } else {
      yield eat(m`closeIndexToken*: null`);
    }
    yield* eatMatchTrivia();
    yield eat(m`flags*: <ReferenceFlags />`);
    yield* eatMatchTrivia();
    yield eat(m`sigilToken*: <* ':' />`);
  }

  *ReferenceFlags() {
    yield eatMatch(m`expressionToken*: <* '+' />`, o({}), o({ bind: true }));
    if (!(yield eatMatch(m`intrinsicToken*: <* '*' />`, o({}), o({ bind: true })))) {
      yield eatMatch(m`hasGapToken*: <* '$' />`, o({}), o({ bind: true }));
    }
  }

  *BindingTag() {
    yield eat(m`openToken*: <* ':' />`);
    yield eatMatch(m`languagePath*: <IdentifierPath />`);
    yield eat(m`closeToken*: <* ':' />`);
  }

  *GapTag() {
    yield eat(m`sigilToken*: <* '<//>' />`);
  }

  *ShiftTag() {
    yield eat(m`sigilToken*: <* '^^^' />`);
  }

  *NullTag() {
    yield eat(m`sigilToken*: <*Keyword 'null' />`);
  }

  *AttributeDefinition() {
    yield eatMatch(m`openToken*: <* '{' { balanced: '}' } />`);
    yield* eatMatchTrivia();
    yield eat(m`key$: <IdentifierPath />`);
    yield* eatMatchTrivia();
    yield eat(m`sigilToken*: <* ':' />`);
    yield* eatMatchTrivia();
    yield eat(m`value$: :JSON: <_Expression />`);
    yield* eatMatchTrivia();
    yield eat(m`closeToken*: <* '}' { balancer: true } />`);
  }

  *Node({ props }) {
    let open = yield eat(m`open*: <OpenNodeTag />`, o(props));
    yield* eatMatchTrivia();

    const flags = open.node.get('flags');

    const balanced = open.node.attributes.balanced;

    const token = !!flags?.get('tokenToken');

    const selfClosing = !balanced;

    if (selfClosing) {
      yield eat(m`close*: null`);
    } else {
      while ((yield match(re`/./s`)) && !(yield match('</'))) {
        yield eat(m`children[]$: <_NodeChild />`, o({ token }));

        yield* eatMatchTrivia();
      }

      yield eat(m`close*: <CloseNodeTag />`);
    }
  }

  *NodeChild({ props: { token } }) {
    if (token) {
      if (yield eatMatch(m`<AttributeDefinition '{' />`)) {
      } else if (yield eatMatch(m`<Property '@' />`)) {
      } else {
        yield eat(m`<LiteralTag /['"]/ />`);
      }
    } else {
      if (yield eatMatch(m`<AttributeDefinition '{' />`)) {
      } else {
        yield eat(m`<Property /./s />`);
      }
    }
  }

  *Property() {
    if (yield match('^^^')) {
      yield eat(m`reference$: <ShiftTag />`);
    } else {
      yield eatMatch(m`reference$: <ReferenceTag />`, o({}), o({ bind: true }));
    }
    yield* eatMatchTrivia();
    yield eatMatch(m`binding$: <BindingTag ':' />`, o({}), o({ bind: true }));
    yield* eatMatchTrivia();
    yield eat(m`value$: <_PropertyValue />`);
  }

  *PropertyValue() {
    if (yield eatMatch(m`<NullTag 'null' />`)) {
    } else if (yield eatMatch(m`<GapTag '<//>' />`)) {
    } else {
      yield eat(m`<Node /\<[^#@]|['"]/ />`, o({ propertyValue: true }));
    }
  }

  *NodeFlags() {
    yield eatMatch(m`tokenToken*: <* '*' />`, o({}), o({ bind: true }));
    yield eatMatch(m`hasGapToken*: <* '$' />`, o({}), o({ bind: true }));
    yield eatMatch(m`fragmentToken*: <* '_' />`, o({}), o({ bind: true }));
    yield eatMatch(m`multiFragmentToken*: <* '_' />`, o({}), o({ bind: true }));
  }

  *OpenNodeTag({ s, props: { forceFragment = false, propertyValue = false } }) {
    const outerSpan = s.span;
    if (yield match(re`/['"]/`)) {
      yield eat(m`openToken*: null`);
      yield eat(m`flags*: null`);
      yield eat(m`type$: null`);
      yield eat(m`literalValue$: :JSON: <String />`);
      yield eat(m`attributes$: null`);
      yield eat(m`selfClosingTag*: null`);
      yield eat(m`closeToken*: null`);
      return;
    }

    yield eat(m`openToken*: <* '<' { balancedSpan: 'Tag', balanced: '>' } />`);

    let flags = yield eat(m`flags*: <NodeFlags />`);

    let fragmentFlag = !!flags.node.get('fragmentToken');

    if (forceFragment && !fragmentFlag) {
      yield fail();
    }

    let isFragment = fragmentFlag;

    if (isFragment) {
      yield eat(m`type$: null`);
    } else {
      yield eatMatch(m`type$: <Identifier />`, o({}), o({ bind: true }));
    }

    let sp = !isFragment ? yield* eatMatchTrivia() : null;

    if (!isFragment && sp && (yield match(re`/['"]/`))) {
      yield eat(m`literalValue$: :JSON: <String />`);
      sp = yield* eatMatchTrivia();
    } else {
      yield eat(m`literalValue$: null`);
    }

    if (!isFragment) {
      yield eatMatch(m`attributes$: :JSON: <Object '{' />`, o({}), o({ bind: true }));
      yield* eatMatchTrivia();
    } else {
      yield eat(m`attributes$: null`);
    }

    let sc;
    if (!isFragment) {
      sc = yield eatMatch(m`selfClosingToken*: <* '/' />`, o({}), o({ bind: true }));
    } else {
      sc = yield eat(m`selfClosingToken*: null`);
    }

    const balanced = !sc && (s.depths.path > 0 || outerSpan !== 'Bare');

    yield defineAttribute('balanced', balanced);
    yield defineAttribute('balancedSpan', balanced ? 'NodeChildren' : null);

    yield eat(m`closeToken*: <* '>' { balancer: true } />`);
  }

  *CloseNodeTag() {
    yield eat(m`openToken*: <* '</' { balanced: '>' } />`);
    yield eat(m`closeToken*: <* '>' { balancer: true } />`);
  }

  *IdentifierPath() {
    yield eat(m`segments[]$: <Identifier />`);
    while (yield match('.')) {
      yield eat(m`#separatorTokens[]: <* '.' />`);
      yield eat(m`segments[]$: <Identifier />`);
    }
  }

  *Identifier() {
    let q;
    q = yield eatMatch(
      m`openToken*: <* '\u0060' { balanced: '\u0060' } />`,
      null,
      o({ bind: true }),
    );

    yield eat(m`content*: <*IdentifierContent { span: 'Identifier' } />`, o({ quoted: !!q }));
    if (q) {
      yield eat(m`closeToken*: <* '\u0060' { balancer: true } />`, null, o({ bind: true }));
    } else {
      yield eat(m`closeToken*: null`);
    }
  }

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

  *LiteralTag() {
    yield eat(m`value*: :JSON: <String />`);
  }

  *EscapeSequence({ ctx, state: { span } }) {
    if (!span.startsWith('Identifier')) {
      yield fail();
    }

    yield eat(m`sigilToken*: <* '\\' { openSpan: 'Escape' } />`);

    let cooked;
    let match_;
    if ((match_ = yield match(re`/[\\/nrt0]/`))) {
      const matchText = ctx.sourceTextFor(match_);
      yield eat(m`code*: <*Keyword ${buildString(matchText)} { closeSpan: 'Escape' } />`);

      cooked = escapables.get(matchText) || matchText;
    } else if (yield match('u')) {
      let codeNode = yield eat(m`code*: <EscapeCode { closeSpan: 'Escape' } />`);

      const value = ctx.sourceTextFor(codeNode.node.get('value'));

      if (span !== 'Identifier') {
        throw new Error('not implemented');
      }

      cooked = String.fromCharCode(parseInt(value, 16));
    } else {
      throw new Error();
    }

    yield defineAttribute('cooked', cooked);
  }

  *EscapeCode() {
    yield eat(m`typeToken*: <*Keyword 'u' />`);
    if (yield eatMatch(m`openToken*: <* '{' { balanced: '}' } />`, o({}), o({ bind: true }))) {
      yield eat(m`value$: :JSON: <*UnsignedHexInteger />`);
      yield eat(m`closeToken*: <* '}' { balancer: true } />`);
    } else {
      yield eat(m`value$: :JSON: <*UnsignedHexInteger /[\da-fA-F]{4}/ />`);
      yield eat(m`closeToken*: null`);
    }
  }
};

export default { canonicalURL, dependencies, grammar, defaultMatcher };
