// @ts-nocheck

import * as sym from '@bablr/helpers/symbols';

// TODO fixme
export const escapeCharacterClass = (str) => str.replace(/]\\-/g, (r) => `\\${r}`);

const attributeFromEntry = ([k, v]) => spam.Attribute`${k}=${v}`;

export const grammars = {
  [sym.node]: NodeGrammar,
  [sym.token]: TokenGrammar,
};
