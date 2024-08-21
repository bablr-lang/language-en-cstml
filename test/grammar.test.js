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
  const matcher = buildFullyQualifiedSpamMatcher({}, language.canonicalURL, type);
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
        <>
          root:
          <Document>
            doctype:
            <DoctypeTag>
              openToken: <~*Punctuator '<!' balanced='>' />
              version:
              <UnsignedInteger>
                digits[]:
                <*Digit>
                  '0'
                </>
              </>
              versionSeparatorToken: <~*Punctuator ':' />
              doctypeToken: <~*Keyword 'cstml' />
              closeToken: <~*Punctuator '>' balancer />
            </>
            tree:
            <Node>
              open:
              <OpenNodeTag>
                openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <~Flags>
                  triviaToken: null
                  intrinsicToken: null
                  tokenToken: null
                  escapeToken: null
                  expressionToken: null
                </>
                closeToken: <~*Punctuator '>' balancer />
              </>
              children[]: null
              close:
              <CloseNodeTag>
                openToken: <~*Punctuator '</' balanced='>' />
                type: null
                closeToken: <~*Punctuator '>' balancer />
              </>
            </>
          </>
        </>\n`);
    });

    it('<!0:cstml><Node></> throws', () => {
      expect(() => cstml`<!0:cstml><Node></>`).toThrowError();
    });
  });

  describe('Node (without type)', () => {
    const cstml = buildCSTMLTag('Node');

    it('<></>', () => {
      expect(print(cstml`<></>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <Node>
            open:
            <OpenNodeTag>
              openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
              flags:
              <~Flags>
                triviaToken: null
                intrinsicToken: null
                tokenToken: null
                escapeToken: null
                expressionToken: null
              </>
              closeToken: <~*Punctuator '>' balancer />
            </>
            children[]: null
            close:
            <CloseNodeTag>
              openToken: <~*Punctuator '</' balanced='>' />
              type: null
              closeToken: <~*Punctuator '>' balancer />
            </>
          </>
        </>\n`);
    });

    it('<> </>', () => {
      expect(print(cstml`<> </>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <Node>
            open:
            <OpenNodeTag>
              openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
              flags:
              <~Flags>
                triviaToken: null
                intrinsicToken: null
                tokenToken: null
                escapeToken: null
                expressionToken: null
              </>
              closeToken: <~*Punctuator '>' balancer />
            </>
            <#*Space:Space>
              ' '
            </>
            children[]: null
            close:
            <CloseNodeTag>
              openToken: <~*Punctuator '</' balanced='>' />
              type: null
              closeToken: <~*Punctuator '>' balancer />
            </>
          </>
        </>\n`);
    });

    it('<>root:<Node></></>', () => {
      expect(print(cstml`<>root:<Node></></>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <>
        root:
        <Node>
          open:
          <OpenNodeTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <~Flags>
              triviaToken: null
              intrinsicToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
            </>
            closeToken: <~*Punctuator '>' balancer />
          </>
          children[]:
          <Property>
            reference:
            <ReferenceTag>
              name:
              <*Identifier>
                'root'
              </>
              arrayOperatorToken: null
              sigilToken: <~*Punctuator ':' />
            </>
            node:
            <Node>
              open:
              <OpenNodeTag>
                openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <~Flags>
                  triviaToken: null
                  intrinsicToken: null
                  tokenToken: null
                  escapeToken: null
                  expressionToken: null
                </>
                type:
                <*Identifier>
                  'Node'
                </>
                intrinsicValue: null
                attributes[]: null
                selfClosingTagToken: null
                closeToken: <~*Punctuator '>' balancer />
              </>
              children[]: null
              close:
              <CloseNodeTag>
                openToken: <~*Punctuator '</' balanced='>' />
                type: null
                closeToken: <~*Punctuator '>' balancer />
              </>
            </>
          </>
          close:
          <CloseNodeTag>
            openToken: <~*Punctuator '</' balanced='>' />
            type: null
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });

    it('<>root:<Node></><#Trivia></></>', () => {
      expect(print(cstml`<>root:<Node></><#Trivia></></>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <>
        root:
        <Node>
          open:
          <OpenNodeTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <~Flags>
              triviaToken: null
              intrinsicToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
            </>
            closeToken: <~*Punctuator '>' balancer />
          </>
          children[]:
          <Property>
            reference:
            <ReferenceTag>
              name:
              <*Identifier>
                'root'
              </>
              arrayOperatorToken: null
              sigilToken: <~*Punctuator ':' />
            </>
            node:
            <Node>
              open:
              <OpenNodeTag>
                openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <~Flags>
                  triviaToken: null
                  intrinsicToken: null
                  tokenToken: null
                  escapeToken: null
                  expressionToken: null
                </>
                type:
                <*Identifier>
                  'Node'
                </>
                intrinsicValue: null
                attributes[]: null
                selfClosingTagToken: null
                closeToken: <~*Punctuator '>' balancer />
              </>
              children[]: null
              close:
              <CloseNodeTag>
                openToken: <~*Punctuator '</' balanced='>' />
                type: null
                closeToken: <~*Punctuator '>' balancer />
              </>
            </>
          </>
          children[]:
          <Node>
            open:
            <OpenNodeTag>
              openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
              flags:
              <~Flags>
                triviaToken: <~*Punctuator '#' />
                intrinsicToken: null
                tokenToken: null
                escapeToken: null
                expressionToken: null
              </>
              type:
              <*Identifier>
                'Trivia'
              </>
              intrinsicValue: null
              attributes[]: null
              selfClosingTagToken: null
              closeToken: <~*Punctuator '>' balancer />
            </>
            children[]: null
            close:
            <CloseNodeTag>
              openToken: <~*Punctuator '</' balanced='>' />
              type: null
              closeToken: <~*Punctuator '>' balancer />
            </>
          </>
          close:
          <CloseNodeTag>
            openToken: <~*Punctuator '</' balanced='>' />
            type: null
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });
  });

  describe('Node', () => {
    const cstml = buildCSTMLTag('Node');

    it('<Node>reference: null</>', () => {
      expect(print(cstml`<Node>reference: null</>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <>
        root:
        <Node>
          open:
          <OpenNodeTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <~Flags>
              triviaToken: null
              intrinsicToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
            </>
            type:
            <*Identifier>
              'Node'
            </>
            intrinsicValue: null
            attributes[]: null
            selfClosingTagToken: null
            closeToken: <~*Punctuator '>' balancer />
          </>
          children[]:
          <Property>
            reference:
            <ReferenceTag>
              name:
              <*Identifier>
                'reference'
              </>
              arrayOperatorToken: null
              sigilToken: <~*Punctuator ':' />
            </>
            <#*Space:Space>
              ' '
            </>
            node:
            <NullTag>
              sigilToken: <~*Keyword 'null' />
            </>
          </>
          close:
          <CloseNodeTag>
            openToken: <~*Punctuator '</' balanced='>' />
            type: null
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });

    it('<Node>reference: <//></>', () => {
      expect(print(cstml`<Node>reference: <//></>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <>
        root:
        <Node>
          open:
          <OpenNodeTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <~Flags>
              triviaToken: null
              intrinsicToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
            </>
            type:
            <*Identifier>
              'Node'
            </>
            intrinsicValue: null
            attributes[]: null
            selfClosingTagToken: null
            closeToken: <~*Punctuator '>' balancer />
          </>
          children[]:
          <Property>
            reference:
            <ReferenceTag>
              name:
              <*Identifier>
                'reference'
              </>
              arrayOperatorToken: null
              sigilToken: <~*Punctuator ':' />
            </>
            <#*Space:Space>
              ' '
            </>
            node:
            <GapTag>
              sigilToken: <~*Punctuator '<//>' />
            </>
          </>
          close:
          <CloseNodeTag>
            openToken: <~*Punctuator '</' balanced='>' />
            type: null
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });

    it('<Node>reference: <Node></></>', () => {
      expect(print(cstml`<Node>reference: <Node></></>`)).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
      <>
        root:
        <Node>
          open:
          <OpenNodeTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <~Flags>
              triviaToken: null
              intrinsicToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
            </>
            type:
            <*Identifier>
              'Node'
            </>
            intrinsicValue: null
            attributes[]: null
            selfClosingTagToken: null
            closeToken: <~*Punctuator '>' balancer />
          </>
          children[]:
          <Property>
            reference:
            <ReferenceTag>
              name:
              <*Identifier>
                'reference'
              </>
              arrayOperatorToken: null
              sigilToken: <~*Punctuator ':' />
            </>
            <#*Space:Space>
              ' '
            </>
            node:
            <Node>
              open:
              <OpenNodeTag>
                openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <~Flags>
                  triviaToken: null
                  intrinsicToken: null
                  tokenToken: null
                  escapeToken: null
                  expressionToken: null
                </>
                type:
                <*Identifier>
                  'Node'
                </>
                intrinsicValue: null
                attributes[]: null
                selfClosingTagToken: null
                closeToken: <~*Punctuator '>' balancer />
              </>
              children[]: null
              close:
              <CloseNodeTag>
                openToken: <~*Punctuator '</' balanced='>' />
                type: null
                closeToken: <~*Punctuator '>' balancer />
              </>
            </>
          </>
          close:
          <CloseNodeTag>
            openToken: <~*Punctuator '</' balanced='>' />
            type: null
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });

    it('<*Tag><@Escape cooked="e"></></>', () => {
      expect(print(cstml`<*Tag><@Escape cooked="e"></></>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <Node>
            open:
            <OpenNodeTag>
              openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
              flags:
              <~Flags>
                triviaToken: null
                intrinsicToken: null
                tokenToken: <~*Punctuator '*' />
                escapeToken: null
                expressionToken: null
              </>
              type:
              <*Identifier>
                'Tag'
              </>
              intrinsicValue: null
              attributes[]: null
              selfClosingTagToken: null
              closeToken: <~*Punctuator '>' balancer />
            </>
            children[]:
            <Node>
              open:
              <OpenNodeTag>
                openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
                flags:
                <~Flags>
                  triviaToken: null
                  intrinsicToken: null
                  tokenToken: null
                  escapeToken: <~*Punctuator '@' />
                  expressionToken: null
                </>
                type:
                <*Identifier>
                  'Escape'
                </>
                <#*Space:Space>
                  ' '
                </>
                intrinsicValue: null
                attributes[]:
                <MappingAttribute>
                  key:
                  <*Identifier>
                    'cooked'
                  </>
                  sigilToken: <~*Punctuator '=' />
                  value:
                  <String>
                    openToken: <~*Punctuator '"' balanced='"' balancedSpan='String:Double' />
                    content:
                    <*StringContent>
                      'e'
                    </>
                    closeToken: <~*Punctuator '"' balancer />
                  </>
                </>
                selfClosingTagToken: null
                closeToken: <~*Punctuator '>' balancer />
              </>
              children[]: null
              close:
              <CloseNodeTag>
                openToken: <~*Punctuator '</' balanced='>' />
                type: null
                closeToken: <~*Punctuator '>' balancer />
              </>
            </>
            close:
            <CloseNodeTag>
              openToken: <~*Punctuator '</' balanced='>' />
              type: null
              closeToken: <~*Punctuator '>' balancer />
            </>
          </>
        </>\n`);
    });
  });

  describe('OpenNodeTag', () => {
    const tag = buildCSTMLTag('OpenNodeTag');

    it(`<*Type 'intrinsicValue' />`, () => {
      expect(print(tag`<*Type 'intrinsicValue' />`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <OpenNodeTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <~Flags>
              triviaToken: null
              intrinsicToken: null
              tokenToken: <~*Punctuator '*' />
              escapeToken: null
              expressionToken: null
            </>
            type:
            <*Identifier>
              'Type'
            </>
            <#*Space:Space>
              ' '
            </>
            intrinsicValue:
            <String>
              openToken: <~*Punctuator "'" balanced="'" balancedSpan='String:Single' />
              content:
              <*StringContent>
                'intrinsicValue'
              </>
              closeToken: <~*Punctuator "'" balancer />
            </>
            <#*Space:Space>
              ' '
            </>
            attributes[]: null
            selfClosingTagToken: <~*Punctuator '/' />
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>\n`);
    });

    it(`<Type attr>`, () => {
      expect(print(tag`<Type attr>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <OpenNodeTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <~Flags>
              triviaToken: null
              intrinsicToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
            </>
            type:
            <*Identifier>
              'Type'
            </>
            <#*Space:Space>
              ' '
            </>
            intrinsicValue: null
            attributes[]:
            <BooleanAttribute true>
              negateToken: null
              key:
              <*Identifier>
                'attr'
              </>
            </>
            selfClosingTagToken: null
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>\n`);
    });

    it(`<Quantifier min=1 max=+Infinity>`, () => {
      expect(print(tag`<Quantifier min=1 max=+Infinity>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <OpenNodeTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <~Flags>
              triviaToken: null
              intrinsicToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
            </>
            type:
            <*Identifier>
              'Quantifier'
            </>
            <#*Space:Space>
              ' '
            </>
            intrinsicValue: null
            attributes[]:
            <MappingAttribute>
              key:
              <*Identifier>
                'min'
              </>
              sigilToken: <~*Punctuator '=' />
              value:
              <Integer>
                negativeToken: null
                digits[]:
                <*Digit>
                  '1'
                </>
              </>
            </>
            <#*Space:Space>
              ' '
            </>
            attributes[]:
            <MappingAttribute>
              key:
              <*Identifier>
                'max'
              </>
              sigilToken: <~*Punctuator '=' />
              value:
              <Infinity>
                signToken: <~*Punctuator '+' />
                sigilToken: <~*Keyword 'Infinity' />
              </>
            </>
            selfClosingTagToken: null
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>\n`);
    });

    it(`<Type !attr>`, () => {
      expect(print(tag`<Type !attr>`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <OpenNodeTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            flags:
            <~Flags>
              triviaToken: null
              intrinsicToken: null
              tokenToken: null
              escapeToken: null
              expressionToken: null
            </>
            type:
            <*Identifier>
              'Type'
            </>
            <#*Space:Space>
              ' '
            </>
            intrinsicValue: null
            attributes[]:
            <BooleanAttribute !true>
              negateToken: <~*Punctuator '!' />
              key:
              <*Identifier>
                'attr'
              </>
            </>
            selfClosingTagToken: null
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>\n`);
    });
  });

  describe('String', () => {
    const str = buildCSTMLTag('String');

    it(`"'"`, () => {
      expect(print(str`"'"`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <String>
            openToken: <~*Punctuator '"' balanced='"' balancedSpan='String:Double' />
            content:
            <*StringContent>
              "'"
            </>
            closeToken: <~*Punctuator '"' balancer />
          </>
        </>\n`);
    });

    it(raw`"\""`, () => {
      expect(print(str`"\""`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <String>
            openToken: <~*Punctuator '"' balanced='"' balancedSpan='String:Double' />
            content:
            <*StringContent>
              <@EscapeSequence cooked='"'>
                escapeToken: <~*Punctuator '${'\\\\'}' openSpan='Escape' />
                value: <~*Keyword '"' closeSpan='Escape' />
              </>
            </>
            closeToken: <~*Punctuator '"' balancer />
          </>
        </>\n`);
    });

    it(raw`"\u1234"`, () => {
      expect(print(str`"\u1234"`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <String>
            openToken: <~*Punctuator '"' balanced='"' balancedSpan='String:Double' />
            content:
            <*StringContent>
              <@EscapeSequence cooked='4660'>
                escapeToken: <~*Punctuator '${'\\\\'}' openSpan='Escape' />
                value:
                <EscapeCode closeSpan='Escape'>
                  typeToken: <~*Keyword 'u' />
                  openToken: null
                  digits[]:
                  <*Digit>
                    '1'
                  </>
                  digits[]:
                  <*Digit>
                    '2'
                  </>
                  digits[]:
                  <*Digit>
                    '3'
                  </>
                  digits[]:
                  <*Digit>
                    '4'
                  </>
                  closeToken: null
                </>
              </>
            </>
            closeToken: <~*Punctuator '"' balancer />
          </>
        </>\n`);
    });

    it(raw`"\u{1}"`, () => {
      expect(print(str`"\u{1}"`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <String>
            openToken: <~*Punctuator '"' balanced='"' balancedSpan='String:Double' />
            content:
            <*StringContent>
              <@EscapeSequence cooked='1'>
                escapeToken: <~*Punctuator '${'\\\\'}' openSpan='Escape' />
                value:
                <EscapeCode closeSpan='Escape'>
                  typeToken: <~*Keyword 'u' />
                  openToken: <~*Punctuator '{' balanced='}' />
                  digits[]:
                  <*Digit>
                    '1'
                  </>
                  closeToken: <~*Punctuator '}' balancer />
                </>
              </>
            </>
            closeToken: <~*Punctuator '"' balancer />
          </>
        </>\n`);
    });
  });

  describe('Number', () => {
    const num = buildCSTMLTag('Number');

    it('5', () => {
      expect(print(num`5`)).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/en/cstml'>
        <>
          root:
          <Integer>
            negativeToken: null
            digits[]:
            <*Digit>
              '5'
            </>
          </>
        </>\n`);
    });
  });
});
