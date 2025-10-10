import { buildTag } from 'bablr';
import { spam } from '@bablr/boot';
import { dedent } from '@qnighy/dedent';
import * as language from '@bablr/language-en-cstml';
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
          doctype$:
          <$DoctypeTag>
            openToken: <* '<!' { balancedSpan: 'Tag', balanced: '>' } />
            version$: :JSON: <*UnsignedInteger '0' />
            versionSeparatorToken: <* ':' />
            doctypeToken$: <*Keyword 'cstml' />
            attributes$: null
            closeToken: <* '>' { balancer: true } />
          </>
          tree$:
          <$Node>
            open:
            <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
              openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
              flags:
              <$NodeFlags>
                tokenToken: null
                hasGapToken: null
                fragmentToken: <* '_' />
                multiFragmentToken: null
              </>
              type$: null
              literalValue$: null
              attributes$: null
              selfClosingToken: null
              closeToken: <* '>' { balancer: true } />
            </>
            close:
            <$CloseNodeTag { balancer: true }>
              openToken: <* '</' { balanced: '>' } />
              closeToken: <* '>' { balancer: true } />
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

    it('<!0:cstml><_>.:<Node></></>', () => {
      expect(print(cstml`<!0:cstml><_>.:<Node></></>`)).toEqual(dedent`\
        <$__>
          .[]:
          <$DoctypeTag>
            openToken: <* '<!' { balancedSpan: 'Tag', balanced: '>' } />
            version$: :JSON: <*UnsignedInteger '0' />
            versionSeparatorToken: <* ':' />
            doctypeToken$: <*Keyword 'cstml' />
            attributes$: null
            closeToken: <* '>' { balancer: true } />
          </>
          .[]:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: <* '_' />
              multiFragmentToken: null
            </>
            type$: null
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          .[]:
          <$ReferenceTag>
            type: <* '.' />
            name$: null
            openIndexToken: null
            closeIndexToken: null
            flags:
            <$ReferenceFlags>
              expressionToken: null
              hasGapToken: null
            </>
            sigilToken: <* ':' />
          </>
          .[]:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Node' { span: 'Identifier' } />
              closeToken: null
            </>
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          .[]:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
          .[]:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });
  });

  describe('Node', () => {
    const cstml = buildCSTMLTag(spam`<$Node />`);

    it('<_></>', () => {
      expect(print(cstml`<_></>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: <* '_' />
              multiFragmentToken: null
            </>
            type$: null
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('<_> </>', () => {
      expect(print(cstml`<_> </>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: <* '_' />
              multiFragmentToken: null
            </>
            type$: null
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('<_>.:<Node></></>', () => {
      expect(print(cstml`<_>.:<Node></></>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: <* '_' />
              multiFragmentToken: null
            </>
            type$: null
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: <* '.' />
              name$: null
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <* ':' />
            </>
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                  fragmentToken: null
                  multiFragmentToken: null
                </>
                type$:
                <$Identifier>
                  openToken: null
                  content: <*IdentifierContent 'Node' { span: 'Identifier' } />
                  closeToken: null
                </>
                literalValue$: null
                attributes$: null
                selfClosingToken: null
                closeToken: <* '>' { balancer: true } />
              </>
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <* '</' { balanced: '>' } />
                closeToken: <* '>' { balancer: true } />
              </>
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('<_>.:<Node></>#:<Trivia></></>', () => {
      expect(print(cstml`<_>.:<Node></>#:<Trivia></></>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: <* '_' />
              multiFragmentToken: null
            </>
            type$: null
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: <* '.' />
              name$: null
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <* ':' />
            </>
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                  fragmentToken: null
                  multiFragmentToken: null
                </>
                type$:
                <$Identifier>
                  openToken: null
                  content: <*IdentifierContent 'Node' { span: 'Identifier' } />
                  closeToken: null
                </>
                literalValue$: null
                attributes$: null
                selfClosingToken: null
                closeToken: <* '>' { balancer: true } />
              </>
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <* '</' { balanced: '>' } />
                closeToken: <* '>' { balancer: true } />
              </>
            </>
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: <* '#' />
              name$: null
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <* ':' />
            </>
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                  fragmentToken: null
                  multiFragmentToken: null
                </>
                type$:
                <$Identifier>
                  openToken: null
                  content: <*IdentifierContent 'Trivia' { span: 'Identifier' } />
                  closeToken: null
                </>
                literalValue$: null
                attributes$: null
                selfClosingToken: null
                closeToken: <* '>' { balancer: true } />
              </>
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <* '</' { balanced: '>' } />
                closeToken: <* '>' { balancer: true } />
              </>
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<Node>reference: null</>`', () => {
      expect(print(cstml`<Node>reference: null</>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Node' { span: 'Identifier' } />
              closeToken: null
            </>
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: null
              name$:
              <$Identifier>
                openToken: null
                content: <*IdentifierContent 'reference' { span: 'Identifier' } />
                closeToken: null
              </>
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <* ':' />
            </>
            #: :Space: <*Space ' ' />
            binding$: null
            value$:
            <$NullTag>
              sigilToken: <*Keyword 'null' />
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<Node> "stringContent" </>`', () => {
      expect(print(cstml`<Node> "stringContent" </>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Node' { span: 'Identifier' } />
              closeToken: null
            </>
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          children[]$:
          <$Property>
            reference$: null
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: undefined, balancedSpan: undefined }>
                openToken: null
                flags: null
                type: null
                literalValue: :JSON:
                <$String>
                  openToken: <* '"' { balanced: '"', balancedSpan: 'String:Double' } />
                  content$: <*StringContent 'stringContent' />
                  closeToken: <* '"' { balancer: true } />
                </>
                attributes: null
                selfClosingTag: null
                closeToken: null
              </>
              #: :Space: <*Space ' ' />
              close: null
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<Node "stringContent" />`', () => {
      expect(print(cstml`<Node "stringContent" />`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: false, balancedSpan: null }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Node' { span: 'Identifier' } />
              closeToken: null
            </>
            #: :Space: <*Space ' ' />
            literalValue$: :JSON:
            <$String>
              openToken: <* '\"' { balanced: '\"', balancedSpan: 'String:Double' } />
              content$: <*StringContent 'stringContent' />
              closeToken: <* '\"' { balancer: true } />
            </>
            #: :Space: <*Space ' ' />
            attributes$: null
            selfClosingToken: <* '/' />
            closeToken: <* '>' { balancer: true } />
          </>
          close: null
        </>\n`);
    });

    it('`<*Token> "stringContent" </>`', () => {
      expect(print(cstml`<*Token> "stringContent" </>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: <* '*' />
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Token' { span: 'Identifier' } />
              closeToken: null
            </>
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          children[]$:
          <$LiteralTag>
            value: :JSON:
            <$String>
              openToken: <* '"' { balanced: '"', balancedSpan: 'String:Double' } />
              content$: <*StringContent 'stringContent' />
              closeToken: <* '"' { balancer: true } />
            </>
          </>
          #: :Space: <*Space ' ' />
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<*Token "stringContent" />`', () => {
      expect(print(cstml`<*Token "stringContent" />`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: false, balancedSpan: null }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: <* '*' />
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Token' { span: 'Identifier' } />
              closeToken: null
            </>
            #: :Space: <*Space ' ' />
            literalValue$: :JSON:
            <$String>
              openToken: <* '"' { balanced: '"', balancedSpan: 'String:Double' } />
              content$: <*StringContent 'stringContent' />
              closeToken: <* '"' { balancer: true } />
            </>
            #: :Space: <*Space ' ' />
            attributes$: null
            selfClosingToken: <* '/' />
            closeToken: <* '>' { balancer: true } />
          </>
          close: null
        </>\n`);
    });

    it('`<Node>#: <__></></>`', () => {
      expect(print(cstml`<Node>_: <__></></>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Node' { span: 'Identifier' } />
              closeToken: null
            </>
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: <* '_' />
              name$: null
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <* ':' />
            </>
            #: :Space: <*Space ' ' />
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                  fragmentToken: <* '_' />
                  multiFragmentToken: <* '_' />
                </>
                type$: null
                literalValue$: null
                attributes$: null
                selfClosingToken: null
                closeToken: <* '>' { balancer: true } />
              </>
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <* '</' { balanced: '>' } />
                closeToken: <* '>' { balancer: true } />
              </>
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<Node>reference: <//></>`', () => {
      expect(print(cstml`<Node>reference: <//></>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Node' { span: 'Identifier' } />
              closeToken: null
            </>
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: null
              name$:
              <$Identifier>
                openToken: null
                content: <*IdentifierContent 'reference' { span: 'Identifier' } />
                closeToken: null
              </>
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <* ':' />
            </>
            #: :Space: <*Space ' ' />
            binding$: null
            value$:
            <$GapTag>
              sigilToken: <* '<//>' />
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<Node>reference: <Node></></>`', () => {
      expect(print(cstml`<Node>reference: <Node></></>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Node' { span: 'Identifier' } />
              closeToken: null
            </>
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: null
              name$:
              <$Identifier>
                openToken: null
                content: <*IdentifierContent 'reference' { span: 'Identifier' } />
                closeToken: null
              </>
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <* ':' />
            </>
            #: :Space: <*Space ' ' />
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                  fragmentToken: null
                  multiFragmentToken: null
                </>
                type$:
                <$Identifier>
                  openToken: null
                  content: <*IdentifierContent 'Node' { span: 'Identifier' } />
                  closeToken: null
                </>
                literalValue$: null
                attributes$: null
                selfClosingToken: null
                closeToken: <* '>' { balancer: true } />
              </>
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <* '</' { balanced: '>' } />
                closeToken: <* '>' { balancer: true } />
              </>
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<Node { foo: { bar: undefined } }> { foo.bar: 1 } </>`', () => {
      expect(print(cstml`<Node { foo: { bar: undefined } }> { foo.bar: 1 } </>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Node' { span: 'Identifier' } />
              closeToken: null
            </>
            #: :Space: <*Space ' ' />
            literalValue$: null
            attributes$: :JSON:
            <$Object>
              openToken: <* '{' { balanced: '}' } />
              #: :Space: <*Space ' ' />
              properties[]$:
              <$Property>
                key$:
                <$Identifier>
                  openToken: null
                  content: <*IdentifierContent 'foo' { span: 'Identifier' } />
                  closeToken: null
                </>
                sigilToken: <* ':' />
                #: :Space: <*Space ' ' />
                value+$:
                <$Object>
                  openToken: <* '{' { balanced: '}' } />
                  #: :Space: <*Space ' ' />
                  properties[]$:
                  <$Property>
                    key$:
                    <$Identifier>
                      openToken: null
                      content: <*IdentifierContent 'bar' { span: 'Identifier' } />
                      closeToken: null
                    </>
                    sigilToken: <* ':' />
                    #: :Space: <*Space ' ' />
                    value+$:
                    <$Undefined>
                      sigilToken: <*Keyword 'undefined' />
                    </>
                  </>
                  #: :Space: <*Space ' ' />
                  closeToken: <* '}' { balancer: true } />
                </>
              </>
              #: :Space: <*Space ' ' />
              closeToken: <* '}' { balancer: true } />
            </>
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          children[]$:
          <$AttributeDefinition>
            openToken: <* '{' { balanced: '}' } />
            #: :Space: <*Space ' ' />
            key$:
            <$IdentifierPath>
              segments[]$:
              <$Identifier>
                openToken: null
                content: <*IdentifierContent 'foo' { span: 'Identifier' } />
                closeToken: null
              </>
              separatorTokens[]: <* '.' />
              segments[]$:
              <$Identifier>
                openToken: null
                content: <*IdentifierContent 'bar' { span: 'Identifier' } />
                closeToken: null
              </>
            </>
            sigilToken: <* ':' />
            #: :Space: <*Space ' ' />
            value$: :JSON:
            <$Number { span: 'Number' }>
              wholePart$:
              <$Integer>
                signToken: null
                value$: <*UnsignedInteger '1' />
              </>
              fractionalSeparatorToken: null
              fractionalPart$: null
              exponentSeparatorToken: null
              exponentPart$: null
            </>
            #: :Space: <*Space ' ' />
            closeToken: <* '}' { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<*Tag>@:<Escape { cooked: "e" }></></>`', () => {
      expect(print(cstml`<*Tag>@:<Escape { cooked: "e" }></></>`)).toEqual(dedent`\
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: <* '*' />
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: null
              content: <*IdentifierContent 'Tag' { span: 'Identifier' } />
              closeToken: null
            </>
            literalValue$: null
            attributes$: null
            selfClosingToken: null
            closeToken: <* '>' { balancer: true } />
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: <* '@' />
              name$: null
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <* ':' />
            </>
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                  fragmentToken: null
                  multiFragmentToken: null
                </>
                type$:
                <$Identifier>
                  openToken: null
                  content: <*IdentifierContent 'Escape' { span: 'Identifier' } />
                  closeToken: null
                </>
                #: :Space: <*Space ' ' />
                literalValue$: null
                attributes$: :JSON:
                <$Object>
                  openToken: <* '{' { balanced: '}' } />
                  #: :Space: <*Space ' ' />
                  properties[]$:
                  <$Property>
                    key$:
                    <$Identifier>
                      openToken: null
                      content: <*IdentifierContent 'cooked' { span: 'Identifier' } />
                      closeToken: null
                    </>
                    sigilToken: <* ':' />
                    #: :Space: <*Space ' ' />
                    value+$:
                    <$String>
                      openToken: <* '"' { balanced: '"', balancedSpan: 'String:Double' } />
                      content$: <*StringContent 'e' />
                      closeToken: <* '"' { balancer: true } />
                    </>
                  </>
                  #: :Space: <*Space ' ' />
                  closeToken: <* '}' { balancer: true } />
                </>
                selfClosingToken: null
                closeToken: <* '>' { balancer: true } />
              </>
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <* '</' { balanced: '>' } />
                closeToken: <* '>' { balancer: true } />
              </>
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <* '</' { balanced: '>' } />
            closeToken: <* '>' { balancer: true } />
          </>
        </>\n`);
    });
  });

  describe('OpenNodeTag', () => {
    const tag = buildCSTMLTag(spam`<$OpenNodeTag />`);

    it("`<*Type 'literalValue' />`", () => {
      expect(print(tag`<*Type 'literalValue' />`)).toEqual(dedent`\
        <$OpenNodeTag { balanced: false, balancedSpan: null }>
          openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
          flags:
          <$NodeFlags>
            tokenToken: <* '*' />
            hasGapToken: null
            fragmentToken: null
            multiFragmentToken: null
          </>
          type$:
          <$Identifier>
            openToken: null
            content: <*IdentifierContent 'Type' { span: 'Identifier' } />
            closeToken: null
          </>
          #: :Space: <*Space ' ' />
          literalValue$: :JSON:
          <$String>
            openToken: <* "'" { balanced: "'", balancedSpan: 'String:Single' } />
            content$: <*StringContent 'literalValue' />
            closeToken: <* "'" { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          attributes$: null
          selfClosingToken: <* '/' />
          closeToken: <* '>' { balancer: true } />
        </>\n`);
    });

    it("`<* 'literalValue' />`", () => {
      expect(print(tag`<* 'literalValue' />`)).toEqual(dedent`\
        <$OpenNodeTag { balanced: false, balancedSpan: null }>
          openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
          flags:
          <$NodeFlags>
            tokenToken: <* '*' />
            hasGapToken: null
            fragmentToken: null
            multiFragmentToken: null
          </>
          type$: null
          #: :Space: <*Space ' ' />
          literalValue$: :JSON:
          <$String>
            openToken: <* "'" { balanced: "'", balancedSpan: 'String:Single' } />
            content$: <*StringContent 'literalValue' />
            closeToken: <* "'" { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          attributes$: null
          selfClosingToken: <* '/' />
          closeToken: <* '>' { balancer: true } />
        </>\n`);
    });

    it('`<Quantifier { min: 1, max: Infinity } />`', () => {
      expect(print(tag`<Quantifier { min: 1, max: Infinity } />`)).toEqual(dedent`\
        <$OpenNodeTag { balanced: false, balancedSpan: null }>
          openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
          flags:
          <$NodeFlags>
            tokenToken: null
            hasGapToken: null
            fragmentToken: null
            multiFragmentToken: null
          </>
          type$:
          <$Identifier>
            openToken: null
            content: <*IdentifierContent 'Quantifier' { span: 'Identifier' } />
            closeToken: null
          </>
          #: :Space: <*Space ' ' />
          literalValue$: null
          attributes$: :JSON:
          <$Object>
            openToken: <* '{' { balanced: '}' } />
            #: :Space: <*Space ' ' />
            properties[]$:
            <$Property>
              key$:
              <$Identifier>
                openToken: null
                content: <*IdentifierContent 'min' { span: 'Identifier' } />
                closeToken: null
              </>
              sigilToken: <* ':' />
              #: :Space: <*Space ' ' />
              value+$:
              <$Number { span: 'Number' }>
                wholePart$:
                <$Integer>
                  signToken: null
                  value$: <*UnsignedInteger '1' />
                </>
                fractionalSeparatorToken: null
                fractionalPart$: null
                exponentSeparatorToken: null
                exponentPart$: null
              </>
            </>
            separatorTokens[]: <* ',' />
            #: :Space: <*Space ' ' />
            properties[]$:
            <$Property>
              key$:
              <$Identifier>
                openToken: null
                content: <*IdentifierContent 'max' { span: 'Identifier' } />
                closeToken: null
              </>
              sigilToken: <* ':' />
              #: :Space: <*Space ' ' />
              value+$:
              <$Infinity>
                signToken: null
                sigilToken: <*Keyword 'Infinity' />
              </>
            </>
            #: :Space: <*Space ' ' />
            closeToken: <* '}' { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          selfClosingToken: <* '/' />
          closeToken: <* '>' { balancer: true } />
        </>\n`);
    });

    it('"<`Identifier` />"', () => {
      expect(print(tag({ raw: ['<`Identifier` />'] }))).toEqual(dedent`\
        <$OpenNodeTag { balanced: false, balancedSpan: null }>
          openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
          flags:
          <$NodeFlags>
            tokenToken: null
            hasGapToken: null
            fragmentToken: null
            multiFragmentToken: null
          </>
          type$:
          <$Identifier>
            openToken: <* '${'`'}' { balanced: '${'`'}' } />
            content: <*IdentifierContent 'Identifier' { span: 'Identifier' } />
            closeToken: <* '${'`'}' { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          literalValue$: null
          attributes$: null
          selfClosingToken: <* '/' />
          closeToken: <* '>' { balancer: true } />
        </>\n`);
    });

    it('"<\\u004a />"', () => {
      expect(print(tag`<\u004a />`)).toEqual(dedent`\
        <$OpenNodeTag { balanced: false, balancedSpan: null }>
          openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
          flags:
          <$NodeFlags>
            tokenToken: null
            hasGapToken: null
            fragmentToken: null
            multiFragmentToken: null
          </>
          type$:
          <$Identifier>
            openToken: null
            content:
            <*IdentifierContent { span: 'Identifier' }>
              @:
              <EscapeSequence { cooked: 'J' }>
                sigilToken: <* '${'\\\\'}' { openSpan: 'Escape' } />
                code:
                <EscapeCode { closeSpan: 'Escape' }>
                  typeToken: <*Keyword 'u' />
                  openToken: null
                  value: :JSON: <*UnsignedHexInteger '004a' />
                  closeToken: null
                </>
              </>
            </>
            closeToken: null
          </>
          #: :Space: <*Space ' ' />
          literalValue$: null
          attributes$: null
          selfClosingToken: <* '/' />
          closeToken: <* '>' { balancer: true } />
        </>\n`);
    });

    it('"<日本語 />"', () => {
      expect(print(tag`<日本語 />`)).toEqual(dedent`\
        <$OpenNodeTag { balanced: false, balancedSpan: null }>
          openToken: <* '<' { balancedSpan: 'Tag', balanced: '>' } />
          flags:
          <$NodeFlags>
            tokenToken: null
            hasGapToken: null
            fragmentToken: null
            multiFragmentToken: null
          </>
          type$:
          <$Identifier>
            openToken: null
            content: <*IdentifierContent '日本語' { span: 'Identifier' } />
            closeToken: null
          </>
          #: :Space: <*Space ' ' />
          literalValue$: null
          attributes$: null
          selfClosingToken: <* '/' />
          closeToken: <* '>' { balancer: true } />
        </>\n`);
    });
  });
});
