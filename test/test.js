import { runTests } from '@bablr/test-runner';
import { buildSpamMatcher } from '@bablr/agast-vm-helpers/builders';
import { dedent } from '@qnighy/dedent';
import * as language from '@bablr/language-cstml';

const buildMatcher = (type) => buildSpamMatcher(null, type);

export const testCases = [
  {
    matcher: buildMatcher('Fragment'),
    sourceText: `<></>`,
    parsed: dedent`\
      <>
        <Fragment>
          open:
          <OpenFragmentTag>
            open:
            <*Punctuator lexicalSpan='Tag' balanced='>'>
              '<'
            </>
            flags:
            null
            close:
            <*Punctuator balancer>
              '>'
            </>
          </>
          root:
          null
          close:
          <CloseFragmentTag>
            open:
            <*Punctuator balanced='>'>
              '</'
            </>
            close:
            <*Punctuator balancer>
              '>'
            </>
          </>
        </>
      </>`,
  },
  {
    matcher: buildMatcher('Fragment'),
    sourceText: `<> </>`,
    parsed: dedent`\
      <>
        <Fragment>
          open:
          <OpenFragmentTag>
            open:
            <*Punctuator lexicalSpan='Tag' balanced='>'>
              '<'
            </>
            flags:
            null
            close:
            <*Punctuator balancer>
              '>'
            </>
            <*#Trivia.Space:Space>
              ' '
            </>
          </>
          root:
          null
          close:
          <CloseFragmentTag>
            open:
            <*Punctuator balanced='>'>
              '</'
            </>
            close:
            <*Punctuator balancer>
              '>'
            </>
          </>
        </>
      </>`,
  },
  {
    matcher: buildMatcher('Fragment'),
    sourceText: `<><Node></></>`,
    parsed: dedent`\
      <>
        <Fragment>
          open:
          <OpenFragmentTag>
            open:
            <*Punctuator lexicalSpan='Tag' balanced='>'>
              '<'
            </>
            flags:
            null
            close:
            <*Punctuator balancer>
              '>'
            </>
          </>
          root:
          <Node>
            open:
            <OpenNodeTag>
              open:
              <*Punctuator lexicalSpan='Tag' balanced='>'>
                '<'
              </>
              flags:
              null
              type:
              <*Identifier>
                'Node'
              </>
              attributes[]:
              null
              close:
              <*Punctuator balancer>
                '>'
              </>
            </>
            children[]:
            null
            close:
            <CloseNodeTag>
              open:
              <*Punctuator balanced='>'>
                '</'
              </>
              type:
              null
              close:
              <*Punctuator balancer>
                '>'
              </>
            </>
          </>
          close:
          <CloseFragmentTag>
            open:
            <*Punctuator balanced='>'>
              '</'
            </>
            close:
            <*Punctuator balancer>
              '>'
            </>
          </>
        </>
      </>`,
  },
  {
    matcher: buildMatcher('Fragment'),
    sourceText: `<#><*Comment>'# hello, world'</></>`,
    parsed: dedent`\
      <>
        <Fragment>
          open:
          <OpenFragmentTag>
            open:
            <*Punctuator lexicalSpan='Tag' balanced='>'>
              '<'
            </>
            flags:
            <FragmentFlags>
              comment:
              <*Punctuator>
                '#'
              </>
            </>
            close:
            <*Punctuator balancer>
              '>'
            </>
          </>
          root:
          <Node>
            open:
            <OpenNodeTag>
              open:
              <*Punctuator lexicalSpan='Tag' balanced='>'>
                '<'
              </>
              flags:
              <NodeFlags>
                token:
                <*Punctuator>
                  '*'
                </>
                trivia:
                null
                escape:
                null
              </>
              type:
              <*Identifier>
                'Comment'
              </>
              attributes[]:
              null
              close:
              <*Punctuator balancer>
                '>'
              </>
            </>
            children[]:
            <Literal>
              value:
              <String>
                open:
                <*Punctuator balanced="'" lexicalSpan='String:Single'>
                  "'"
                </>
                content:
                <*StringContent>
                  '# hello, world'
                </>
                close:
                <*Punctuator balancer>
                  "'"
                </>
              </>
            </>
            close:
            <CloseNodeTag>
              open:
              <*Punctuator balanced='>'>
                '</'
              </>
              type:
              null
              close:
              <*Punctuator balancer>
                '>'
              </>
            </>
          </>
          close:
          <CloseFragmentTag>
            open:
            <*Punctuator balanced='>'>
              '</'
            </>
            close:
            <*Punctuator balancer>
              '>'
            </>
          </>
        </>
      </>`,
  },
];

runTests(language, testCases);
