import { Token } from '@bablr/helpers/decorators';
import { i } from '@bablr/helpers/shorthand';

export default class CSTMLTokenGrammar {
  @Token
  *Keyword({ value }) {
    yield i`eat(${value})`;
  }

  @Token
  *Punctuator({ value }) {
    yield i`eat(${value})`;
  }

  @Token
  *Identifier() {
    yield i`eat(/\w+/y)`;
  }

  @Token
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
