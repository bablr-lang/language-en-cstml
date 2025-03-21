import { buildTag, Context } from 'bablr';
import { spam } from '@bablr/boot';
import { dedent } from '@qnighy/dedent';
import * as language from '@bablr/language-en-cstml';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/helpers/tree';
import { buildIdentifier, buildString } from '@bablr/helpers/builders';

let enhancers = {};

// enhancers = debugEnhancers;

const { raw } = String;

const ctx = Context.from(language, enhancers.bablrProduction);

const buildCSTMLTag = (type) => {
  const matcher = spam`<$${buildString(language.canonicalURL)}:${buildIdentifier(type)} />`;
  return buildTag(ctx, matcher, undefined, { enhancers });
};

const print = (tree) => {
  return printPrettyCSTML(tree, { ctx });
};

describe('@bablr/language-en-cstml', () => {
  describe('Document', () => {
    const cstml = buildCSTMLTag('Document');

    it('<!0:cstml><></>', () => {
      expect(print(cstml`<!0:cstml><></>`)).toEqual(dedent`\
        <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
        <$>
          .:
          <$Document>
            doctype$:
            <$DoctypeTag>
              openToken: <*Punctuator '<!' { balancedSpan: 'Tag', balanced: '>' } />
              version$: <*JSON:UnsignedInteger '0' />
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
                </>
                language$: null
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
    const cstml = buildCSTMLTag('Stream');

    it('<!0:cstml><>.:<Node></></>', () => {
      expect(print(cstml`<!0:cstml><>.:<Node></></>`)).toEqual(dedent`\
      <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
      <$>
        .[]: []
        .[]:
        <$DoctypeTag>
          openToken: <*Punctuator '<!' { balancedSpan: 'Tag', balanced: '>' } />
          version$: <*JSON:UnsignedInteger '0' />
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
          </>
          language$: null
          type$: null
          intrinsicValue$: null
          attributes$: null
          selfClosingTagToken: null
          closeToken: <*Punctuator '>' { balancer: true } />
        </>
        .[]:
        <$ReferenceTag>
          name$: <*Punctuator '.' />
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
          </>
          language$: null
          type$: <*Identifier 'Node' />
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

  describe('Fragment', () => {
    const cstml = buildCSTMLTag('Node');

    it('<></>', () => {
      expect(print(cstml`<></>`)).toEqual(dedent`\
        <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
        <$>
          .:
          <$Node>
            open:
            <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
              openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
              flags:
              <$NodeFlags>
                tokenToken: null
                hasGapToken: null
              </>
              language$: null
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

    it('<> </>', () => {
      expect(print(cstml`<> </>`)).toEqual(dedent`\
        <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
        <$>
          .:
          <$Node>
            open:
            <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
              openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
              flags:
              <$NodeFlags>
                tokenToken: null
                hasGapToken: null
              </>
              language$: null
              type$: null
              intrinsicValue$: null
              attributes$: null
              selfClosingTagToken: null
              closeToken: <*Punctuator '>' { balancer: true } />
            </>
            #: <*Space:Space ' ' />
            children[]$: []
            close:
            <$CloseNodeTag { balancer: true }>
              openToken: <*Punctuator '</' { balanced: '>' } />
              closeToken: <*Punctuator '>' { balancer: true } />
            </>
          </>
        </>\n`);
    });

    it('<>.:<Node></></>', () => {
      expect(print(cstml`<>.:<Node></></>`)).toEqual(dedent`\
      <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
      <$>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
            </>
            language$: null
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
              name$: <*Punctuator '.' />
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                </>
                language$: null
                type$: <*Identifier 'Node' />
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

    it('<>.:<Node></>#:<Trivia></></>', () => {
      expect(print(cstml`<>.:<Node></>#:<Trivia></></>`)).toEqual(dedent`\
      <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
      <$>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
            </>
            language$: null
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
              name$: <*Punctuator '.' />
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                </>
                language$: null
                type$: <*Identifier 'Node' />
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
              name$: <*Punctuator '#' />
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                </>
                language$: null
                type$: <*Identifier 'Trivia' />
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
  });

  describe('Node', () => {
    const cstml = buildCSTMLTag('Node');

    it('`<Node>reference: null</>`', () => {
      expect(print(cstml`<Node>reference: null</>`)).toEqual(dedent`\
      <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
      <$>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Node' />
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
              name$: <*Identifier 'reference' />
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            #: <*Space:Space ' ' />
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

    it('`<Node>reference: <//></>`', () => {
      expect(print(cstml`<Node>reference: <//></>`)).toEqual(dedent`\
      <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
      <$>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Node' />
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
              name$: <*Identifier 'reference' />
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            #: <*Space:Space ' ' />
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
      <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
      <$>
        .:
        <$Node>
          open:
          <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Node' />
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
              name$: <*Identifier 'reference' />
              openIndexToken: null
              closeIndexToken: null
              flags:
              <$ReferenceFlags>
                expressionToken: null
                hasGapToken: null
              </>
              sigilToken: <*Punctuator ':' />
            </>
            #: <*Space:Space ' ' />
            value$:
            <$Node>
              open:
              <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
                flags:
                <$NodeFlags>
                  tokenToken: null
                  hasGapToken: null
                </>
                language$: null
                type$: <*Identifier 'Node' />
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

    it('`<*Tag>@:<Escape { cooked: "e" }></></>`', () => {
      expect(print(cstml`<*Tag>@:<Escape { cooked: "e" }></></>`)).toEqual(dedent`\
        <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
        <$>
          .:
          <$Node>
            open:
            <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
              openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
              flags:
              <$NodeFlags>
                tokenToken: <*Punctuator '*' />
                hasGapToken: null
              </>
              language$: null
              type$: <*Identifier 'Tag' />
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
                name$: <*Punctuator '@' />
                openIndexToken: null
                closeIndexToken: null
                flags:
                <$ReferenceFlags>
                  expressionToken: null
                  hasGapToken: null
                </>
                sigilToken: <*Punctuator ':' />
              </>
              value$:
              <$Node>
                open:
                <$OpenNodeTag { balanced: true, balancedSpan: 'NodeChildren' }>
                  openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
                  flags:
                  <$NodeFlags>
                    tokenToken: null
                    hasGapToken: null
                  </>
                  language$: null
                  type$: <*Identifier 'Escape' />
                  #: <*Space:Space ' ' />
                  intrinsicValue$: null
                  attributes$:
                  <$JSON:Object>
                    openToken: <*Punctuator '{' { balanced: '}' } />
                    separatorTokens[]: []
                    properties[]$: []
                    #: <*Space:Space ' ' />
                    properties[]$:
                    <$Property>
                      key$: <*Identifier 'cooked' />
                      sigilToken: <*Punctuator ':' />
                      #: <*Space:Space ' ' />
                      value+$:
                      <$String>
                        openToken: <*Punctuator '"' { balanced: '"', balancedSpan: 'String:Double' } />
                        content$: <*StringContent 'e' />
                        closeToken: <*Punctuator '"' { balancer: true } />
                      </>
                    </>
                    #: <*Space:Space ' ' />
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
    const tag = buildCSTMLTag('OpenNodeTag');

    it("`<*Type 'intrinsicValue' />`", () => {
      expect(print(tag`<*Type 'intrinsicValue' />`)).toEqual(dedent`\
        <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
        <$>
          .:
          <$OpenNodeTag { balanced: false }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: <*Punctuator '*' />
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Type' />
            #: <*Space:Space ' ' />
            intrinsicValue$:
            <$JSON:String>
              openToken: <*Punctuator "'" { balanced: "'", balancedSpan: 'String:Single' } />
              content$: <*StringContent 'intrinsicValue' />
              closeToken: <*Punctuator "'" { balancer: true } />
            </>
            #: <*Space:Space ' ' />
            attributes$: null
            selfClosingTagToken: <*Punctuator '/' />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>\n`);
    });

    it('`<Quantifier { min: 1, max: Infinity } />`', () => {
      expect(print(tag`<Quantifier { min: 1, max: Infinity } />`)).toEqual(dedent`\
        <!0:cstml { bablrLanguage: 'https://bablr.org/languages/core/en/cstml' }>
        <$>
          .:
          <$OpenNodeTag { balanced: false }>
            openToken: <*Punctuator '<' { balancedSpan: 'Tag', balanced: '>' } />
            flags:
            <$NodeFlags>
              tokenToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Quantifier' />
            #: <*Space:Space ' ' />
            intrinsicValue$: null
            attributes$:
            <$JSON:Object>
              openToken: <*Punctuator '{' { balanced: '}' } />
              separatorTokens[]: []
              properties[]$: []
              #: <*Space:Space ' ' />
              properties[]$:
              <$Property>
                key$: <*Identifier 'min' />
                sigilToken: <*Punctuator ':' />
                #: <*Space:Space ' ' />
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
              separatorTokens[]: <*Punctuator ',' />
              #: <*Space:Space ' ' />
              properties[]$:
              <$Property>
                key$: <*Identifier 'max' />
                sigilToken: <*Punctuator ':' />
                #: <*Space:Space ' ' />
                value+$:
                <$Infinity>
                  signToken: null
                  sigilToken: <*Keyword 'Infinity' />
                </>
              </>
              #: <*Space:Space ' ' />
              closeToken: <*Punctuator '}' { balancer: true } />
            </>
            #: <*Space:Space ' ' />
            selfClosingTagToken: <*Punctuator '/' />
            closeToken: <*Punctuator '>' { balancer: true } />
          </>
        </>\n`);
    });
  });
});
