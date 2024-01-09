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
        open:
        <OpenFragmentNodeTag>
          value:
          <Punctuator>
            '<>'
          </>
        </>
        children[]:
        null
        close:
        <CloseNodeTag>
          value:
          <Punctuator>
            '</>'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Fragment>`,
    sourceText: `<>#'hello, world'</>`,
    parsed: dedent`\
      <>
        open:
        <OpenFragmentNodeTag>
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
        <CloseNodeTag>
          value:
          <Punctuator>
            '</>'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Fragment>`,
    sourceText: `<>children[]: null</>`,
    parsed: dedent`\
      <>
        open:
        <OpenFragmentNodeTag>
          value:
          <Punctuator>
            '<>'
          </>
        </>
        children[]:
        <Property>
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
          </>
          value:
          <Node>
            #' '
            open:
            <Null>
              value:
              <Keyword>
                'null'
              </>
            </>
            children[]:
            null
            close:
            null
          </>
        </>
        close:
        <CloseNodeTag>
          value:
          <Punctuator>
            '</>'
          </>
        </>
      </>`,
  },
  {
    matcher: spam`<Node>`,
    sourceText: `<| Keyword 'null' |>`,
    parsed: dedent`\
      <>
        children[]:
        <Node>
          open:
          <OpenTerminalNodeTag selfClosing>
            open:
            <Punctuator lexicalSpan='Tag' balanced='>'>
              '<|'
            </>
            #' '
            type:
            <Identifier>
              'Keyword'
            </>
            #' '
            open:
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
                #' '
              </>
            </>
            close:
            <Punctuator balancer>
              '|>'
            </>
          </>
          children[]:
          null
          close:
          null
        </>
      </>`,
  },
  {
    matcher: spam`<Node>`,
    sourceText: `<Node> <| Keyword 'null' |> </>`,
    parsed: dedent`\
      `,
  },
];

runTests(language, testCases);
