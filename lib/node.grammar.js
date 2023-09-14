// import * as sym from '@bablr/helpers/symbols';
import * as productions from '@bablr/helpers/productions';
import { i, spam, str } from '@bablr/helpers/shorthand';

const Node = Symbol.for('@bablr/node');

const attributeFromEntry = ([k, v]) => spam.Attribute`${k}=${v}`;

export default class CSTMLNodeGrammar {
  constructor() {
    this.aliases = new Map([
      [
        Node,
        new Set([
          'Document',
          'DoctypeTag',
          'ParsersOpenTag',
          'ParserTag',
          'ParsersCloseTag',
          'NodeOpenTag',
          'NodeCloseTag',
          'TokenTag',
          'NodeGapTag',
          'TokenGapTag',
          'Attribute',
        ]),
      ],
      [
        'Tag',
        new Set([
          'DoctypeTag',
          'ParsersOpenTag',
          'ParserTag',
          'ParsersCloseTag',
          'NodeOpenTag',
          'NodeCloseTag',
          'TokenTag',
          'NodeGapTag',
          'TokenGapTag',
        ]),
      ],
    ]);
  }

  Any(...args) {
    return productions.Any(...args);
  }

  All(...args) {
    return productions.All(...args);
  }

  List(...args) {
    return productions.List(...args);
  }

  // @Node
  *Document() {
    yield i`eatMatch(<| |>)`;
    yield i`eat(<DoctypeTag>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Parsers>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Node>)`;
    yield i`eatMatch(<| |>)`;
  }

  // @Node
  // @CoveredBy('Tag')
  *DoctypeTag() {
    yield i`eat(<| Punctuator '<' startSpan='Tag' balanced='>' |>)`;
    yield i`eat(<| Punctuator '!' |>)`;
    yield i`eat(<| Keyword 'doctype' |>)`;
    yield i`eat(<| |>)`;
    yield i`eat(<| Keyword 'cstml' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '>' endSpan='Tag' |>)`;
  }

  *Parsers() {
    yield i`eat(<ParsersOpenTag>)`;
    while (yield i`eatMatch(<All {[ <| |> <ParserTag> ]}>)`);
    yield i`eatMatch(<| |>)`;
    yield i`eat(<ParsersCloseTag>)`;
  }

  // @Node
  // @CoveredBy('Tag')
  *ParsersOpenTag() {
    yield i`eat(<| Punctuator '<' startSpan='Tag' balanced='>' |>)`;
    yield i`eat(<| Punctuator '!' |>)`;
    yield i`eat(<| Keyword 'parsers' |>)`;
    yield i`eat(<| Punctuator '>' endSpan='Tag' |>)`;
  }

  // @Node
  // @CoveredBy('Tag')
  *ParserTag() {
    yield i`eat(<| Punctuator '<' startSpan='Tag' balanced='>' |>)`;
    yield i`eat(<Identifier path='name'>)`;
    yield i`eat(<| |>)`;
    yield i`eat(<String path='href'>)`;
    yield i`eat(<| Punctuator '>' endSpan='Tag' |>)`;
  }

  // @Node
  // @CoveredBy('Tag')
  *ParsersCloseTag() {
    yield i`eat(<| Punctuator '</' startSpan='Tag' balanced='>' |>)`;
    yield i`eatMatch(<Keyword value='parsers' path='type'>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '>' endSpan='Tag' |>)`;
  }

