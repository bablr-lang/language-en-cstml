import { dedent } from '@qnighy/dedent';
// eslint-disable-next-line import/no-unresolved
import * as language from '@bablr/language-cstml';
import { buildTag } from 'bablr';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/agast-helpers/tree';

let enhancers = undefined;

const { raw } = String;

// enhancers = debugEnhancers;

describe('@bablr/language-cstml', () => {
  describe('Node', () => {
    const cstml = (...args) =>
      printPrettyCSTML(buildTag(language, 'Node', undefined, enhancers)(...args));

    it('<></>', () => {
      expect(cstml`<></>`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
      expect(cstml`<> </>`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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

    it('<><Node></></>', () => {
      expect(cstml`<><Node></></>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
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
          close:
          <CloseNodeTag>
            openToken: <~*Punctuator '</' balanced='>' />
            type: null
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
    });

    it('<><Node></><#Trivia></></>', () => {
      expect(cstml`<><Node></><#Trivia></></>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
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
    const cstml = (...args) =>
      printPrettyCSTML(buildTag(language, 'Node', undefined, enhancers)(...args));

    it('<Node>reference: null</>', () => {
      expect(cstml`<Node>reference: null</>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
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
            <Reference>
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
            <Null>
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
      expect(cstml`<Node>reference: <//></>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
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
            <Reference>
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
            <Gap>
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
      expect(cstml`<Node>reference: <Node></></>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
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
            <Reference>
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

    it('<*Token><@Escape cooked="e"></></>', () => {
      expect(cstml`<*Token><@Escape cooked="e"></></>`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
                'Token'
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
    const tag = (...args) =>
      printPrettyCSTML(buildTag(language, 'OpenNodeTag', undefined, enhancers)(...args));

    it(`<*Type 'intrinsicValue' />`, () => {
      expect(tag`<*Type 'intrinsicValue' />`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
      expect(tag`<Type attr>`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
      expect(tag`<Quantifier min=1 max=+Infinity>`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
      expect(tag`<Type !attr>`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
    const str = (...args) =>
      printPrettyCSTML(buildTag(language, 'String', undefined, enhancers)(...args));

    it(`"'"`, () => {
      expect(str`"'"`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
      expect(str`"\""`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
      expect(str`"\u1234"`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
      expect(str`"\u{1}"`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
    const num = (...args) =>
      printPrettyCSTML(buildTag(language, 'Number', undefined, enhancers)(...args));

    it('5', () => {
      expect(num`5`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
        <>
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
