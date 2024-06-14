import { dedent } from '@qnighy/dedent';
// eslint-disable-next-line import/no-unresolved
import * as language from '@bablr/language-cstml';
import { buildTag } from 'bablr';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/agast-helpers/tree';

let enhancers = undefined;

// enhancers = debugEnhancers;

const cstml = (...args) =>
  printPrettyCSTML(buildTag(language, 'Fragment', undefined, enhancers)(...args));

describe('cstml', () => {
  it('<></>', () => {
    expect(cstml`<></>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
        <Fragment>
          open:
          <OpenFragmentTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            closeToken: <~*Punctuator '>' balancer />
          </>
          children[]: null
          close:
          <CloseFragmentTag>
            openToken: <~*Punctuator '</' balanced='>' />
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
  });

  it('<> </>', () => {
    expect(cstml`<> </>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
        <Fragment>
          open:
          <OpenFragmentTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
            closeToken: <~*Punctuator '>' balancer />
          </>
          <#*Space:Space>
            ' '
          </>
          children[]: null
          close:
          <CloseFragmentTag>
            openToken: <~*Punctuator '</' balanced='>' />
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
  });

  it('<><Node></></>', () => {
    expect(cstml`<><Node></></>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
        <Fragment>
          open:
          <OpenFragmentTag>
            openToken: <~*Punctuator '<' balancedSpan='Tag' balanced='>' />
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
          <CloseFragmentTag>
            openToken: <~*Punctuator '</' balanced='>' />
            closeToken: <~*Punctuator '>' balancer />
          </>
        </>
      </>\n`);
  });
});
