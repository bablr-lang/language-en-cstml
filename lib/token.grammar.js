import objectEntries from 'iter-tools-es/methods/object-entries';
import strFrom from 'iter-tools-es/methods/str';
import map from 'iter-tools-es/methods/map';
import * as sym from '@bablr/helpers/symbols';
import * as productions from '@bablr/helpers/productions';
import { eat, guard } from '@bablr/helpers/builders';
import { i } from '@bablr/helpers/shorthand';

// Mostly borrowed from JSON
const escapables = new Map(
  objectEntries({
    '"': '"',
    "'": "'",
    '\\': '\\',
    '/': '/',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t',
  }),
);

export default class CSTMLTokenGrammar {
  constructor() {
    this.aliases = new Map([
      [
        sym.token,
        new Set([
          'Keyword',
          'Punctuator',
          'Identifier',
          'Literal',
          'Escape',
          'EscapeCode',
          'Trivia',
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

  // @Token
  *Keyword({ value }) {
    yield eat(value);
  }

  // @Token
  *Punctuator({ value }) {
    yield eat(value);
  }

  // @Token
  *Identifier() {
    yield i`eat(/\w+/y`;
  }

  // @Token
  *Literal({ state: { span } }) {
    if (span === 'String:Single') {
      yield i`eat(/[^'\n]+/y)`;
    } else if (span === 'String:Double') {
      yield i`eat(/[^"\n]+/y)`;
    } else {
      throw new Error(`{span: ${span}} does not allow literals`);
    }
  }

  *EscapeSequence({ state: { span } }) {
    if (!span.startsWith('String')) {
      throw new Error(`{span: ${span}} does not define an escape sequence`);
    }

    yield guard('\\');

    yield i`eat(<| Escape |>)`;
    yield i`eat(<| EscapeCode |>)`;
  }

  // @Token
  *Escape({ state: { span } }) {
    if (span.startsWith('String')) {
      throw new Error(`{span: ${span}} does not define an escape`);
    }

    yield i`eat(\\)`;
  }

  // @Token
  *EscapeCode({ state: { span } }) {
    if (!span.startsWith('String')) {
      throw new Error(`{span: ${span}} does not define any escape codes`);
    }

    if (yield i`eatMatch(/u{\d{1,6}}/y)`) {
      // break
    } else if (yield i`eatMatch(/u\d\d\d\d/y)`) {
      // break
    } else if (span !== 'Bare') {
      if (yield i`eatMatch(/[${strFrom(map(escapeCharacterClass, escapables.keys()))}/)`) {
        // break
      }
    }
  }

  *String() {
    let lq = i`eat(<| Any {[
        <| Punctuator "'" startSpan='String:Single' balanced="'" |>
        <| Punctuator '"' startSpan='String:Double' balanced='"' |>
      ]} |>)`;

    while (yield i`eatMatch(<| Any {[ <| Literal |> <| EscapeSequence |> ]} |>)`);

    yield i`eat(<| Punctuator ${lq.value} endSpan=${lq.startSpan} |>)`;
  }

  // @Token
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
}
