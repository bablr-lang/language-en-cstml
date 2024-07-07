import { i } from '@bablr/boot/shorthand.macro';
import { Node, CoveredBy, InjectFrom, Attributes, AllowEmpty } from '@bablr/helpers/decorators';
import { buildBoolean, buildString } from '@bablr/agast-vm-helpers';
import * as productions from '@bablr/helpers/productions';
import * as Space from '@bablr/language-blank-space';

export const canonicalURL = 'https://bablr.org/languages/core/cstml';

export const dependencies = { Space };

const escapables = new Map(
  Object.entries({
    n: '\n',
    r: '\r',
    t: '\t',
    0: '\0',
  }),
);

export function* eatMatchTrivia() {
  if (yield i`match(/[ \t\r\n]/)`) {
    return yield i`eat(<#*Space:Space>)`;
  }
  return null;
}

export const grammar = class CSTMLGrammar {
  *[Symbol.for('@bablr/fragment')]() {
    yield* eatMatchTrivia();
    yield i`eat(<>)`;
    yield* eatMatchTrivia();
  }

  *Stream() {
    while (yield i`eatMatch(<Token>)`);
  }

  *Expression() {
    yield i`eat(<Any> null [
      <Null 'null'>
      <Reference /[a-zA-Z]/>
      <Literal /['"]/>
      <DoctypeTag '<!'>
      <Gap '<//>'>
      <Shift '^^^'>
      <Node '<'>
    ])`;
  }

  *Token() {
    yield i`eat(<Any> null [
      <Null 'null'>
      <Reference /[a-zA-Z]/>
      <Literal /['"]/>
      <DoctypeTag '<!'>
      <Gap '<//>'>
      <Shift '^^^'>
      <CloseNodeTag '</'>
      <OpenNodeTag '<'>
    ])`;
  }

  @Node
  *Document() {
    yield i`eat(<DoctypeTag> 'doctype')`;
    yield* eatMatchTrivia();
    yield i`eat(<Node> 'tree')`;
  }

  @CoveredBy('Token')
  @CoveredBy('Expression')
  @Node
  *DoctypeTag() {
    yield i`eat(<~*Punctuator '<!' balanced='>'> 'openToken')`;
    yield i`eat(<UnsignedInteger> 'version')`;
    yield i`eat(<~*Punctuator ':'> 'versionSeparatorToken')`;
    yield i`eat(<~*Keyword 'cstml'> 'doctypeToken')`;
    let sp = yield* eatMatchTrivia();

    while (sp && (yield i`match(/!?[a-zA-Z]/)`)) {
      yield i`eat(<Attribute> 'attributes[]')`;
      sp = yield* eatMatchTrivia();
    }

    yield i`eat(<~*Punctuator '>' balancer> 'closeToken')`;
  }

  @Node
  @CoveredBy('Token')
  @CoveredBy('Expression')
  *Reference() {
    yield i`eat(<*Identifier> 'name')`;
    yield* eatMatchTrivia();
    yield i`eatMatch(<~*Punctuator '[]'> 'arrayOperatorToken')`;
    yield* eatMatchTrivia();
    yield i`eat(<~*Punctuator ':'> 'sigilToken')`;
  }

  @Node
  @CoveredBy('Token')
  @CoveredBy('Expression')
  @CoveredBy('PropertyValue')
  *Gap() {
    yield i`eat(<~*Punctuator '<//>'> 'sigilToken')`;
    // yield i`eat(spam'sigilToken: <~*Punctuator '<//>'>')`;
  }

  @Node
  @CoveredBy('Token')
  @CoveredBy('Expression')
  *Shift() {
    yield i`eat(<~*Punctuator '^^^'> 'sigilToken')`;
  }

  @Node
  @CoveredBy('Token')
  @CoveredBy('Expression')
  @CoveredBy('PropertyValue')
  *Null() {
    yield i`eat(<~*Keyword 'null'> 'sigilToken')`;
  }

  @Node
  @CoveredBy('PropertyValue')
  *Node({ ctx }) {
    let open = yield i`eat(<OpenNodeTag> 'open')`;
    yield* eatMatchTrivia();

    const type = ctx.getProperty(open, 'type');
    const flags = ctx.getProperty(open, 'flags');
    const token = ctx.getProperty(flags, 'tokenToken');
    const selfClosing = !!ctx.getProperty(open, 'selfClosingTagToken');

    if (selfClosing) {
      yield i`eat(null 'children[]')`;
      yield i`eat(null 'close')`;
    } else {
      let anyMatched = false;
      while ((yield i`match(/./)`) && !(yield i`match('</')`)) {
        yield i`eat(<NodeChild> 'children[]' { token: ${buildBoolean(token)} type: ${buildBoolean(
          type,
        )} })`;

        yield* eatMatchTrivia();
        anyMatched = true;
      }
      if (!anyMatched) {
        yield i`eat(null 'children[]')`;
      }

      yield i`eat(<CloseNodeTag> 'close')`;
    }
  }

  *NodeChild({ value: props, ctx }) {
    const { type, token } = ctx.unbox(props || {});

    if (token && ctx.unbox(token)) {
      yield i`eat(<Any> null [
        <Node /<\*?@/>
        <Literal /['"]/>
      ])`;
    } else {
      if (type && ctx.unbox(type)) {
        yield i`eat(<Any> null [
          <Node /<\*?#/>
          <Property /[a-zA-Z]/>
          <Shift '^^^'>
        ])`;
      } else {
        yield i`eatMatch(<Node '<'>)`;
      }
    }
  }

  @Node
  @CoveredBy('NodeChild')
  *Property() {
    yield i`eat(<Reference> 'reference')`;
    yield* eatMatchTrivia();
    yield i`eat(<PropertyValue> 'node')`;
  }

  *PropertyValue() {
    yield i`eat(<Any> null [
      <Null 'null'>
      <Gap '<//>'>
      <Node /<[^#@]/>
    ])`;
  }

  @Node
  @AllowEmpty
  *Flags() {
    let tr = yield i`eatMatch(<~*Punctuator '#'> 'triviaToken')`;
    yield i`eatMatch(<~*Punctuator '~'> 'intrinsicToken')`;
    yield i`eatMatch(<~*Punctuator '*'> 'tokenToken')`;
    let esc = yield i`eatMatch(<~*Punctuator '@'> 'escapeToken')`;
    let exp = yield i`eatMatch(<~*Punctuator '+'> 'expressionToken')`;

    if ((tr && esc) || (exp && (tr || esc))) yield i`fail()`;
  }

  @Node
  @CoveredBy('Token')
  *OpenNodeTag() {
    yield i`eat(<~*Punctuator '<' balancedSpan='Tag' balanced='>'> 'openToken')`;

    yield i`eat(<~Flags> 'flags')`;

    let type = yield i`eatMatch(<TagType /[a-zA-Z\g]/>)`;
    let sp = yield* eatMatchTrivia();

    if (type) {
      if (sp && (yield i`match(/['"]/)`)) {
        yield i`eat(<String> 'intrinsicValue')`;
        sp = yield* eatMatchTrivia();
      } else {
        yield i`eat(null 'intrinsicValue')`;
      }

      let anyAttributes = false;
      while (sp && (yield i`match(/!?[a-zA-Z]/)`)) {
        yield i`eat(<Attribute> 'attributes[]')`;
        sp = yield* eatMatchTrivia();
        anyAttributes = true;
      }

      if (!anyAttributes) {
        yield i`eat(null 'attributes[]')`;
      }

      yield i`eatMatch(<~*Punctuator '/'> 'selfClosingTagToken')`;
    }
    yield i`eat(<~*Punctuator '>' balancer> 'closeToken')`;
  }

  @Node
  @CoveredBy('Token')
  *CloseNodeTag() {
    yield i`eat(<~*Punctuator '</' balanced='>'> 'openToken')`;
    yield i`eatMatch(<TagType>)`;
    yield i`eat(<~*Punctuator '>' balancer> 'closeToken')`;
  }

  *Attribute() {
    if (yield i`match(/[a-zA-Z][a-zA-Z_-]*\s*=/)`) {
      yield i`eat(<MappingAttribute>)`;
    } else {
      yield i`eat(<BooleanAttribute>)`;
    }
  }

  @Attributes(['true'])
  @Node
  @CoveredBy('Attribute')
  *BooleanAttribute() {
    if (yield i`eatMatch(<~*Punctuator '!'> 'negateToken')`) {
      yield i`bindAttribute('true' false)`;
    } else {
      yield i`bindAttribute('true' true)`;
    }
    yield i`eat(<*Identifier> 'key')`;
  }

  @Node
  @CoveredBy('Attribute')
  *MappingAttribute() {
    yield i`eat(<*Identifier> 'key')`;
    yield* eatMatchTrivia();
    yield i`eat(<~*Punctuator '='> 'sigilToken')`;
    yield* eatMatchTrivia();
    yield i`eat(<AttributeValue> 'value')`;
  }

  *AttributeValue() {
    yield i`eat(<Any> null [
        <String /['"]/>
        <Number /[\d+-]/>
      ])`;
  }

  *TagType() {
    if (yield i`match(/['"]|[a-zA-Z.]+:/)`) {
      yield i`eat(<Language> 'language')`;
      yield i`eat(<~*Punctuator ':'> 'namespaceSeparatorToken')`;
      yield i`eat(<*Identifier> 'type')`;
    } else {
      yield i`eat(<*Identifier> 'type')`;
    }
  }

  *Language() {
    yield i`eat(<Any> null [
      <String /['"]/>
      <IdentifierPath /[a-zA-Z]/>
    ])`;
  }

  @CoveredBy('Language')
  @Node
  *IdentifierPath() {
    yield i`eat(<*Identifier> 'segments[]')`;
    while (yield i`match('.')`) {
      yield i`eat(<~*Punctuator '.'> 'separators[]')`;
      yield i`eat(<*Identifier> 'segments[]')`;
    }
  }

  @CoveredBy('AttributeValue')
  @CoveredBy('Language')
  @Node
  *String({ ctx }) {
    let q = yield i`match(/['"]/)`;

    if (!q) yield i`fail()`;

    const q_ = ctx.sourceTextFor(q);

    yield q_ === "'"
      ? i`eat(<~*Punctuator "'" balanced="'" balancedSpan='String:Single'> 'openToken')`
      : i`eat(<~*Punctuator '"' balanced='"' balancedSpan='String:Double'> 'openToken')`;

    yield i`eat(<*StringContent> 'content')`;

    yield q_ === "'"
      ? i`eat(<~*Punctuator "'" balancer> 'closeToken')`
      : i`eat(<~*Punctuator '"' balancer> 'closeToken')`;
  }

  @AllowEmpty
  @Node
  *StringContent({ state: { span } }) {
    let esc, lit;
    do {
      esc = (yield i`match('\\')`) && (yield i`eat(<@EscapeSequence>)`);
      lit =
        span === 'String:Single'
          ? yield i`eatMatch(/[^\r\n\\']+/)`
          : yield i`eatMatch(/[^\r\n\\"]+/)`;
    } while (esc || lit);
  }

  @Attributes(['cooked'])
  @Node
  *EscapeSequence({ state: { span }, ctx }) {
    if (!span.startsWith('String')) {
      yield i`fail()`;
    }

    yield i`eat(<~*Punctuator '\\' openSpan='Escape'> 'escapeToken')`;

    let match, cooked;

    if (
      (match =
        span === 'String:Single' ? yield i`match(/[\\/nrt0']/)` : yield i`match(/[\\/nrt0"]/)`)
    ) {
      const match_ = ctx.sourceTextFor(match);
      yield i`eat(<~*Keyword ${buildString(match_)} closeSpan='Escape'> 'value')`;
      cooked = escapables.get(match_) || match_;
    } else if (yield i`match('u')`) {
      const codeNode = yield i`eat(<EscapeCode closeSpan='Escape'> 'value')`;
      cooked = parseInt(
        ctx
          .getProperty(codeNode, 'digits')
          .map((digit) => ctx.sourceTextFor(digit))
          .join(''),
        16,
      );
    } else {
      yield i`fail()`;
    }

    yield i`bindAttribute(cooked ${buildString(cooked.toString(10))})`;
  }

  @Node
  *EscapeCode() {
    if (yield i`eatMatch(<~*Keyword 'u'> 'typeToken')`) {
      if (yield i`eatMatch(<~*Punctuator '{' balanced='}'> 'openToken')`) {
        yield i`eat(<Digits> 'digits[]')`;
        yield i`eat(<~*Punctuator '}' balancer> 'closeToken')`;
      } else {
        yield i`eat(<Digits /\d{4}/> 'digits[]')`;
        yield i`eat(null 'closeToken')`;
      }
    }
  }

  @Node
  *Identifier() {
    yield i`eat(/[a-zA-Z][a-zA-Z_-]*/)`;
  }

  @Node
  @CoveredBy('Expression')
  @CoveredBy('NodeChild')
  *Literal() {
    yield i`eat(<String> 'value')`;
  }

  @CoveredBy('AttributeValue')
  *Number() {
    yield i`eat(<Any> null [
      <Integer /-?\d/>
      <Infinity /[+-]I/>
    ])`;
  }

  @Node
  *UnsignedInteger() {
    yield i`eat(<Digits> 'digits[]')`;
  }

  @CoveredBy('Number')
  @Node
  *Integer() {
    yield i`eatMatch(<~*Punctuator '-'> 'negativeToken')`;
    yield i`eat(<Digits> 'digits[]')`;
  }

  *Digits() {
    while (yield i`eatMatch(<*Digit /\d/>)`);
  }

  @Node
  *Digit() {
    yield i`eat(/\d/)`;
  }

  @CoveredBy('Number')
  @Node
  *Infinity() {
    yield i`eatMatch(<~*Punctuator /[+-]/> 'signToken')`;
    yield i`eat(<~*Keyword 'Infinity'> 'sigilToken')`;
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
