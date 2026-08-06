import {
  m,
  o,
  r,
  eat,
  eatMatch,
  match,
  defineAttribute,
  fail,
  shiftMatch,
  shift,
} from '@bablr/helpers/grammar';
import Space from '@bablr/language-en-blank-space';
import JSON from '@bablr/language-en-cstml-json';
import { get, printSource, printString } from '@bablr/agast-helpers/tree';
import * as BSet from '@bablr/agast-helpers/b-set';
import * as BMap from '@bablr/agast-helpers/b-map';
import { List } from '@bablr/helpers/productions';
import { freeze, freezeClass, freezeRecord } from '@bablr/agast-helpers/object';

let { entry } = BMap;

const escapables = freeze({
  n: '\n',
  r: '\r',
  t: '\t',
  0: '\0',
});

export function* eatMatchTrivia() {
  let trivia = null;
  while (yield match(m`/[ \t\r\n]/`)) {
    trivia = yield eat(m`#: :Space: <_Blank />`);
  }
  return trivia;
}

export default class CSTML {
  static canonicalURL = 'https://bablr.org/languages/core/en/cstml';
  static dependencies = freeze({ Space, JSON });
  static defaultMatcher = m`<Document />`;
  static fragmentProduction = 'Fragment';
  static context = freezeRecord({});

  constructor() {
    this.literals = BSet.from('Keyword');
    this.emptyables = BSet.from('NodeFlags', 'ReferenceFlags');
    this.attributes = BMap.from(
      entry('OpenNodeTag', freezeRecord({ selfClosing: undefined })),
      entry('NodeFlags', freezeRecord({ token: undefined, object: undefined, array: undefined })),
    );
  }

  *Fragment({ props: { rootMatcher } }) {
    yield* eatMatchTrivia();
    yield eat(rootMatcher);
    yield* eatMatchTrivia();
  }

  *Stream() {
    let tag;
    do {
      tag = yield eatMatch(m`.[]$: <_Tag /./s />`);
      yield* eatMatchTrivia();
    } while (tag);
  }

  *Tag() {
    let res = yield match(
      m`/##|#[|[a-z]['"]|null |\<\/\/\>|\<\/|\<!|\<|\^\^\^|[:{'".#_a-zA-Z\u0060\u{80}-\u{10ffff}]/`,
    );

    res = printSource(res);

    if (`'"`.includes(res[1]) && res[0] !== 'b') throw new Error();

    switch (res) {
      case `b"`:
      case `b'`:
        yield eat(m`<BinaryTag />`);
        break;
      case `@`:
        yield eat(m`<EscapeTag />`);
        break;
      case 'null ':
        yield eat(m`<NullTag />`);
        break;
      case ':':
        yield eat(m`<BindingTag />`);
        break;
      case '##':
        yield eat(m`<HashTag />`);
        break;
      case '#[':
        yield eat(m`<SumsTag />`);
        break;
      case '<//>':
        yield eat(m`<GapTag />`);
        break;
      case '</':
        yield eat(m`<CloseNodeTag />`);
        break;
      case '<!':
        yield eat(m`<DoctypeTag />`);
        break;
      case '<':
        yield eat(m`<OpenNodeTag />`);
        break;
      case '{':
        yield eat(m`<AttributeDefinition />`);
        break;
      case '^^^':
        yield eat(m`<ShiftTag />`);
        break;
      case '"':
      case "'":
        yield eat(m`<LiteralTag />`);
        break;
      default:
        yield eat(m`<ReferenceTag />`);
    }
  }

  *Document() {
    yield eatMatch(m`doctype: <DoctypeTag '<!' />`);
    yield* eatMatchTrivia();
    yield eat(m`tree+$: <_Node />`);
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
    if ((type = yield match(m`/[#@]|\.\.?|__?/`))) {
      yield eat(m`type*: <* ${printString(printSource(type))} />`);
    }

    let quotedIdent = yield match(m`'\u0060'`);
    let name = null;
    if (!type || printSource(type) === '#') {
      if (type) {
        yield eatMatch(m`name$: <Identifier />`, o({}), o({ bind: true }));
      } else {
        name = yield eat(m`name$: <Identifier />`);
      }
    } else {
      yield eat(m`name$: null`);
    }

    let nameStr = name && printSource(name.node);

    if (
      !type &&
      !quotedIdent &&
      name &&
      (nameStr === 'null' || (nameStr.length === 1 && nameStr >= 'a' && nameStr <= 'z'))
    ) {
      yield fail();
    }

    yield eat(m`flags*: <ReferenceFlags />`);

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
    if (yield eatMatch(m`type*: <* '..' />`)) {
    } else {
      yield eat(m`name*: <Identifier />`);
    }
    yield eat(m`closeToken*: <* ':' />`);
  }

