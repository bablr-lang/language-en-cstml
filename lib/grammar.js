import objectEntries from 'iter-tools-es/methods/object-entries';
import { i, spam } from '@bablr/boot/shorthand.macro';
import { Node, CoveredBy, InjectFrom } from '@bablr/helpers/decorators';
import { triviaEnhancer } from '@bablr/helpers/trivia';
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

const arrayLast = (arr) => arr[arr.length - 1];

export const grammar = triviaEnhancer(
  {
    triviaIsAllowed: (s) => ['Bare', 'Tag'].includes(s.span),
    *eatMatchTrivia() {
      if (yield i`match(/[ \t\n]|\/\*|\/\//)`) {
        yield i`eatMatch(<Comment:Trivia>)`;
      }
    },
  },
  class CSTMLGrammar {
    *Stream() {
      let openTags = [];
      let result;
      while (
        (result =
          arrayLast(openTags) === 'OpenFragmentTag'
            ? yield i`eatMatch(<Token> null { isFragment: true })`
            : yield i`eatMatch(<Token>)`)
      ) {
        switch (result[0].type) {
          case 'OpenFragmentTag':
          case 'OpenNodeTag': {
            openTags.push(result.type);
            break;
          }

          case 'CloseFragmentTag':
          case 'CloseNodeTag': {
            openTags.pop();
            break;
          }
        }
      }
    }

    *Token(props, s, ctx) {
      const { inFragment } = ctx.unbox(props);

      if (!inFragment) throw new Error('Token.props.inFragment is required');

      const closeTag = ctx.unbox(inFragment) ? spam`<CloseFragmentTag>` : spam`<CloseNodeTag>`;

      yield i`eat(<Match> null [
        (<Gap> '<//>')
        (<Null> 'null')
        (<Reference> /\w/)
        (<Literal> /['"]/)
        (${closeTag} '</')
        (<OpenFragmentTag> /<[#@*]*>/)
        (<DoctypeTag> '<!')
        (<OpenNodeTag> '<')
      ])`;
    }

    *Document() {
      yield i`eat(<DoctypeTag>)`;
      yield i`eat(<Match> null [
        (<Fragment> /<[#@*]*>/)
        (<Node> '<')
      ])`;
    }

    @CoveredBy('Token')
    @Node
    *DoctypeTag() {
      yield i`eat(<*Punctuator '<!' balanced='>'> 'open')`;
      yield i`eat(<*Keyword 'cstml'> 'doctype')`;
      yield i`eat(<String> 'language')`;
      while (yield i`eatMatch(<Attribute> 'attributes[]')`);
      yield i`eat(<*Punctuator '>' balancer> 'close')`;
    }

    @Node
    @CoveredBy('Tree')
    *Fragment() {
      yield i`eat(<OpenFragmentTag> 'open')`;
      if (yield i`match(/<[^!/]/)`) {
        yield i`eat(<Node> 'root')`;
      } else {
        yield i`eat(null 'root')`;
      }
      yield i`eat(<CloseFragmentTag> 'close')`;
    }

    @Node
    @CoveredBy('Token')
    *Reference() {
      yield i`eat(<*Identifier> 'name')`;
      yield i`eatMatch(<*Punctuator '[]'> 'arrayOperator')`;
    }

    @Node
    @CoveredBy('Token')
    @CoveredBy('PropertyValue')
    *Gap() {
      yield i`eat(<*Punctuator '<//>'> 'value')`;
    }

    @Node
    @CoveredBy('Token')
    @CoveredBy('PropertyValue')
    *Null() {
      yield i`eat(<*Keyword 'null'> 'value')`;
    }

    @Node
    @CoveredBy('PropertyValue')
    @CoveredBy('Tree')
    *Node() {
      let open = yield i`eat(<OpenNodeTag> 'open')`;
      if (open[0].value.flags.token) {
        yield i`eatMatch(<NodeChild> 'children[]' { token: true })`;
      } else {
        while (!(yield i`match('</')`)) yield i`eat(<NodeChild> 'children[]')`;
      }
      yield i`eat(<CloseNodeTag> 'close')`;
    }

    *NodeChild(props, s, ctx) {
      const { token } = ctx.unbox(props || {});

      if (token && ctx.unbox(token)) {
        yield i`eat(<Literal>)`;
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
      yield i`eat(<*Punctuator ':'> 'mapOperator')`;
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
    @CoveredBy('Token')
    *OpenFragmentTag() {
      yield i`eat(<*Punctuator '<' lexicalSpan='Tag' balanced='>'> 'open')`;
      yield i`eatMatch(<FragmentFlags> 'flags')`;
      yield i`eat(<*Punctuator '>' balancer> 'close')`;
    }

    @Node
    *FragmentFlags() {
      yield i`eatMatch(<*Punctuator '#'> 'comment')`;
    }

    @Node
    @CoveredBy('Token')
    *OpenNodeTag() {
      yield i`eat(<*Punctuator '<' lexicalSpan='Tag' balanced='>'> 'open')`;
      yield i`eatMatch(<NodeFlags> 'flags')`;
      yield i`eat(<TagType>)`;
      while (yield i`eatMatch(<Attribute> 'attributes[]')`);
      yield i`eat(<*Punctuator '>' balancer> 'close')`;
    }

    @Node
    *NodeFlags() {
      yield i`eatMatch(<*Punctuator '*'> 'token')`;
      let tr = yield i`eatMatch(<*Punctuator '#'> 'trivia')`;

      if (!tr) yield i`eatMatch(<*Punctuator '@'> 'escape')`;
    }

    @Node
    @CoveredBy('Token')
    *CloseNodeTag() {
      yield i`eat(<*Punctuator '</' balanced='>'> 'open')`;
      yield i`eatMatch(<TagType>)`;
      yield i`eat(<*Punctuator '>' balancer> 'close')`;
    }

    @Node
    @CoveredBy('Token')
    *CloseFragmentTag() {
      yield i`eat(<*Punctuator '</' balanced='>'> 'open')`;
      yield i`eat(<*Punctuator '>' balancer> 'close')`;
    }

    *Attribute() {
      if (yield i`match(/\w+\s*=/)`) {
        yield i`eat(<MappingAttribute>)`;
      } else {
        yield i`eat(<BooleanAttribute>)`;
      }
    }

    @Node
    @CoveredBy('Attribute')
    *BooleanAttribute() {
      yield i`eat(<*Identifier> 'key')`;
    }

    @Node
    @CoveredBy('Attribute')
    *MappingAttribute() {
      yield i`eat(<*Identifier> 'key')`;
      yield i`eat(<*Punctuator '='> 'mapOperator')`;
      yield i`eat(<AttributeValue> 'value')`;
    }

    *AttributeValue() {
      yield i`eat(<Match> null [
          (<String> /['"]/)
          (<Number> /-|\d/)
        ])`;
    }

    *TagType() {
      if (yield i`match(/[\w.]+:/)`) {
        yield i`eat(<LanguageReference> 'language')`;
        yield i`eat(<*Punctuator ':'> 'namespaceOperator')`;
        yield i`eat(<*Identifier> 'type')`;
      } else {
        yield i`eat(<*Identifier> 'type')`;
      }
    }

    *LanguageReference() {
      yield i`eat(<Match> null [
        (<String> /['"]/)
        (<IdentifierPath> /\w/)
      ])`;
    }

    @CoveredBy('LanguageReference')
    *IdentifierPath() {
      yield i`eat(<*Identifier> 'segments[]')`;
      while (yield i`match('.')`) {
        yield i`eat(<*Punctuator '.'> 'separators[]')`;
        yield i`eat(<*Identifier> 'segments[]')`;
      }
    }

    @CoveredBy('LanguageReference')
    @Node
    *String() {
      let q = yield i`match(/['"]/)`;

      if (!q) yield i`fail()`;

      yield q.value === "'"
        ? i`eat(<*Punctuator "'" balanced="'" lexicalSpan='String:Single'> 'open')`
        : i`eat(<*Punctuator '"' balanced='"' lexicalSpan='String:Double'> 'open')`;

      yield i`eatMatch(<*StringContent> 'content')`;

      yield q.value === "'"
        ? i`eat(<*Punctuator "'" balancer> 'close')`
        : i`eat(<*Punctuator '"' balancer> 'close')`;
    }

    @Node
    *StringContent(props, { span }) {
      let esc, lit;
      do {
        esc = (yield i`match('\\')`) && (yield i`eatMatch(<@EscapeSequence>)`);
        lit =
          span === 'String:Single'
            ? yield i`eatMatch(/[^\r\n\\']+/)`
            : yield i`eatMatch(/[^\r\n\\"]+/)`;
      } while (esc || lit);
    }

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
        yield i`eat(<*Keyword> ${match.value} 'value')`;
        cooked = escapables.get(match.value) || match.value;

        yield i`bindAttribute(cooked ${buildString(cooked)})`;
      } else if (yield i`match('u')`) {
        const codeNode = yield i`eat(<EscapeCode> 'value')`;
        cooked = parseInt(ctx.unbox(ctx.getProperty(codeNode, 'value')), 16);
      } else {
        yield i`fail()`;
      }

      yield i`bindAttribute(cooked ${buildString(cooked)})`;
    }

    @Node
    *EscapeCode() {
      if (yield i`eatMatch(<*Keyword 'u'> 'type')`) {
        if (yield i`eatMatch(<*Punctuator '{'> 'open')`) {
          yield i`eatMatch(<Digits> 'value')`;
          yield i`eatMatch(<*Punctuator '}'> 'close')`;
        } else if (yield i`match(/\d{4}/)`) {
          yield i`eatMatch(null 'open')`;
          yield i`eat(<Digits> 'value')`;
          yield i`eatMatch(null 'close')`;
        }
      }
    }

    @Node
    *Identifier() {
      yield i`eat(/\w+/)`;
    }

    @Node
    @CoveredBy('Token')
    @CoveredBy('NodeChild')
    *Literal() {
      yield i`eat(<String> 'value')`;
    }

    @Node
    *Integer() {
      yield i`eatMatch(<*Punctuator '-'> 'negative')`;
      yield i`eat(<Digits> 'digits[]')`;
    }

    *Digits() {
      while (yield i`eatMatch(<Digit>)`);
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
  },
);
