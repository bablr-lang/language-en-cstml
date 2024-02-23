import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
import { interpolateString as _interpolateString } from "@bablr/agast-helpers/template";
import { interpolateArray as _interpolateArray } from "@bablr/agast-helpers/template";
import * as _t from "@bablr/agast-helpers/shorthand";
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _initProto;
import { Node, CoveredBy, InjectFrom } from '@bablr/helpers/decorators';
import { triviaEnhancer } from '@bablr/helpers/trivia';
import * as productions from '@bablr/helpers/productions';
import objectEntries from 'iter-tools-es/methods/object-entries';
export const name = 'CSTML';
const escapables = new Map(objectEntries({
  n: '\n',
  r: '\r',
  t: '\t',
  0: '\0'
}));
export const cookEscape = (escape, span) => {
  let hexMatch;
  if (!span.startsWith('String')) {
    throw new Error('invalid span');
  }
  if (!escape.startsWith('\\')) {
    throw new Error('string escape must start with \\');
  }
  if (hexMatch = /\\u([0-9a-f]{4})/iy.exec(escape)) {
    //continue
  } else if (hexMatch = /\\u{([0-9a-f]+)}/iy.exec(escape)) {
    //continue
  }
  if (hexMatch) {
    return parseInt(hexMatch[1], 16);
  }
  let pattern;
  switch (span) {
    case 'String:Single':
      pattern = /\\([\\nrt0'])/y;
      break;
    case 'String:Double':
      pattern = /\\([\\nrt0"])/y;
      break;
    default:
      throw new Error();
  }
  let litMatch = pattern.exec(escape);
  if (litMatch) {
    return escapables.get(litMatch[1]) || litMatch[1];
  }

  // Note: this differs from JS which allows them
  throw new Error('Redundant escapes are illegal in CSTML strings');
};
export const grammar = triviaEnhancer({
  triviaIsAllowed: s => ['Bare', 'Tag'].includes(s.span),
  eatMatchTrivia: _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`verbSuffix`, _t.ref`arguments`], {
    verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
    verbSuffix: _t.s_node("Instruction", "Punctuator", "#"),
    arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
      open: _t.s_node("Instruction", "Punctuator", "("),
      values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
        open: _t.s_node("Regex", "Punctuator", "/"),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
          elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
            element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.s_node("Regex", "Punctuator", "\\"),
              value: _t.s_node("Regex", "Keyword", "s")
            }, {
              kind: "space"
            }),
            value: _t.s_node("Regex", "Keyword", "+")
          }, {
            min: 1,
            max: Infinity,
            greedy: true
          })]
        }, {})],
        close: _t.s_node("Regex", "Punctuator", "/")
      }, {})],
      close: _t.s_node("Instruction", "Punctuator", ")")
    }, {})
  }, {})
}, (_dec = CoveredBy('PropertyValue'), _dec2 = CoveredBy('PropertyValue'), _dec3 = CoveredBy('FragmentChild'), _dec4 = CoveredBy('NodeChild'), _dec5 = CoveredBy('Attribute'), _dec6 = CoveredBy('Attribute'), _dec7 = CoveredBy('TagType'), _dec8 = CoveredBy('TagType'), _dec9 = CoveredBy('NodeChild'), _dec10 = CoveredBy('Terminal'), _dec11 = CoveredBy('Terminal'), _dec12 = CoveredBy('FragmentChild'), _dec13 = CoveredBy('NodeChild'), _dec14 = CoveredBy('Terminal'), _dec15 = InjectFrom(productions), _dec16 = InjectFrom(productions), _dec17 = InjectFrom(productions), class CSTMLGrammar {
  static {
    [_initProto] = _applyDecs(this, [[Node, 2, "Fragment"], [Node, 2, "Reference"], [[Node, _dec], 2, "Gap"], [[Node, _dec2], 2, "Node"], [[Node, _dec3, _dec4], 2, "Property"], [Node, 2, "OpenFragmentTag"], [Node, 2, "FragmentFlags"], [Node, 2, "OpenNodeTag"], [Node, 2, "NodeFlags"], [Node, 2, "CloseNodeTag"], [Node, 2, "CloseFragmentTag"], [[Node, _dec5], 2, "BooleanAttribute"], [[Node, _dec6], 2, "MappingAttribute"], [[Node, _dec7], 2, "GlobalIdentifier"], [[Node, _dec8], 2, "Identifier"], [_dec9, 2, "Terminal"], [[Node, _dec10], 2, "Escape"], [[Node, _dec11, _dec12, _dec13], 2, "Trivia"], [[Node, _dec14], 2, "Literal"], [Node, 2, "Integer"], [Node, 2, "Digit"], [Node, 2, "Infinity"], [[Node, _dec15], 2, "Punctuator"], [[Node, _dec16], 2, "Keyword"], [_dec17, 2, "Match"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  *Fragment() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("OpenFragmentTag")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("FragmentChild")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("children[]")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {}));
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("CloseFragmentTag")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *FragmentChild() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.s_node("Instruction", "Keyword", "null")
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n        "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n        "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n      "
        }, {}, []), _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "["),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Trivia")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit("#")], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("'")], {}, {}), _t.node("Regex", "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Property")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_node("Regex", "Punctuator", "\\"),
                  value: _t.s_node("Regex", "Keyword", "w")
                }, {
                  kind: "word"
                })]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", "]")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Reference() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Identifier")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("path")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("[]")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("pathIsArray")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit(":")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("mapOperator")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Gap() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("<//>")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Node() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("OpenNodeTag")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("NodeChild")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("children[]")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {}));
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("CloseNodeTag")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *NodeChild() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.s_node("Instruction", "Keyword", "null")
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n          "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n          "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n          "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n        "
        }, {}, []), _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "["),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Trivia")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit("#")], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("'")], {}, {}), _t.node("Regex", "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Property")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_node("Regex", "Punctuator", "\\"),
                  value: _t.s_node("Regex", "Keyword", "w")
                }, {
                  kind: "word"
                })]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Terminal")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                  element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.s_node("Regex", "Punctuator", "["),
                    elements: [_t.node("Regex", "Character", [_t.lit("!")], {}, {}), _t.node("Regex", "Character", [_t.lit("#")], {}, {})],
                    close: _t.s_node("Regex", "Punctuator", "]")
                  }, {}),
                  value: _t.s_node("Regex", "Keyword", "?")
                }, {
                  min: 0,
                  max: 1,
                  greedy: true
                }), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("'")], {}, {}), _t.node("Regex", "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", "]")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Property() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Reference")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("reference")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("PropertyValue")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("node")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *PropertyValue() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.s_node("Instruction", "Keyword", "null")
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n        "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n        "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n      "
        }, {}, []), _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "["),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Gap")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("null")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Node")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("<")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", "]")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *OpenFragmentTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`attributes[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("<")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("lexicalSpan")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("Tag")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {}), _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit(">")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("FragmentFlags")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("flags")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit(">")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *FragmentFlags() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("#")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("commentFlag")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *OpenNodeTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`attributes[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("<")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("lexicalSpan")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("Tag")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {}), _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit(">")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("NodeFlags")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("flags")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("TagType")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("type")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Attribute")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("attributes[]")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {}));
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit(">")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *NodeFlags() {
    let sf = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("*")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("syntacticFlag")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    if (!sf) yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("#")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("commentFlag")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("@")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("escapeFlag")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *CloseNodeTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("</>")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *CloseFragmentTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("</>")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Attribute() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node("Regex", "Punctuator", "/"),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node("Regex", "Punctuator", "\\"),
                value: _t.s_node("Regex", "Keyword", "w")
              }, {
                kind: "word"
              }),
              value: _t.s_node("Regex", "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            }), _t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node("Regex", "Punctuator", "\\"),
                value: _t.s_node("Regex", "Keyword", "s")
              }, {
                kind: "space"
              }),
              value: _t.s_node("Regex", "Keyword", "*")
            }, {
              min: 0,
              max: Infinity,
              greedy: true
            }), _t.node("Regex", "Character", [_t.lit("=")], {}, {})]
          }, {})],
          close: _t.s_node("Regex", "Punctuator", "/")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            type: _t.node("Spamex", "Identifier", [_t.lit("MappingAttribute")], {}, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            type: _t.node("Spamex", "Identifier", [_t.lit("BooleanAttribute")], {}, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *BooleanAttribute() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Identifier")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("key")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *MappingAttribute() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Identifier")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("key")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("=")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("mapOperator")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("AttributeValue")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *AttributeValue() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.s_node("Instruction", "Keyword", "null")
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n          "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n          "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n        "
        }, {}, []), _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "["),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("String")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("'")], {}, {}), _t.node("Regex", "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Number")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit("-")], {}, {})]
              }, {}), _t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_node("Regex", "Punctuator", "\\"),
                  value: _t.s_node("Regex", "Keyword", "d")
                }, {
                  kind: "digit"
                })]
              }, {})],
              separators: [_t.s_node("Regex", "Punctuator", "|")],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", "]")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *TagType() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node("Regex", "Punctuator", "/"),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node("Regex", "Punctuator", "\\"),
                value: _t.s_node("Regex", "Keyword", "w")
              }, {
                kind: "word"
              }),
              value: _t.s_node("Regex", "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            }), _t.node("Regex", "Character", [_t.lit(":")], {}, {})]
          }, {})],
          close: _t.s_node("Regex", "Punctuator", "/")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            type: _t.node("Spamex", "Identifier", [_t.lit("GlobalIdentifier")], {}, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            type: _t.node("Spamex", "Identifier", [_t.lit("Identifier")], {}, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("type")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *GlobalIdentifier() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Identifier")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("language")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit(":")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("namespaceOperator")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Identifier")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("type")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Identifier() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node("Regex", "Punctuator", "/"),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node("Regex", "Punctuator", "\\"),
                value: _t.s_node("Regex", "Keyword", "w")
              }, {
                kind: "word"
              }),
              value: _t.s_node("Regex", "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            })]
          }, {})],
          close: _t.s_node("Regex", "Punctuator", "/")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Terminal() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.s_node("Instruction", "Keyword", "null")
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n          "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n          "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n          "
        }, {}, []), _t.ref`elements[]`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: "\n        "
        }, {}, []), _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "["),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Escape")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit("!")], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("'")], {}, {}), _t.node("Regex", "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Trivia")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit("#")], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("'")], {}, {}), _t.node("Regex", "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
            type: "Literal",
            value: " "
          }, {}, []), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Literal")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("'")], {}, {}), _t.node("Regex", "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", "]")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Escape() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("!")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("escapeOperator")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("String")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("rawValue")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit(":")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("rawOperator")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("String")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Trivia() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("#")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("trivializeOperator")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("String")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Literal() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("String")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Integer() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("-")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("negative")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Digits")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("digits[]")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Digits() {
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Digit")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {}));
  }
  *Digit() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node("Regex", "Punctuator", "/"),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.s_node("Regex", "Punctuator", "\\"),
              value: _t.s_node("Regex", "Keyword", "d")
            }, {
              kind: "digit"
            })]
          }, {})],
          close: _t.s_node("Regex", "Punctuator", "/")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Infinity() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("-")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("negative")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.t_node('Space', 'Space', {
        type: "Literal",
        value: " "
      }, {}, []), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`type`, _t.t_node('Space', 'Space', {
          type: "Literal",
          value: " "
        }, {}, []), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("Infinity")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Punctuator() {}
  *Keyword() {}
  *Match() {}
}));