  *IdentifierPath() {
    yield eat(m`segments[]$: <Identifier />`);
    while (yield match(m`'.'`)) {
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
    yield eat(m`#separatorToken: <* ' ' />`);
  }

  *HashTag() {
    yield eat(m`openToken*: <* '##' />`);
    yield eat(m`hash$: <*Base64 />`);
    yield eat(m`closeToken*: <* '##' />`);
  }

  *SumsTag() {
    yield eat(m`openToken*: <* '#[' />`);
    yield* eatMatchTrivia();
    let sep = true;

    while (sep && (yield match(m`/[^\]]/s`))) {
      yield eat(m`elements[]$: :JSON: <_Expression />`);
      yield* eatMatchTrivia();
      sep = yield eatMatch(m`#separatorTokens: <* ',' />`);
      if (sep) {
        yield* eatMatchTrivia();
      }
    }
    yield eat(m`closeToken*: <* '#]' />`);
  }

  *StringTag() {
    let result = yield match(m`/[b@]/`);

    let sigilToken = result && printSource(result);

    if (sigilToken === 'b') {
      yield eat(m`<BinaryTag />`);
    } else if (sigilToken === '@') {
      yield eat(m`<EscapeTag />`);
    } else {
      yield eat(m`<LiteralTag />`);
    }
  }

  *LiteralTag() {
    yield eat(m`value*: :JSON: <String />`);
  }

  *EscapeTag() {
    let aa = yield match(m`'@@'`);

    if (!aa) {
      yield eat(m`cookedToken*: <* '@' />`);
      yield eat(m`cookedValue*: :JSON: <String />`);
    }

    yield eat(m`sigilToken*: <* '@@' />`);
    yield eat(m`value*: :JSON: <String />`);
  }

  *BinaryTag() {
    yield eat(m`typeToken*: <*Keyword 'b' />`);

    yield eat(m`value*: :JSON: <String />`);
  }

  *Base64() {
    yield eatMatch(m`/[a-zA-Z0-9+/]+=*/`);
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

  *Property() {
    yield eatMatch(
      m`referenceTag$: <ReferenceTag /[.#@_a-zA-Z\u0060\u{80}-\u{10ffff}]/ />`,
      o({}),
      o({ bind: true }),
    );
    yield* eatMatchTrivia();
    yield eat(m`value+$: <BoundNode />`);
  }

  *NodeChild({ props: { token } }) {
    if (token) {
      if (yield eatMatch(m`<AttributeDefinition '{' />`)) {
      } else if (yield eatMatch(m`<Property '@' />`)) {
      } else {
        yield eat(m`<_StringTag /[b@]?['"]/ />`);
      }
    } else {
      if (yield eatMatch(m`<AttributeDefinition '{' />`)) {
      } else {
        yield eat(m`<Property /./s />`);
      }
    }
  }

  *TreeNode({ props }) {
    yield eatMatch(m`hashTag$: <HashTag />`, o({}), o({ held: 'eat' }));

    yield* eatMatchTrivia();

    if (yield match(m`/[ba]?['"]/`)) {
      let open = yield eat(m`openTag*: <OpenNodeTag />`, o({}), o({ allowEmpty: true }));

      do {
        yield eat(m`children[]$: <_StringTag />`);
        yield* eatMatchTrivia();
      } while (yield match(m`/[ba]?['"]/`));

      yield eat(m`closeTag*: <CloseNodeTag />`, o({ implicit: true }), o({ allowEmpty: true }));

      return;
    }

    let open = yield eat(m`openTag*: <OpenNodeTag />`, o(props));
    yield* eatMatchTrivia();

    const flags = get('flags', open.node);

    const { selfClosing } = open.node.value.attributes;

    const token = !!get('tokenToken', flags);

    if (!selfClosing) {
      while ((yield match(m`/./s`)) && !(yield match(m`/\<\/\>|##/`))) {
        yield eat(m`children[]$: <_NodeChild />`, o({ token }));

        yield* eatMatchTrivia();
      }

      yield eat(m`closeTag*: <CloseNodeTag />`);
    }
  }

  *NullNode() {
    yield eatMatch(m`hashTag: <HashTag />`, o({}), o({ held: 'eat' }));
    yield* eatMatchTrivia();
    yield eat(m`sigilTag*: <NullTag />`);
  }

  *GapNode() {
    yield eatMatch(m`hashTag: <HashTag />`, o({}), o({ held: 'eat' }));
    yield* eatMatchTrivia();
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
  }

  *ShiftExpression() {
    yield eat(m`original+$: <BoundNode />`, o({}), o({ held: 'eat' }));
    yield* eatMatchTrivia();
    yield eat(m`sigilTag*: <ShiftTag />`);
    yield* eatMatchTrivia();
    yield eat(m`value+*: <Node />`);
  }

  *Node({ s }) {
    let { shifted } = s();
    if (shifted) {
      yield eat(m`<TreeNode />`);
    } else {
      if (yield match(m`'<!'`)) {
        yield fail();
      } else if (yield eatMatch(m`<HashTag '##' />`)) {
        yield* eatMatchTrivia();
        return r(shift(m`<_Node />`));
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
    let token_ = (yield eatMatch(m`tokenToken*: <* '*' />`)) || token;
    let obj = yield eatMatch(m`objectToken*: <* '{' />`);
    let arr = yield eatMatch(m`arrayToken*: <* '[' />`);

    if (obj && arr) yield fail();
    if (token_ && (obj || arr)) yield fail();

    yield defineAttribute('token', !!token_);
    yield defineAttribute('object', !!obj);
    yield defineAttribute('array', !!arr);
  }

  *OpenNodeTag() {
    if (yield match(m`/['"]/`)) {
      yield eat(m`flags*: <NodeFlags />`, o({ token: true }));
      yield defineAttribute('selfClosing', false);
      return;
    }

    yield eat(m`openToken*: <* '<' />`);

    let flags = yield eat(m`flags*: <NodeFlags />`);

    let type = yield eatMatch(m`type*: <* /__?/ />`);

    // let fragmentFlag = !!get('fragmentToken', flags.node);
    // let multiFragmentFlag = !!get('multiFragmentToken', flags.node);

    let isFragment = !!type && printSource(type.node) === '__';

    if (isFragment) {
      if (printSource(flags.node)) yield fail();

      yield eat(m`name$: null`);
    } else {
      yield eatMatch(m`name$: <Identifier />`, o({}), o({ bind: true }));
    }

    if (flags.node.value.attributes.object) {
      yield eat(m`closeObjectFlagToken*: <* '}' />`);
    } else if (flags.node.value.attributes.array) {
      yield eat(m`closeArrayFlagToken*: <* ']' />`);
    }

    let sp = !isFragment ? yield* eatMatchTrivia() : null;

    if (!isFragment && sp && (yield match(m`/(?:b|@@?)?['"\g]/`))) {
      yield eat(m`literalValue$: <_StringTag />`);
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

  *CloseNodeTag({ props: { implicit } }) {
    if (!implicit) {
      yield eat(m`openToken*: <* '</' />`);
      yield eat(m`closeToken*: <* '>' />`);
    }
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
      if ((esc = yield match(m`'\\'`))) {
        esc = yield eatMatch(m`<EscapeSequence />`, o({}), o({ escape: true }));
      } else {
        if (!quoted) {
          lit = yield eatMatch(m`/[a-zA-Z\u{80}-\u{10ffff}][a-zA-Z0-9_\u{80}-\u{10ffff}-]*/`);
        } else {
          lit = yield eatMatch(m`/[^\u0060\\\r\n]+/`);
        }
      }
    } while (lit || esc);
  }

  *EscapeSequence({ ctx }) {
    let { getGapNode } = ctx;

    yield eat(m`sigilToken*: <* '\\' />`);

    let cooked;
    let match_;
    if ((match_ = yield match(m`/[\\/nrt0'"\u0060]/`))) {
      const matchText = printSource(match_);
      yield eat(m`code: <*Keyword ${printString(matchText)} />`);

      cooked = escapables[matchText] || matchText;
    } else if (yield match(m`'u'`)) {
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
}

freezeClass(CSTML);
