import { i, spam } from '@bablr/boot/shorthand.macro';
import { Node, CoveredBy, InjectFrom } from '@bablr/helpers/decorators';
import { triviaEnhancer } from '@bablr/helpers/trivia';
import * as productions from '@bablr/helpers/productions';
import objectEntries from 'iter-tools-es/methods/object-entries';

export const name = 'CSTML';

const escapables = new Map(
  objectEntries({
    n: '\n',
    r: '\r',
    t: '\t',
    0: '\0',
  }),
);

const arrayLast = (arr) => arr[arr.length - 1];

export const cookEscape = (escape, span) => {
  let hexMatch;

  if (!span.startsWith('String')) {
    throw new Error('invalid span');
  }

  if (!escape.startsWith('\\')) {
    throw new Error('string escape must start with \\');
  }

  if ((hexMatch = /\\u([0-9a-f]{4})/iy.exec(escape))) {
    //continue
  } else if ((hexMatch = /\\u{([0-9a-f]+)}/iy.exec(escape))) {
    //continue
  }

  if (hexMatch) {
    return parseInt(hexMatch[1], 16);
  }

  let pattern;

  switch (span) {
    case 'String:Single':
      pattern = /\\([\\nrt0'])/y;
      break;

    case 'String:Double':
      pattern = /\\([\\nrt0"])/y;
      break;

    default:
      throw new Error();
  }

  let litMatch = pattern.exec(escape);

  if (litMatch) {
    return escapables.get(litMatch[1]) || litMatch[1];
  }

  // Note: this differs from JS which allows them
  throw new Error('Redundant escapes are illegal in CSTML strings');
};

export const grammar = triviaEnhancer(
  {
    triviaIsAllowed: (s) => ['Bare', 'Tag'].includes(s.span),
    eatMatchTrivia: i`eatMatch(<Comment:Trivia>)`,
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
        (<Reference> /\w/)
        (<Literal> /['"]/)
        (${closeTag} '</')
        (<OpenFragmentTag> /<[#@*]*>/)
        (<OpenNodeTag> '<')
      ])`;
    }

    *Tree() {
      yield i`eat(<Match> null [
        (<Fragment> /<[#@*]*>/)
        (<Node> '<')
      ])`;
    }

    @Node
    @CoveredBy('Tree')
    *Fragment() {
      yield i`eat(<OpenFragmentTag> 'open')`;
      while (yield i`eatMatch(<FragmentChild> 'children[]')`);
      yield i`eat(<CloseFragmentTag> 'close')`;
    }

    *FragmentChild() {
      yield i`eat(<Match> null [
        (<Node> /<[#@]/)
        (<Property> /\w/)
      ])`;
    }

    @Node
    @CoveredBy('Token')
    *Reference() {
      yield i`eat(<Identifier> 'name')`;
      yield i`eatMatch(<*Punctuator '[]'> 'arrayOperator')`;
    }

    @Node
    @CoveredBy('Token')
    @CoveredBy('PropertyValue')
    *Gap() {
      yield i`eat(<*Punctuator '<//>'> 'value')`;
    }

    @Node
    @CoveredBy('PropertyValue')
    @CoveredBy('Tree')
    *Node() {
      let open = yield i`eat(<OpenNodeTag> 'open')`;
      if (open.properties.flags?.properties.token) {
        yield i`eatMatch(<NodeChild> 'children[]' { token: true })`;
      } else {
        while (yield i`eatMatch(<NodeChild> 'children[]')`);
      }
      yield i`eat(<CloseNodeTag> 'close')`;
    }

    *NodeChild(props, s, ctx) {
      const { token } = ctx.unbox(props) || {};

      if (token && ctx.unbox(token)) {
        yield i`eat(<Literal>)`;
      } else {
        yield i`eat(<Match> null [
          (<Node> /<[#@]/)
          (<Property> /\w/)
          (<Terminal> /[!#]?['"]/)
        ])`;
      }
    }

    @Node
    @CoveredBy('FragmentChild')
    @CoveredBy('NodeChild')
    *Property() {
      yield i`eat(<Reference> 'reference')`;
      yield i`eat(<*Punctuator ':'> 'mapOperator')`;
      yield i`eat(<PropertyValue> 'node')`;
    }

    *PropertyValue() {
      yield i`eat(<Match> null [
        (<Gap> 'null')
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
      yield i`eat(<TagType> 'type')`;
      while (yield i`eatMatch(<Attribute> 'attributes[]')`);
      yield i`eat(<*Punctuator '>' balancer> 'close')`;
    }

    @Node
    *NodeFlags() {
      let sf = yield i`eatMatch(<*Punctuator '*'> 'token')`;
      if (!sf) yield i`eatMatch(<*Punctuator '#'> 'trivia')`;

      yield i`eatMatch(<*Punctuator '@'> 'escape')`;
    }

    @Node
    @CoveredBy('Token')
    *CloseNodeTag() {
      yield i`eat(<*Punctuator '</'> 'open')`;
      yield i`eat(<TagType> 'type')`;
      yield i`eat(<*Punctuator '>'> 'close')`;
    }

    @Node
    @CoveredBy('Token')
    *CloseFragmentTag() {
      yield i`eat(<*Punctuator '</'> 'open')`;
      yield i`eat(<*Punctuator '>'> 'close')`;
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
      yield i`eat(<Identifier> 'key')`;
    }

    @Node
    @CoveredBy('Attribute')
    *MappingAttribute() {
      yield i`eat(<Identifier> 'key')`;
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
      if (yield i`match(/\w+:/)`) {
        yield i`eat(<GlobalIdentifier>)`;
      } else {
        yield i`eat(<Identifier> 'type')`;
      }
    }

    @Node
    @CoveredBy('TagType')
    *GlobalIdentifier() {
      yield i`eat(<Identifier> 'language')`;
      yield i`eat(<*Punctuator ':'> 'namespaceOperator')`;
      yield i`eat(<Identifier> 'type')`;
    }

    @Node
    @CoveredBy('TagType')
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
