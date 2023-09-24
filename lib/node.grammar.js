// import * as sym from '@bablr/helpers/symbols';
import { Node, Cover, Any, All, List, CoveredBy } from '@bablr/helpers/decorators';
import { i, spam } from '@bablr/helpers/shorthand';

const attributeFromEntry = ([k, v]) => spam.KeyValueAttribute`${k}=${v}`;

export default class CSTMLNodeGrammar {
  @Any
  Any() {}

  @All
  All() {}

  @List
  List() {}

  @Node
  *Document() {
    yield i`eatMatch(<| |>)`;
    yield i`eat(<DoctypeTag>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Parsers>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Node>)`;
    yield i`eatMatch(<| |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *DoctypeTag() {
    yield i`eat(<| Punctuator '<' balanced='>' |>)`;
    yield i`eat(<| Punctuator '!' |>)`;
    yield i`eat(<| Keyword 'doctype' |>)`;
    yield i`eat(<| |>)`;
    yield i`eat(<| Keyword 'cstml' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '>' balanced |>)`;
  }

  *Parsers() {
    yield i`eat(<ParsersOpenTag>)`;
    while (yield i`eatMatch(<All {[ <| |> <ParserTag> ]}>)`);
    yield i`eatMatch(<| |>)`;
    yield i`eat(<ParsersCloseTag>)`;
  }

  @Node
  @CoveredBy('Tag')
  *ParsersOpenTag() {
    yield i`eat(<| Punctuator '<' balanced='>' |>)`;
    yield i`eat(<| Punctuator '!' |>)`;
    yield i`eat(<| Keyword 'parsers' |>)`;
    yield i`eat(<| Punctuator '>' balanced |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *ParserTag() {
    yield i`eat(<| Punctuator '<' balanced='>' |>)`;
    yield i`eat(<Identifier path='name'>)`;
    yield i`eat(<| |>)`;
    yield i`eat(<String:String path='href'>)`;
    yield i`eat(<| Punctuator '>' balanced |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *ParsersCloseTag() {
    yield i`eat(<| Punctuator '</' balanced='>' |>)`;
    yield i`eatMatch(<| Keyword 'parsers' path='type' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '>' balanced |>)`;
  }

  *Fragment() {
    while (yield i`eatMatch(<Any {[ <| |> <Element guard='<'> ]}>)`);
  }

  *Element({ attrs }) {
    const [tag] = yield i`eat(<Tag ${[...attrs].map(attributeFromEntry)}>)`;
    if (tag.type === 'NodeOpenTag') {
      yield i`eat(<Fragment>)`;
      yield i`eat(<NodeCloseTag { type: ${tag.value.type} }>)`;
    } else if (tag.type === 'NodeCloseTag') {
      yield i`fail()`;
    }
  }

  @Cover
  *Tag() {
    yield i`eat(
              <Any {[
                <TokenTag { guard: '<|' }>
                <NodeGapTag { guard: '<[' }>
                <NodeCloseTag { guard: '</' }>
                <NodeOpenTag { guard: '<' }>
              ]}>
            )`;
  }

  *Node() {
    const openTag = yield i`eat(<NodeOpenTag>)`;
    yield i`eat(<Fragment>)`;
    yield i`eat(<NodeCloseTag { type: ${openTag.value.type} }>)`;
  }

  @Node
  @CoveredBy('Tag')
  *NodeOpenTag() {
    yield i`eat(<| Punctuator '<' balanced='>' |>)`;
    yield i`eat(<Identifier path='type'>)`;
    yield i`eatMatch(<| All {[ <| |> <NodeBinding path='binding'> ]} |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '>' balanced |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *NodeCloseTag({ props: { type } }) {
    if (!type) throw new Error('NodeCloseTag must have a type prop');
    yield i`eat(<| Punctuator '</' balanced='>' |>)`;
    yield i`eatMatch(<Identifier path='type' { value: ${type} }>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '>' balanced |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *TokenTag() {
    yield i`eat(<| Punctuator '<|' balanced='|>' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Identifier path='type'>)`;
    yield i`eat(<All {[ <| |> <| String:String path='value' |> ]} |>)`;
    yield i`eatMatch(<All {[ <| |> <TokenGap path='gap'> ]}>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '|>' balanced |>)`;
  }

  @Node
  *NodeBinding() {
    if (yield i`match(/\[\s*\[/)`) {
      yield i`eat(<| Punctuator '[' balanced=']' |>)`;
      yield i`eatMatch(<| |>)`;
      yield i`eat(<NodeGap path='gap'>)`;
      yield i`eatMatch(<Attributes>)`;
      yield i`eatMatch(<| |>)`;
      yield i`eat(<| Punctuator ']' balanced |>)`;
    } else {
      yield i`eat(<NodeGap path='gap'>)`;
      // no attributes
    }
  }

  @Node
  *NodeGap() {
    yield i`eat(<| Punctuator '[' balanced=']' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Identifier path='type'>)`;
    yield i`eatMatch(<Attributes>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator ']' balanced |>)`;
  }

  @Node
  *TokenGap() {
    yield i`eat(<| Punctuator '[' balanced=']' |>)`;
    yield i`eatMatch(<Attributes>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator ']' balanced |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *NodeGapTag() {
    yield i`eat(<| Punctuator '<' balanced='>' |>)`;
    yield i`eat(<NodeGap path='gap'>)`;
    yield i`eat(<| Punctuator '>' balanced |>)`;
  }

  *Attributes() {
    yield i`eatMatch(<All {[
        <| |>
        <List { separator: <| |>, matchable: <Attribute path='attrs'> }>
      ]}>)`;
  }

  @Cover
  *Attribute() {
    yield i`eat(<| Any {[
        <| KeyValueAttribute |>
        <| KeyAttribute |>
      ]} |>)`;
  }

  @Node
  @CoveredBy('Attribute')
  *KeyAttribute() {
    yield i`eat(<| Identifier |>)`;
  }

  @Node
  @CoveredBy('Attribute')
  *KeyValueAttribute() {
    yield i`eat(<| Identifier |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '=' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<String>)`;
  }

  *Identifier({ attrs: { value } }) {
    yield value ? i`eat(<| Identifier value=${value} |>)` : i`eat(<| Identifier |>)`;
  }
}
