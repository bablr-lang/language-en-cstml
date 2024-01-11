import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
import { interpolateString as _interpolateString } from "@bablr/boot-helpers/template";
import { interpolateArray as _interpolateArray } from "@bablr/boot-helpers/template";
import * as _t from "@bablr/boot-helpers/types";
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _initProto;
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
    verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
    verbSuffix: _t.node("Instruction", "Punctuator", [_t.lit`#`], {}, {}),
    arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
      open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
      values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
        open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
          elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
            element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
              value: _t.node("Regex", "Keyword", [_t.lit`s`], {}, {})
            }, {
              kind: "space"
            }),
            value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
          }, {
            min: 1,
            max: Infinity,
            greedy: true
          })]
        }, {})],
        close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
      }, {})],
      close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
    }, {})
  }, {})
}, (_dec = CoveredBy('PropertyValue'), _dec2 = CoveredBy('FragmentChild'), _dec3 = CoveredBy('NodeChild'), _dec4 = CoveredBy('TagType'), _dec5 = CoveredBy('TagType'), _dec6 = CoveredBy('NodeChild'), _dec7 = CoveredBy('Terminal'), _dec8 = CoveredBy('Terminal'), _dec9 = CoveredBy('FragmentChild'), _dec10 = CoveredBy('NodeChild'), _dec11 = CoveredBy('Terminal'), _dec12 = CoveredBy('PropertyValue'), _dec13 = InjectFrom(productions), _dec14 = InjectFrom(productions), _dec15 = InjectFrom(productions), class CSTMLGrammar {
  static {
    [_initProto] = _applyDecs(this, [[[Node, _dec], 2, "Node"], [Node, 2, "Reference"], [[Node, _dec2, _dec3], 2, "Property"], [Node, 2, "OpenFragmentTag"], [Node, 2, "OpenNodeTag"], [Node, 2, "CloseNodeTag"], [Node, 2, "CloseFragmentTag"], [Node, 2, "BooleanAttribute"], [Node, 2, "MappingAttribute"], [[Node, _dec4], 2, "GlobalIdentifier"], [[Node, _dec5], 2, "Identifier"], [_dec6, 2, "Terminal"], [[Node, _dec7], 2, "Escape"], [[Node, _dec8, _dec9, _dec10], 2, "Trivia"], [[Node, _dec11], 2, "Literal"], [Node, 2, "String"], [Node, 2, "Content"], [Node, 2, "Integer"], [Node, 2, "Digit"], [Node, 2, "Infinity"], [[Node, _dec12], 2, "Null"], [[_dec13, Node], 2, "Punctuator"], [[_dec14, Node], 2, "Keyword"], [_dec15, 2, "Match"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  *Fragment() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`OpenFragmentTag`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`open`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`FragmentChild`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`children[]`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {}));
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`CloseFragmentTag`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`close`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *FragmentChild() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Match`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.node("Instruction", "Keyword", [_t.lit`null`], {}, {})
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.trivia`\n        `, _t.ref`elements[]`, _t.trivia`\n        `, _t.ref`elements[]`, _t.trivia`\n      `, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`[`], {}, {}),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Trivia`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit`#`], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {})]
              }, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Property`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                  value: _t.node("Regex", "Keyword", [_t.lit`w`], {}, {})
                }, {
                  kind: "word"
                })]
              }, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`]`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Node() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`<>`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`fail`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`OpenNodeTag`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`open`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`NodeChildren`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`CloseNodeTag`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`close`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *NodeChildren() {
    let properties = 0;
    let child;
    while (child = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`NodeChild`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`children[]`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      if (child.type === 'Property') {
        properties++;
      }
    }
    if (!properties) yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`fail`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *NodeChild(props, s) {
    if (s.span === 'Terminal') {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Match`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
          }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
            value: _t.node("Instruction", "Keyword", [_t.lit`null`], {}, {})
          }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.trivia`\n          `, _t.ref`elements[]`, _t.trivia`\n          `, _t.ref`elements[]`, _t.trivia`\n        `, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`[`], {}, {}),
            elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
              values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
                type: _t.node("Spamex", "Identifier", [_t.lit`Trivia`], {}, {}),
                close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
              }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                  elements: [_t.node("Regex", "Character", [_t.lit`#`], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                    elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                    close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                  }, {})]
                }, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
            }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
              values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
                type: _t.node("Spamex", "Identifier", [_t.lit`Terminal`], {}, {}),
                close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
              }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                  elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                    element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                      open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                      elements: [_t.node("Regex", "Character", [_t.lit`!`], {}, {}), _t.node("Regex", "Character", [_t.lit`#`], {}, {})],
                      close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                    }, {}),
                    value: _t.node("Regex", "Keyword", [_t.lit`?`], {}, {})
                  }, {
                    min: 0,
                    max: 1,
                    greedy: true
                  }), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                    elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                    close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                  }, {})]
                }, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`]`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    } else {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Match`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
          }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
            value: _t.node("Instruction", "Keyword", [_t.lit`null`], {}, {})
          }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.trivia`\n          `, _t.ref`elements[]`, _t.trivia`\n          `, _t.ref`elements[]`, _t.trivia`\n        `, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`[`], {}, {}),
            elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
              values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
                type: _t.node("Spamex", "Identifier", [_t.lit`Trivia`], {}, {}),
                close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
              }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                  elements: [_t.node("Regex", "Character", [_t.lit`#`], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                    elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                    close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                  }, {})]
                }, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
            }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
              values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
                type: _t.node("Spamex", "Identifier", [_t.lit`Property`], {}, {}),
                close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
              }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                  elements: [_t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                    escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                    value: _t.node("Regex", "Keyword", [_t.lit`w`], {}, {})
                  }, {
                    kind: "word"
                  })]
                }, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`]`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    }
  }
  *Reference() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Identifier`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`path`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`[]`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`pathIsArray`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`:`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`mapOperator`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Property() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Reference`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`reference`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`PropertyValue`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`node`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *PropertyValue() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Match`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.node("Instruction", "Keyword", [_t.lit`null`], {}, {})
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.trivia`\n        `, _t.ref`elements[]`, _t.trivia`\n        `, _t.ref`elements[]`, _t.trivia`\n      `, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`[`], {}, {}),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Null`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              content: _t.node("String", "Content", [_t.lit`null`], {}, {}),
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Node`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              content: _t.node("String", "Content", [_t.lit`<`], {}, {}),
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`]`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *OpenFragmentTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`<>`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`value`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *OpenNodeTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`attributes[]`, _t.trivia` `, _t.ref`attributes[]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`<`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`lexicalSpan`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              content: _t.node("String", "Content", [_t.lit`Tag`], {}, {}),
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {}), _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              content: _t.node("String", "Content", [_t.lit`>`], {}, {}),
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`open`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`TagType`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`type`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Attribute`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`attributes[]`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {}));
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`attributes[]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`>`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`close`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *CloseNodeTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`</>`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`value`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *CloseFragmentTag() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`</>`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`value`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Attribute() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                value: _t.node("Regex", "Keyword", [_t.lit`w`], {}, {})
              }, {
                kind: "word"
              }),
              value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            }), _t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                value: _t.node("Regex", "Keyword", [_t.lit`s`], {}, {})
              }, {
                kind: "space"
              }),
              value: _t.node("Regex", "Keyword", [_t.lit`*`], {}, {})
            }, {
              min: 0,
              max: Infinity,
              greedy: true
            }), _t.node("Regex", "Character", [_t.lit`=`], {}, {})]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`MappingAttribute`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    } else {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`BooleanAttribute`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    }
  }
  *BooleanAttribute() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Identifier`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`key`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *MappingAttribute() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Identifier`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`key`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`=`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`mapOperator`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`AttributeValue`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`value`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *AttributeValue() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Match`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.node("Instruction", "Keyword", [_t.lit`null`], {}, {})
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.trivia`\n          `, _t.ref`elements[]`, _t.trivia`\n          `, _t.ref`elements[]`, _t.trivia`\n        `, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`[`], {}, {}),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`String`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {})]
              }, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Number`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit`-`], {}, {})]
              }, {}), _t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                  value: _t.node("Regex", "Keyword", [_t.lit`d`], {}, {})
                }, {
                  kind: "digit"
                })]
              }, {})],
              separators: [_t.node("Regex", "Punctuator", [_t.lit`|`], {}, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`]`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *TagType() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                value: _t.node("Regex", "Keyword", [_t.lit`w`], {}, {})
              }, {
                kind: "word"
              }),
              value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            }), _t.node("Regex", "Character", [_t.lit`:`], {}, {})]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`GlobalIdentifier`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    } else {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Identifier`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`type`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    }
  }
  *GlobalIdentifier() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Identifier`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`language`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`:`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`namespaceOperator`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Identifier`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`type`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Identifier() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                value: _t.node("Regex", "Keyword", [_t.lit`w`], {}, {})
              }, {
                kind: "word"
              }),
              value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            })]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Terminal() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Match`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.node("Instruction", "Keyword", [_t.lit`null`], {}, {})
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.trivia`\n          `, _t.ref`elements[]`, _t.trivia`\n          `, _t.ref`elements[]`, _t.trivia`\n          `, _t.ref`elements[]`, _t.trivia`\n        `, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`[`], {}, {}),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Escape`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit`!`], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {})]
              }, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Trivia`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit`#`], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {})]
              }, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Literal`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {})]
              }, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`]`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Escape() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`!`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`escapeOperator`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`String`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`rawValue`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`:`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`rawOperator`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`String`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`value`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Trivia() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`#`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`trivializeOperator`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`String`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`value`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Literal() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`String`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`value`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *String() {
    let q = (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
              elements: [_t.node("Regex", "Character", [_t.lit`'`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
            }, {})]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})).value;
    if (q) {
      yield q === "'" ? _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`attributes[]`, _t.trivia` `, _t.ref`attributes[]`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`"`], {}, {}),
              content: _t.node("String", "Content", [_t.lit`'`], {}, {}),
              close: _t.node("String", "Punctuator", [_t.lit`"`], {}, {})
            }, {}),
            attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
              key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
              mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
              value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                open: _t.node("String", "Punctuator", [_t.lit`"`], {}, {}),
                content: _t.node("String", "Content", [_t.lit`'`], {}, {}),
                close: _t.node("String", "Punctuator", [_t.lit`"`], {}, {})
              }, {})
            }, {}), _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
              key: _t.node("Spamex", "Literal", [_t.lit`lexicalSpan`], {}, {}),
              mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
              value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
                content: _t.node("String", "Content", [_t.lit`String:Single`], {}, {}),
                close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
              }, {})
            }, {})],
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`open`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {}) : _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`attributes[]`, _t.trivia` `, _t.ref`attributes[]`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              content: _t.node("String", "Content", [_t.lit`"`], {}, {}),
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {}),
            attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
              key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
              mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
              value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
                content: _t.node("String", "Content", [_t.lit`"`], {}, {}),
                close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
              }, {})
            }, {}), _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
              key: _t.node("Spamex", "Literal", [_t.lit`lexicalSpan`], {}, {}),
              mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
              value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
                content: _t.node("String", "Content", [_t.lit`String:Double`], {}, {}),
                close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
              }, {})
            }, {})],
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`open`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Content`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`content`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
      yield q === "'" ? _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`attributes[]`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`"`], {}, {}),
              content: _t.node("String", "Content", [_t.lit`'`], {}, {}),
              close: _t.node("String", "Punctuator", [_t.lit`"`], {}, {})
            }, {}),
            attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
              key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
            }, {})],
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`close`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {}) : _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`attributes[]`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              content: _t.node("String", "Content", [_t.lit`"`], {}, {}),
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {}),
            attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
              key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
            }, {})],
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`close`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    }
  }
  *Content(props, {
    span
  }) {
    let esc, lit;
    do {
      esc = span === 'String:Single' ? yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`verbSuffix`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
        verbSuffix: _t.node("Instruction", "Punctuator", [_t.lit`!`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
              elements: [_t.node("Regex", "Character", [_t.esc(`\\\\`, `\\`)], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                elements: [_t.node("Regex", "Character", [_t.esc(`\\\\`, `\\`)], {}, {}), _t.node("Regex", "Character", [_t.lit`u`], {}, {}), _t.node("Regex", "Character", [_t.lit`n`], {}, {}), _t.node("Regex", "Character", [_t.lit`r`], {}, {}), _t.node("Regex", "Character", [_t.lit`t`], {}, {}), _t.node("Regex", "Character", [_t.lit`0`], {}, {}), _t.node("Regex", "Character", [_t.lit`'`], {}, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
              }, {})]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {}) : yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`verbSuffix`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
        verbSuffix: _t.node("Instruction", "Punctuator", [_t.lit`!`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
              elements: [_t.node("Regex", "Character", [_t.esc(`\\\\`, `\\`)], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                elements: [_t.node("Regex", "Character", [_t.esc(`\\\\`, `\\`)], {}, {}), _t.node("Regex", "Character", [_t.lit`u`], {}, {}), _t.node("Regex", "Character", [_t.lit`n`], {}, {}), _t.node("Regex", "Character", [_t.lit`r`], {}, {}), _t.node("Regex", "Character", [_t.lit`t`], {}, {}), _t.node("Regex", "Character", [_t.lit`0`], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
              }, {})]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
      lit = span === 'String:Single' ? yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  negate: _t.node("Regex", "Keyword", [_t.lit`^`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.esc(`\\r`, `\r`)], {}, {}), _t.node("Regex", "Character", [_t.esc(`\\n`, `\n`)], {}, {}), _t.node("Regex", "Character", [_t.esc(`\\0`, `\0`)], {}, {}), _t.node("Regex", "Character", [_t.esc(`\\\\`, `\\`)], {}, {}), _t.node("Regex", "Character", [_t.lit`'`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {}),
                value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
              }, {
                min: 1,
                max: Infinity,
                greedy: true
              })]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {}) : yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  negate: _t.node("Regex", "Keyword", [_t.lit`^`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.esc(`\\r`, `\r`)], {}, {}), _t.node("Regex", "Character", [_t.esc(`\\n`, `\n`)], {}, {}), _t.node("Regex", "Character", [_t.esc(`\\0`, `\0`)], {}, {}), _t.node("Regex", "Character", [_t.esc(`\\\\`, `\\`)], {}, {}), _t.node("Regex", "Character", [_t.lit`"`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {}),
                value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
              }, {
                min: 1,
                max: Infinity,
                greedy: true
              })]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    } while (esc || lit);
  }
  *Integer() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`-`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`negative`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Digits`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`digits[]`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Digits() {
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Digit`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {}));
  }
  *Digit() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
              value: _t.node("Regex", "Keyword", [_t.lit`d`], {}, {})
            }, {
              kind: "digit"
            })]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Infinity() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`-`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`negative`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`Infinity`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`value`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Null() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.trivia` `, _t.ref`values[]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TerminalMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            content: _t.node("String", "Content", [_t.lit`null`], {}, {}),
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
          content: _t.node("String", "Content", [_t.lit`value`], {}, {}),
          close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Punctuator() {}
  *Keyword() {}
  *Match() {}
}));
