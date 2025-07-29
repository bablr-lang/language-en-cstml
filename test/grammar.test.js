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
  return printPrettyCSTML(tree.node);
};

describe('@bablr/language-en-cstml', () => {
  describe('Document', () => {
    const cstml = buildCSTMLTag(spam`<$Document />`);

    it('<!0:cstml><_></>', () => {
      expect(print(cstml`<!0:cstml><_></>`)).toEqual(dedent`\
        <$_>
          .:
          <$Document>
            doctype$:
            <$DoctypeTag>
              openToken: <*Punctuator '<!' { balancedSpan: 'Tag', balanced: '>' } />
              version$: :JSON: <*UnsignedInteger '0' />
              versionSeparatorToken: <*Punctuator ':' />
              doctypeToken$: <*Keyword 'cstml' />
              attributes$: null
              closeToken: <*Punctuator '>' { balancer: true } />
            </>
            tree$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                  fragmentToken: <*Punctuator '_' />
                  multiFragmentToken: null
                </>
                type$: null
                intrinsicValue$: null
                attributes$: null
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
              children[]$: []
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <*Punctuator '</' { balanced: '>' } />
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
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
        .[]: []
        .[]:
        <$DoctypeTag>
          openToken: <*Punctuator '<!' { balancedSpan: 'Tag', balanced: '>' } />
          version$: :JSON: <*UnsignedInteger '0' />
          versionSeparatorToken: <*Punctuator ':' />
          doctypeToken$: <*Keyword 'cstml' />
          attributes$: null
          closeToken: <*Punctuator '>' { balancer: true } />
        </>
        .[]:
        <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
          openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
          flags:
          <$NodeFlags>
            tokenToken: null
            hasGapToken: null
            fragmentToken: <*Punctuator '_' />
            multiFragmentToken: null
          </>
          type$: null
          intrinsicValue$: null
          attributes$: null
          selfClosingTagToken: null
          closeToken: <*Punctuator '>' { balancer: true } />
        </>
        .[]:
        <$ReferenceTag>
          type: <*Punctuator '.' />
          name$: null
          openIndexToken: null
          closeIndexToken: null
          flags:
          <$ReferenceFlags>
            expressionToken: null
            hasGapToken: null
          </>
          sigilToken: <*Punctuator ':' />
        </>
        .[]:
        <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
          openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
          intrinsicValue$: null
          attributes$: null
          selfClosingTagToken: null
          closeToken: <*Punctuator '>' { balancer: true } />
        </>
        .[]:
        <$CloseNodeTag { balancer: true }>
          openToken: <*Punctuator '</' { balanced: '>' } />
          closeToken: <*Punctuator '>' { balancer: true } />
        </>
        .[]:
        <$CloseNodeTag { balancer: true }>
          openToken: <*Punctuator '</' { balanced: '>' } />
          closeToken: <*Punctuator '>' { balancer: true } />
        </>
      </>\n`);
    });
  });

  describe('Node', () => {
    const cstml = buildCSTMLTag(spam`<$Node />`);

    it('<_></>', () => {
      expect(print(cstml`<_></>`)).toEqual(dedent`\
        <$_>
          .:
          <$Node>
            open:
            <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
              openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
              flags:
              <$NodeFlags>
                tokenToken: null
                hasGapToken: null
                fragmentToken: <*Punctuator '_' />
                multiFragmentToken: null
              </>
              type$: null
              intrinsicValue$: null
              attributes$: null
              selfClosingTagToken: null
              closeToken: <*Punctuator '>' { balancer: true } />
            </>
            children[]$: []
            close:
            <$CloseNodeTag { balancer: true }>
              openToken: <*Punctuator '</' { balanced: '>' } />
              closeToken: <*Punctuator '>' { balancer: true } />
            </>
          </>
        </>\n`);
    });

    it('<_> </>', () => {
      expect(print(cstml`<_> </>`)).toEqual(dedent`\
        <$_>
          .:
          <$Node>
            open:
            <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
              openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
              flags:
              <$NodeFlags>
                tokenToken: null
                hasGapToken: null
                fragmentToken: <*Punctuator '_' />
                multiFragmentToken: null
              </>
              type$: null
              intrinsicValue$: null
              attributes$: null
              selfClosingTagToken: null
              closeToken: <*Punctuator '>' { balancer: true } />
            </>
            #: :Space: <*Space ' ' />
            children[]$: []
            close:
            <$CloseNodeTag { balancer: true }>
              openToken: <*Punctuator '</' { balanced: '>' } />
              closeToken: <*Punctuator '>' { balancer: true } />
            </>
          </>
        </>\n`);
    });

    it('<_>.:<Node></></>', () => {
      expect(print(cstml`<_>.:<Node></></>`)).toEqual(dedent`\
      <$_>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: <*Punctuator '_' />
              multiFragmentToken: null
            </>
            type$: null
            intrinsicValue$: null
            attributes$: null
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
          children[]$: []
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: <*Punctuator '.' />
              name$: null
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
                intrinsicValue$: null
                attributes$: null
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
              children[]$: []
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <*Punctuator '</' { balanced: '>' } />
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <*Punctuator '</' { balanced: '>' } />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>
      </>\n`);
    });

    it('<_>.:<Node></>#:<Trivia></></>', () => {
      expect(print(cstml`<_>.:<Node></>#:<Trivia></></>`)).toEqual(dedent`\
      <$_>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: <*Punctuator '_' />
              multiFragmentToken: null
            </>
            type$: null
            intrinsicValue$: null
            attributes$: null
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
          children[]$: []
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: <*Punctuator '.' />
              name$: null
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
                intrinsicValue$: null
                attributes$: null
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
              children[]$: []
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <*Punctuator '</' { balanced: '>' } />
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
            </>
          </>
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: <*Punctuator '#' />
              name$: null
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
                intrinsicValue$: null
                attributes$: null
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
              children[]$: []
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <*Punctuator '</' { balanced: '>' } />
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <*Punctuator '</' { balanced: '>' } />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>
      </>\n`);
    });

    it('`<Node>reference: null</>`', () => {
      expect(print(cstml`<Node>reference: null</>`)).toEqual(dedent`\
      <$_>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
            intrinsicValue$: null
            attributes$: null
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
          children[]$: []
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
              sigilToken: <*Punctuator ':' />
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
            openToken: <*Punctuator '</' { balanced: '>' } />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>
      </>\n`);
    });

    it('`<Node>#: <__></></>`', () => {
      expect(print(cstml`<Node>_: <__></></>`)).toEqual(dedent`\
      <$_>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
            intrinsicValue$: null
            attributes$: null
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
          children[]$: []
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              type: <*Punctuator '_' />
              name$: null
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            #: :Space: <*Space ' ' />
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                  fragmentToken: <*Punctuator '_' />
                  multiFragmentToken: <*Punctuator '_' />
                </>
                type$: null
                intrinsicValue$: null
                attributes$: null
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
              children[]$: []
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <*Punctuator '</' { balanced: '>' } />
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <*Punctuator '</' { balanced: '>' } />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>
      </>\n`);
    });

    it('`<Node>reference: <//></>`', () => {
      expect(print(cstml`<Node>reference: <//></>`)).toEqual(dedent`\
      <$_>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
            intrinsicValue$: null
            attributes$: null
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
          children[]$: []
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
              sigilToken: <*Punctuator ':' />
            </>
            #: :Space: <*Space ' ' />
            binding$: null
            value$:
            <$GapTag>
              sigilToken: <*Punctuator '<//>' />
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <*Punctuator '</' { balanced: '>' } />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>
      </>\n`);
    });

    it('`<Node>reference: <Node></></>`', () => {
      expect(print(cstml`<Node>reference: <Node></></>`)).toEqual(dedent`\
      <$_>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
            intrinsicValue$: null
            attributes$: null
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
          children[]$: []
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
              sigilToken: <*Punctuator ':' />
            </>
            #: :Space: <*Space ' ' />
            binding$: null
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
                intrinsicValue$: null
                attributes$: null
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
              children[]$: []
              close:
              <$CloseNodeTag { balancer: true }>
                openToken: <*Punctuator '</' { balanced: '>' } />
                closeToken: <*Punctuator '>' { balancer: true } />
              </>
            </>
          </>
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <*Punctuator '</' { balanced: '>' } />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>
      </>\n`);
    });

    it('`<Node { foo: { bar: undefined } }> { foo.bar: 1 } </>`', () => {
      expect(print(cstml`<Node { foo: { bar: undefined } }> { foo.bar: 1 } </>`)).toEqual(dedent`\
      <$_>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
            intrinsicValue$: null
            attributes$: :JSON:
            <$Object>
              openToken: <*Punctuator '{' { balanced: '}' } />
              #: :Space: <*Space ' ' />
              #separatorTokens[]: []
              properties[]$: []
              properties[]$:
              <$Property>
                key$:
                <$Identifier>
                  openToken: null
                  content: <*IdentifierContent 'foo' { span: 'Identifier' } />
                  closeToken: null
                </>
                sigilToken: <*Punctuator ':' />
                #: :Space: <*Space ' ' />
                value+$:
                <$Object>
                  openToken: <*Punctuator '{' { balanced: '}' } />
                  #: :Space: <*Space ' ' />
                  #separatorTokens[]: []
                  properties[]$: []
                  properties[]$:
                  <$Property>
                    key$:
                    <$Identifier>
                      openToken: null
                      content: <*IdentifierContent 'bar' { span: 'Identifier' } />
                      closeToken: null
                    </>
                    sigilToken: <*Punctuator ':' />
                    #: :Space: <*Space ' ' />
                    value+$:
                    <$Undefined>
                      sigilToken: <*Keyword 'undefined' />
                    </>
                  </>
                  #: :Space: <*Space ' ' />
                  closeToken: <*Punctuator '}' { balancer: true } />
                </>
              </>
              #: :Space: <*Space ' ' />
              closeToken: <*Punctuator '}' { balancer: true } />
            </>
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          children[]$: []
          children[]$:
          <$AttributeDefinition>
            openToken: <*Punctuator '{' { balanced: '}' } />
            #: :Space: <*Space ' ' />
            key$:
            <$IdentifierPath>
              segments[]$: []
              segments[]$:
              <$Identifier>
                openToken: null
                content: <*IdentifierContent 'foo' { span: 'Identifier' } />
                closeToken: null
              </>
              #separatorTokens[]: []
              #separatorTokens[]: <*Punctuator '.' />
              segments[]$:
              <$Identifier>
                openToken: null
                content: <*IdentifierContent 'bar' { span: 'Identifier' } />
                closeToken: null
              </>
            </>
            sigilToken: <*Punctuator ':' />
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
            closeToken: <*Punctuator '}' { balancer: true } />
          </>
          #: :Space: <*Space ' ' />
          close:
          <$CloseNodeTag { balancer: true }>
            openToken: <*Punctuator '</' { balanced: '>' } />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>
      </>\n`);
    });

    it('`<*Tag>@:<Escape { cooked: "e" }></></>`', () => {
      expect(print(cstml`<*Tag>@:<Escape { cooked: "e" }></></>`)).toEqual(dedent`\
        <$_>
          .:
          <$Node>
            open:
            <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
              openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
              flags:
              <$NodeFlags>
                tokenToken: <*Punctuator '*' />
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
              intrinsicValue$: null
              attributes$: null
              selfClosingTagToken: null
              closeToken: <*Punctuator '>' { balancer: true } />
            </>
            children[]$: []
            children[]$:
            <$Property>
              reference$:
              <$ReferenceTag>
                type: <*Punctuator '@' />
                name$: null
                openIndexToken: null
                closeIndexToken: null
                flags:
                <$ReferenceFlags>
                  expressionToken: null
                  hasGapToken: null
                </>
                sigilToken: <*Punctuator ':' />
              </>
              binding$: null
              value$:
              <$Node>
                open:
                <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                  openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
                  intrinsicValue$: null
                  attributes$: :JSON:
                  <$Object>
                    openToken: <*Punctuator '{' { balanced: '}' } />
                    #: :Space: <*Space ' ' />
                    #separatorTokens[]: []
                    properties[]$: []
                    properties[]$:
                    <$Property>
                      key$:
                      <$Identifier>
                        openToken: null
                        content: <*IdentifierContent 'cooked' { span: 'Identifier' } />
                        closeToken: null
                      </>
                      sigilToken: <*Punctuator ':' />
                      #: :Space: <*Space ' ' />
                      value+$:
                      <$String>
                        openToken: <*Punctuator '"' { balanced: '"', balancedSpan: 'String:Double' } />
                        content$: <*StringContent 'e' />
                        closeToken: <*Punctuator '"' { balancer: true } />
                      </>
                    </>
                    #: :Space: <*Space ' ' />
                    closeToken: <*Punctuator '}' { balancer: true } />
                  </>
                  selfClosingTagToken: null
                  closeToken: <*Punctuator '>' { balancer: true } />
                </>
                children[]$: []
                close:
                <$CloseNodeTag { balancer: true }>
                  openToken: <*Punctuator '</' { balanced: '>' } />
                  closeToken: <*Punctuator '>' { balancer: true } />
                </>
              </>
            </>
            close:
            <$CloseNodeTag { balancer: true }>
              openToken: <*Punctuator '</' { balanced: '>' } />
              closeToken: <*Punctuator '>' { balancer: true } />
            </>
          </>
        </>\n`);
    });
  });

  describe('OpenNodeTag', () => {
    const tag = buildCSTMLTag(spam`<$OpenNodeTag />`);

    it("`<*Type 'intrinsicValue' />`", () => {
      expect(print(tag`<*Type 'intrinsicValue' />`)).toEqual(dedent`\
        <$_>
          .:
          <$OpenNodeTag { balanced: false, balancedSpan: null }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: <*Punctuator '*' />
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
            intrinsicValue$: :JSON:
            <$String>
              openToken: <*Punctuator "'" { balanced: "'", balancedSpan: 'String:Single' } />
              content$: <*StringContent 'intrinsicValue' />
              closeToken: <*Punctuator "'" { balancer: true } />
            </>
            #: :Space: <*Space ' ' />
            attributes$: null
            selfClosingTagToken: <*Punctuator '/' />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<Quantifier { min: 1, max: Infinity } />`', () => {
      expect(print(tag`<Quantifier { min: 1, max: Infinity } />`)).toEqual(dedent`\
        <$_>
          .:
          <$OpenNodeTag { balanced: false, balancedSpan: null }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
            intrinsicValue$: null
            attributes$: :JSON:
            <$Object>
              openToken: <*Punctuator '{' { balanced: '}' } />
              #: :Space: <*Space ' ' />
              #separatorTokens[]: []
              properties[]$: []
              properties[]$:
              <$Property>
                key$:
                <$Identifier>
                  openToken: null
                  content: <*IdentifierContent 'min' { span: 'Identifier' } />
                  closeToken: null
                </>
                sigilToken: <*Punctuator ':' />
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
              #separatorTokens[]: <*Punctuator ',' />
              #: :Space: <*Space ' ' />
              properties[]$:
              <$Property>
                key$:
                <$Identifier>
                  openToken: null
                  content: <*IdentifierContent 'max' { span: 'Identifier' } />
                  closeToken: null
                </>
                sigilToken: <*Punctuator ':' />
                #: :Space: <*Space ' ' />
                value+$:
                <$Infinity>
                  signToken: null
                  sigilToken: <*Keyword 'Infinity' />
                </>
              </>
              #: :Space: <*Space ' ' />
              closeToken: <*Punctuator '}' { balancer: true } />
            </>
            #: :Space: <*Space ' ' />
            selfClosingTagToken: <*Punctuator '/' />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('"<`Identifier` />"', () => {
      expect(print(tag({ raw: ['<`Identifier` />'] }))).toEqual(dedent`\
        <$_>
          .:
          <$OpenNodeTag { balanced: false, balancedSpan: null }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
              fragmentToken: null
              multiFragmentToken: null
            </>
            type$:
            <$Identifier>
              openToken: <*Punctuator '${'`'}' { balanced: '${'`'}' } />
              content: <*IdentifierContent 'Identifier' { span: 'Identifier' } />
              closeToken: <*Punctuator '${'`'}' { balancer: true } />
            </>
            #: :Space: <*Space ' ' />
            intrinsicValue$: null
            attributes$: null
            selfClosingTagToken: <*Punctuator '/' />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('"<\\u004a />"', () => {
      expect(print(tag`<\u004a />`)).toEqual(dedent`\
        <$_>
          .:
          <$OpenNodeTag { balanced: false, balancedSpan: null }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
                  sigilToken: <*Punctuator '${'\\\\'}' { openSpan: 'Escape' } />
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
            intrinsicValue$: null
            attributes$: null
            selfClosingTagToken: <*Punctuator '/' />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('"<日本語 />"', () => {
      expect(print(tag`<日本語 />`)).toEqual(dedent`\
        <$_>
          .:
          <$OpenNodeTag { balanced: false, balancedSpan: null }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
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
            intrinsicValue$: null
            attributes$: null
            selfClosingTagToken: <*Punctuator '/' />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>\n`);
    });
  });
});