  *Fragment() {
    while (
      // TODO eat(null) is bad
      yield i`eatMatch(
        ${yield disambiguate([
          [spam`<| |>)`, /\s+/y],
          [spam`<Element>)`, '<'],
        ])}
      )`
    );
  }

  *Element({ attrs }) {
    const [tag] = yield i`eat(<Tag ${[...attrs].map(attributeFromEntry)}>)`;
    if (tag.type === 'NodeOpenTag') {
      yield i`eat(<Fragment>)`;
      yield i`eat(<NodeCloseTag type=${tag.value.type}>)`;
    } else if (tag.type === 'NodeCloseTag') {
      yield i`fail()`;
    }
  }

  *Tag() {
    const tag = yield disambiguate([
      [spam`<TokenGapTag>)`, str`<|[`],
      [spam`<TokenTag>)`, str`<|`],
      [spam`<NodeGapTag>)`, str`<[`],
      [spam`<NodeOpenTag>)`, str`<`],
      [spam`<NodeCloseTag>)`, str`</`],
    ]);
    if (tag) yield i`eat(${tag})`;
  }

  *Node() {
    const openTag = yield i`eat(<NodeOpenTag>)`;
    yield i`eat(<Fragment>)`;
    yield i`eat(<NodeCloseTag type=${openTag.value.type}>)`;
  }

  // @Node
  // @CoveredBy('Tag')
  *NodeOpenTag() {
    yield i`eat(<| Punctuator '<' startSpan='Tag' balanced='>' |>)`;

    yield i`eat(<Identifier path='type'>)`;

    const gapOpen = yield i`eatMatch(<| All {[
        <| |>
        <| Punctuator '[' startSpan='Gap' balanced=']' |>
      } |>)`;

    if (gapOpen) {
      yield i`eatMatch(<| |>)`;
      yield i`eat(<Identifier path='gapType'>)`;
      yield i`eatMatch(<| |>)`;
      yield i`eat(<| Punctuator ']' endSpan='Gap' |>)`;
    }

    yield i`eatMatch(<Attributes>)`;

    yield i`eat(<| Punctuator '>' endSpan='Tag' |>)`;
  }

  // @Node
  // @CoveredBy('Tag')
  *NodeCloseTag({ attrs }) {
    yield i`eat(<| Punctuator '</' startSpan='Tag' balanced='>' |>)`;
    yield i`eatMatch(<Identifier value=${attrs.get('type')} path='type'>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '>' endSpan='Tag' |>)`;
  }

  // @Node
  // @CoveredBy('Tag')
  *TokenTag() {
    yield i`eat(<| Punctuator '<|' startSpan='Tag' balanced='|>' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Identifier path='type'>)`;
    yield i`eatMatch(<Attributes>)`;
    yield i`eat(<| Punctuator '|>' endSpan='Tag' |>)`;
  }

  // @Node
  // @CoveredBy('Tag')
  *NodeGapTag() {
    yield i`eat(<| Punctuator '<' startSpan='Tag' balanced='>' |>)`;
    yield i`eat(<| Punctuator '[' startSpan='Gap' balanced=']' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Identifier path='type'>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator ']' endSpan='Gap' |>)`;
    yield i`eatMatch(<Attributes>)`;
    yield i`eat(<| Punctuator '/>' endSpan='Tag' |>)`;
  }

  // @Node
  // @CoveredBy('Tag')
  *TokenGapTag() {
    yield i`eat(<| Punctuator '<|' startSpan='Tag' balanced='|>' |>)`;
    yield i`eat(<| Punctuator '[' startSpan='Gap' balanced=']' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Identifier path='type'>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator ']' endSpan='Gap' |>)`;
    yield i`eatMatch(<| All {[ <| |> <| String |> ]} |>)`;
    yield i`eatMatch(<Attributes>)`;
    yield i`eat(<| Punctuator '|>' endSpan='Tag' |>)`;
  }

  *Attributes() {
    yield i`eatMatch(<All {[
        <| |>
        <List { separator=<| |> matchable=<Attribute path='attrs'> }>
      ]}>)`;
  }

  // @Node
  *Attribute() {
    yield i`eat(<| Identifier |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '=' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<String>)`;
  }

  *Identifier() {
    yield i`eat(<| Identifier |>)`;
  }

  *String() {
    yield i`eat(<| String |>)`;
  }
}
