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
            open: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            close: <*Punctuator '>' balancer />
          </>
          root: null
          close:
          <CloseFragmentTag>
            open: <*Punctuator '</' balanced='>' />
            close: <*Punctuator '>' balancer />
          </>
        </>
      </>`);
  });

  it('<> </>', () => {
    expect(cstml`<> </>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
        <Fragment>
          open:
          <OpenFragmentTag>
            open: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            close: <*Punctuator '>' balancer />
          </>
          <#*Space:Space>
            ' '
          </>
          root: null
          close:
          <CloseFragmentTag>
            open: <*Punctuator '</' balanced='>' />
            close: <*Punctuator '>' balancer />
          </>
        </>
      </>`);
  });

  it('<><Node></></>', () => {
    expect(cstml`<><Node></></>`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/cstml'>
      <>
        <Fragment>
          open:
          <OpenFragmentTag>
            open: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
            close: <*Punctuator '>' balancer />
          </>
          root:
          <Node>
            open:
            <OpenNodeTag>
              open: <*Punctuator '<' balancedSpan='Tag' balanced='>' />
              triviaFlag: null
              tokenFlag: null
              escapeFlag: null
              expressionFlag: null
              type:
              <*Identifier>
                'Node'
              </>
              intrinsicValue: null
              attributes[]: null
              selfClosingToken: null
              close: <*Punctuator '>' balancer />
            </>
            children[]: null
            close:
            <CloseNodeTag>
              open: <*Punctuator '</' balanced='>' />
              type: null
              close: <*Punctuator '>' balancer />
            </>
          </>
          close:
          <CloseFragmentTag>
            open: <*Punctuator '</' balanced='>' />
            close: <*Punctuator '>' balancer />
          </>
        </>
      </>`);
  });
});
