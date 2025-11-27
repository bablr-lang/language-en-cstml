import { re, spam as m } from '@bablr/helpers/shorthand';
import {
  o,
  r,
  eat,
  eatMatch,
  match,
  defineAttribute,
  fail,
  shiftMatch,
} from '@bablr/helpers/grammar';
import { buildString } from '@bablr/helpers/builders';
import Space from '@bablr/language-en-blank-space';
import JSON from '@bablr/language-en-cstml-json';
import { get, getRoot, printSource } from '@bablr/agast-helpers/tree';
import { BindingTag, DoctypeTag, GapTag, NullTag, OpenNodeTag } from '@bablr/agast-helpers/symbols';
import { List } from '@bablr/helpers/productions';

export const canonicalURL = 'https://bablr.org/languages/core/en/cstml';

export const dependencies = { Space, JSON };

export const defaultMatcher = m`.+$: <_Expression />`;

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
    this.literals = new Set(['Keyword']);
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
    let tag,
      kind = 'key';
    do {
      tag = yield eatMatch(m`.[]$: <_Tag />`, o({ kind }));
      let tagType = tag && getRoot(tag.node).type;
      kind =
        kind === 'key' && ![DoctypeTag, OpenNodeTag].includes(tagType)
          ? 'value'
          : tag && tagType === BindingTag
          ? 'value'
          : 'key';
      yield* eatMatchTrivia();
    } while (tag);
  }

  *Tag({ props: { kind } }) {
    if (kind !== 'value') {
      if (yield eatMatch(m`<AttributeDefinition '{' />`)) {
      } else if (yield eatMatch(m`<ReferenceTag /[.#@a-zA-Z\u0060\u{80}-\u{10ffff}]/ />`)) {
      } else if (yield eatMatch(m`<BindingTag ':' />`)) {
      } else if (yield eatMatch(m`<GapTag '<//>' />`)) {
      } else if (yield eatMatch(m`<ShiftTag '^^^' />`)) {
      } else if (yield eatMatch(m`<DoctypeTag '<!' />`)) {
      } else if (yield eatMatch(m`<CloseNodeTag '</' />`)) {
      } else {
        yield eat(m`<OpenNodeTag /\<|['"]/ />)`);
      }
    } else if (kind !== 'key') {
      if (yield eatMatch(m`<NullTag 'null' />`)) {
      } else if (yield eatMatch(m`<BindingTag ':' />`)) {
      } else if (yield eatMatch(m`<GapTag '<//>' />`)) {
      } else if (yield eatMatch(m`<CloseNodeTag '</' />`)) {
      } else {
        yield eat(m`<OpenNodeTag /\<|['"]/ />)`);
      }
    }
  }

  *Document() {
    yield eatMatch(m`doctype$: <DoctypeTag '<!' />`);
    yield* eatMatchTrivia();
    yield eat(m`tree$: <TreeNode />`, o({ forceFragment: true }));
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

  *ReferenceTag() {
    let type;
    if ((type = yield match(re`/\.\.|[.#@_]/`))) {
      yield eat(m`type*: <* ${buildString(printSource(type))} />`);
    } else {
      yield eat(m`type*: null`);
    }

    if (!type || printSource(type) === '#') {
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
      yield eatMatch(m`hasGapToken*: <* '$' />`); // TODO remove me
    }
  }

  *BindingTag() {
    yield eat(m`openToken*: <* ':' {  balanced: ':', balancedSpan: 'Tag' } />`);
    yield* List({
      element: m`segments[]$: <BindingSegment />`,
      separator: m`#separatorTokens: <* '/' />`,
      allowTrailingSeparator: false,
    });
    yield eat(m`closeToken*: <* ':' { balancer: true } />`);
  }

  *BindingSegment() {
    if (yield eatMatch(m`path*: <* '..' />`)) {
    } else {
      yield eat(m`path*: <Identifier />`);
    }
  }

  *IdentifierPath() {
    yield eat(m`segments[]$: <Identifier />`);
    while (yield match('.')) {
      yield eat(m`#separatorTokens: <* '.' />`);
      yield eat(m`segments[]$: <Identifier />`);
    }
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

  *TreeNode({ props }) {
    let open = yield eat(m`open*: <OpenNodeTag />`, o(props));
    yield* eatMatchTrivia();

    const flags = get('flags', open.node);

    const balanced = open.node.attributes.balanced;

    const token = !!get('tokenToken', flags);

    const selfClosing = !balanced;

    if (selfClosing) {
      yield eat(m`close*: null`);
    } else {
      while ((yield match(re`/./s`)) && !(yield match('</>'))) {
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

  *Property({ s }) {
    if (s().held) {
      yield eat(m`reference$: <ShiftTag />`);
    } else {
      yield eatMatch(m`reference$: <ReferenceTag />`, o({}), o({ bind: true }));
    }
    yield* eatMatchTrivia();

    yield eat(m`value+$: <_Expression />`);
  }

  *NullNode() {
    yield eat(m`sigilTag*: <NullTag />`);
  }

  *GapNode() {
    yield eat(m`sigilTag*: <GapTag />`);
  }

  *Expression() {
    if (yield eatMatch(m`<BindingExpression ':' />`)) {
    } else {
      yield eat(m`<_Node />`);

      yield* eatMatchTrivia();

      return r(shiftMatch(m`<ShiftExpression '^^^' />`));
    }
  }

  *BindingExpression() {
    yield eat(m`binding*: <BindingTag />`);
    yield* eatMatchTrivia();
    yield eat(m`value+*: <_Expression />`);
  }

  *ShiftExpression() {
    yield eat(m`original+$: <_Node />`);
    yield* eatMatchTrivia();
    yield eat(m`shift*: <ShiftTag />`);
    yield* eatMatchTrivia();
    yield eat(m`value+*: <TreeNode />`);
  }

  *Node({ s }) {
    if (s().held) {
      yield eat(m`<TreeNode />`);
    } else {
      if (yield eatMatch(m`<Document '<!' />`)) {
      } else if (yield eatMatch(m`<NullNode 'null' />`)) {
      } else if (yield eatMatch(m`<GapNode '<//>' />`)) {
      } else if (yield eatMatch(m`<CloseNodeTag '</>' />`)) {
        yield fail();
      } else {
        yield eat(m`<TreeNode />`, o({ propertyValue: true }));
      }
      yield* eatMatchTrivia();
    }
  }

  *NodeFlags() {
    yield eatMatch(m`tokenToken*: <* '*' />`, o({}), o({ bind: true }));
    yield eatMatch(m`hasGapToken*: <* '$' />`, o({}), o({ bind: true }));
    yield eatMatch(m`fragmentToken*: <* '_' />`, o({}), o({ bind: true }));
    yield eatMatch(m`multiFragmentToken*: <* '_' />`, o({}), o({ bind: true }));
  }

  *OpenNodeTag({ s, props: { forceFragment = false, propertyValue = false } }) {
    const outerSpan = s().span;
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

    let fragmentFlag = !!get('fragmentToken', flags.node);
    let multiFragmentFlag = !!get('multiFragmentToken', flags.node);

    if (forceFragment && !fragmentFlag) {
      yield fail();
    }

    let isMultiFragment = multiFragmentFlag;

    if (isMultiFragment) {
      yield eat(m`type$: null`);
    } else {
      yield eatMatch(m`type$: <Identifier />`, o({}), o({ bind: true }));
    }

    let sp = !isMultiFragment ? yield* eatMatchTrivia() : null;

    if (!isMultiFragment && sp && (yield match(re`/['"]/`))) {
      yield eat(m`literalValue$: :JSON: <String />`);
      sp = yield* eatMatchTrivia();
    } else {
      yield eat(m`literalValue$: null`);
    }

    if (!isMultiFragment) {
      yield eatMatch(m`attributes$: :JSON: <Object '{' />`, o({}), o({ bind: true }));
      yield* eatMatchTrivia();
    } else {
      yield eat(m`attributes$: null`);
    }

    let sc;
    if (!isMultiFragment) {
      sc = yield eatMatch(m`selfClosingToken*: <* '/' />`, o({}), o({ bind: true }));
    } else {
      sc = yield eat(m`selfClosingToken*: null`);
    }

    const balanced = !sc && (s().depths.path > 0 || outerSpan !== 'Bare');

    yield defineAttribute('balanced', balanced);
    yield defineAttribute('balancedSpan', balanced ? 'NodeChildren' : null);

    yield eat(m`closeToken*: <* '>' { balancer: true } />`);
  }

  *CloseNodeTag() {
    yield eat(m`openToken*: <* '</' { balanced: '>' } />`);
    yield eat(m`closeToken*: <* '>' { balancer: true } />`);
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

  *EscapeSequence({ s }) {
    let { span } = s();
    if (!span.startsWith('Identifier')) {
      yield fail();
    }

    yield eat(m`sigilToken*: <* '\\' { openSpan: 'Escape' } />`);

    let cooked;
    let match_;
    if ((match_ = yield match(re`/[\\/nrt0]/`))) {
      const matchText = printSource(match_);
      yield eat(m`code*: <*Keyword ${buildString(matchText)} { closeSpan: 'Escape' } />`);

      cooked = escapables.get(matchText) || matchText;
    } else if (yield match('u')) {
      let codeNode = yield eat(m`code*: <EscapeCode { closeSpan: 'Escape' } />`);

      const value = printSource(get('value', codeNode.node));

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
