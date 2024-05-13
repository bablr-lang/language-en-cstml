import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
import { interpolateString as _interpolateString } from "@bablr/agast-helpers/template";
import { interpolateArrayChildren as _interpolateArrayChildren } from "@bablr/agast-helpers/template";
import { interpolateArray as _interpolateArray } from "@bablr/agast-helpers/template";
import * as _l from "@bablr/agast-vm-helpers/languages";
import * as _t from "@bablr/agast-helpers/shorthand";
var _computedKey, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _initProto;
import objectEntries from 'iter-tools-es/methods/object-entries';
import { Node, CoveredBy, InjectFrom, Attributes, AllowEmpty } from '@bablr/helpers/decorators';
import { buildString } from '@bablr/agast-vm-helpers';
import * as productions from '@bablr/helpers/productions';
import * as Comment from '@bablr/language-c-comments';
export const canonicalURL = 'https://github.com/bablr-lang/language-cstml';
export const dependencies = {
  Comment
};
const escapables = new Map(objectEntries({
  n: '\n',
  r: '\r',
  t: '\t',
  0: '\0'
}));
function* eatMatchTrivia() {
  if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
    verb: _t.s_node(_l.Instruction, "Identifier", "match"),
    arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
      open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
      values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
        alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
          elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Regex, "Punctuator", "["),
            elements: [_t.node(_l.Regex, "Character", [_t.lit(" ")], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\t")], {}, {
              cooked: "\t"
            }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\n")], {}, {
              cooked: "\n"
            }))], {}, {})],
            close: _t.s_i_node(_l.Regex, "Punctuator", "]")
          }, {})]
        }, {}), _t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
          elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\/")], {}, {
            cooked: "/"
          }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\*")], {}, {
            cooked: "*"
          }))], {}, {})]
        }, {}), _t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
          elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\/")], {}, {
            cooked: "/"
          }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\/")], {}, {
            cooked: "/"
          }))], {}, {})]
        }, {})],
        separators: [_t.s_i_node(_l.Regex, "Punctuator", "|"), _t.s_i_node(_l.Regex, "Punctuator", "|")],
        close: _t.s_i_node(_l.Regex, "Punctuator", "/")
      }, {})],
      close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
    }, {})
  }, {})) {
    return yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`language`, _t.ref`namespaceOperator`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          language: _t.s_node(_l.Spamex, "Identifier", "Comment"),
          namespaceOperator: _t.s_i_node(_l.Spamex, "Punctuator", ":"),
          type: _t.s_node(_l.Spamex, "Identifier", "Trivia"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  return null;
}
export const grammar = (_computedKey = Symbol.for('@bablr/fragment'), _dec = CoveredBy('Expression'), _dec2 = CoveredBy('Expression'), _dec3 = CoveredBy('Expression'), _dec4 = CoveredBy('PropertyValue'), _dec5 = CoveredBy('Expression'), _dec6 = CoveredBy('PropertyValue'), _dec7 = CoveredBy('PropertyValue'), _dec8 = CoveredBy('NodeChild'), _dec9 = CoveredBy('Expression'), _dec10 = CoveredBy('Expression'), _dec11 = CoveredBy('Expression'), _dec12 = CoveredBy('Expression'), _dec13 = Attributes(['true']), _dec14 = CoveredBy('Attribute'), _dec15 = CoveredBy('Attribute'), _dec16 = CoveredBy('Language'), _dec17 = CoveredBy('Language'), _dec18 = Attributes(['cooked']), _dec19 = CoveredBy('Expression'), _dec20 = CoveredBy('NodeChild'), _dec21 = CoveredBy('Number'), _dec22 = CoveredBy('Number'), _dec23 = InjectFrom(productions), _dec24 = InjectFrom(productions), _dec25 = InjectFrom(productions), class CSTMLGrammar {
  static {
    [_initProto] = _applyDecs(this, [[Node, 2, "Document"], [[_dec, Node], 2, "DoctypeTag"], [Node, 2, "Fragment"], [[Node, _dec2], 2, "Reference"], [[Node, _dec3, _dec4], 2, "Gap"], [[Node, _dec5, _dec6], 2, "Null"], [[Node, _dec7], 2, "Node"], [[Node, _dec8], 2, "Property"], [[Node, _dec9], 2, "OpenFragmentTag"], [AllowEmpty, 2, "Flags"], [[Node, _dec10], 2, "OpenNodeTag"], [[Node, _dec11], 2, "CloseNodeTag"], [[Node, _dec12], 2, "CloseFragmentTag"], [[_dec13, Node, _dec14], 2, "BooleanAttribute"], [[Node, _dec15], 2, "MappingAttribute"], [[_dec16, Node], 2, "IdentifierPath"], [[_dec17, Node], 2, "String"], [[AllowEmpty, Node], 2, "StringContent"], [[_dec18, Node], 2, "EscapeSequence"], [Node, 2, "EscapeCode"], [Node, 2, "Identifier"], [[Node, _dec19, _dec20], 2, "Literal"], [Node, 2, "UnsignedInteger"], [[_dec21, Node], 2, "Integer"], [Node, 2, "Digit"], [[_dec22, Node], 2, "Infinity"], [[Node, _dec23], 2, "Punctuator"], [[Node, _dec24], 2, "Keyword"], [_dec25, 2, "Match"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  *[_computedKey]() {
    yield* eatMatchTrivia();
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.CSTML, "Gap", [_t.ref`value`], {
          value: _t.s_i_node(_l.CSTML, "Punctuator", "<//>")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield* eatMatchTrivia();
  }
  *Stream() {
    while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Expression"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}));
  }
  *Expression() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Match"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_i_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n    ")], {}, {})), _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Gap"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("<//>")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Null"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("null")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Reference"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_i_node(_l.Regex, "Keyword", "w")
                }, {})]
              }, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Literal"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "DoctypeTag"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("<!")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Fragment"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("<>")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Node"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("<")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Document() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "DoctypeTag"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("doctype")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield* eatMatchTrivia();
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Fragment"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("tree")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *DoctypeTag() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("<!")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "UnsignedInteger"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("version")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(":")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("versionSeparator")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Keyword"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("cstml")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("doctype")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let sp = yield* eatMatchTrivia();
    while (sp && (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "Character", [_t.lit("!")], {}, {}),
              value: _t.s_i_node(_l.Regex, "Keyword", "?")
            }, {
              min: 0,
              max: 1,
              greedy: true
            }), _t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
              value: _t.s_i_node(_l.Regex, "Keyword", "w")
            }, {})]
          }, {})],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}))) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "Attribute"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("attributes[]")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      sp = yield* eatMatchTrivia();
    }
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Fragment() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "OpenFragmentTag"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield* eatMatchTrivia();
    while (!(yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("</")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}))) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "Node"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("children[]")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      yield* eatMatchTrivia();
    }
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "CloseFragmentTag"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Reference() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Identifier"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("name")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield* eatMatchTrivia();
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("[]")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("arrayOperator")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Gap() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("<//>")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Null() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Keyword"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("null")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Node({
    ctx
  }) {
    let open = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "OpenNodeTag"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield* eatMatchTrivia();
    const token = ctx.getProperty(open, 'tokenFlag');
    const intrinsic = !!ctx.getProperty(open, 'intrinsicValue');
    if (intrinsic) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Instruction, "Null", [_t.ref`value`], {
            value: _t.s_i_node(_l.Instruction, "Keyword", "null")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("children[]")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Instruction, "Null", [_t.ref`value`], {
            value: _t.s_i_node(_l.Instruction, "Keyword", "null")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      if (token) {
        if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "NodeChild"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("children[]")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {}), _t.node(_l.Instruction, "Object", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`properties[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`close`], {
              open: _t.s_i_node(_l.Instruction, "Punctuator", "{"),
              properties: [_t.node(_l.Instruction, "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`value`], {
                key: _t.node(_l.Instruction, "Literal", [_t.lit("token")], {}, {}),
                mapOperator: _t.s_i_node(_l.Instruction, "Punctuator", ":"),
                value: _t.node(_l.Instruction, "Boolean", [_t.ref`value`], {
                  value: _t.s_i_node(_l.Instruction, "Keyword", "true")
                }, {})
              }, {})],
              close: _t.s_i_node(_l.Instruction, "Punctuator", "}")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {})) {
          yield* eatMatchTrivia();
        }
      } else {
        while (!(yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.s_node(_l.Instruction, "Identifier", "match"),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("</")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {}))) {
          yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
            verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
            arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
              values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
                type: _t.s_node(_l.Spamex, "Identifier", "NodeChild"),
                close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
              }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
                content: _t.node(_l.CSTML, "Content", [_t.lit("children[]")], {}, {}),
                close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
              }, {})],
              close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
            }, {})
          }, {});
          yield* eatMatchTrivia();
        }
      }
      if (!intrinsic) {
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "CloseNodeTag"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
      } else {
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Instruction, "Null", [_t.ref`value`], {
              value: _t.s_i_node(_l.Instruction, "Keyword", "null")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
      }
    }
  }
  *NodeChild({
    props,
    ctx
  }) {
    const {
      token
    } = ctx.unbox(props || {});
    if (token && ctx.unbox(token)) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "Match"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
            value: _t.s_i_node(_l.Instruction, "Keyword", "null")
          }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n        ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n        ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "["),
            elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
              values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
                type: _t.s_node(_l.Spamex, "Identifier", "Node"),
                close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
              }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
                alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("<")], {}, {}), _t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
                    element: _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\*")], {}, {
                      cooked: "*"
                    }))], {}, {}),
                    value: _t.s_i_node(_l.Regex, "Keyword", "?")
                  }, {
                    min: 0,
                    max: 1,
                    greedy: true
                  }), _t.node(_l.Regex, "Character", [_t.lit("@")], {}, {})]
                }, {})],
                close: _t.s_i_node(_l.Regex, "Punctuator", "/")
              }, {})],
              close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
            }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
              values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
                type: _t.s_node(_l.Spamex, "Identifier", "Literal"),
                close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
              }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
                alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                  elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                    elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
                    close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                  }, {})]
                }, {})],
                close: _t.s_i_node(_l.Regex, "Punctuator", "/")
              }, {})],
              close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", "]")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "Match"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
            value: _t.s_i_node(_l.Instruction, "Keyword", "null")
          }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n        ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n        ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n        ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "["),
            elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
              values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
                type: _t.s_node(_l.Spamex, "Identifier", "Node"),
                close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
              }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
                alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("<")], {}, {}), _t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
                    element: _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\*")], {}, {
                      cooked: "*"
                    }))], {}, {}),
                    value: _t.s_i_node(_l.Regex, "Keyword", "?")
                  }, {
                    min: 0,
                    max: 1,
                    greedy: true
                  }), _t.node(_l.Regex, "Character", [_t.lit("#")], {}, {})]
                }, {})],
                close: _t.s_i_node(_l.Regex, "Punctuator", "/")
              }, {})],
              close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
            }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
              values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
                type: _t.s_node(_l.Spamex, "Identifier", "Property"),
                close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
              }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
                alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                  elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                    escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                    value: _t.s_i_node(_l.Regex, "Keyword", "w")
                  }, {})]
                }, {})],
                close: _t.s_i_node(_l.Regex, "Punctuator", "/")
              }, {})],
              close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
            }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
              values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
                type: _t.s_node(_l.Spamex, "Identifier", "Literal"),
                close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
              }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
                alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                  elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                    elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
                    close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                  }, {})]
                }, {})],
                close: _t.s_i_node(_l.Regex, "Punctuator", "/")
              }, {})],
              close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", "]")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *Property() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Reference"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("reference")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield* eatMatchTrivia();
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(":")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("mapOperator")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield* eatMatchTrivia();
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "PropertyValue"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("node")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *PropertyValue() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Match"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_i_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n    ")], {}, {})), _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Null"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("null")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Gap"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("<//>")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Node"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.lit("<")], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                  negate: _t.s_i_node(_l.Regex, "Keyword", "^"),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("#")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("@")], {}, {})],
                  close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *OpenFragmentTag() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("<")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancedSpan")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("Tag")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {}), _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Flags() {
    let tr = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("#")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("triviaFlag")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("*")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("tokenFlag")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let esc = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("@")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("escapeFlag")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let exp = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("+")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("expressionFlag")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    if (tr && esc || exp && (tr || esc)) yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "fail"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *OpenNodeTag() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("<")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancedSpan")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("Tag")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {}), _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Flags"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "TagType"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let sp = yield* eatMatchTrivia();
    let iv;
    if (sp && (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "["),
              elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "]")
            }, {})]
          }, {})],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}))) {
      iv = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "String"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("intrinsicValue")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      sp = yield* eatMatchTrivia();
    }
    while (sp && (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "Character", [_t.lit("!")], {}, {}),
              value: _t.s_i_node(_l.Regex, "Keyword", "?")
            }, {
              min: 0,
              max: 1,
              greedy: true
            }), _t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
              value: _t.s_i_node(_l.Regex, "Keyword", "w")
            }, {})]
          }, {})],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}))) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "Attribute"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("attributes[]")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      sp = yield* eatMatchTrivia();
    }
    if (iv) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
            type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
            intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("/")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {}),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("selfClosingToken")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Instruction, "Null", [_t.ref`value`], {
            value: _t.s_i_node(_l.Instruction, "Keyword", "null")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("selfClosingToken")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *CloseNodeTag() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("</")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "TagType"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *CloseFragmentTag() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("</")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Attribute() {
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
              value: _t.s_i_node(_l.Regex, "Keyword", "w")
            }, {}), _t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_i_node(_l.Regex, "Keyword", "w")
                }, {}), _t.node(_l.Regex, "Character", [_t.lit("-")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("_")], {}, {})],
                close: _t.s_i_node(_l.Regex, "Punctuator", "]")
              }, {}),
              value: _t.s_i_node(_l.Regex, "Keyword", "*")
            }, {
              min: 0,
              max: Infinity,
              greedy: true
            }), _t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "SpaceCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                value: _t.s_i_node(_l.Regex, "Keyword", "s")
              }, {}),
              value: _t.s_i_node(_l.Regex, "Keyword", "*")
            }, {
              min: 0,
              max: Infinity,
              greedy: true
            }), _t.node(_l.Regex, "Character", [_t.lit("=")], {}, {})]
          }, {})],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "MappingAttribute"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "BooleanAttribute"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *BooleanAttribute() {
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("!")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("negated")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "bindAttribute"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("true")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}), _t.node(_l.Instruction, "Boolean", [_t.ref`value`], {
            value: _t.s_i_node(_l.Instruction, "Keyword", "false")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "bindAttribute"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("true")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}), _t.node(_l.Instruction, "Boolean", [_t.ref`value`], {
            value: _t.s_i_node(_l.Instruction, "Keyword", "true")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Identifier"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("key")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *MappingAttribute() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Identifier"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("key")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield* eatMatchTrivia();
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("=")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("mapOperator")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield* eatMatchTrivia();
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "AttributeValue"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *AttributeValue() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Match"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_i_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n        ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n        ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "String"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Number"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "DigitCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                    escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                    value: _t.s_i_node(_l.Regex, "Keyword", "d")
                  }, {}), _t.node(_l.Regex, "Character", [_t.lit("+")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("-")], {}, {})],
                  close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *TagType() {
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "["),
              elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "]")
            }, {})]
          }, {}), _t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_i_node(_l.Regex, "Keyword", "w")
                }, {}), _t.node(_l.Regex, "Character", [_t.lit(".")], {}, {})],
                close: _t.s_i_node(_l.Regex, "Punctuator", "]")
              }, {}),
              value: _t.s_i_node(_l.Regex, "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            }), _t.node(_l.Regex, "Character", [_t.lit(":")], {}, {})]
          }, {})],
          separators: [_t.s_i_node(_l.Regex, "Punctuator", "|")],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "Language"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("language")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
            type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
            intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(":")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {}),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("namespaceOperator")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
            type: _t.s_node(_l.Spamex, "Identifier", "Identifier"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("type")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
            type: _t.s_node(_l.Spamex, "Identifier", "Identifier"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("type")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *Language() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Match"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_i_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n    ")], {}, {})), _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "String"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "IdentifierPath"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_i_node(_l.Regex, "Keyword", "w")
                }, {})]
              }, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *IdentifierPath() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Identifier"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("segments[]")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit(".")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
            type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
            intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(".")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {}),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("separators[]")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
            type: _t.s_node(_l.Spamex, "Identifier", "Identifier"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("segments[]")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *String({
    ctx
  }) {
    let q = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "["),
              elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "]")
            }, {})]
          }, {})],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    if (!q) yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "fail"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    const q_ = ctx.unbox(q);
    yield q_.value === "'" ? _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "\""),
            content: _t.node(_l.CSTML, "Content", [_t.lit("'")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "\"")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "\""),
              content: _t.node(_l.CSTML, "Content", [_t.lit("'")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "\"")
            }, {})
          }, {}), _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancedSpan")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("String:Single")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}) : _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("\"")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("\"")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {}), _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancedSpan")], {}, {}),
            mapOperator: _t.s_i_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("String:Double")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "StringContent"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("content")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield q_.value === "'" ? _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "\""),
            content: _t.node(_l.CSTML, "Content", [_t.lit("'")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "\"")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}) : _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("\"")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *StringContent({
    state: {
      span
    }
  }) {
    let esc, lit;
    do {
      esc = (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "match"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\\\")], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {})) && (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`escapeFlag`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            escapeFlag: _t.s_i_node(_l.Spamex, "Punctuator", "@"),
            type: _t.s_node(_l.Spamex, "Identifier", "EscapeSequence"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {}));
      lit = span === 'String:Single' ? yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
                element: _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                  negate: _t.s_i_node(_l.Regex, "Keyword", "^"),
                  elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\r")], {}, {
                    cooked: "\r"
                  }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\n")], {}, {
                    cooked: "\n"
                  }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\\\")], {}, {
                    cooked: "\\"
                  }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("'")], {}, {})],
                  close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                }, {}),
                value: _t.s_i_node(_l.Regex, "Keyword", "+")
              }, {
                min: 1,
                max: Infinity,
                greedy: true
              })]
            }, {})],
            close: _t.s_i_node(_l.Regex, "Punctuator", "/")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {}) : yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
                element: _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                  negate: _t.s_i_node(_l.Regex, "Keyword", "^"),
                  elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\r")], {}, {
                    cooked: "\r"
                  }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\n")], {}, {
                    cooked: "\n"
                  }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\\\")], {}, {
                    cooked: "\\"
                  }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                }, {}),
                value: _t.s_i_node(_l.Regex, "Keyword", "+")
              }, {
                min: 1,
                max: Infinity,
                greedy: true
              })]
            }, {})],
            close: _t.s_i_node(_l.Regex, "Punctuator", "/")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } while (esc || lit);
  }
  *EscapeSequence({
    state: {
      span
    },
    ctx
  }) {
    if (!span.startsWith('String')) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "fail"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\\\")], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let match, cooked;
    if (match = span === 'String:Single' ? yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "["),
              elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\\\")], {}, {
                cooked: "\\"
              }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("/")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("n")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("r")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("t")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("0")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("'")], {}, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "]")
            }, {})]
          }, {})],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}) : yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "["),
              elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, "Escape", [_t.lit("\\\\")], {}, {
                cooked: "\\"
              }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("/")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("n")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("r")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("t")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("0")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "]")
            }, {})]
          }, {})],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      const match_ = ctx.unbox(match);
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
            type: _t.s_node(_l.Spamex, "Identifier", "Keyword"),
            intrinsicValue: buildString(match_.value),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      cooked = escapables.get(match_.value) || match_.value;
    } else if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "match"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("u")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      const codeNode = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            type: _t.s_node(_l.Spamex, "Identifier", "EscapeCode"),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      cooked = parseInt(ctx.getProperty(codeNode, 'digits').map(digit => ctx.getCooked(digit)).join(''), 16);
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "fail"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "bindAttribute"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), ..._interpolateArrayChildren(buildString(cooked.toString(10)), _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.s_node(_l.Instruction, "Identifier", "cooked"), ..._interpolateArray(buildString(cooked.toString(10)))],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *EscapeCode() {
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Keyword"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("u")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("type")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
            open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
            tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
            type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
            intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("{")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {}),
            close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {})) {
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Digits"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("digits[]")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
              type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
              intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
                content: _t.node(_l.CSTML, "Content", [_t.lit("}")], {}, {}),
                close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
              }, {}),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
      } else if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.s_node(_l.Instruction, "Identifier", "match"),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`open`, _t.ref`min`, _t.ref`close`], {
                element: _t.node(_l.Regex, "DigitCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_i_node(_l.Regex, "Keyword", "d")
                }, {}),
                open: _t.s_i_node(_l.Regex, "Punctuator", "{"),
                min: _t.node(_l.Regex, "Number", [_t.lit("4")], {}, {}),
                close: _t.s_i_node(_l.Regex, "Punctuator", "}")
              }, {
                min: 4,
                max: undefined,
                greedy: true
              })]
            }, {})],
            close: _t.s_i_node(_l.Regex, "Punctuator", "/")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {})) {
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Digits"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("digits[]")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Instruction, "Null", [_t.ref`value`], {
              value: _t.s_i_node(_l.Instruction, "Keyword", "null")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
              close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
      }
    }
  }
  *Identifier() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
              value: _t.s_i_node(_l.Regex, "Keyword", "w")
            }, {}), _t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_i_node(_l.Regex, "Keyword", "w")
                }, {}), _t.node(_l.Regex, "Character", [_t.lit("-")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("_")], {}, {})],
                close: _t.s_i_node(_l.Regex, "Punctuator", "]")
              }, {}),
              value: _t.s_i_node(_l.Regex, "Keyword", "*")
            }, {
              min: 0,
              max: Infinity,
              greedy: true
            })]
          }, {})],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Literal() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "String"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Number() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Match"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_i_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n      ")], {}, {})), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit("\n    ")], {}, {})), _t.ref`close`], {
          open: _t.s_i_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Integer"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
                  element: _t.node(_l.Regex, "Character", [_t.lit("-")], {}, {}),
                  value: _t.s_i_node(_l.Regex, "Keyword", "?")
                }, {
                  min: 0,
                  max: 1,
                  greedy: true
                }), _t.node(_l.Regex, "DigitCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_i_node(_l.Regex, "Keyword", "d")
                }, {})]
              }, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
              type: _t.s_node(_l.Spamex, "Identifier", "Infinity"),
              close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("+")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("-")], {}, {})],
                  close: _t.s_i_node(_l.Regex, "Punctuator", "]")
                }, {}), _t.node(_l.Regex, "Character", [_t.lit("I")], {}, {})]
              }, {})],
              close: _t.s_i_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_i_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *UnsignedInteger() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Digits"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("digits[]")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Integer() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("-")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("negative")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          type: _t.s_node(_l.Spamex, "Identifier", "Digits"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("digits[]")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Digits() {
    while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Digit"),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}));
  }
  *Digit() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "DigitCharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.s_i_node(_l.Regex, "Punctuator", "\\"),
              value: _t.s_i_node(_l.Regex, "Keyword", "d")
            }, {})]
          }, {})],
          close: _t.s_i_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Infinity() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eatMatch"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Punctuator"),
          intrinsicValue: _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_i_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_i_node(_l.Regex, "Punctuator", "["),
                elements: [_t.node(_l.Regex, "Character", [_t.lit("+")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("-")], {}, {})],
                close: _t.s_i_node(_l.Regex, "Punctuator", "]")
              }, {})]
            }, {})],
            close: _t.s_i_node(_l.Regex, "Punctuator", "/")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("sign")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.s_node(_l.Instruction, "Identifier", "eat"),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_i_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`tokenFlag`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, "Space", [_t.lit(" ")], {}, {})), _t.ref`intrinsicValue`, _t.ref`close`], {
          open: _t.s_i_node(_l.Spamex, "Punctuator", "<"),
          tokenFlag: _t.s_i_node(_l.Spamex, "Punctuator", "*"),
          type: _t.s_node(_l.Spamex, "Identifier", "Keyword"),
          intrinsicValue: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("Infinity")], {}, {}),
            close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_i_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_i_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_i_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_i_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Punctuator() {}
  *Keyword() {}
  *Match() {}
});
