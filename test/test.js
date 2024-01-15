import { runTests } from '@bablr/test-runner';
import { spam } from '@bablr/boot';
import { dedent } from '@qnighy/dedent';
import * as language from '@bablr/language-cstml';

export const testCases = [
  {
    matcher: spam`<Fragment>`,
    sourceText: `<></>`,
    parsed: dedent`\
      <>
        root:
        <Fragment>
          open:
          <OpenFragmentTag>
            value:
            <Punctuator>
              '<>'
            </>
          </>
          children[]:
          null
          close:
          <CloseFragmentTag>
            value:
            <Punctuator>
              '</>'
            </>
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Fragment>`,
    sourceText: `<>#'hello, world'</>`,
    parsed: dedent`\
      <>
        root:
        <Fragment>
          open:
          <OpenFragmentTag>
            value:
            <Punctuator>
              '<>'
            </>
          </>
          children[]:
          <Trivia>
            trivializeOperator:
            <Punctuator>
              '#'
            </>
            value:
            <String>
              open:
              <Punctuator balanced="'" lexicalSpan='String:Single'>
                "'"
              </>
              content:
              <Content>
                'hello, world'
              </>
              close:
              <Punctuator balancer>
                "'"
              </>
            </>
          </>
          close:
          <CloseFragmentTag>
            value:
            <Punctuator>
              '</>'
            </>
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Fragment>`,
    sourceText: `<>children[]: null</>`,
    parsed: dedent`\
      <>
        root:
        <Fragment>
          open:
          <OpenFragmentTag>
            value:
            <Punctuator>
              '<>'
            </>
          </>
          children[]:
          <Property>
            reference:
            <Reference>
              path:
              <Identifier>
                'children'
              </>
              pathIsArray:
              <Punctuator>
                '[]'
              </>
              mapOperator:
              <Punctuator>
                ':'
                #' '
              </>
            </>
            node:
            <Null>
              value:
              <Keyword>
                'null'
              </>
            </>
          </>
          close:
          <CloseFragmentTag>
            value:
            <Punctuator>
              '</>'
            </>
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Node>`,
    sourceText: `<Keyword>'null'</>`,
    parsed: dedent`\
      <>
        root:
        <Node>
          open:
          <OpenNodeTag>
            open:
            <Punctuator lexicalSpan='Tag' balanced='>'>
              '<'
            </>
            type:
            <Identifier>
              'Keyword'
            </>
            attributes[]:
            null
            close:
            <Punctuator balancer>
              '>'
            </>
          </>
          children[]:
          <Literal>
            value:
            <String>
              open:
              <Punctuator balanced="'" lexicalSpan='String:Single'>
                "'"
              </>
              content:
              <Content>
                'null'
              </>
              close:
              <Punctuator balancer>
                "'"
              </>
            </>
          </>
          close:
          <CloseNodeTag>
            value:
            <Punctuator>
              '</>'
            </>
          </>
        </>
      </>`,
  },
];

runTests(language, testCases);
