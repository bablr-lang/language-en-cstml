import { re, spam as m } from '@bablr/boot';
import {
  Node,
  CoveredBy,
  InjectFrom,
  Attributes,
  UnboundAttributes,
  AllowEmpty,
} from '@bablr/helpers/decorators';
import { o } from '@bablr/agast-vm-helpers/embed';
import { e, eat, eatMatch, match, bindAttribute, fail } from '@bablr/helpers/grammar';
import { notNull } from '@bablr/agast-helpers/tree';
import { buildBoolean, buildNull, buildNullTag, buildString } from '@bablr/agast-vm-helpers';
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
  if (yield match(re`/[ \t\r\n]/`)) {
    return yield eat(m`#: <*Space:Space />`);
  }
  return null;
}

export const grammar = class CSTMLGrammar {
  *[Symbol.for('@bablr/fragment')]() {
    yield* eatMatchTrivia();
    yield eat(m`<? />`);
    yield* eatMatchTrivia();
  }

  *Stream() {
    while (yield eatMatch(m`.[]: <Tag />`));
  }

  *Expression() {
    yield eat(
      m`<Any />`,
      e([
        m`<NullTag 'null' />`,
        m`<ReferenceTag /\.|[a-zA-Z]/ />`,
        m`<LiteralTag /['"]/ />`,
        m`<DoctypeTag '<!' />`,
        m`<GapTag '<//>' />`,
        m`<Node '<' />`,
      ]),
    );
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
    yield eat(m`openToken: <*Punctuator '<!' balancedSpan='Tag' balanced='>' />`);
    yield eat(m`version$: <*UnsignedInteger />`);
    yield eat(m`versionSeparatorToken: <*Punctuator ':' />`);
    yield eat(m`doctypeToken$: <*Keyword 'cstml' />`);
    yield* eatMatchTrivia();
    yield eat(m`attributes[]$: <Attributes />`);
    yield eat(m`closeToken: <*Punctuator '>' balancer />`);
  }

  @Node
  @CoveredBy('Tag')
  @CoveredBy('Expression')
  *ReferenceTag() {
    let quot;
    if ((quot = yield match(re`/[.#@]/`))) {
      yield eat(m`name$: <*Punctuator ${quot} />`);
    } else {
      yield eat(m`name$: <*Identifier />`);
    }
    yield* eatMatchTrivia();
    if (yield eatMatch(m`openIndexToken: <*Punctuator '[' balanced=']' />`)) {
      yield* eatMatchTrivia();
      yield eatMatch(m`index: <UnsignedInteger />`);
      yield* eatMatchTrivia();
      yield eatMatch(m`closeIndexToken: <*Punctuator ']' balancer />`);
    }
    yield* eatMatchTrivia();
    yield eat(m`refFlags: <ReferenceFlags />`);
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
        yield eat(m`children[]$: <NodeChild />`, o({ token: buildBoolean(token) }));

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
      yield eat(m`children[]$: <FragmentChild />`, o({ token: buildBoolean(token) }));

      yield* eatMatchTrivia();
    }

    yield eat(m`close: <CloseFragmentTag />`);
  }

  *NodeChild({ value: props, ctx }) {
    const { token } = ctx.unbox(props || {});

    if (token && ctx.unbox(token)) {
      yield eat(m`<Any />`, e([m`<Node /\<\*?@/ />`, m`<LiteralTag /['"]/ />`]));
    } else {
      yield eat(
        m`<Any />`,
        e([m`<Node /\<\*?#/ />`, m`<Property /\.|[a-zA-Z]/ />`, m`<ShiftTag '^^^' />`]),
      );
    }
  }

  *FragmentChild({ value: props, ctx }) {
    const { token } = ctx.unbox(props || {});

    if (token && ctx.unbox(token)) {
      yield eat(m`<Any />`, e([m`<Node /\<\*?@/ />`, m`<LiteralTag /['"]/ />`]));
    } else {
      yield eat(m`<Any />`, e([m`<Node /\<\*?#/ />`, m`<Property /\.|[a-zA-Z]/ />`]));
    }
  }

  @Node
  @CoveredBy('NodeChild')
  @CoveredBy('FragmentChild')
  *Property() {
    yield eat(m`reference: <ReferenceTag />`);
    yield* eatMatchTrivia();
    yield eat(m`value: <PropertyValue />`);
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

    yield eat(m`openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />`);

    let flags = yield eat(m`flags: <NodeFlags />`);

    yield eat(m`<TagType />`);
    let sp = yield* eatMatchTrivia();

    if (sp && flags.get('tokenToken') && (yield match(re`/['"]/`))) {
      yield eat(m`intrinsicValue$: <String />`);
      sp = yield* eatMatchTrivia();
    } else {
      yield eat(m`intrinsicValue$: null`);
    }

    yield eat(m`attributes[]$: <Attributes />`);

    let sc = yield eatMatch(m`selfClosingTagToken: <*Punctuator '/' />`);

    const balanced = !sc && (s.path.depth > 1 || outerSpan !== 'Bare');

    yield bindAttribute('balanced', buildBoolean(balanced));
    yield bindAttribute('balancedSpan', balanced ? buildString('NodeChildren') : buildNull());

    yield eat(m`closeToken: <*Punctuator '>' balancer />`);
  }

  @Attributes({ balanced: true, balancedSpan: 'FragmentChildren' })
  @Node
  @CoveredBy('Tag')
  @CoveredBy('OpenTag')
  *OpenFragmentTag() {
    yield eat(m`openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />`);

    yield eat(m`flags: <NodeFlags />`);

    yield eat(m`closeToken: <*Punctuator '>' balancer />`);
  }

  @AllowEmpty
  *Attributes() {
    yield eat(m`.[]$: []`);

    let sp = true;

    while (sp && (yield match(re`/!?[a-zA-Z]|\g/`))) {
      yield eat(m`.[]$: <Attribute />`);
      sp = yield* eatMatchTrivia();
    }
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
    yield eat(m`openToken: <*Punctuator '</' balanced='>' />`);
    yield eat(m`<TagType />`);
    yield eat(m`closeToken: <*Punctuator '>' balancer />`);
  }

  @Attributes({ balancer: true })
  @Node
  @CoveredBy('Tag')
  @CoveredBy('CloseTag')
  *CloseFragmentTag() {
    yield eat(m`openToken: <*Punctuator '</' balanced='>' />`);
    yield eat(m`closeToken: <*Punctuator '>' balancer />`);
  }

  *Attribute() {
    if (yield match(re`/([a-zA-Z][a-zA-Z_-]*|\g)\s*=/`)) {
      yield eat(m`<MappingAttribute />`);
    } else {
      yield eat(m`<BooleanAttribute />`);
    }
  }

  @UnboundAttributes(['true'])
  @Node
  @CoveredBy('Attribute')
  *BooleanAttribute() {
    if (yield eatMatch(m`negateToken: <*Punctuator '!' />`)) {
      yield bindAttribute('true', false);
    } else {
      yield bindAttribute('true', true);
    }
    yield eat(m`key$: <*Identifier />`);
  }

  @Node
  @CoveredBy('Attribute')
  *MappingAttribute() {
    yield eat(m`key$: <*Identifier />`);
    yield* eatMatchTrivia();
    yield eat(m`sigilToken: <*Punctuator '=' />`);
    yield* eatMatchTrivia();
    yield eat(m`value$: <AttributeValue />`);
  }

  *AttributeValue() {
    yield eat(
      m`<Any />`,
      e([m`<String /['"]/ />`, m`<Number /[\d+-]/ />`, m`<Boolean /true|false/ />`]),
    );
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
    yield eat(m`<Any />`, e([m`<String /['"]/ />`, m`<IdentifierPath /[a-zA-Z]/ />`]));
  }

  @CoveredBy('Language')
  @Node
  *IdentifierPath() {
    yield eat(m`segments[]$: <*Identifier />`);
    while (yield match('.')) {
      yield eat(m`separators[]: <*Punctuator '.' />`);
      yield eat(m`segments[]$: <*Identifier />`);
    }
  }

  @CoveredBy('AttributeValue')
  @CoveredBy('Language')
  @Node
  *String({ ctx }) {
    let q = yield match(re`/['"]/`);

    if (!q) yield fail();

    const q_ = ctx.sourceTextFor(q);

    yield q_ === "'"
      ? eat(m`openToken: <*Punctuator "'" balanced="'" balancedSpan='String:Single' />`)
      : eat(m`openToken: <*Punctuator '"' balanced='"' balancedSpan='String:Double' />`);

    yield eat(m`content: <*StringContent />`);

    yield q_ === "'"
      ? eat(m`closeToken: <*Punctuator "'" balancer />`)
      : eat(m`closeToken: <*Punctuator '"' balancer />`);
  }

  @AllowEmpty
  @Node
  *StringContent({ state: { span } }) {
    let esc, lit;
    do {
      esc = (yield match('\\')) && (yield eat(m`@: <EscapeSequence />`));
      lit =
        span === 'String:Single'
          ? yield eatMatch(re`/[^\r\n\\'\g]+/`)
          : yield eatMatch(re`/[^\r\n\\"\g]+/`);
    } while (esc || lit);
  }

  @Node
  *EscapeSequence({ state: { span }, ctx }) {
    if (!span.startsWith('String')) {
      yield fail();
    }

    yield eat(m`escapeToken: <*Punctuator '\\' openSpan='Escape' />`);

    let match;

    if (
      (match =
        span === 'String:Single' ? yield match(re`/[\\/nrt0']/`) : yield match(re`/[\\/nrt0"]/`))
    ) {
      const match_ = ctx.sourceTextFor(match);
      yield eat(m`code: <*Keyword ${buildString(match_)} closeSpan='Escape' />`);
    } else if (yield match('u')) {
      yield eat(m`code: <EscapeCode closeSpan='Escape' />`);
    } else {
      yield fail();
    }
  }

  @Node
  *EscapeCode() {
    if (yield eatMatch(m`typeToken: <*Keyword 'u' />`)) {
      if (yield eatMatch(m`openToken: <*Punctuator '{' balanced='}' />`)) {
        yield eat(m`value$: <*UnsignedInteger />`);
        yield eat(m`closeToken: <*Punctuator '}' balancer />`);
      } else {
        yield eat(m`value$: <*UnsignedInteger /\d{4}/ />`);
        yield eat(m`closeToken: null`);
      }
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
    yield eat(m`value: <String />`);
  }

  @CoveredBy('AttributeValue')
  *Number() {
    yield eat(m`<Any />`, e([m`<Integer /-?\d/ />`, m`<Infinity /[+-]I/ />`]));
  }

  @Node
  *UnsignedInteger() {
    yield eat(re`/\d+/`);
  }

  @CoveredBy('Number')
  @Node
  *Integer() {
    yield eatMatch(m`signToken: <*Punctuator '-' />`);
    yield eat(m`value: <*UnsignedInteger />`);
  }

  @CoveredBy('AttributeValue')
  @Node
  *Boolean() {
    yield eatMatch(m`sigilToken: <*Keyword /true|false/ />`);
  }

  @CoveredBy('Number')
  @Node
  *Infinity() {
    yield eatMatch(m`signToken: <*Punctuator /[+-]/ />`);
    yield eat(m`sigilToken: <*Keyword 'Infinity' />`);
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
