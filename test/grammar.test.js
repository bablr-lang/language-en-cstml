import { buildTag } from 'bablr';
import { spam } from '@bablr/boot';
import { dedent } from '@qnighy/dedent';
import language from '@bablr/language-en-cstml';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/helpers/tree';

let enhancers = {};

// enhancers = debugEnhancers;

const buildCSTMLTag = (matcher) => {
  return buildTag(language, matcher, undefined, { enhancers });
};

const print = (tree) => {
  return printPrettyCSTML(tree);
};

describe('@bablr/language-en-cstml', () => {
  describe('Document', () => {
    const cstml = buildCSTMLTag(spam`<$Document />`);

    it('<!0:cstml><_></>', () => {
      expect(print(cstml`<!0:cstml><_></>`)).toEqual(dedent`\
        <$Document>
          doctype:
          <$DoctypeTag>
            openToken*: <* '<!' />
            version$: :JSON: <*UnsignedInteger '0' />
            versionSeparatorToken*: <* ':' />
            doctypeToken*: <*Keyword 'cstml' />
            attributes$: null
            closeToken*: <* '>' />
          </>
          tree$:
          <$TreeNode>
            open*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*:
              <$NodeFlags { token: false, hasGap: false, fragment: true, cover: true }>
                fragmentToken*: <* '_' />
              </>
              type$: null
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            close*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>\n`);
    });

    it('<!0:cstml><Node></> throws', () => {
      expect(() => cstml`<!0:cstml><Node></>`).toThrowError();
    });
  });

  describe('Stream', () => {
    const cstml = buildCSTMLTag(spam`<$__Stream />`);

    it('<!0:cstml> <_> .: <Node> </> </>', () => {
      expect(print(cstml`<!0:cstml> <_> .: <Node> </> </>`)).toEqual(dedent`\
        <$__>
          .[]:
          <$DoctypeTag>
            openToken*: <* '<!' />
            version: :JSON: <*UnsignedInteger '0' />
            versionSeparatorToken*: <* ':' />
            doctypeToken: <*Keyword 'cstml' />
            attributes$: null
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          .[]:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: false, hasGap: false, fragment: true, cover: true }>
              fragmentToken*: <* '_' />
            </>
            type$: null
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          .[]:
          <$ReferenceTag>
            type*: <* '.' />
            name$: null
            flags*: <$ReferenceFlags />
            sigilToken*: <* ':' />
          </>
          #: :Space: <*Space ' ' />
          .[]:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Node' />
            </>
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          .[]:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          .[]:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });
  });

  describe('TreeNode', () => {
    const cstml = buildCSTMLTag(spam`<$TreeNode />`);

    it('<_></>', () => {
      expect(print(cstml`<_></>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: false, hasGap: false, fragment: true, cover: true }>
              fragmentToken*: <* '_' />
            </>
            type$: null
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('<_> </>', () => {
      expect(print(cstml`<_> </>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: false, hasGap: false, fragment: true, cover: true }>
              fragmentToken*: <* '_' />
            </>
            type$: null
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('<_>.:<Node></></>', () => {
      expect(print(cstml`<_>.:<Node></></>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: false, hasGap: false, fragment: true, cover: true }>
              fragmentToken*: <* '_' />
            </>
            type$: null
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type*: <* '.' />
              name$: null
              flags*: <$ReferenceFlags />
              sigilToken*: <* ':' />
            </>
            value+$:
            <$TreeNode>
              open*:
              <$OpenNodeTag { selfClosing: false }>
                openToken*: <* '<' />
                flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
                type$:
                <$Identifier>
                  content*: <*IdentifierContent 'Node' />
                </>
                literalValue$: null
                attributes$: null
                closeToken*: <* '>' />
              </>
              close*:
              <$CloseNodeTag>
                openToken*: <* '</' />
                closeToken*: <* '>' />
              </>
            </>
          </>
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('<_>.:<Node></>#:<Trivia></></>', () => {
      expect(print(cstml`<_>.:<Node></>#:<Trivia></></>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: false, hasGap: false, fragment: true, cover: true }>
              fragmentToken*: <* '_' />
            </>
            type$: null
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type*: <* '.' />
              name$: null
              flags*: <$ReferenceFlags />
              sigilToken*: <* ':' />
            </>
            value+$:
            <$TreeNode>
              open*:
              <$OpenNodeTag { selfClosing: false }>
                openToken*: <* '<' />
                flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
                type$:
                <$Identifier>
                  content*: <*IdentifierContent 'Node' />
                </>
                literalValue$: null
                attributes$: null
                closeToken*: <* '>' />
              </>
              close*:
              <$CloseNodeTag>
                openToken*: <* '</' />
                closeToken*: <* '>' />
              </>
            </>
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type*: <* '#' />
              name$: null
              flags*: <$ReferenceFlags />
              sigilToken*: <* ':' />
            </>
            value+$:
            <$TreeNode>
              open*:
              <$OpenNodeTag { selfClosing: false }>
                openToken*: <* '<' />
                flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
                type$:
                <$Identifier>
                  content*: <*IdentifierContent 'Trivia' />
                </>
                literalValue$: null
                attributes$: null
                closeToken*: <* '>' />
              </>
              close*:
              <$CloseNodeTag>
                openToken*: <* '</' />
                closeToken*: <* '>' />
              </>
            </>
          </>
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<Node>reference: null</>`', () => {
      expect(print(cstml`<Node>reference: null</>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Node' />
            </>
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              name$:
              <$Identifier>
                content*: <*IdentifierContent 'reference' />
              </>
              flags*: <$ReferenceFlags />
              sigilToken*: <* ':' />
            </>
            #: :Space: <*Space ' ' />
            value+$:
            <$NullNode>
              sigilTag*:
              <$NullTag>
                sigilToken*: <*Keyword 'null' />
              </>
            </>
          </>
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<Node> "stringContent" </>`', () => {
      expect(print(cstml`<Node> "stringContent" </>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Node' />
            </>
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          children[]$:
          <$Property>
            reference$: null
            value+$:
            <$TreeNode>
              open*:
              <$OpenNodeTag { selfClosing: true }>
                flags*: <$NodeFlags { token: true, hasGap: false, fragment: false, cover: false } />
                literalValue$: :JSON:
                <$String>
                  openToken*: <* '"' />
                  content$: <*StringContent 'stringContent' />
                  closeToken*: <* '"' />
                </>
              </>
              #: :Space: <*Space ' ' />
            </>
          </>
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<Node "stringContent" />`', () => {
      expect(print(cstml`<Node "stringContent" />`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: true }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Node' />
            </>
            #: :Space: <*Space ' ' />
            literalValue$: :JSON:
            <$String>
              openToken*: <* '\"' />
              content$: <*StringContent 'stringContent' />
              closeToken*: <* '\"' />
            </>
            #: :Space: <*Space ' ' />
            attributes$: null
            selfClosingToken*: <* '/' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<*Token> "stringContent" </>`', () => {
      expect(print(cstml`<*Token> "stringContent" </>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: true, hasGap: false, fragment: false, cover: false }>
              tokenToken*: <* '*' />
            </>
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Token' />
            </>
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          children[]$:
          <$LiteralTag>
            value*: :JSON:
            <$String>
              openToken*: <* '"' />
              content$: <*StringContent 'stringContent' />
              closeToken*: <* '"' />
            </>
          </>
          #: :Space: <*Space ' ' />
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<*Token "stringContent" />`', () => {
      expect(print(cstml`<*Token "stringContent" />`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: true }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: true, hasGap: false, fragment: false, cover: false }>
              tokenToken*: <* '*' />
            </>
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Token' />
            </>
            #: :Space: <*Space ' ' />
            literalValue$: :JSON:
            <$String>
              openToken*: <* '"' />
              content$: <*StringContent 'stringContent' />
              closeToken*: <* '"' />
            </>
            #: :Space: <*Space ' ' />
            attributes$: null
            selfClosingToken*: <* '/' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<Node>#: <__></></>`', () => {
      expect(print(cstml`<Node>_: <__></></>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Node' />
            </>
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type*: <* '_' />
              name$: null
              flags*: <$ReferenceFlags />
              sigilToken*: <* ':' />
            </>
            #: :Space: <*Space ' ' />
            value+$:
            <$TreeNode>
              open*:
              <$OpenNodeTag { selfClosing: false }>
                openToken*: <* '<' />
                flags*:
                <$NodeFlags { token: false, hasGap: false, fragment: true, cover: false }>
                  fragmentToken*: <* '_' />
                  multiFragmentToken*: <* '_' />
                </>
                type$: null
                literalValue$: null
                attributes$: null
                closeToken*: <* '>' />
              </>
              close*:
              <$CloseNodeTag>
                openToken*: <* '</' />
                closeToken*: <* '>' />
              </>
            </>
          </>
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<Node>reference: <//></>`', () => {
      expect(print(cstml`<Node>reference: <//></>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Node' />
            </>
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              name$:
              <$Identifier>
                content*: <*IdentifierContent 'reference' />
              </>
              flags*: <$ReferenceFlags />
              sigilToken*: <* ':' />
            </>
            #: :Space: <*Space ' ' />
            value+$:
            <$GapNode>
              sigilTag*:
              <$GapTag>
                sigilToken*: <* '<//>' />
              </>
            </>
          </>
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<Node>reference: <Node></></>`', () => {
      expect(print(cstml`<Node>reference: <Node></></>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Node' />
            </>
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              name$:
              <$Identifier>
                content*: <*IdentifierContent 'reference' />
              </>
              flags*: <$ReferenceFlags />
              sigilToken*: <* ':' />
            </>
            #: :Space: <*Space ' ' />
            value+$:
            <$TreeNode>
              open*:
              <$OpenNodeTag { selfClosing: false }>
                openToken*: <* '<' />
                flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
                type$:
                <$Identifier>
                  content*: <*IdentifierContent 'Node' />
                </>
                literalValue$: null
                attributes$: null
                closeToken*: <* '>' />
              </>
              close*:
              <$CloseNodeTag>
                openToken*: <* '</' />
                closeToken*: <* '>' />
              </>
            </>
          </>
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<Node { foo: { bar: undefined } }> { foo.bar: 1 } </>`', () => {
      expect(print(cstml`<Node { foo: { bar: undefined } }> { foo.bar: 1 } </>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Node' />
            </>
            #: :Space: <*Space ' ' />
            literalValue$: null
            attributes$: :JSON:
            <$Object>
              openToken*: <* '{' />
              #: :Space: <*Space ' ' />
              properties[]$:
              <$Property>
                key$:
                <$Identifier>
                  content*: <*IdentifierContent 'foo' />
                </>
                sigilToken*: <* ':' />
                #: :Space: <*Space ' ' />
                value+$:
                <$Object>
                  openToken*: <* '{' />
                  #: :Space: <*Space ' ' />
                  properties[]$:
                  <$Property>
                    key$:
                    <$Identifier>
                      content*: <*IdentifierContent 'bar' />
                    </>
                    sigilToken*: <* ':' />
                    #: :Space: <*Space ' ' />
                    value+$:
                    <$Undefined>
                      sigilToken*: <*Keyword 'undefined' />
                    </>
                  </>
                  #: :Space: <*Space ' ' />
                  closeToken*: <* '}' />
                </>
              </>
              #: :Space: <*Space ' ' />
              closeToken*: <* '}' />
            </>
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          children[]$:
          <$AttributeDefinition>
            openToken*: <* '{' />
            #: :Space: <*Space ' ' />
            key$:
            <$IdentifierPath>
              segments[]$:
              <$Identifier>
                content*: <*IdentifierContent 'foo' />
              </>
              #separatorTokens: <* '.' />
              segments[]$:
              <$Identifier>
                content*: <*IdentifierContent 'bar' />
              </>
            </>
            sigilToken*: <* ':' />
            #: :Space: <*Space ' ' />
            value$: :JSON:
            <$Number>
              wholePart$:
              <$Integer>
                value$: <*UnsignedInteger '1' />
              </>
              fractionalPart$: null
              exponentPart$: null
            </>
            #: :Space: <*Space ' ' />
            closeToken*: <* '}' />
          </>
          #: :Space: <*Space ' ' />
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });

    it('`<*Tag>@:<Escape { cooked: "e" }></></>`', () => {
      expect(print(cstml`<*Tag>@:<Escape { cooked: "e" }></></>`)).toEqual(dedent`\
        <$TreeNode>
          open*:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: true, hasGap: false, fragment: false, cover: false }>
              tokenToken*: <* '*' />
            </>
            type$:
            <$Identifier>
              content*: <*IdentifierContent 'Tag' />
            </>
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type*: <* '@' />
              name$: null
              flags*: <$ReferenceFlags />
              sigilToken*: <* ':' />
            </>
            value+$:
            <$TreeNode>
              open*:
              <$OpenNodeTag { selfClosing: false }>
                openToken*: <* '<' />
                flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
                type$:
                <$Identifier>
                  content*: <*IdentifierContent 'Escape' />
                </>
                #: :Space: <*Space ' ' />
                literalValue$: null
                attributes$: :JSON:
                <$Object>
                  openToken*: <* '{' />
                  #: :Space: <*Space ' ' />
                  properties[]$:
                  <$Property>
                    key$:
                    <$Identifier>
                      content*: <*IdentifierContent 'cooked' />
                    </>
                    sigilToken*: <* ':' />
                    #: :Space: <*Space ' ' />
                    value+$:
                    <$String>
                      openToken*: <* '"' />
                      content$: <*StringContent 'e' />
                      closeToken*: <* '"' />
                    </>
                  </>
                  #: :Space: <*Space ' ' />
                  closeToken*: <* '}' />
                </>
                closeToken*: <* '>' />
              </>
              close*:
              <$CloseNodeTag>
                openToken*: <* '</' />
                closeToken*: <* '>' />
              </>
            </>
          </>
          close*:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>\n`);
    });
  });

  describe('OpenNodeTag', () => {
    const tag = buildCSTMLTag(spam`<$OpenNodeTag />`);

    it("`<*Type 'literalValue' />`", () => {
      expect(print(tag`<*Type 'literalValue' />`)).toEqual(dedent`\
        <$OpenNodeTag { selfClosing: true }>
          openToken*: <* '<' />
          flags*:
          <$NodeFlags { token: true, hasGap: false, fragment: false, cover: false }>
            tokenToken*: <* '*' />
          </>
          type$:
          <$Identifier>
            content*: <*IdentifierContent 'Type' />
          </>
          #: :Space: <*Space ' ' />
          literalValue$: :JSON:
          <$String>
            openToken*: <* "'" />
            content$: <*StringContent 'literalValue' />
            closeToken*: <* "'" />
          </>
          #: :Space: <*Space ' ' />
          attributes$: null
          selfClosingToken*: <* '/' />
          closeToken*: <* '>' />
        </>\n`);
    });

    it("`<* 'literalValue' />`", () => {
      expect(print(tag`<* 'literalValue' />`)).toEqual(dedent`\
        <$OpenNodeTag { selfClosing: true }>
          openToken*: <* '<' />
          flags*:
          <$NodeFlags { token: true, hasGap: false, fragment: false, cover: false }>
            tokenToken*: <* '*' />
          </>
          type$: null
          #: :Space: <*Space ' ' />
          literalValue$: :JSON:
          <$String>
            openToken*: <* "'" />
            content$: <*StringContent 'literalValue' />
            closeToken*: <* "'" />
          </>
          #: :Space: <*Space ' ' />
          attributes$: null
          selfClosingToken*: <* '/' />
          closeToken*: <* '>' />
        </>\n`);
    });

    it('`<Quantifier { min: 1, max: Infinity } />`', () => {
      expect(print(tag`<Quantifier { min: 1, max: Infinity } />`)).toEqual(dedent`\
        <$OpenNodeTag { selfClosing: true }>
          openToken*: <* '<' />
          flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
          type$:
          <$Identifier>
            content*: <*IdentifierContent 'Quantifier' />
          </>
          #: :Space: <*Space ' ' />
          literalValue$: null
          attributes$: :JSON:
          <$Object>
            openToken*: <* '{' />
            #: :Space: <*Space ' ' />
            properties[]$:
            <$Property>
              key$:
              <$Identifier>
                content*: <*IdentifierContent 'min' />
              </>
              sigilToken*: <* ':' />
              #: :Space: <*Space ' ' />
              value+$:
              <$Number>
                wholePart$:
                <$Integer>
                  value$: <*UnsignedInteger '1' />
                </>
                fractionalPart$: null
                exponentPart$: null
              </>
            </>
            #separatorTokens: <* ',' />
            #: :Space: <*Space ' ' />
            properties[]$:
            <$Property>
              key$:
              <$Identifier>
                content*: <*IdentifierContent 'max' />
              </>
              sigilToken*: <* ':' />
              #: :Space: <*Space ' ' />
              value+$:
              <$Infinity>
                sigilToken*: <*Keyword 'Infinity' />
              </>
            </>
            #: :Space: <*Space ' ' />
            closeToken*: <* '}' />
          </>
          #: :Space: <*Space ' ' />
          selfClosingToken*: <* '/' />
          closeToken*: <* '>' />
        </>\n`);
    });

    it('"<`Identifier` />"', () => {
      expect(print(tag({ raw: ['<`Identifier` />'] }))).toEqual(dedent`\
        <$OpenNodeTag { selfClosing: true }>
          openToken*: <* '<' />
          flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
          type$:
          <$Identifier>
            openToken*: <* '${'`'}' />
            content*: <*IdentifierContent 'Identifier' />
            closeToken*: <* '${'`'}' />
          </>
          #: :Space: <*Space ' ' />
          literalValue$: null
          attributes$: null
          selfClosingToken*: <* '/' />
          closeToken*: <* '>' />
        </>\n`);
    });

    it('"<\\u004a />"', () => {
      expect(print(tag`<\u004a />`)).toEqual(dedent`\
        <$OpenNodeTag { selfClosing: true }>
          openToken*: <* '<' />
          flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
          type$:
          <$Identifier>
            content*:
            <*IdentifierContent>
              @:
              <EscapeSequence { cooked: 'J' }>
                sigilToken*: <* '${'\\\\'}' />
                code:
                <EscapeCode>
                  typeToken*: <*Keyword 'u' />
                  value: :JSON: <*UnsignedHexInteger '004a' />
                </>
              </>
            </>
          </>
          #: :Space: <*Space ' ' />
          literalValue$: null
          attributes$: null
          selfClosingToken*: <* '/' />
          closeToken*: <* '>' />
        </>\n`);
    });

    it('"<日本語 />"', () => {
      expect(print(tag`<日本語 />`)).toEqual(dedent`\
        <$OpenNodeTag { selfClosing: true }>
          openToken*: <* '<' />
          flags*: <$NodeFlags { token: false, hasGap: false, fragment: false, cover: false } />
          type$:
          <$Identifier>
            content*: <*IdentifierContent '日本語' />
          </>
          #: :Space: <*Space ' ' />
          literalValue$: null
          attributes$: null
          selfClosingToken*: <* '/' />
          closeToken*: <* '>' />
        </>\n`);
    });
  });
});
