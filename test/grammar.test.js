import { buildTag } from 'bablr';
import { dedent } from '@qnighy/dedent';
import language from '@bablr/language-en-cstml';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/helpers/tree';
import { m } from '@bablr/helpers/grammar';

let enhancers = {};

const buildCSTMLTag = (matcher) => {
  return buildTag(language, matcher, undefined, { enhancers });
};

const print = (tree) => {
  return printPrettyCSTML(tree);
};

describe('@bablr/language-en-cstml', () => {
  describe('Document', () => {
    const cstml = buildCSTMLTag(m`<$Document />`);

    it('<!0:cstml><_></>', () => {
      expect(print(cstml`<!0:cstml><_></>`)).toEqual(dedent`
        <$_>
          _:
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
            tree+$:
            <$BoundNode>
              node+$:
              <$TreeNode>
                openTag*:
                <$OpenNodeTag { selfClosing: false }>
                  openToken*: <* '<' />
                  flags*: <$NodeFlags { token: false, hasGap: false } />
                  type*: <* '_' />
                  name$: null
                  literalValue$: null
                  attributes$: null
                  closeToken*: <* '>' />
                </>
                closeTag*:
                <$CloseNodeTag>
                  openToken*: <* '</' />
                  closeToken*: <* '>' />
                </>
              </>
            </>
          </>
        </>
      `);
    });

    it('<!0:cstml><Node></>', () => {
      expect(print(cstml`<!0:cstml><Node></>`)).toEqual(dedent`
        <$_>
          _:
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
            tree+$:
            <$BoundNode>
              node+$:
              <$TreeNode>
                openTag*:
                <$OpenNodeTag { selfClosing: false }>
                  openToken*: <* '<' />
                  flags*: <$NodeFlags { token: false, hasGap: false } />
                  name$:
                  <$Identifier>
                    content*: <*IdentifierContent 'Node' />
                  </>
                  literalValue$: null
                  attributes$: null
                  closeToken*: <* '>' />
                </>
                closeTag*:
                <$CloseNodeTag>
                  openToken*: <* '</' />
                  closeToken*: <* '>' />
                </>
              </>
            </>
          </>
        </>
      `);
    });
  });

  describe('Stream', () => {
    const cstml = buildCSTMLTag(m`<$__Stream />`);

    it('<!0:cstml> <_> .: <Node> </> </>', () => {
      expect(print(cstml`<!0:cstml> <_> .: <Node> </> </>`)).toEqual(dedent`
        <$__>
          .[]$:
          <$DoctypeTag>
            openToken*: <* '<!' />
            version$: :JSON: <*UnsignedInteger '0' />
            versionSeparatorToken*: <* ':' />
            doctypeToken*: <*Keyword 'cstml' />
            attributes$: null
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          .[]$:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false } />
            type*: <* '_' />
            name$: null
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          .[]$:
          <$ReferenceTag>
            type*: <* '.' />
            name$: null
            flags*: <$ReferenceFlags />
            sigilToken*: <* ':' />
          </>
          #: :Space: <*Space ' ' />
          .[]$:
          <$OpenNodeTag { selfClosing: false }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false } />
            name$:
            <$Identifier>
              content*: <*IdentifierContent 'Node' />
            </>
            literalValue$: null
            attributes$: null
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          .[]$:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
          #: :Space: <*Space ' ' />
          .[]$:
          <$CloseNodeTag>
            openToken*: <* '</' />
            closeToken*: <* '>' />
          </>
        </>
      `);
    });
  });

  describe('TreeNode', () => {
    const cstml = buildCSTMLTag(m`<$TreeNode />`);

    it('<_></>', () => {
      expect(print(cstml`<_></>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              type*: <* '_' />
              name$: null
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('<_> </>', () => {
      expect(print(cstml`<_> </>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              type*: <* '_' />
              name$: null
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            #: :Space: <*Space ' ' />
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('<_>.:<Node></></>', () => {
      expect(print(cstml`<_>.:<Node></></>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              type*: <* '_' />
              name$: null
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            children[]$:
            <$Property>
              referenceTag$:
              <$ReferenceTag>
                type*: <* '.' />
                name$: null
                flags*: <$ReferenceFlags />
                sigilToken*: <* ':' />
              </>
              value+$:
              <$BoundNode>
                node+$:
                <$TreeNode>
                  openTag*:
                  <$OpenNodeTag { selfClosing: false }>
                    openToken*: <* '<' />
                    flags*: <$NodeFlags { token: false, hasGap: false } />
                    name$:
                    <$Identifier>
                      content*: <*IdentifierContent 'Node' />
                    </>
                    literalValue$: null
                    attributes$: null
                    closeToken*: <* '>' />
                  </>
                  closeTag*:
                  <$CloseNodeTag>
                    openToken*: <* '</' />
                    closeToken*: <* '>' />
                  </>
                </>
              </>
            </>
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('<_>.:<Node></>#:<Trivia></></>', () => {
      expect(print(cstml`<_>.:<Node></>#:<Trivia></></>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              type*: <* '_' />
              name$: null
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            children[]$:
            <$Property>
              referenceTag$:
              <$ReferenceTag>
                type*: <* '.' />
                name$: null
                flags*: <$ReferenceFlags />
                sigilToken*: <* ':' />
              </>
              value+$:
              <$BoundNode>
                node+$:
                <$TreeNode>
                  openTag*:
                  <$OpenNodeTag { selfClosing: false }>
                    openToken*: <* '<' />
                    flags*: <$NodeFlags { token: false, hasGap: false } />
                    name$:
                    <$Identifier>
                      content*: <*IdentifierContent 'Node' />
                    </>
                    literalValue$: null
                    attributes$: null
                    closeToken*: <* '>' />
                  </>
                  closeTag*:
                  <$CloseNodeTag>
                    openToken*: <* '</' />
                    closeToken*: <* '>' />
                  </>
                </>
              </>
            </>
            children[]$:
            <$Property>
              referenceTag$:
              <$ReferenceTag>
                type*: <* '#' />
                name$: null
                flags*: <$ReferenceFlags />
                sigilToken*: <* ':' />
              </>
              value+$:
              <$BoundNode>
                node+$:
                <$TreeNode>
                  openTag*:
                  <$OpenNodeTag { selfClosing: false }>
                    openToken*: <* '<' />
                    flags*: <$NodeFlags { token: false, hasGap: false } />
                    name$:
                    <$Identifier>
                      content*: <*IdentifierContent 'Trivia' />
                    </>
                    literalValue$: null
                    attributes$: null
                    closeToken*: <* '>' />
                  </>
                  closeTag*:
                  <$CloseNodeTag>
                    openToken*: <* '</' />
                    closeToken*: <* '>' />
                  </>
                </>
              </>
            </>
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('`<Node>reference: null</>`', () => {
      expect(print(cstml`<Node>reference: null</>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              name$:
              <$Identifier>
                content*: <*IdentifierContent 'Node' />
              </>
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            children[]$:
            <$Property>
              referenceTag$:
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
              <$BoundNode>
                node+$:
                <$NullNode>
                  sigilTag*:
                  <$NullTag>
                    sigilToken*: <*Keyword 'null' />
                  </>
                </>
              </>
            </>
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('`<Node> "stringContent" </>`', () => {
      expect(print(cstml`<Node> "stringContent" </>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              name$:
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
              referenceTag$: null
              value+$:
              <$BoundNode>
                node+$:
                <$TreeNode>
                  openTag*:
                  <$OpenNodeTag { selfClosing: false }>
                    flags*: <$NodeFlags { token: true, hasGap: false } />
                  </>
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
                  closeTag*: <$CloseNodeTag />
                </>
              </>
            </>
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('`<Node "stringContent" />`', () => {
      expect(print(cstml`<Node "stringContent" />`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: true }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              name$:
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
          </>
        </>
      `);
    });

    it('`<*Token> "stringContent" </>`', () => {
      expect(print(cstml`<*Token> "stringContent" </>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*:
              <$NodeFlags { token: true, hasGap: false }>
                tokenToken*: <* '*' />
              </>
              name$:
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
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('`<*Token "stringContent" />`', () => {
      expect(print(cstml`<*Token "stringContent" />`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: true }>
              openToken*: <* '<' />
              flags*:
              <$NodeFlags { token: true, hasGap: false }>
                tokenToken*: <* '*' />
              </>
              name$:
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
          </>
        </>
      `);
    });

    it('`<Node>#: <__></></>`', () => {
      expect(print(cstml`<Node>_: <__></></>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              name$:
              <$Identifier>
                content*: <*IdentifierContent 'Node' />
              </>
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            children[]$:
            <$Property>
              referenceTag$:
              <$ReferenceTag>
                type*: <* '_' />
                name$: null
                flags*: <$ReferenceFlags />
                sigilToken*: <* ':' />
              </>
              #: :Space: <*Space ' ' />
              value+$:
              <$BoundNode>
                node+$:
                <$TreeNode>
                  openTag*:
                  <$OpenNodeTag { selfClosing: false }>
                    openToken*: <* '<' />
                    flags*: <$NodeFlags { token: false, hasGap: false } />
                    type*: <* '__' />
                    name$: null
                    literalValue$: null
                    attributes$: null
                    closeToken*: <* '>' />
                  </>
                  closeTag*:
                  <$CloseNodeTag>
                    openToken*: <* '</' />
                    closeToken*: <* '>' />
                  </>
                </>
              </>
            </>
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('`<Node>reference: <//></>`', () => {
      expect(print(cstml`<Node>reference: <//></>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              name$:
              <$Identifier>
                content*: <*IdentifierContent 'Node' />
              </>
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            children[]$:
            <$Property>
              referenceTag$:
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
              <$BoundNode>
                node+$:
                <$GapNode>
                  sigilTag*:
                  <$GapTag>
                    sigilToken*: <* '<//>' />
                  </>
                </>
              </>
            </>
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('`<Node>reference: <Node></></>`', () => {
      expect(print(cstml`<Node>reference: <Node></></>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              name$:
              <$Identifier>
                content*: <*IdentifierContent 'Node' />
              </>
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            children[]$:
            <$Property>
              referenceTag$:
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
              <$BoundNode>
                node+$:
                <$TreeNode>
                  openTag*:
                  <$OpenNodeTag { selfClosing: false }>
                    openToken*: <* '<' />
                    flags*: <$NodeFlags { token: false, hasGap: false } />
                    name$:
                    <$Identifier>
                      content*: <*IdentifierContent 'Node' />
                    </>
                    literalValue$: null
                    attributes$: null
                    closeToken*: <* '>' />
                  </>
                  closeTag*:
                  <$CloseNodeTag>
                    openToken*: <* '</' />
                    closeToken*: <* '>' />
                  </>
                </>
              </>
            </>
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('`<Node { foo: { bar: undefined } }> { foo.bar: -1 } </>`', () => {
      expect(print(cstml`<Node { foo: { bar: undefined } }> { foo.bar: -1 } </>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*: <$NodeFlags { token: false, hasGap: false } />
              name$:
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
                  value$:
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
                      value$:
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
                sign*: <* '-' />
                wholePart$: <*UnsignedInteger '1' />
                decimalSeparatorToken*: null
                exponentSeparatorToken*: null
              </>
              #: :Space: <*Space ' ' />
              closeToken*: <* '}' />
            </>
            #: :Space: <*Space ' ' />
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });

    it('`<*Tag>@:<Escape { cooked: "e" }></></>`', () => {
      expect(print(cstml`<*Tag>@:<Escape { cooked: "e" }></></>`)).toEqual(dedent`
        <$_>
          _:
          <$TreeNode>
            openTag*:
            <$OpenNodeTag { selfClosing: false }>
              openToken*: <* '<' />
              flags*:
              <$NodeFlags { token: true, hasGap: false }>
                tokenToken*: <* '*' />
              </>
              name$:
              <$Identifier>
                content*: <*IdentifierContent 'Tag' />
              </>
              literalValue$: null
              attributes$: null
              closeToken*: <* '>' />
            </>
            children[]$:
            <$Property>
              referenceTag$:
              <$ReferenceTag>
                type*: <* '@' />
                name$: null
                flags*: <$ReferenceFlags />
                sigilToken*: <* ':' />
              </>
              value+$:
              <$BoundNode>
                node+$:
                <$TreeNode>
                  openTag*:
                  <$OpenNodeTag { selfClosing: false }>
                    openToken*: <* '<' />
                    flags*: <$NodeFlags { token: false, hasGap: false } />
                    name$:
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
                        value$:
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
                  closeTag*:
                  <$CloseNodeTag>
                    openToken*: <* '</' />
                    closeToken*: <* '>' />
                  </>
                </>
              </>
            </>
            closeTag*:
            <$CloseNodeTag>
              openToken*: <* '</' />
              closeToken*: <* '>' />
            </>
          </>
        </>
      `);
    });
  });

  describe('OpenNodeTag', () => {
    const tag = buildCSTMLTag(m`<$OpenNodeTag />`);

    it("`<*Type 'literalValue' />`", () => {
      expect(print(tag`<*Type 'literalValue' />`)).toEqual(dedent`
        <$_>
          _:
          <$OpenNodeTag { selfClosing: true }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: true, hasGap: false }>
              tokenToken*: <* '*' />
            </>
            name$:
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
          </>
        </>
      `);
    });

    it("`<* 'literalValue' />`", () => {
      expect(print(tag`<* 'literalValue' />`)).toEqual(dedent`
        <$_>
          _:
          <$OpenNodeTag { selfClosing: true }>
            openToken*: <* '<' />
            flags*:
            <$NodeFlags { token: true, hasGap: false }>
              tokenToken*: <* '*' />
            </>
            name$: null
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
          </>
        </>
      `);
    });

    it('`<Quantifier { min: 1, max: Infinity } />`', () => {
      expect(print(tag`<Quantifier { min: 1, max: Infinity } />`)).toEqual(dedent`
        <$_>
          _:
          <$OpenNodeTag { selfClosing: true }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false } />
            name$:
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
                value$:
                <$Number>
                  sign*: null
                  wholePart$: <*UnsignedInteger '1' />
                  decimalSeparatorToken*: null
                  exponentSeparatorToken*: null
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
                value$:
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
          </>
        </>
      `);
    });

    it('"<`Identifier` />"', () => {
      expect(print(tag({ raw: ['<`Identifier` />'] }))).toEqual(dedent`
        <$_>
          _:
          <$OpenNodeTag { selfClosing: true }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false } />
            name$:
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
          </>
        </>
      `);
    });

    it('"<\\u004a />"', () => {
      expect(print(tag`<\u004a />`)).toEqual(dedent`
        <$_>
          _:
          <$OpenNodeTag { selfClosing: true }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false } />
            name$:
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
          </>
        </>
      `);
    });

    it('"<日本語 />"', () => {
      expect(print(tag`<日本語 />`)).toEqual(dedent`
        <$_>
          _:
          <$OpenNodeTag { selfClosing: true }>
            openToken*: <* '<' />
            flags*: <$NodeFlags { token: false, hasGap: false } />
            name$:
            <$Identifier>
              content*: <*IdentifierContent '日本語' />
            </>
            #: :Space: <*Space ' ' />
            literalValue$: null
            attributes$: null
            selfClosingToken*: <* '/' />
            closeToken*: <* '>' />
          </>
        </>
      `);
    });
  });
});
