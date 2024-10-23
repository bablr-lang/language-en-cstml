import { dedent } from '@qnighy/dedent';
// eslint-disable-next-line import/no-unresolved
import * as language from '@bablr/language-en-cstml';
import { buildTag, Context, AgastContext } from 'bablr';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/helpers/tree';
import { buildFullyQualifiedSpamMatcher } from '@bablr/agast-vm-helpers';

let enhancers = {};

const { raw } = String;

// enhancers = debugEnhancers;

const ctx = Context.from(AgastContext.create(), language, enhancers.bablrProduction);

const buildCSTMLTag = (type) => {
  const matcher = buildFullyQualifiedSpamMatcher({ hasGap: true }, language.canonicalURL, type);
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
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$Document>
            doctype$:
            <$DoctypeTag>
              openToken: <*Punctuator '<!' balancedSpan='Tag' balanced='>' />
              version$: <*UnsignedInteger '0' />
              versionSeparatorToken: <*Punctuator ':' />
              doctypeToken$: <*Keyword 'cstml' />
              attributes[]$: []
              closeToken: <*Punctuator '>' balancer />
            </>
            tree$:
            <$Fragment>
              open:
              <$OpenFragmentTag balanced balancedSpan='FragmentChildren'>
                openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <$Flags>
                  triviaToken: null
                  tokenToken: null
                  escapeToken: null
                  expressionToken: null
                  hasGapToken: null
                </>
                closeToken: <*Punctuator '>' balancer />
              </>
              children[]$: []
              close:
              <$CloseFragmentTag balancer>
                openToken: <*Punctuator '</' balanced='>' />
                closeToken: <*Punctuator '>' balancer />
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
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <$>
        .[]: []
        .[]:
        <$DoctypeTag>
          openToken: <*Punctuator '<!' balancedSpan='Tag' balanced='>' />
          version$: <*UnsignedInteger '0' />
          versionSeparatorToken: <*Punctuator ':' />
          doctypeToken$: <*Keyword 'cstml' />
          attributes[]$: []
          closeToken: <*Punctuator '>' balancer />
        </>
        .[]:
        <$OpenFragmentTag balanced balancedSpan='FragmentChildren'>
          openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
          flags:
          <$Flags>
            triviaToken: null
            tokenToken: null
            escapeToken: null
            expressionToken: null
            hasGapToken: null
          </>
          closeToken: <*Punctuator '>' balancer />
        </>
        .[]:
        <$ReferenceTag>
          name$: <*Punctuator '.' />
          arrayOperatorToken: null
          hasGapToken: null
          sigilToken: <*Punctuator ':' />
        </>
        .[]:
        <$OpenNodeTag balanced balancedSpan='NodeChildren'>
          openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
          flags:
          <$Flags>
            triviaToken: null
            tokenToken: null
            escapeToken: null
            expressionToken: null
            hasGapToken: null
          </>
          language$: null
          type$: <*Identifier 'Node' />
          intrinsicValue$: null
          attributes[]$: []
          selfClosingTagToken: null
          closeToken: <*Punctuator '>' balancer />
        </>
        .[]:
        <$CloseNodeTag balancer>
          openToken: <*Punctuator '</' balanced='>' />
          language$: null
          type$: null
          closeToken: <*Punctuator '>' balancer />
        </>
        .[]:
        <$CloseFragmentTag balancer>
          openToken: <*Punctuator '</' balanced='>' />
          closeToken: <*Punctuator '>' balancer />
        </>
      </>\n`);
    });
  });

  describe('Fragment', () => {
    const cstml = buildCSTMLTag('Fragment');

    it('<></>', () => {
      expect(print(cstml`<></>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$Fragment>
            open:
            <$OpenFragmentTag balanced balancedSpan='FragmentChildren'>
              openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
              flags:
              <$Flags>
                triviaToken: null
                tokenToken: null
                escapeToken: null
                expressionToken: null
                hasGapToken: null
              </>
              closeToken: <*Punctuator '>' balancer />
            </>
            children[]$: []
            close:
            <$CloseFragmentTag balancer>
              openToken: <*Punctuator '</' balanced='>' />
              closeToken: <*Punctuator '>' balancer />
            </>
          </>
        </>\n`);
    });

    it('<> </>', () => {
      expect(print(cstml`<> </>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$Fragment>
            open:
            <$OpenFragmentTag balanced balancedSpan='FragmentChildren'>
              openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
              flags:
              <$Flags>
                triviaToken: null
                tokenToken: null
                escapeToken: null
                expressionToken: null
                hasGapToken: null
              </>
              closeToken: <*Punctuator '>' balancer />
            </>
            <#*Space:Space ' ' />
            children[]$: []
            close:
            <$CloseFragmentTag balancer>
              openToken: <*Punctuator '</' balanced='>' />
              closeToken: <*Punctuator '>' balancer />
            </>
          </>
        </>\n`);
    });

    it('<>.:<Node></></>', () => {
      expect(print(cstml`<>.:<Node></></>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <$>
        .:
        <$Fragment>
          open:
          <$OpenFragmentTag balanced balancedSpan='FragmentChildren'>
            openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <$Flags>
              triviaToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
              hasGapToken: null
            </>
            closeToken: <*Punctuator '>' balancer />
          </>
          children[]$: []
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              name$: <*Punctuator '.' />
              arrayOperatorToken: null
              hasGapToken: null
              sigilToken: <*Punctuator ':' />
            </>
            node$:
            <$Node>
              open:
              <$OpenNodeTag balanced balancedSpan='NodeChildren'>
                openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <$Flags>
                  triviaToken: null
                  tokenToken: null
                  escapeToken: null
                  expressionToken: null
                  hasGapToken: null
                </>
                language$: null
                type$: <*Identifier 'Node' />
                intrinsicValue$: null
                attributes[]$: []
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' balancer />
              </>
              children[]$: []
              close:
              <$CloseNodeTag balancer>
                openToken: <*Punctuator '</' balanced='>' />
                language$: null
                type$: null
                closeToken: <*Punctuator '>' balancer />
              </>
            </>
          </>
          close:
          <$CloseFragmentTag balancer>
            openToken: <*Punctuator '</' balanced='>' />
            closeToken: <*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });

    it('<>.:<Node></><#Trivia></></>', () => {
      expect(print(cstml`<>.:<Node></><#Trivia></></>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <$>
        .:
        <$Fragment>
          open:
          <$OpenFragmentTag balanced balancedSpan='FragmentChildren'>
            openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <$Flags>
              triviaToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
              hasGapToken: null
            </>
            closeToken: <*Punctuator '>' balancer />
          </>
          children[]$: []
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              name$: <*Punctuator '.' />
              arrayOperatorToken: null
              hasGapToken: null
              sigilToken: <*Punctuator ':' />
            </>
            node$:
            <$Node>
              open:
              <$OpenNodeTag balanced balancedSpan='NodeChildren'>
                openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <$Flags>
                  triviaToken: null
                  tokenToken: null
                  escapeToken: null
                  expressionToken: null
                  hasGapToken: null
                </>
                language$: null
                type$: <*Identifier 'Node' />
                intrinsicValue$: null
                attributes[]$: []
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' balancer />
              </>
              children[]$: []
              close:
              <$CloseNodeTag balancer>
                openToken: <*Punctuator '</' balanced='>' />
                language$: null
                type$: null
                closeToken: <*Punctuator '>' balancer />
              </>
            </>
          </>
          children[]$:
          <$Node>
            open:
            <$OpenNodeTag balanced balancedSpan='NodeChildren'>
              openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
              flags:
              <$Flags>
                triviaToken: <*Punctuator '#' />
                tokenToken: null
                escapeToken: null
                expressionToken: null
                hasGapToken: null
              </>
              language$: null
              type$: <*Identifier 'Trivia' />
              intrinsicValue$: null
              attributes[]$: []
              selfClosingTagToken: null
              closeToken: <*Punctuator '>' balancer />
            </>
            children[]$: []
            close:
            <$CloseNodeTag balancer>
              openToken: <*Punctuator '</' balanced='>' />
              language$: null
              type$: null
              closeToken: <*Punctuator '>' balancer />
            </>
          </>
          close:
          <$CloseFragmentTag balancer>
            openToken: <*Punctuator '</' balanced='>' />
            closeToken: <*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });
  });

  describe('Node', () => {
    const cstml = buildCSTMLTag('Node');

    it('`<Node>reference: null</>`', () => {
      expect(print(cstml`<Node>reference: null</>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <$>
        .:
        <$Node>
          open:
          <$OpenNodeTag balanced balancedSpan='NodeChildren'>
            openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <$Flags>
              triviaToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Node' />
            intrinsicValue$: null
            attributes[]$: []
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' balancer />
          </>
          children[]$: []
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              name$: <*Identifier 'reference' />
              arrayOperatorToken: null
              hasGapToken: null
              sigilToken: <*Punctuator ':' />
            </>
            <#*Space:Space ' ' />
            node$:
            <$NullTag>
              sigilToken: <*Keyword 'null' />
            </>
          </>
          close:
          <$CloseNodeTag balancer>
            openToken: <*Punctuator '</' balanced='>' />
            language$: null
            type$: null
            closeToken: <*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });

    it('`<Node>reference: <//></>`', () => {
      expect(print(cstml`<Node>reference: <//></>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <$>
        .:
        <$Node>
          open:
          <$OpenNodeTag balanced balancedSpan='NodeChildren'>
            openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <$Flags>
              triviaToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Node' />
            intrinsicValue$: null
            attributes[]$: []
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' balancer />
          </>
          children[]$: []
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              name$: <*Identifier 'reference' />
              arrayOperatorToken: null
              hasGapToken: null
              sigilToken: <*Punctuator ':' />
            </>
            <#*Space:Space ' ' />
            node$:
            <$GapTag>
              sigilToken: <*Punctuator '<//>' />
            </>
          </>
          close:
          <$CloseNodeTag balancer>
            openToken: <*Punctuator '</' balanced='>' />
            language$: null
            type$: null
            closeToken: <*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });

    it('`<Node>reference: <Node></></>`', () => {
      expect(print(cstml`<Node>reference: <Node></></>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <$>
        .:
        <$Node>
          open:
          <$OpenNodeTag balanced balancedSpan='NodeChildren'>
            openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <$Flags>
              triviaToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Node' />
            intrinsicValue$: null
            attributes[]$: []
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' balancer />
          </>
          children[]$: []
          children[]$:
          <$Property>
            reference$:
            <$ReferenceTag>
              name$: <*Identifier 'reference' />
              arrayOperatorToken: null
              hasGapToken: null
              sigilToken: <*Punctuator ':' />
            </>
            <#*Space:Space ' ' />
            node$:
            <$Node>
              open:
              <$OpenNodeTag balanced balancedSpan='NodeChildren'>
                openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <$Flags>
                  triviaToken: null
                  tokenToken: null
                  escapeToken: null
                  expressionToken: null
                  hasGapToken: null
                </>
                language$: null
                type$: <*Identifier 'Node' />
                intrinsicValue$: null
                attributes[]$: []
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' balancer />
              </>
              children[]$: []
              close:
              <$CloseNodeTag balancer>
                openToken: <*Punctuator '</' balanced='>' />
                language$: null
                type$: null
                closeToken: <*Punctuator '>' balancer />
              </>
            </>
          </>
          close:
          <$CloseNodeTag balancer>
            openToken: <*Punctuator '</' balanced='>' />
            language$: null
            type$: null
            closeToken: <*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });

    it('`<*Tag><@Escape cooked="e"></></>`', () => {
      expect(print(cstml`<*Tag><@Escape cooked="e"></></>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$Node>
            open:
            <$OpenNodeTag balanced balancedSpan='NodeChildren'>
              openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
              flags:
              <$Flags>
                triviaToken: null
                tokenToken: <*Punctuator '*' />
                escapeToken: null
                expressionToken: null
                hasGapToken: null
              </>
              language$: null
              type$: <*Identifier 'Tag' />
              intrinsicValue$: null
              attributes[]$: []
              selfClosingTagToken: null
              closeToken: <*Punctuator '>' balancer />
            </>
            children[]$: []
            children[]$:
            <$Node>
              open:
              <$OpenNodeTag balanced balancedSpan='NodeChildren'>
                openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <$Flags>
                  triviaToken: null
                  tokenToken: null
                  escapeToken: <*Punctuator '@' />
                  expressionToken: null
                  hasGapToken: null
                </>
                language$: null
                type$: <*Identifier 'Escape' />
                <#*Space:Space ' ' />
                intrinsicValue$: null
                attributes[]$: []
                attributes[]$:
                <$MappingAttribute>
                  key$: <*Identifier 'cooked' />
                  sigilToken: <*Punctuator '=' />
                  value$:
                  <$String>
                    openToken: <*Punctuator '"' balanced='"' balancedSpan='String:Double' />
                    content: <*StringContent 'e' />
                    closeToken: <*Punctuator '"' balancer />
                  </>
                </>
                selfClosingTagToken: null
                closeToken: <*Punctuator '>' balancer />
              </>
              children[]$: []
              close:
              <$CloseNodeTag balancer>
                openToken: <*Punctuator '</' balanced='>' />
                language$: null
                type$: null
                closeToken: <*Punctuator '>' balancer />
              </>
            </>
            close:
            <$CloseNodeTag balancer>
              openToken: <*Punctuator '</' balanced='>' />
              language$: null
              type$: null
              closeToken: <*Punctuator '>' balancer />
            </>
          </>
        </>\n`);
    });
  });

  describe('OpenNodeTag', () => {
    const tag = buildCSTMLTag('OpenNodeTag');

    it("`<*Type 'intrinsicValue' />`", () => {
      expect(print(tag`<*Type 'intrinsicValue' />`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$OpenNodeTag !balanced>
            openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <$Flags>
              triviaToken: null
              tokenToken: <*Punctuator '*' />
              escapeToken: null
              expressionToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Type' />
            <#*Space:Space ' ' />
            intrinsicValue$:
            <$String>
              openToken: <*Punctuator "'" balanced="'" balancedSpan='String:Single' />
              content: <*StringContent 'intrinsicValue' />
              closeToken: <*Punctuator "'" balancer />
            </>
            <#*Space:Space ' ' />
            attributes[]$: []
            selfClosingTagToken: <*Punctuator '/' />
            closeToken: <*Punctuator '>' balancer />
          </>
        </>\n`);
    });

    it('`<Type attr>`', () => {
      expect(print(tag`<Type attr>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$OpenNodeTag !balanced>
            openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <$Flags>
              triviaToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Type' />
            <#*Space:Space ' ' />
            intrinsicValue$: null
            attributes[]$: []
            attributes[]$:
            <$BooleanAttribute true>
              negateToken: null
              key$: <*Identifier 'attr' />
            </>
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' balancer />
          </>
        </>\n`);
    });

    it('`<Quantifier min=1 max=+Infinity>`', () => {
      expect(print(tag`<Quantifier min=1 max=+Infinity>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$OpenNodeTag !balanced>
            openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <$Flags>
              triviaToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Quantifier' />
            <#*Space:Space ' ' />
            intrinsicValue$: null
            attributes[]$: []
            attributes[]$:
            <$MappingAttribute>
              key$: <*Identifier 'min' />
              sigilToken: <*Punctuator '=' />
              value$:
              <$Integer>
                signToken: null
                value: <*UnsignedInteger '1' />
              </>
            </>
            <#*Space:Space ' ' />
            attributes[]$:
            <$MappingAttribute>
              key$: <*Identifier 'max' />
              sigilToken: <*Punctuator '=' />
              value$:
              <$Infinity>
                signToken: <*Punctuator '+' />
                sigilToken: <*Keyword 'Infinity' />
              </>
            </>
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' balancer />
          </>
        </>\n`);
    });

    it('`<Type !attr>`', () => {
      expect(print(tag`<Type !attr>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$OpenNodeTag !balanced>
            openToken: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <$Flags>
              triviaToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
              hasGapToken: null
            </>
            language$: null
            type$: <*Identifier 'Type' />
            <#*Space:Space ' ' />
            intrinsicValue$: null
            attributes[]$: []
            attributes[]$:
            <$BooleanAttribute !true>
              negateToken: <*Punctuator '!' />
              key$: <*Identifier 'attr' />
            </>
            selfClosingTagToken: null
            closeToken: <*Punctuator '>' balancer />
          </>
        </>\n`);
    });
  });

  describe('Attributes', () => {
    const attrs = buildCSTMLTag('Attributes');

    it('`foo`', () => {
      expect(print(attrs`foo`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .[]$: []
          .[]$:
          <$BooleanAttribute true>
            negateToken: null
            key$: <*Identifier 'foo' />
          </>
        </>\n`);
    });
  });

  describe('String', () => {
    const str = buildCSTMLTag('String');

    it(`\`"'"\``, () => {
      expect(print(str`"'"`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$String>
            openToken: <*Punctuator '"' balanced='"' balancedSpan='String:Double' />
            content: <*StringContent "'" />
            closeToken: <*Punctuator '"' balancer />
          </>
        </>\n`);
    });

    it(`\`${raw`"\""`}\``, () => {
      expect(print(str`"\""`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$String>
            openToken: <*Punctuator '"' balanced='"' balancedSpan='String:Double' />
            content:
            <*StringContent>
              <@EscapeSequence cooked='"'>
                escapeToken: <*Punctuator '${'\\\\'}' openSpan='Escape' />
                code: <*Keyword '"' closeSpan='Escape' />
              </>
            </>
            closeToken: <*Punctuator '"' balancer />
          </>
        </>\n`);
    });

    it(`\`${raw`"\u1234"`}\``, () => {
      expect(print(str`"\u1234"`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$String>
            openToken: <*Punctuator '"' balanced='"' balancedSpan='String:Double' />
            content:
            <*StringContent>
              <@EscapeSequence cooked='4660'>
                escapeToken: <*Punctuator '${'\\\\'}' openSpan='Escape' />
                code:
                <$EscapeCode closeSpan='Escape'>
                  typeToken: <*Keyword 'u' />
                  openToken: null
                  value$: <*UnsignedInteger '1234' />
                  closeToken: null
                </>
              </>
            </>
            closeToken: <*Punctuator '"' balancer />
          </>
        </>\n`);
    });

    it(`\`${raw`"\u{1}"`}\``, () => {
      expect(print(str`"\u{1}"`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$String>
            openToken: <*Punctuator '"' balanced='"' balancedSpan='String:Double' />
            content:
            <*StringContent>
              <@EscapeSequence cooked='1'>
                escapeToken: <*Punctuator '${'\\\\'}' openSpan='Escape' />
                code:
                <$EscapeCode closeSpan='Escape'>
                  typeToken: <*Keyword 'u' />
                  openToken: <*Punctuator '{' balanced='}' />
                  value$: <*UnsignedInteger '1' />
                  closeToken: <*Punctuator '}' balancer />
                </>
              </>
            </>
            closeToken: <*Punctuator '"' balancer />
          </>
        </>\n`);
    });
  });

  describe('Number', () => {
    const num = buildCSTMLTag('Number');

    it('`5`', () => {
      expect(print(num`5`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <$>
          .:
          <$Integer>
            signToken: null
            value: <*UnsignedInteger '5' />
          </>
        </>\n`);
    });
  });
});
