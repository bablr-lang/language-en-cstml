import objectEntries from 'iter-tools-es/methods/object-entries';
import { i, cst } from '@bablr/boot/shorthand.macro';
import { Node, CoveredBy, InjectFrom, Attributes, AllowEmpty } from '@bablr/helpers/decorators';

import { buildString } from '@bablr/agast-vm-helpers';
import * as productions from '@bablr/helpers/productions';
import * as Comment from '@bablr/language-c-comments';

export const canonicalURL = 'https://github.com/bablr-lang/language-cstml';

export const dependencies = { Comment };

const escapables = new Map(
  objectEntries({
    n: '\n',
    r: '\r',
    t: '\t',
    0: '\0',
  }),
);

function* eatMatchTrivia() {
  if (yield i`match(/[ \t\n]|\/\*|\/\//)`) {
    return yield i`eat(<Comment:Trivia>)`;
  }
  return null;
}

export const grammar = class CSTMLGrammar {
  *[Symbol.for('@bablr/fragment')]() {
    yield* eatMatchTrivia();
    yield i`eat(<//>)`;
    yield* eatMatchTrivia();
  }

  *Stream() {
    while (yield i`eatMatch(<Expression>)`);
  }

  *Expression() {
    yield i`eat(<Match> null [
      (<Gap> '<//>')
      (<Null> 'null')
      (<Reference> /\w/)
      (<Literal> /['"]/)
      (<DoctypeTag> '<!')
      (<Tree> '<')
    ])`;
  }

  @Node
  *Document() {
    yield i`eat(<DoctypeTag> 'doctype')`;
    yield* eatMatchTrivia();
    yield i`eat(<Fragment> 'tree')`;
  }

  @CoveredBy('Expression')
  @Node
  *DoctypeTag() {
    yield i`eat(<*Punctuator '<!' balanced='>'> 'open')`;
    yield i`eat(<PositiveInteger> 'version')`;
    yield i`eat(<*Punctuator ':'> 'versionSeparator')`;
    yield i`eat(<*Keyword 'cstml'> 'doctype')`;
    let sp = yield* eatMatchTrivia();

    while (sp && (yield i`eatMatch(<Attribute> 'attributes[]')`)) {
      sp = yield* eatMatchTrivia();
    }

    yield i`eat(<*Punctuator '>' balancer> 'close')`;
  }

  @Node
  @CoveredBy('Tree')
  *Fragment() {
    yield i`eat(<OpenFragmentTag> 'open')`;
    yield* eatMatchTrivia();
    if (yield i`match(/\g|<[^!/]/)`) {
      yield i`eat(<Node> 'root')`;
      yield* eatMatchTrivia();
    } else {
      yield i`eat(null 'root')`;
    }
    yield i`eat(<CloseFragmentTag> 'close')`;
  }

  @Node
  @CoveredBy('Expression')
  *Reference() {
    yield i`eat(<*Identifier> 'name')`;
    yield* eatMatchTrivia();
    yield i`eatMatch(<*Punctuator '[]'> 'arrayOperator')`;
  }

  @Node
  @CoveredBy('Expression')
  @CoveredBy('PropertyValue')
  *Gap() {
    yield i`eat(<*Punctuator '<//>'> 'value')`;
  }

  @Node
  @CoveredBy('Expression')
  @CoveredBy('PropertyValue')
  *Null() {
    yield i`eat(<*Keyword 'null'> 'value')`;
  }

  @Node
  @CoveredBy('PropertyValue')
  @CoveredBy('Tree')
  *Node(props, s, ctx) {
    let open = yield i`eat(<OpenNodeTag> 'open')`;
    yield* eatMatchTrivia();
    const flags = ctx.getProperty(open, 'flags');
    if (flags && ctx.getProperty(flags, 'token')) {
      if (yield i`eatMatch(<NodeChild> 'children[]' { token: true })`) {
        yield* eatMatchTrivia();
      }
    } else {
      while (!(yield i`match('</')`)) {
        yield i`eat(<NodeChild> 'children[]')`;
        yield* eatMatchTrivia();
      }
    }
    yield i`eat(<CloseNodeTag> 'close')`;
  }

  *NodeChild(props, s, ctx) {
    const { token } = ctx.unbox(props || {});

    if (token && ctx.unbox(token)) {
      yield i`eat(<Match> null [
        (<Node> /<\*?@/)
        (<Literal> /['"]/)
      ])`;
    } else {
      yield i`eat(<Match> null [
        (<Node> /<\*?#/)
        (<Property> /\w/)
        (<Literal> /['"]/)
      ])`;
    }
  }

  @Node
  @CoveredBy('NodeChild')
  *Property() {
    yield i`eat(<Reference> 'reference')`;
    yield* eatMatchTrivia();
    yield i`eat(<*Punctuator ':'> 'mapOperator')`;
    yield* eatMatchTrivia();
    yield i`eat(<PropertyValue> 'node')`;
  }

  *PropertyValue() {
    yield i`eat(<Match> null [
      (<Null> 'null')
      (<Gap> '<//>')
      (<Node> /<[^#@]/)
    ])`;
  }

  @Node
  @CoveredBy('Expression')
  *OpenFragmentTag() {
    yield i`eat(<*Punctuator '<' balancedSpan='Tag' balanced='>'> 'open')`;
    yield i`eat(<*Punctuator '>' balancer> 'close')`;
  }

  @Node
  @CoveredBy('Expression')
  *OpenNodeTag() {
    yield i`eat(<*Punctuator '<' balancedSpan='Tag' balanced='>'> 'open')`;
    if (yield i`match(/[@#*]/)`) yield i`eatMatch(<Flags> 'flags')`;
    yield i`eat(<TagType>)`;
    let sp = yield* eatMatchTrivia();

    while (sp && (yield i`eatMatch(<Attribute> 'attributes[]')`)) {
      sp = yield* eatMatchTrivia();
    }

    yield i`eat(<*Punctuator '>' balancer> 'close')`;
  }

  @Node
  *Flags() {
    let tr = yield i`eatMatch(<*Punctuator '#'> 'trivia')`;
    yield i`eatMatch(<*Punctuator '*'> 'token')`;

    if (!tr) yield i`eatMatch(<*Punctuator '@'> 'escape')`;
  }

  @Node
  @CoveredBy('Expression')
  *CloseNodeTag() {
    yield i`eat(<*Punctuator '</' balanced='>'> 'open')`;
    yield i`eatMatch(<TagType>)`;
    yield i`eat(<*Punctuator '>' balancer> 'close')`;
  }

  @Node
  @CoveredBy('Expression')
  *CloseFragmentTag() {
    yield i`eat(<*Punctuator '</' balanced='>'> 'open')`;
    yield i`eat(<*Punctuator '>' balancer> 'close')`;
  }

  *Attribute() {
    if (yield i`match(/\w[\w-_]*\s*=/)`) {
      yield i`eat(<MappingAttribute>)`;
    } else {
      yield i`eat(<BooleanAttribute>)`;
    }
  }

  @Attributes(['true'])
  @Node
  @CoveredBy('Attribute')
  *BooleanAttribute() {
    if (yield i`eatMatch(<*Punctuator '!'> 'negated')`) {
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
    yield i`eat(<*Punctuator '='> 'mapOperator')`;
    yield* eatMatchTrivia();
    yield i`eat(<AttributeValue> 'value')`;
  }

  *AttributeValue() {
    yield i`eat(<Match> null [
        (<String> /['"]/)
        (<Number> /-|\d/)
      ])`;
  }

  *TagType() {
    if (yield i`match(/['"]|[\w.]+:/)`) {
      yield i`eat(<Language> 'language')`;
      yield i`eat(<*Punctuator ':'> 'namespaceOperator')`;
      yield i`eat(<*Identifier> 'type')`;
    } else {
      yield i`eat(<*Identifier> 'type')`;
    }
  }

  *Language() {
    yield i`eat(<Match> null [
      (<String> /['"]/)
      (<IdentifierPath> /\w/)
    ])`;
  }

  @CoveredBy('Language')
  @Node
  *IdentifierPath() {
    yield i`eat(<*Identifier> 'segments[]')`;
    while (yield i`match('.')`) {
      yield i`eat(<*Punctuator '.'> 'separators[]')`;
      yield i`eat(<*Identifier> 'segments[]')`;
    }
  }

  @CoveredBy('Language')
  @Node
  *String(props, s, ctx) {
    let q = yield i`match(/['"]/)`;

    if (!q) yield i`fail()`;

    const q_ = ctx.unbox(q);

    yield q_.value === "'"
      ? i`eat(<*Punctuator "'" balanced="'" balancedSpan='String:Single'> 'open')`
      : i`eat(<*Punctuator '"' balanced='"' balancedSpan='String:Double'> 'open')`;

    yield i`eat(<*StringContent> 'content')`;

    yield q_.value === "'"
      ? i`eat(<*Punctuator "'" balancer> 'close')`
      : i`eat(<*Punctuator '"' balancer> 'close')`;
  }

  @AllowEmpty
  @Node
  *StringContent(props, { span }) {
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
  *EscapeSequence(props, { span }, ctx) {
    if (!span.startsWith('String')) {
      yield i`fail()`;
    }

    yield i`eat(<*Punctuator '\\'> 'escape')`;

    let match, cooked;

    if (
      (match =
        span === 'String:Single' ? yield i`match(/[\\/nrt0']/)` : yield i`match(/[\\/nrt0"]/)`)
    ) {
      const match_ = ctx.unbox(match);
      yield i`eat(<*Keyword ${buildString(match_.value)}> 'value')`;
      cooked = escapables.get(match_.value) || match_.value;
    } else if (yield i`match('u')`) {
      const codeNode = yield i`eat(<EscapeCode> 'value')`;
      cooked = parseInt(
        ctx
          .getProperty(codeNode, 'digits')
          .map((digit) => ctx.getCooked(digit))
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
    if (yield i`eatMatch(<*Keyword 'u'> 'type')`) {
      if (yield i`eatMatch(<*Punctuator '{'> 'open')`) {
        yield i`eat(<Digits> 'digits[]')`;
        yield i`eatMatch(<*Punctuator '}'> 'close')`;
      } else if (yield i`match(/\d{4}/)`) {
        yield i`eat(<Digits> 'digits[]')`;
        yield i`eatMatch(null 'close')`;
      }
    }
  }

  @Node
  *Identifier() {
    yield i`eat(/\w[\w-_]*/)`;
  }

  @Node
  @CoveredBy('Expression')
  @CoveredBy('NodeChild')
  *Literal() {
    yield i`eat(<String> 'value')`;
  }

  @Node
  *PositiveInteger() {
    yield i`eat(<Digits> 'digits[]')`;
  }

  @Node
  *Integer() {
    yield i`eatMatch(<*Punctuator '-'> 'negative')`;
    yield i`eat(<Digits> 'digits[]')`;
  }

  *Digits(props, s) {
    const path = s.path.startTag ? i.Expression`null` : cst.String`'digits[]'`;
    while (yield i`eatMatch(<*Digit> ${path})`);
  }

  @Node
  *Digit() {
    yield i`eat(/\d/)`;
  }

  @Node
  *Infinity() {
    yield i`eatMatch(<*Punctuator '-'> 'negative')`;
    yield i`eat(<*Keyword 'Infinity'> 'value')`;
  }

  @Node
  @InjectFrom(productions)
  *Punctuator() {}

  @Node
  @InjectFrom(productions)
  *Keyword() {}

  @InjectFrom(productions)
  *Match() {}
};
