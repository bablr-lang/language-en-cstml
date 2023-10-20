import { i } from '@bablr/boot/shorthand.macro';
import { Node, Cover, CoveredBy, InjectFrom } from '@bablr/boot-helpers/decorators';
import * as productions from '@bablr/boot-helpers/productions';
import * as String from '@bablr/language-cstml-string';

export const name = 'CSTML';

export const dependencies = { String };

export const grammar = class CSTMLGrammar {
  @InjectFrom(productions)
  Any() {}

  @InjectFrom(productions)
  All() {}

  @InjectFrom(productions)
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
    yield i`eat(<| Punctuator '>' balancer |>)`;
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
    yield i`eat(<| Punctuator '>' balancer |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *ParserTag() {
    yield i`eat(<| Punctuator '<' balanced='>' |>)`;
    yield i`eat(<Identifier path='name'>)`;
    yield i`eat(<| |>)`;
    yield i`eat(<| String:String path='href' |>)`;
    yield i`eat(<| Punctuator '>' balancer |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *ParsersCloseTag() {
    yield i`eat(<| Punctuator '</' balanced='>' |>)`;
    yield i`eatMatch(<| Keyword 'parsers' path='type' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '>' balancer |>)`;
  }

  *Fragment() {
    while (yield i`eatMatch(<Any {[ <| |> <Element guard='<'> ]}>)`);
  }

  *Element() {
    const [tag] = yield i`eat(<Tag>)`;
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
    yield i`eat(<| Punctuator '>' balancer |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *NodeCloseTag({ props: { type } }) {
    if (!type) throw new Error('NodeCloseTag must have a type prop');
    yield i`eat(<| Punctuator '</' balanced='>' |>)`;
    yield i`eatMatch(<Identifier path='type' { value: ${type} }>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '>' balancer |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *TokenTag() {
    yield i`eat(<| Punctuator '<|' balanced='|>' |>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<Identifier path='type'>)`;
    yield i`eat(<All {[ <| |> <| String:String path='value' |> ]}>)`;
    yield i`eatMatch(<All {[ <| |> <TokenGap path='gap'> ]}>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator '|>' balancer |>)`;
  }

  @Node
  *NodeBinding() {
    if (yield i`match(/\[\s*\[/)`) {
      yield i`eat(<| Punctuator '[' balanced=']' |>)`;
      yield i`eatMatch(<| |>)`;
      yield i`eat(<NodeGap path='gap'>)`;
      yield i`eatMatch(<Attributes>)`;
      yield i`eatMatch(<| |>)`;
      yield i`eat(<| Punctuator ']' balancer |>)`;
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
    yield i`eat(<| Punctuator ']' balancer |>)`;
  }

  @Node
  *TokenGap() {
    yield i`eat(<| Punctuator '[' balanced=']' |>)`;
    yield i`eatMatch(<Attributes>)`;
    yield i`eatMatch(<| |>)`;
    yield i`eat(<| Punctuator ']' balancer |>)`;
  }

  @Node
  @CoveredBy('Tag')
  *NodeGapTag() {
    yield i`eat(<| Punctuator '<' balanced='>' |>)`;
    yield i`eat(<NodeGap path='gap'>)`;
    yield i`eat(<| Punctuator '>' balancer |>)`;
  }

  *Attributes() {
    yield i`eatMatch(<All {[
        <| |>
        <List { separator: <| |>, element: <Attribute path='attributes'> }>
      ]}>)`;
  }

  @Cover
  *Attribute() {
    yield i`eat(<Any {[
        <| KeyValueAttribute |>
        <| KeyAttribute |>
      ]}>)`;
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

  @Node
  *Keyword({ props: { value } }) {
    yield i`eat(${value})`;
  }

  @Node
  *Punctuator({ props: { value } }) {
    yield i`eat(${value})`;
  }

  @Node
  *Identifier({ props: { value } }) {
    yield i`eat(/\w+/y)`;
    yield value ? i`eat(${value})` : i`eat(/\w+/y)`;
  }

  @Node
  *Trivia({ state }) {
    const { span } = state;
    if (span === 'Bare' || span === 'Tag') {
      yield i`eat(/\s+/y)`;
    } else if (span === 'TokenTag') {
      yield i`eat(/[ \t]+/y)`;
    } else {
      throw new Error(`Trivia not supported in {span ${span}}`);
    }
  }
};
