import { i } from '@bablr/boot/shorthand.macro';
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
    eatMatchTrivia: i`eatMatch#(/\s+/)`,
  },
  class CSTMLGrammar {
    *Fragment() {
      yield i`eat(<OpenFragmentTag> 'open')`;
      while (yield i`eatMatch(<FragmentChild> 'children[]')`);
      yield i`eat(<CloseFragmentTag> 'close')`;
    }

    *FragmentChild() {
      yield i`eat(<Match> null [
        (<Trivia> /#['"]/)
        (<Property> /\w/)
      ])`;
    }

    @Node
    @CoveredBy('PropertyValue')
    *Node() {
      if (yield i`match('<>')`) yield i`fail()`;

      yield i`eat(<OpenNodeTag> 'open')`;
      yield i`eat(<NodeChildren>)`;
      yield i`eat(<CloseNodeTag> 'close')`;
    }

    *NodeChildren() {
      let properties = 0;
      let child;

      while ((child = yield i`eatMatch(<NodeChild> 'children[]')`)) {
        if (child.type === 'Property') {
          properties++;
        }
      }

      if (!properties) yield i`fail()`;
    }

    *NodeChild(props, s) {
      if (s.span === 'Terminal') {
        yield i`eat(<Match> null [
          (<Trivia> /#['"]/)
          (<Terminal> /[!#]?['"]/)
        ])`;
      } else {
        yield i`eat(<Match> null [
          (<Trivia> /#['"]/)
          (<Property> /\w/)
        ])`;
      }
    }

    @Node
    *Reference() {
      yield i`eat(<| Identifier |> 'path')`;
      yield i`eatMatch(<| Punctuator '[]' |> 'pathIsArray')`;
      yield i`eat(<| Punctuator ':' |> 'mapOperator')`;
    }

    @Node
    @CoveredBy('FragmentChild')
    @CoveredBy('NodeChild')
    *Property() {
      yield i`eat(<Reference> 'reference')`;
      yield i`eat(<PropertyValue> 'node')`;
    }

    *PropertyValue() {
      yield i`eat(<Match> null [
        (<Null> 'null')
        (<Node> '<')
      ])`;
    }

    @Node
    *OpenFragmentTag() {
      yield i`eat(<| Punctuator '<>' |> 'value')`;
    }

    @Node
    *OpenNodeTag() {
      yield i`eat(<| Punctuator '<' lexicalSpan='Tag' balanced='>' |> 'open')`;
      yield i`eat(<TagType> 'type')`;
      while (yield i`eatMatch(<Attribute> 'attributes[]')`);
      yield i`eat(<| Punctuator '>' balancer |> 'close')`;
    }

    @Node
    *CloseNodeTag() {
      yield i`eat(<| Punctuator '</>' |> 'value')`;
    }

    @Node
    *CloseFragmentTag() {
      yield i`eat(<| Punctuator '</>' |> 'value')`;
    }

    *Attribute() {
      if (yield i`match(/\w+\s*=/)`) {
        yield i`eat(<MappingAttribute>)`;
      } else {
        yield i`eat(<BooleanAttribute>)`;
      }
    }

    @Node
    *BooleanAttribute() {
      yield i`eat(<| Identifier |> 'key')`;
    }

    @Node
    *MappingAttribute() {
      yield i`eat(<| Identifier |> 'key')`;
      yield i`eat(<| Punctuator '=' |> 'mapOperator')`;
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
        yield i`eat(<| Identifier |> 'type')`;
      }
    }

    @Node
    @CoveredBy('TagType')
    *GlobalIdentifier() {
      yield i`eat(<| Identifier |> 'language')`;
      yield i`eat(<| Punctuator ':' |> 'namespaceOperator')`;
      yield i`eat(<| Identifier |> 'type')`;
    }

    @Node
    @CoveredBy('TagType')
    *Identifier() {
      yield i`eat(/\w+/)`;
    }

    @CoveredBy('NodeChild')
    *Terminal() {
      yield i`eat(<Match> null [
          (<Escape> /!['"]/)
          (<Trivia> /#['"]/)
          (<Literal> /['"]/)
        ])`;
    }

    @Node
    @CoveredBy('Terminal')
    *Escape() {
      yield i`eat(<| Punctuator '!' |> 'escapeOperator')`;
      yield i`eat(<String> 'rawValue')`;
      yield i`eat(<| Punctuator ':' |> 'rawOperator')`;
      yield i`eat(<String> 'value')`;
    }

    @Node
    @CoveredBy('Terminal')
    @CoveredBy('FragmentChild')
    @CoveredBy('NodeChild')
    *Trivia() {
      yield i`eat(<| Punctuator '#' |> 'trivializeOperator')`;
      yield i`eat(<String> 'value')`;
    }

    @Node
    @CoveredBy('Terminal')
    *Literal() {
      yield i`eat(<String> 'value')`;
    }

    @Node
    *String() {
      let q = (yield i`match(/['"]/)`).value;

      if (q) {
        yield q === "'"
          ? i`eat(<| Punctuator "'" balanced="'" lexicalSpan='String:Single' |> 'open')`
          : i`eat(<| Punctuator '"' balanced='"' lexicalSpan='String:Double' |> 'open')`;

        yield i`eatMatch(<| Content |> 'content')`;

        yield q === "'"
          ? i`eat(<| Punctuator "'" balancer |> 'close')`
          : i`eat(<| Punctuator '"' balancer |> 'close')`;
      }
    }

    @Node
    *Content(props, { span }) {
      let esc, lit;
      do {
        esc =
          span === 'String:Single'
            ? yield i`eatMatch!(/\\[\\unrt0']/)`
            : yield i`eatMatch!(/\\[\\unrt0"]/)`;
        lit =
          span === 'String:Single'
            ? yield i`eatMatch(/[^\r\n\0\\']+/)`
            : yield i`eatMatch(/[^\r\n\0\\"]+/)`;
      } while (esc || lit);
    }

    @Node
    *Integer() {
      yield i`eatMatch(<| Punctuator '-' |> 'negative')`;
      yield i`eat(<Digits> 'digits[]')`;
    }

    *Digits() {
      while (yield i`eatMatch(<| Digit |>)`);
    }

    @Node
    *Digit() {
      yield i`eat(/\d/)`;
    }

    @Node
    *Infinity() {
      yield i`eatMatch(<| Punctuator '-' |> 'negative')`;
      yield i`eat(<| Keyword 'Infinity' |> 'value')`;
    }

    @Node
    @CoveredBy('PropertyValue')
    *Null() {
      yield i`eat(<| Keyword 'null' |> 'value')`;
    }

    @InjectFrom(productions)
    @Node
    *Punctuator() {}

    @InjectFrom(productions)
    @Node
    *Keyword() {}

    @InjectFrom(productions)
    *Match() {}
  },
);
