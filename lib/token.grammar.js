import { i } from '@bablr/helpers/shorthand';

const Token = Symbol.for('@bablr/token');

export default class CSTMLTokenGrammar {
  constructor() {
    this.aliases = new Map([
      [
        Token,
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

  // @Token
  *Keyword({ value }) {
    yield i`eat(${value})`;
  }

  // @Token
  *Punctuator({ value }) {
    yield i`eat(${value})`;
  }

  // @Token
  *Identifier() {
    yield i`eat(/\w+/y)`;
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
