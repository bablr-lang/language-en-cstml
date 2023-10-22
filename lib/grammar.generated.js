import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
import * as _t from "@bablr/boot-helpers/types";
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _initProto;
import { Node, Cover, CoveredBy, InjectFrom } from '@bablr/boot-helpers/decorators';
import * as productions from '@bablr/boot-helpers/productions';
import * as String from '@bablr/language-cstml-string';
export const name = 'CSTML';
export const dependencies = {
  String
};
export const grammar = (_dec = InjectFrom(productions), _dec2 = InjectFrom(productions), _dec3 = InjectFrom(productions), _dec4 = CoveredBy('Tag'), _dec5 = CoveredBy('Tag'), _dec6 = CoveredBy('Tag'), _dec7 = CoveredBy('Tag'), _dec8 = CoveredBy('Tag'), _dec9 = CoveredBy('Tag'), _dec10 = CoveredBy('Tag'), _dec11 = CoveredBy('Tag'), _dec12 = CoveredBy('Attribute'), _dec13 = CoveredBy('Attribute'), class CSTMLGrammar {
  static {
    [_initProto] = _applyDecs(this, [[_dec, 2, "Any"], [_dec2, 2, "All"], [_dec3, 2, "List"], [Node, 2, "Document"], [[Node, _dec4], 2, "DoctypeTag"], [[Node, _dec5], 2, "ParsersOpenTag"], [[Node, _dec6], 2, "ParserTag"], [[Node, _dec7], 2, "ParsersCloseTag"], [Cover, 2, "Tag"], [[Node, _dec8], 2, "NodeOpenTag"], [[Node, _dec9], 2, "NodeCloseTag"], [[Node, _dec10], 2, "TokenTag"], [Node, 2, "NodeBinding"], [Node, 2, "NodeGap"], [Node, 2, "TokenGap"], [[Node, _dec11], 2, "NodeGapTag"], [Cover, 2, "Attribute"], [[Node, _dec12], 2, "KeyAttribute"], [[Node, _dec13], 2, "KeyValueAttribute"], [Node, 2, "Keyword"], [Node, 2, "Punctuator"], [Node, 2, "Identifier"], [Node, 2, "Trivia"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  Any() {}
  All() {}
  List() {}
  *Document() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`DoctypeTag`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Parsers`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Node`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *DoctypeTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`<`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`!`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`doctype`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`cstml`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Parsers() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`ParsersOpenTag`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`All`], {}),
        props: _t.node("Spamex", "MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{[`], {}),
          values: [_t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          }), _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    }));
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`ParsersCloseTag`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *ParsersOpenTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`<`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`!`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`parsers`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *ParserTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`<`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Identifier`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`name`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`language`, _t.ref`namespaceOperator`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        language: _t.node("Spamex", "Identifier", [_t.str`String`], {}),
        namespaceOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`String`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`href`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *ParsersCloseTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`</`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`parsers`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`type`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Fragment() {
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Any`], {}),
        props: _t.node("Spamex", "MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{[`], {}),
          values: [_t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          }), _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    }));
  }
  *Element() {
    const [tag] = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Tag`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    if (tag.type === 'NodeOpenTag') {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Fragment`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`NodeCloseTag`], {}),
          props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
            values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.gap`value`], {
              key: _t.node("Spamex", "Literal", [_t.str`type`], {}),
              mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
              value: tag.value.type
            })],
            close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
          }),
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    } else if (tag.type === 'NodeCloseTag') {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`fail`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    }
  }
  *Tag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.trivia` `, _t.ref`argument`, _t.trivia` `, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Any`], {}),
        props: _t.node("Spamex", "MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{[`], {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`TokenTag`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                  value: _t.node("Spamex", "Literal", [_t.str`<|`], {}),
                  close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
                })
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          }), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`TokenTag`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                  value: _t.node("Spamex", "Literal", [_t.str`<|`], {}),
                  close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
                })
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          }), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`TokenTag`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                  value: _t.node("Spamex", "Literal", [_t.str`<|`], {}),
                  close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
                })
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          }), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`TokenTag`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                  value: _t.node("Spamex", "Literal", [_t.str`<|`], {}),
                  close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
                })
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Node() {
    const openTag = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`NodeOpenTag`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Fragment`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`NodeCloseTag`], {}),
        props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
          values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.gap`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`type`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
            value: openTag.value.type
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *NodeOpenTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`<`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Identifier`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`type`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`All`], {}),
        props: _t.node("Spamex", "MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{[`], {}),
          values: [_t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          }), _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *NodeCloseTag({
    props: {
      type
    }
  }) {
    if (!type) throw new Error('NodeCloseTag must have a type prop');
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`</`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Identifier`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`type`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
          values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.gap`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
            value: type
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *TokenTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`<|`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`|>`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Identifier`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`type`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`All`], {}),
        props: _t.node("Spamex", "MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{[`], {}),
          values: [_t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          }), _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`All`], {}),
        props: _t.node("Spamex", "MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{[`], {}),
          values: [_t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          }), _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`|>`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *NodeBinding() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`match`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`], {
          elements: [_t.node("Regex", "Character", [_t.esc()], {}), _t.node("Regex", "Character", [_t.esc()], {}), _t.node("Regex", "Character", [_t.esc()], {})]
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`[`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
              value: _t.node("Spamex", "Literal", [_t.str`]`], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
            })
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
          value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`NodeGap`], {}),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
              value: _t.node("Spamex", "Literal", [_t.str`gap`], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
            })
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Attributes`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
          value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`]`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          }),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    } else {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`NodeGap`], {}),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
              value: _t.node("Spamex", "Literal", [_t.str`gap`], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
            })
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
      // no attributes
    }
  }

  *NodeGap() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`[`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`]`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Identifier`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`type`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Attributes`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`]`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *TokenGap() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`[`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`]`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Attributes`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`]`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *NodeGapTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`<`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`balanced`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`NodeGap`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`gap`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`>`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
          key: _t.node("Spamex", "Literal", [_t.str`balancer`], {})
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Attributes() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`List`], {}),
        props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.ref`[separators]`, _t.trivia` `, _t.ref`[values]`, _t.ref`[separators]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
          values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`separator`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
            value: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
              value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
            })
          }), _t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`separator`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
            value: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
              value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
            })
          }), _t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`separator`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
            value: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
              value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
            })
          })],
          separators: [_t.node("Spamex", "Punctuator", [_t.str`,`], {}), _t.node("Spamex", "Punctuator", [_t.str`,`], {})],
          close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Attribute() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Any`], {}),
        props: _t.node("Spamex", "MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{[`], {}),
          values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`KeyValueAttribute`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          }), _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`KeyValueAttribute`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *KeyAttribute() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Identifier`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *KeyValueAttribute() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Identifier`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`=`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TriviaTokenMatcher", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        value: _t.node("Spamex", "Keyword", [_t.str` `], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`String`], {}),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Keyword({
    props: {
      value
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.gap`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: value,
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Punctuator({
    props: {
      value
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.gap`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: value,
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Identifier({
    props: {
      value
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`flags`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
          elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
            element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.node("Regex", "Punctuator", [_t.str`\\`], {}),
              value: _t.node("Regex", "Keyword", [_t.str`w`], {})
            }),
            value: _t.node("Regex", "Keyword", [_t.str`+`], {})
          })]
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        flags: _t.node("Regex", "Flag", [_t.ref`value`], {
          value: _t.node("Regex", "Keyword", [_t.str`y`], {})
        })
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield value ? _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.gap`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: value,
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    }) : _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`flags`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
          elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
            element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.node("Regex", "Punctuator", [_t.str`\\`], {}),
              value: _t.node("Regex", "Keyword", [_t.str`w`], {})
            }),
            value: _t.node("Regex", "Keyword", [_t.str`+`], {})
          })]
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        flags: _t.node("Regex", "Flag", [_t.ref`value`], {
          value: _t.node("Regex", "Keyword", [_t.str`y`], {})
        })
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Trivia({
    state
  }) {
    const {
      span
    } = state;
    if (span === 'Bare' || span === 'Tag') {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`flags`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.node("Regex", "Punctuator", [_t.str`\\`], {}),
                value: _t.node("Regex", "Keyword", [_t.str`s`], {})
              }),
              value: _t.node("Regex", "Keyword", [_t.str`+`], {})
            })]
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
          flags: _t.node("Regex", "Flag", [_t.ref`value`], {
            value: _t.node("Regex", "Keyword", [_t.str`y`], {})
          })
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    } else if (span === 'TokenTag') {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`flags`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.str`[`], {}),
                elements: [_t.node("Regex", "Character", [_t.str` `], {}), _t.node("Regex", "Character", [_t.str` `], {})],
                close: _t.node("Regex", "Punctuator", [_t.str`]`], {})
              }),
              value: _t.node("Regex", "Keyword", [_t.str`+`], {})
            })]
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
          flags: _t.node("Regex", "Flag", [_t.ref`value`], {
            value: _t.node("Regex", "Keyword", [_t.str`y`], {})
          })
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    } else {
      throw new Error(`Trivia not supported in {span ${span}}`);
    }
  }
});
