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
      (<Fragment> '<>')
      (<Node> '<')
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
    yield i`eat(<UnsignedInteger> 'version')`;
    yield i`eat(<*Punctuator ':'> 'versionSeparator')`;
    yield i`eat(<*Keyword 'cstml'> 'doctype')`;
    let sp = yield* eatMatchTrivia();

    while (sp && (yield i`match(/!?\w/)`)) {
      yield i`eat(<Attribute> 'attributes[]')`;
      sp = yield* eatMatchTrivia();
    }

    yield i`eat(<*Punctuator '>' balancer> 'close')`;
  }

  @Node
  *Fragment() {
    yield i`eat(<OpenFragmentTag> 'open')`;
    yield* eatMatchTrivia();

    while (!(yield i`match('</')`)) {
      yield i`eat(<Node> 'children[]')`;
      yield* eatMatchTrivia();
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
  *Node({ ctx }) {
    let open = yield i`eat(<OpenNodeTag> 'open')`;
    yield* eatMatchTrivia();

    const token = ctx.getProperty(open, 'tokenFlag');
    const intrinsic = !!ctx.getProperty(open, 'intrinsicValue');

    if (intrinsic) {
      yield i`eat(null 'children[]')`;
      yield i`eat(null 'close')`;
    } else {
      if (token) {
        if (yield i`eatMatch(<NodeChild> 'children[]' { token: true })`) {
          yield* eatMatchTrivia();
        }
      } else {
        while (!(yield i`match('</')`)) {
          yield i`eat(<NodeChild> 'children[]')`;
          yield* eatMatchTrivia();
        }
      }
      if (!intrinsic) {
        yield i`eat(<CloseNodeTag> 'close')`;
      } else {
        yield i`eat(null 'close')`;
      }
    }
  }

  *NodeChild({ props, ctx }) {
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

  @AllowEmpty
  *Flags() {
    let tr = yield i`eatMatch(<*Punctuator '#'> 'triviaFlag')`;
    yield i`eatMatch(<*Punctuator '*'> 'tokenFlag')`;
    let esc = yield i`eatMatch(<*Punctuator '@'> 'escapeFlag')`;
    let exp = yield i`eatMatch(<*Punctuator '+'> 'expressionFlag')`;

    if ((tr && esc) || (exp && (tr || esc))) yield i`fail()`;
  }

  @Node
  @CoveredBy('Expression')
  *OpenNodeTag() {
    yield i`eat(<*Punctuator '<' balancedSpan='Tag' balanced='>'> 'open')`;

    yield i`eat(<Flags>)`;

    yield i`eat(<TagType>)`;
    let sp = yield* eatMatchTrivia();

    let iv;
    if (sp && (yield i`match(/['"]/)`)) {
      iv = yield i`eat(<String> 'intrinsicValue')`;
      sp = yield* eatMatchTrivia();
    }

    while (sp && (yield i`match(/!?\w/)`)) {
      yield i`eat(<Attribute> 'attributes[]')`;
      sp = yield* eatMatchTrivia();
    }

    if (iv) {
      yield i`eat(<*Punctuator '/'> 'selfClosingToken')`;
    } else {
      yield i`eat(null 'selfClosingToken')`;
    }
    yield i`eat(<*Punctuator '>' balancer> 'close')`;
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
        (<Number> /[\d+-]/)
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
  *String({ ctx }) {
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

  *Number() {
    yield i`eat(<Match> null [
      (<Integer> /-?\d/)
      (<Infinity> /[+-]I/)
    ])`;
  }

  @Node
  *UnsignedInteger() {
    yield i`eat(<Digits> 'digits[]')`;
  }

  @CoveredBy('Number')
  @Node
  *Integer() {
    yield i`eatMatch(<*Punctuator '-'> 'negative')`;
    yield i`eat(<Digits> 'digits[]')`;
  }

  *Digits() {
    while (yield i`eatMatch(<*Digit>)`);
  }

  @Node
  *Digit() {
    yield i`eat(/\d/)`;
  }

  @CoveredBy('Number')
  @Node
  *Infinity() {
    yield i`eatMatch(<*Punctuator /[+-]/> 'sign')`;
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
