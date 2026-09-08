import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("42sh");

const FortySh = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            42sh is a command interpreter implementing a large subset of the POSIX Shell Command
            Language, built in C by a team of four at EPITA. A dedicated lexer and parser turn
            shell input into an AST, which a tree walking evaluator then executes directly:
            pipelines, control structures, functions, redirections, quoting and substitution are
            all handled without shelling out to a system shell.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Grammar and evaluation">
          <Paragraph>
            <ul>
              <li>Pipelines (<code>|</code>) and lists (<code>;</code>, <code>&&</code>, <code>||</code>, negation), compiled to an AST before evaluation.</li>
              <li>Control structures: <code>if</code>, <code>case</code>, <code>while</code>, <code>until</code>, <code>for</code>, plus functions, subshells and variable assignment.</li>
              <li>Builtins dispatched through a hash map: <code>true</code>, <code>false</code>, <code>echo</code>, <code>exit</code>, <code>export</code>, <code>unset</code>, <code>break</code>, <code>continue</code>, <code>.</code> (source), <code>cd</code>, <code>alias</code>, <code>unalias</code>.</li>
              <li>Special variables (<code>$?</code>, <code>$$</code>, <code>$RANDOM</code>, <code>PWD</code>/<code>OLDPWD</code>) kept in sync with the process environment.</li>
              <li>Redirections (<code>&gt;</code>, <code>&gt;&gt;</code>, <code>&gt;&amp;</code>, <code>&gt;|</code>, <code>&lt;</code>, <code>&lt;&lt;</code>, <code>&lt;&amp;</code>, <code>&lt;&gt;</code>), quoting rules, variable expansion and command substitution.</li>
            </ul>
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Testing">
          <Paragraph>
            Built with autotools, and validated by a test suite of over 200 cases spread across 10
            categories (simple commands, conditions, loops, boolean logic, variables and
            functions, <code>cd</code>, <code>echo</code>, error handling...), each a small file
            pairing a command with its expected output. A debug build runs the same suite through
            AddressSanitizer.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default FortySh;
