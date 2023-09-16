import * as sym from '@bablr/helpers/symbols';
import * as string from '@bablr/language-cstml-string';
import NodeGrammar from './node.grammar.js';
import TokenGrammar from './token.grammar.js';

export const grammars = {
  [sym.node]: NodeGrammar,
  [sym.token]: TokenGrammar,
};

export const dependencies = new Map([['String', string]]);
