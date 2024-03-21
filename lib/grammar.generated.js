import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
import { interpolateString as _interpolateString } from "@bablr/agast-helpers/template";
import { interpolateArrayChildren as _interpolateArrayChildren } from "@bablr/agast-helpers/template";
import { interpolateArray as _interpolateArray } from "@bablr/agast-helpers/template";
import * as _l from "@bablr/agast-vm-helpers/languages";
import * as _t from "@bablr/agast-helpers/shorthand";
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _initProto;
import objectEntries from 'iter-tools-es/methods/object-entries';
import { Node, CoveredBy, InjectFrom } from '@bablr/helpers/decorators';
import { triviaEnhancer } from '@bablr/helpers/trivia';
import * as productions from '@bablr/helpers/productions';
import * as Comment from '@bablr/language-c-comments';
export const name = 'CSTML';
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
const arrayLast = arr => arr[arr.length - 1];
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
  *eatMatchTrivia() {
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "["),
              elements: [_t.node(_l.Regex, "Character", [_t.lit(" ")], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.Escape, 'SymbolicEscape', [{
                type: "Literal",
                value: "\\t"
              }], {}, {
                cooked: "\t"
              }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.Escape, 'SymbolicEscape', [{
                type: "Literal",
                value: "\\n"
              }], {}, {
                cooked: "\n"
              }))], {}, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "]")
            }, {})]
          }, {}), _t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.Escape, 'SymbolicEscape', [{
              type: "Literal",
              value: "\\/"
            }], {}, {
              cooked: "/"
            }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.Escape, 'SymbolicEscape', [{
              type: "Literal",
              value: "\\*"
            }], {}, {
              cooked: "*"
            }))], {}, {})]
          }, {}), _t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.Escape, 'SymbolicEscape', [{
              type: "Literal",
              value: "\\/"
            }], {}, {
              cooked: "/"
            }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.Escape, 'SymbolicEscape', [{
              type: "Literal",
              value: "\\/"
            }], {}, {
              cooked: "/"
            }))], {}, {})]
          }, {})],
          separators: [_t.s_node(_l.Regex, "Punctuator", "|"), _t.s_node(_l.Regex, "Punctuator", "|")],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`language`, _t.ref`namespaceOperator`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            language: _t.node(_l.Spamex, "Identifier", [_t.lit("Comment")], {}, {}),
            namespaceOperator: _t.s_node(_l.Spamex, "Punctuator", ":"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Trivia")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
}, (_dec = CoveredBy('Tree'), _dec2 = CoveredBy('Token'), _dec3 = CoveredBy('Token'), _dec4 = CoveredBy('PropertyValue'), _dec5 = CoveredBy('PropertyValue'), _dec6 = CoveredBy('Tree'), _dec7 = CoveredBy('FragmentChild'), _dec8 = CoveredBy('NodeChild'), _dec9 = CoveredBy('Token'), _dec10 = CoveredBy('Token'), _dec11 = CoveredBy('Token'), _dec12 = CoveredBy('Token'), _dec13 = CoveredBy('Attribute'), _dec14 = CoveredBy('Attribute'), _dec15 = CoveredBy('Token'), _dec16 = CoveredBy('NodeChild'), _dec17 = InjectFrom(productions), _dec18 = InjectFrom(productions), _dec19 = InjectFrom(productions), class CSTMLGrammar {
  static {
    [_initProto] = _applyDecs(this, [[[Node, _dec], 2, "Fragment"], [[Node, _dec2], 2, "Reference"], [[Node, _dec3, _dec4], 2, "Gap"], [[Node, _dec5, _dec6], 2, "Node"], [[Node, _dec7, _dec8], 2, "Property"], [[Node, _dec9], 2, "OpenFragmentTag"], [Node, 2, "FragmentFlags"], [[Node, _dec10], 2, "OpenNodeTag"], [Node, 2, "NodeFlags"], [[Node, _dec11], 2, "CloseNodeTag"], [[Node, _dec12], 2, "CloseFragmentTag"], [[Node, _dec13], 2, "BooleanAttribute"], [[Node, _dec14], 2, "MappingAttribute"], [Node, 2, "Identifier"], [[Node, _dec15, _dec16], 2, "Literal"], [Node, 2, "Integer"], [Node, 2, "Digit"], [Node, 2, "Infinity"], [[Node, _dec17], 2, "Punctuator"], [[Node, _dec18], 2, "Keyword"], [_dec19, 2, "Match"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  *Stream() {
    let openTags = [];
    let result;
    while (result = arrayLast(openTags) === 'OpenFragmentTag' ? yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Token")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Object", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`properties[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "{"),
          properties: [_t.node(_l.Instruction, "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`value`], {
            key: _t.node(_l.Instruction, "Literal", [_t.lit("isFragment")], {}, {}),
            mapOperator: _t.s_node(_l.Instruction, "Punctuator", ":"),
            value: _t.node(_l.Instruction, "Boolean", [_t.ref`value`], {
              value: _t.s_node(_l.Instruction, "Keyword", "true")
            }, {})
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "}")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}) : yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Token")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      switch (result[0].type) {
        case 'OpenFragmentTag':
        case 'OpenNodeTag':
          {
            openTags.push(result.type);
            break;
          }
        case 'CloseFragmentTag':
        case 'CloseNodeTag':
          {
            openTags.pop();
            break;
          }
      }
    }
  }
  *Token(props, s, ctx) {
    const {
      inFragment
    } = ctx.unbox(props);
    if (!inFragment) throw new Error('Token.props.inFragment is required');
    const closeTag = ctx.unbox(inFragment) ? _t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
      open: _t.s_node(_l.Spamex, "Punctuator", "<"),
      type: _t.node(_l.Spamex, "Identifier", [_t.lit("CloseFragmentTag")], {}, {}),
      close: _t.s_node(_l.Spamex, "Punctuator", ">")
    }, {}) : _t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
      open: _t.s_node(_l.Spamex, "Punctuator", "<"),
      type: _t.node(_l.Spamex, "Identifier", [_t.lit("CloseNodeTag")], {}, {}),
      close: _t.s_node(_l.Spamex, "Punctuator", ">")
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Gap")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("<//>")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Reference")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_node(_l.Regex, "Keyword", "w")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Literal")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, ..._interpolateArrayChildren(closeTag, _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [..._interpolateArray(closeTag), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("</")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("OpenFragmentTag")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.lit("<")], {}, {}), _t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
                  element: _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.s_node(_l.Regex, "Punctuator", "["),
                    elements: [_t.node(_l.Regex, "Character", [_t.lit("#")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("@")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("*")], {}, {})],
                    close: _t.s_node(_l.Regex, "Punctuator", "]")
                  }, {}),
                  value: _t.s_node(_l.Regex, "Keyword", "*")
                }, {
                  min: 0,
                  max: Infinity,
                  greedy: true
                }), _t.node(_l.Regex, "Character", [_t.lit(">")], {}, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("OpenNodeTag")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("<")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Tree() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Fragment")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.lit("<")], {}, {}), _t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
                  element: _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.s_node(_l.Regex, "Punctuator", "["),
                    elements: [_t.node(_l.Regex, "Character", [_t.lit("#")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("@")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("*")], {}, {})],
                    close: _t.s_node(_l.Regex, "Punctuator", "]")
                  }, {}),
                  value: _t.s_node(_l.Regex, "Keyword", "*")
                }, {
                  min: 0,
                  max: Infinity,
                  greedy: true
                }), _t.node(_l.Regex, "Character", [_t.lit(">")], {}, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Node")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("<")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Fragment() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("OpenFragmentTag")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("FragmentChild")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("children[]")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}));
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("CloseFragmentTag")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *FragmentChild() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Node")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.lit("<")], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("#")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("@")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Property")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_node(_l.Regex, "Keyword", "w")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Reference() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Identifier")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("name")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("[]")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("arrayOperator")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Gap() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("<//>")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Node() {
    let open = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("OpenNodeTag")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    if (open.properties.flags?.properties.token) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("NodeChild")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("children[]")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}), _t.node(_l.Instruction, "Object", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`properties[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "{"),
            properties: [_t.node(_l.Instruction, "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`value`], {
              key: _t.node(_l.Instruction, "Literal", [_t.lit("token")], {}, {}),
              mapOperator: _t.s_node(_l.Instruction, "Punctuator", ":"),
              value: _t.node(_l.Instruction, "Boolean", [_t.ref`value`], {
                value: _t.s_node(_l.Instruction, "Keyword", "true")
              }, {})
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", "}")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("NodeChild")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("children[]")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {}));
    }
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("CloseNodeTag")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *NodeChild(props, s, ctx) {
    const {
      token
    } = ctx.unbox(props) || {};
    if (token && ctx.unbox(token)) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Literal")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
            value: _t.s_node(_l.Instruction, "Keyword", "null")
          }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: "\n          "
          }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: "\n          "
          }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: "\n          "
          }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: "\n        "
          }], {}, [])), _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "["),
            elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
              open: _t.s_node(_l.Instruction, "Punctuator", "("),
              values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.s_node(_l.Spamex, "Punctuator", "<"),
                type: _t.node(_l.Spamex, "Identifier", [_t.lit("Node")], {}, {}),
                close: _t.s_node(_l.Spamex, "Punctuator", ">")
              }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.s_node(_l.Regex, "Punctuator", "/"),
                alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("<")], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.s_node(_l.Regex, "Punctuator", "["),
                    elements: [_t.node(_l.Regex, "Character", [_t.lit("#")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("@")], {}, {})],
                    close: _t.s_node(_l.Regex, "Punctuator", "]")
                  }, {})]
                }, {})],
                close: _t.s_node(_l.Regex, "Punctuator", "/")
              }, {})],
              close: _t.s_node(_l.Instruction, "Punctuator", ")")
            }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
              open: _t.s_node(_l.Instruction, "Punctuator", "("),
              values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.s_node(_l.Spamex, "Punctuator", "<"),
                type: _t.node(_l.Spamex, "Identifier", [_t.lit("Property")], {}, {}),
                close: _t.s_node(_l.Spamex, "Punctuator", ">")
              }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.s_node(_l.Regex, "Punctuator", "/"),
                alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                  elements: [_t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                    escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                    value: _t.s_node(_l.Regex, "Keyword", "w")
                  }, {})]
                }, {})],
                close: _t.s_node(_l.Regex, "Punctuator", "/")
              }, {})],
              close: _t.s_node(_l.Instruction, "Punctuator", ")")
            }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
              open: _t.s_node(_l.Instruction, "Punctuator", "("),
              values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
                open: _t.s_node(_l.Spamex, "Punctuator", "<"),
                type: _t.node(_l.Spamex, "Identifier", [_t.lit("Terminal")], {}, {}),
                close: _t.s_node(_l.Spamex, "Punctuator", ">")
              }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
                open: _t.s_node(_l.Regex, "Punctuator", "/"),
                alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                  elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
                    element: _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                      open: _t.s_node(_l.Regex, "Punctuator", "["),
                      elements: [_t.node(_l.Regex, "Character", [_t.lit("!")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("#")], {}, {})],
                      close: _t.s_node(_l.Regex, "Punctuator", "]")
                    }, {}),
                    value: _t.s_node(_l.Regex, "Keyword", "?")
                  }, {
                    min: 0,
                    max: 1,
                    greedy: true
                  }), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.s_node(_l.Regex, "Punctuator", "["),
                    elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
                    close: _t.s_node(_l.Regex, "Punctuator", "]")
                  }, {})]
                }, {})],
                close: _t.s_node(_l.Regex, "Punctuator", "/")
              }, {})],
              close: _t.s_node(_l.Instruction, "Punctuator", ")")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", "]")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *Property() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Reference")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("reference")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(":")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("mapOperator")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("PropertyValue")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("node")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *PropertyValue() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Gap")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("null")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Node")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.lit("<")], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  negate: _t.s_node(_l.Regex, "Keyword", "^"),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("#")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("@")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *OpenFragmentTag() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("<")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("lexicalSpan")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("Tag")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {}), _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("FragmentFlags")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("flags")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *FragmentFlags() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("#")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("comment")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *OpenNodeTag() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("<")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("lexicalSpan")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("Tag")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {}), _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("NodeFlags")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("flags")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("TagType")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Attribute")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("attributes[]")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}));
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *NodeFlags() {
    let sf = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("*")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("token")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    if (!sf) yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("#")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("trivia")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("@")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *CloseNodeTag() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("</")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("TagType")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *CloseFragmentTag() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("</")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(">")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Attribute() {
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                value: _t.s_node(_l.Regex, "Keyword", "w")
              }, {}),
              value: _t.s_node(_l.Regex, "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            }), _t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "SpaceCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                value: _t.s_node(_l.Regex, "Keyword", "s")
              }, {}),
              value: _t.s_node(_l.Regex, "Keyword", "*")
            }, {
              min: 0,
              max: Infinity,
              greedy: true
            }), _t.node(_l.Regex, "Character", [_t.lit("=")], {}, {})]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("MappingAttribute")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("BooleanAttribute")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *BooleanAttribute() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Identifier")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("key")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *MappingAttribute() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Identifier")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("key")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("=")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("mapOperator")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("AttributeValue")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *AttributeValue() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n          "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n          "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("String")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("'")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("\"")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Number")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.lit("-")], {}, {})]
              }, {}), _t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "DigitCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_node(_l.Regex, "Keyword", "d")
                }, {})]
              }, {})],
              separators: [_t.s_node(_l.Regex, "Punctuator", "|")],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *TagType() {
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                value: _t.s_node(_l.Regex, "Keyword", "w")
              }, {}),
              value: _t.s_node(_l.Regex, "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            }), _t.node(_l.Regex, "Character", [_t.lit(":")], {}, {})]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Identifier")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("language")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`value`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
              token: _t.s_node(_l.Spamex, "Punctuator", "*")
            }, {}),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(":")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("namespaceOperator")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Identifier")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("type")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Identifier")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("type")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *Identifier() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "WordCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                value: _t.s_node(_l.Regex, "Keyword", "w")
              }, {}),
              value: _t.s_node(_l.Regex, "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            })]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Literal() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("String")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Integer() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("-")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("negative")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Digits")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("digits[]")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Digits() {
    while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Digit")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}));
  }
  *Digit() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "DigitCharacterSet", [_t.ref`escape`, _t.ref`value`], {
              escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
              value: _t.s_node(_l.Regex, "Keyword", "d")
            }, {})]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Infinity() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("-")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("negative")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("Infinity")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Punctuator() {}
  *Keyword() {}
  *Match() {}
}));
