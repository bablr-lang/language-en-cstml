import { i } from '@bablr/boot/shorthand.macro';
import {
  Node,
  CoveredBy,
  InjectFrom,
  Attributes,
  UnboundAttributes,
  AllowEmpty,
} from '@bablr/helpers/decorators';
import { notNull } from '@bablr/agast-helpers/tree';
import { buildBoolean, buildNullTag, buildString } from '@bablr/agast-vm-helpers';
import * as productions from '@bablr/helpers/productions';
import * as Space from '@bablr/language-en-blank-space';

export const canonicalURL = 'https://bablr.org/languages/core/en/cstml';

export const dependencies = { Space };

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
  if (yield i`match(/[ \t\r\n]/)`) {
    return yield i`eat(<#*Space:Space />)`;
  }
  return null;
}

export const grammar = class CSTMLGrammar {
  *[Symbol.for('@bablr/fragment')]() {
    yield* eatMatchTrivia();
    yield i`eat(< />)`;
    yield* eatMatchTrivia();
  }

  *Stream() {
    yield i`eat(<DoctypeTag '<!' /> '.[]')`;
    while (
      yield i`eatMatch(<Any /> '.[]' [
      <NullTag 'null' />
      <ArrayTag '[]' />
      <ReferenceTag /\.|[a-zA-Z]/ />
      <LiteralTag /['"]/ />
      <DoctypeTag '<!' />
      <GapTag '<//>' />
      <ShiftTag '^^^' />
      <CloseTag '</' />
      <OpenTag '<' />
    ])`
    );
  }

  *Expression() {
    yield i`eat(<Any /> null [
      <NullTag 'null' />
      <ReferenceTag /\.|[a-zA-Z]/ />
      <LiteralTag /['"]/ />
      <DoctypeTag '<!' />
      <GapTag '<//>' />
      <Node '<' />
    ])`;
  }

  *Tag() {
    yield i`eat(<Any /> null [
      <NullTag 'null' />
      <ArrayTag '[]' />
      <ReferenceTag /\.|[a-zA-Z]/ />
      <LiteralTag /['"]/ />
      <DoctypeTag '<!' />
      <GapTag '<//>' />
      <ShiftTag '^^^' />
      <OpenFragmentTag /\<#?\*?@?\+?\$?\>/ />
      <OpenNodeTag '<' />
    ])`;
  }

  @Node
  *Document() {
    yield i`eat(<DoctypeTag /> 'doctype$')`;
    yield* eatMatchTrivia();
    yield i`eat(<Fragment /> 'tree$')`;
  }

  @CoveredBy('Tag')
  @CoveredBy('Expression')
  @Node
  *DoctypeTag() {
    yield i`eat(<*Punctuator '<!' balancedSpan='Tag' balanced='>' /> 'openToken')`;
    yield i`eat(<*UnsignedInteger /> 'version$')`;
    yield i`eat(<*Punctuator ':' /> 'versionSeparatorToken')`;
    yield i`eat(<*Keyword 'cstml' /> 'doctypeToken$')`;
    yield* eatMatchTrivia();
    yield i`eat(<Attributes /> 'attributes[]$')`;
    yield i`eat(<*Punctuator '>' balancer /> 'closeToken')`;
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  *ReferenceTag() {
    if (yield i`match('.')`) {
      yield i`eat(<*Punctuator '.' /> 'name$')`;
    } else {
      yield i`eat(<*Identifier /> 'name$')`;
    }
    yield* eatMatchTrivia();
    yield i`eatMatch(<*Punctuator '[]' /> 'arrayOperatorToken')`;
    yield* eatMatchTrivia();
    yield i`eatMatch(<*Punctuator '$' /> 'hasGapToken')`;
    yield* eatMatchTrivia();
    yield i`eat(<*Punctuator ':' /> 'sigilToken')`;
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  @CoveredBy('PropertyValue')
  *GapTag() {
    yield i`eat(<*Punctuator '<//>' /> 'sigilToken')`;
  }

  @Node
  @CoveredBy('Tag')
  *ShiftTag() {
    yield i`eat(<*Punctuator '^^^' /> 'sigilToken')`;
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  @CoveredBy('PropertyValue')
  *NullTag() {
    yield i`eat(<*Keyword 'null' /> 'sigilToken')`;
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('PropertyValue')
  *ArrayTag() {
    yield i`eat(<*Punctuator '[]' /> 'sigilToken')`;
  }

  @Node
  @CoveredBy('PropertyValue')
  *Node() {
    let open = yield i`eat(<OpenNodeTag /> 'open')`;
    yield* eatMatchTrivia();

    // Problem: not handling gaps
    //   gaps have a non-nullish representation
    //

    const flags = open.get('flags');
    const selfClosingTagToken = open.get('selfClosingTagToken');
    const token = notNull(flags.get('tokenToken'));
    const selfClosing = notNull(selfClosingTagToken);

    yield i`eat([] 'children[]$')`;

    if (selfClosing) {
      yield i`eat(null 'close')`;
    } else {
      while ((yield i`match(/./)`) && !(yield i`match('</')`)) {
        yield i`eat(<NodeChild /> 'children[]$' { token: ${buildBoolean(token)} })`;

        yield* eatMatchTrivia();
      }

      yield i`eat(<CloseNodeTag /> 'close')`;
    }
  }

  @Node
  *Fragment() {
    let open = yield i`eat(<OpenFragmentTag /> 'open')`;
    yield* eatMatchTrivia();

    const flags = open.get('flags');
    const token = notNull(flags.get('tokenToken'));

    yield i`eat([] 'children[]$')`;

    while ((yield i`match(/./)`) && !(yield i`match('</')`)) {
      yield i`eat(<FragmentChild /> 'children[]$' { token: ${buildBoolean(token)} })`;

      yield* eatMatchTrivia();
    }

    yield i`eat(<CloseFragmentTag /> 'close')`;
  }

  *NodeChild({ value: props, ctx }) {
    const { token } = ctx.unbox(props || {});

    if (token && ctx.unbox(token)) {
      yield i`eat(<Any /> null [
        <Node /\<\*?@/ />
        <LiteralTag /['"]/ />
      ])`;
    } else {
      yield i`eat(<Any /> null [
          <Node /\<\*?#/ />
          <Property /\.|[a-zA-Z]/ />
          <ShiftTag '^^^' />
        ])`;
    }
  }

  *FragmentChild({ value: props, ctx }) {
    const { token } = ctx.unbox(props || {});

    if (token && ctx.unbox(token)) {
      yield i`eat(<Any /> null [
        <Node /\<\*?@/ />
        <LiteralTag /['"]/ />
      ])`;
    } else {
      yield i`eat(<Any /> null [
          <Node /\<\*?#/ />
          <Property /\.|[a-zA-Z]/ />
        ])`;
    }
  }

  @Node
  @CoveredBy('NodeChild')
  @CoveredBy('FragmentChild')
  *Property() {
    yield i`eat(<ReferenceTag /> 'reference$')`;
    yield* eatMatchTrivia();
    yield i`eat(<PropertyValue /> 'node$')`;
  }

  *PropertyValue() {
    yield i`eat(<Any /> null [
      <NullTag 'null' />
      <GapTag '<//>' />
      <ArrayTag '[]' />
      <Node /\<[^#@]/ />
    ])`;
  }

  @Node
  @AllowEmpty
  *Flags() {
    let tr = yield i`eatMatch(<*Punctuator '#' /> 'triviaToken')`;
    yield i`eatMatch(<*Punctuator '*' /> 'tokenToken')`;
    let esc = yield i`eatMatch(<*Punctuator '@' /> 'escapeToken')`;
    let exp = yield i`eatMatch(<*Punctuator '+' /> 'expressionToken')`;
    yield i`eatMatch(<*Punctuator '$' /> 'hasGapToken')`;

    if ((tr && esc) || (exp && (tr || esc))) yield i`fail()`;
  }

  *OpenTag({ s }) {
    if (s.span === 'NodeChildren' || s.span === 'FragmentChildren') {
      yield i`eat(<OpenNodeTag />)`;
    } else if (s.span === 'Bare' || s.span === 'Stream') {
      yield i`eat(<OpenFragmentTag />)`;
    } else {
      yield i`fail()`;
    }
  }

  @UnboundAttributes(['balanced', 'balancedSpan'])
  @Node
  @CoveredBy('Tag')
  @CoveredBy('OpenTag')
  *OpenNodeTag({ s }) {
    const outerSpan = s.span;

    yield i`eat(<*Punctuator '<' balancedSpan='Tag' balanced='>' /> 'openToken')`;

    let flags = yield i`eat(<Flags /> 'flags')`;

    yield i`eat(<TagType />)`;
    let sp = yield* eatMatchTrivia();

    if (sp && flags.get('tokenToken') && (yield i`match(/['"]/)`)) {
      yield i`eat(<String /> 'intrinsicValue$')`;
      sp = yield* eatMatchTrivia();
    } else {
      yield i`eat(null 'intrinsicValue$')`;
    }

    yield i`eat(<Attributes /> 'attributes[]$')`;

    let sc = yield i`eatMatch(<*Punctuator '/' /> 'selfClosingTagToken')`;

    const balanced = !sc && (s.path.depth > 1 || outerSpan !== 'Bare');

    yield i`bindAttribute('balanced' ${buildBoolean(balanced)})`;
    yield i`bindAttribute('balancedSpan' ${
      balanced ? buildString('NodeChildren') : buildNullTag()
    })`;

    yield i`eat(<*Punctuator '>' balancer /> 'closeToken')`;
  }

  @Attributes({ balanced: true, balancedSpan: 'FragmentChildren' })
  @Node
  @CoveredBy('Tag')
  @CoveredBy('OpenTag')
  *OpenFragmentTag() {
    yield i`eat(<*Punctuator '<' balancedSpan='Tag' balanced='>' /> 'openToken')`;

    yield i`eat(<Flags /> 'flags')`;

    yield i`eat(<*Punctuator '>' balancer /> 'closeToken')`;
  }

  @AllowEmpty
  *Attributes() {
    yield i`eat([] '.[]$')`;

    let sp = true;

    while (sp && (yield i`match(/!?[a-zA-Z]|\g/)`)) {
      yield i`eat(<Attribute /> '.[]$')`;
      sp = yield* eatMatchTrivia();
    }
  }

  *CloseTag({ s }) {
    if (s.span === 'NodeChildren') {
      yield i`eat(<CloseNodeTag />)`;
    } else if (s.span === 'FragmentChildren') {
      yield i`eat(<CloseFragmentTag />)`;
    } else {
      yield i`fail()`;
    }
  }

  @Attributes({ balancer: true })
  @Node
  @CoveredBy('Tag')
  @CoveredBy('CloseTag')
  *CloseNodeTag() {
    yield i`eat(<*Punctuator '</' balanced='>' /> 'openToken')`;
    yield i`eat(<TagType />)`;
    yield i`eat(<*Punctuator '>' balancer /> 'closeToken')`;
  }

  @Attributes({ balancer: true })
  @Node
  @CoveredBy('Tag')
  @CoveredBy('CloseTag')
  *CloseFragmentTag() {
    yield i`eat(<*Punctuator '</' balanced='>' /> 'openToken')`;
    yield i`eat(<*Punctuator '>' balancer /> 'closeToken')`;
  }

  *Attribute() {
    if (yield i`match(/([a-zA-Z][a-zA-Z_-]*|\g)\s*=/)`) {
      yield i`eat(<MappingAttribute />)`;
    } else {
      yield i`eat(<BooleanAttribute />)`;
    }
  }

  @UnboundAttributes(['true'])
  @Node
  @CoveredBy('Attribute')
  *BooleanAttribute() {
    if (yield i`eatMatch(<*Punctuator '!' /> 'negateToken')`) {
      yield i`bindAttribute('true' false)`;
    } else {
      yield i`bindAttribute('true' true)`;
    }
    yield i`eat(<*Identifier /> 'key$')`;
  }

  @Node
  @CoveredBy('Attribute')
  *MappingAttribute() {
    yield i`eat(<*Identifier /> 'key$')`;
    yield* eatMatchTrivia();
    yield i`eat(<*Punctuator '=' /> 'sigilToken')`;
    yield* eatMatchTrivia();
    yield i`eat(<AttributeValue /> 'value$')`;
  }

  *AttributeValue() {
    yield i`eat(<Any /> null [
        <String /['"]/ />
        <Number /[\d+-]/ />
        <Boolean /true|false/ />
      ])`;
  }

  @AllowEmpty
  *TagType() {
    if (yield i`match(/['"]|([a-zA-Z.]+|\g):/)`) {
      yield i`eat(<Language /> 'language$')`;
      yield i`eat(<*Punctuator ':' /> 'namespaceSeparatorToken')`;
      yield i`eat(<*Identifier /> 'type$')`;
    } else if (yield i`match(/[a-zA-Z]/)`) {
      yield i`eat(null 'language$')`;
      yield i`eat(<*Identifier /> 'type$')`;
    } else {
      yield i`eat(null 'language$')`;
      yield i`eat(null 'type$')`;
    }
  }

  *Language() {
    yield i`eat(<Any /> null [
      <String /['"]/ />
      <IdentifierPath /[a-zA-Z]/ />
    ])`;
  }

  @CoveredBy('Language')
  @Node
  *IdentifierPath() {
    yield i`eat(<*Identifier /> 'segments[]$')`;
    while (yield i`match('.')`) {
      yield i`eat(<*Punctuator '.' /> 'separators[]')`;
      yield i`eat(<*Identifier /> 'segments[]$')`;
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
      ? i`eat(<*Punctuator "'" balanced="'" balancedSpan='String:Single' /> 'openToken')`
      : i`eat(<*Punctuator '"' balanced='"' balancedSpan='String:Double' /> 'openToken')`;

    yield i`eat(<*StringContent /> 'content')`;

    yield q_ === "'"
      ? i`eat(<*Punctuator "'" balancer /> 'closeToken')`
      : i`eat(<*Punctuator '"' balancer /> 'closeToken')`;
  }

  @AllowEmpty
  @Node
  *StringContent({ state: { span } }) {
    let esc, lit;
    do {
      esc = (yield i`match('\\')`) && (yield i`eat(<@EscapeSequence />)`);
      lit =
        span === 'String:Single'
          ? yield i`eatMatch(/[^\r\n\\'\g]+/)`
          : yield i`eatMatch(/[^\r\n\\"\g]+/)`;
    } while (esc || lit);
  }

  @Node
  *EscapeSequence({ state: { span }, ctx }) {
    if (!span.startsWith('String')) {
      yield i`fail()`;
    }

    yield i`eat(<*Punctuator '\\' openSpan='Escape' /> 'escapeToken')`;

    let match;

    if (
      (match =
        span === 'String:Single' ? yield i`match(/[\\/nrt0']/)` : yield i`match(/[\\/nrt0"]/)`)
    ) {
      const match_ = ctx.sourceTextFor(match);
      yield i`eat(<*Keyword ${buildString(match_)} closeSpan='Escape' /> 'code')`;
    } else if (yield i`match('u')`) {
      yield i`eat(<EscapeCode closeSpan='Escape' /> 'code')`;
    } else {
      yield i`fail()`;
    }
  }

  @Node
  *EscapeCode() {
    if (yield i`eatMatch(<*Keyword 'u' /> 'typeToken')`) {
      if (yield i`eatMatch(<*Punctuator '{' balanced='}' /> 'openToken')`) {
        yield i`eat(<*UnsignedInteger /> 'value$')`;
        yield i`eat(<*Punctuator '}' balancer /> 'closeToken')`;
      } else {
        yield i`eat(<*UnsignedInteger /\d{4}/ /> 'value$')`;
        yield i`eat(null 'closeToken')`;
      }
    }
  }

  @Node
  *Identifier() {
    yield i`eat(/[a-zA-Z][a-zA-Z_-]*/)`;
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  @CoveredBy('NodeChild')
  @CoveredBy('FragmentChild')
  *LiteralTag() {
    yield i`eat(<String /> 'value')`;
  }

  @CoveredBy('AttributeValue')
  *Number() {
    yield i`eat(<Any /> null [
      <Integer /-?\d/ />
      <Infinity /[+-]I/ />
    ])`;
  }

  @Node
  *UnsignedInteger() {
    yield i`eat(/\d+/)`;
  }

  @CoveredBy('Number')
  @Node
  *Integer() {
    yield i`eatMatch(<*Punctuator '-' /> 'signToken')`;
    yield i`eat(<*UnsignedInteger /> 'value')`;
  }

  @CoveredBy('AttributeValue')
  @Node
  *Boolean() {
    yield i`eatMatch(<*Keyword /true|false/ /> 'sigilToken')`;
  }

  @CoveredBy('Number')
  @Node
  *Infinity() {
    yield i`eatMatch(<*Punctuator /[+-]/ /> 'signToken')`;
    yield i`eat(<*Keyword 'Infinity' /> 'sigilToken')`;
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
