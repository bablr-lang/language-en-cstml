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
import { BindingTag, DoctypeTag, OpenNodeTag } from '@bablr/agast-helpers/symbols';
import { List } from '@bablr/helpers/productions';

export const canonicalURL = 'https://bablr.org/languages/core/en/cstml';

export const dependencies = { Space, JSON };

export const defaultMatcher = m`<Document />`;

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

export const fragmentProduction = 'Fragment';

export const grammar = class CSTMLGrammar {
  constructor() {
    this.literals = new Set(['Keyword']);
    this.emptyables = new Set(['NodeFlags', 'ReferenceFlags']);
    this.attributes = new Map(
      Object.entries({
        OpenNodeTag: { selfClosing: undefined },
        NodeFlags: { token: undefined, hasGap: undefined },
      }),
    );
  }

  *Fragment({ props: { rootMatcher } }) {
    yield* eatMatchTrivia();
    yield eat(rootMatcher);
    yield* eatMatchTrivia();
  }

  *Stream() {
    let tag,
      kind = 'key';
    do {
      tag = yield eatMatch(m`.[]$: <_Tag /./s />`, o({ kind }));
      let tagName = tag && getRoot(tag.node).value.name;
      kind =
        kind === 'key' && ![DoctypeTag, OpenNodeTag].includes(tagName)
          ? 'value'
          : tag && tagName === BindingTag
          ? 'value'
          : 'key';
      yield* eatMatchTrivia();
    } while (tag);
  }

  *Tag({ props: { kind } }) {
    let res;
    if ((res ||= yield eatMatch(m`<HashTag '##' />`))) {
    }

    if (kind !== 'key') {
      if ((res ||= yield eatMatch(m`<NullTag 'null' />`))) {
      } else if ((res ||= yield eatMatch(m`<BindingTag ':' />`))) {
      } else if ((res ||= yield eatMatch(m`<GapTag '<//>' />`))) {
      } else if ((res ||= yield eatMatch(m`<CloseNodeTag '</' />`))) {
      } else if ((res ||= yield eatMatch(m`<OpenNodeTag '<' />`))) {
      }
    }
    if (kind !== 'value') {
      if ((res ||= yield eatMatch(m`<AttributeDefinition '{' />`))) {
      } else if (
        (res ||= yield eatMatch(m`<ReferenceTag /[.#@_a-zA-Z\u0060\u{80}-\u{10ffff}]/ />`))
      ) {
      } else if ((res ||= yield eatMatch(m`<BindingTag ':' />`))) {
      } else if ((res ||= yield eatMatch(m`<LiteralTag /['"]/ />`))) {
      } else if ((res ||= yield eatMatch(m`<GapTag '<//>' />`))) {
      } else if ((res ||= yield eatMatch(m`<ShiftTag '^^^' />`))) {
      } else if ((res ||= yield eatMatch(m`<DoctypeTag '<!' />`))) {
      } else if ((res ||= yield eatMatch(m`<CloseNodeTag '</' />`))) {
      } else if ((res ||= yield eatMatch(m`<OpenNodeTag '<' />)`))) {
      }
    }
  }

  *Document() {
    yield eatMatch(m`doctype: <DoctypeTag '<!' />`);
    yield* eatMatchTrivia();
    yield eat(m`tree+$: <_Expression />`);
  }

  *DoctypeTag() {
    yield eat(m`openToken*: <* '<!' />`);
    yield eat(m`version$: :JSON: <*UnsignedInteger />`);
    yield eat(m`versionSeparatorToken*: <* ':' />`);
    yield eat(m`doctypeToken*: <*Keyword 'cstml' />`);
    yield* eatMatchTrivia();
    if (yield eatMatch(m`attributes$: :JSON: <Object '{' />`, o({}), o({ bind: true }))) {
      yield* eatMatchTrivia();
    }
    yield eat(m`closeToken*: <* '>' />`);
  }

  *ReferenceTag() {
    let type;
    if ((type = yield match(re`/\.\.|[.#@_]/`))) {
      yield eat(m`type*: <* ${buildString(printSource(type))} />`);
    }

    if (!type || printSource(type) === '#') {
      if (type) {
        yield eatMatch(m`name$: <Identifier />`, o({}), o({ bind: true }));
      } else {
        yield eat(m`name$: <Identifier />`);
      }
    } else {
      yield eat(m`name$: null`);
    }

    yield* eatMatchTrivia();
    yield eat(m`flags*: <ReferenceFlags />`);
    yield* eatMatchTrivia();
    yield eat(m`sigilToken*: <* ':' />`);
  }

  *ReferenceFlags() {
    yield eatMatch(m`arrayToken*: <* '[]' />`);
    yield eatMatch(m`expressionToken*: <* '+' />`);
    let i = yield eatMatch(m`intrinsicToken*: <* '*' />`);
    let g = yield eatMatch(m`hasGapToken*: <* '$' />`);
    if (i && g) yield fail();
  }

  *BindingTag() {
    yield eat(m`openToken*: <* ':' />`);
    yield* List({
      element: m`segments[]$: <BindingSegment />`,
      separator: m`#separatorTokens: <* '/' />`,
      allowTrailingSeparator: false,
    });
    yield eat(m`closeToken*: <* ':' />`);
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

  *HashTag() {
    yield eat(m`openToken*: <* '##' />`);
    let ver = yield eat(m`version$: :JSON: <*UnsignedInteger />`);
    if (printSource(ver) !== '1') {
      yield fail();
    }
    yield eat(m`separatorToken*: <* ':' />`);
    yield eat(m`hash$: <*Base64 />`);
    yield eat(m`closeToken*: <* '##' />`);
  }

  *Base64() {
    yield eatMatch(re`/[a-zA-Z0-9+/]+=*/`);
  }

  *AttributeDefinition() {
    yield eatMatch(m`openToken*: <* '{' />`);
    yield* eatMatchTrivia();
    yield eat(m`key$: <IdentifierPath />`);
    yield* eatMatchTrivia();
    yield eat(m`sigilToken*: <* ':' />`);
    yield* eatMatchTrivia();
    yield eat(m`value$: :JSON: <_Expression />`);
    yield* eatMatchTrivia();
    yield eat(m`closeToken*: <* '}' />`);
  }

  *TreeNode({ props }) {
    if (yield match(re`/['"]/`)) {
      yield eat(m`openTag*: <OpenNodeTag />`, o({}), o({ allowEmpty: true }));

      do {
        yield eat(m`children[]$: <LiteralTag />`);
        yield* eatMatchTrivia();
      } while (yield match(re`/['"]/`));

      yield eat(m`closeTag*: <CloseNodeTag />`, o({}), o({ literal: true, allowEmpty: true }));

      return;
    }

    let open = yield eat(m`openTag*: <OpenNodeTag />`, o(props));
    yield* eatMatchTrivia();

    const flags = get('flags', open.node);

    const { selfClosing } = open.node.value.attributes;

    const token = !!get('tokenToken', flags);

    if (!selfClosing) {
      while ((yield match(re`/./s`)) && !(yield match('</>'))) {
        yield eat(m`children[]$: <_NodeChild />`, o({ token }));

        yield* eatMatchTrivia();
      }

      yield eat(m`closeTag*: <CloseNodeTag />`);
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
    yield eatMatch(m`referenceTag$: <ReferenceTag />`, o({}), o({ bind: true }));
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
    yield eat(m`<BoundNode />`);

    yield* eatMatchTrivia();

    return r(shiftMatch(m`<ShiftExpression '^^^' />`));
  }

  *BoundNode() {
    while (yield eatMatch(m`bindingTags[]*: <BindingTag />`)) {
      yield* eatMatchTrivia();
    }

    yield eat(m`node+$: <_Node />`);

    yield eatMatch(m`hashTag$: <HashTag />`);
  }

  *ShiftExpression() {
    yield eat(m`original+$: <BoundNode />`, o({}), o({ held: 'eat' }));
    yield* eatMatchTrivia();
    yield eat(m`sigilTag*: <ShiftTag />`);
    yield* eatMatchTrivia();
    yield eat(m`value+*: <Expression />`);
  }

  *Node({ s }) {
    if (s().shifted) {
      yield eat(m`<TreeNode />`);
    } else {
      if (yield match('<!')) {
        yield fail();
      } else if (yield eatMatch(m`<NullNode 'null' />`)) {
      } else if (yield eatMatch(m`<GapNode '<//>' />`)) {
      } else if (yield eatMatch(m`<CloseNodeTag '</>' />`)) {
        yield fail();
      } else {
        yield eat(m`<TreeNode />`);
      }
      yield* eatMatchTrivia();
    }
  }

  *NodeFlags({ props: { token } }) {
    let token_ = yield eatMatch(m`tokenToken*: <* '*' />`);
    let hasGap = yield eatMatch(m`hasGapToken*: <* '$' />`);

    yield defineAttribute('token', !!(token_ || token));
    yield defineAttribute('hasGap', !!hasGap);
  }

  *OpenNodeTag() {
    if (yield match(re`/['"]/`)) {
      yield eat(m`flags*: <NodeFlags />`, o({ token: true }));
      yield defineAttribute('selfClosing', false);
      return;
    }

    yield eat(m`openToken*: <* '<' />`);

    yield eat(m`flags*: <NodeFlags />`);

    let type = yield eatMatch(m`type*: <* /__?/ />`);

    // let fragmentFlag = !!get('fragmentToken', flags.node);
    // let multiFragmentFlag = !!get('multiFragmentToken', flags.node);

    let isFragment = !!type && printSource(type.node) === '__';

    if (isFragment) {
      yield eat(m`name$: null`);
    } else {
      yield eatMatch(m`name$: <Identifier />`, o({}), o({ bind: true }));
    }

    let sp = !isFragment ? yield* eatMatchTrivia() : null;

    if (!isFragment && sp && (yield match(re`/['"\g]/`))) {
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

    let sc = null;
    if (!isFragment) {
      sc = yield eatMatch(m`selfClosingToken*: <* '/' />`);
    }

    yield defineAttribute('selfClosing', !!sc);

    yield eat(m`closeToken*: <* '>' />`);
  }

  *CloseNodeTag() {
    yield eat(m`openToken*: <* '</' />`);
    yield eat(m`closeToken*: <* '>' />`);
  }

  *Identifier() {
    let q;
    q = yield eatMatch(m`openToken*: <* '\u0060' />`);

    yield eat(m`content*: <*IdentifierContent />`, o({ quoted: !!q }));
    if (q) {
      yield eat(m`closeToken*: <* '\u0060' />`);
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

  *EscapeSequence({ ctx }) {
    let { getGapNode } = ctx;

    yield eat(m`sigilToken*: <* '\\' />`);

    let cooked;
    let match_;
    if ((match_ = yield match(re`/[\\/nrt0]/`))) {
      const matchText = printSource(match_);
      yield eat(m`code: <*Keyword ${buildString(matchText)} />`);

      cooked = escapables.get(matchText) || matchText;
    } else if (yield match('u')) {
      let codeNode = yield eat(m`code: <EscapeCode />`);

      const value = printSource(getGapNode(get('value', codeNode.node)));

      cooked = String.fromCharCode(parseInt(value, 16));
    } else {
      throw new Error();
    }

    yield defineAttribute('cooked', cooked);
  }

  *EscapeCode() {
    yield eat(m`typeToken*: <*Keyword 'u' />`);
    if (yield eatMatch(m`openToken*: <* '{' />`)) {
      yield eat(m`value: :JSON: <*UnsignedHexInteger />`);
      yield eat(m`closeToken*: <* '}' />`);
    } else {
      yield eat(m`value: :JSON: <*UnsignedHexInteger /[\da-fA-F]{4}/ />`);
    }
  }
};

export default { canonicalURL, dependencies, grammar, defaultMatcher, fragmentProduction };
