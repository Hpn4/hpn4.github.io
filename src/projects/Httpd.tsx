import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("httpd");

const Httpd = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            An HTTP server in C, built as a solo school project at EPITA, driven by a single{" "}
            <code>epoll</code> event loop rather than a thread or process per connection. A small
            standalone exercise on the <code>epoll</code> API came first, then the actual server.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Features">
          <Paragraph>
            <ul>
              <li><strong>Event loop</strong>: one <code>epoll</code> instance multiplexes every listening socket and client connection, tracked in a doubly linked list of entries.</li>
              <li><strong>Multi vhost</strong>: an INI style configuration file declares a global section (pid file, log file) and any number of vhosts, each with its own name, IP, port, root directory and default file.</li>
              <li><strong>HTTP/1.x</strong>: GET and HEAD, with proper status lines, 400 Bad Request, 403 Forbidden, 404 Not Found, 405 Method Not Allowed and 505 HTTP Version Not Supported.</li>
              <li><strong>Daemon control</strong>: <code>--dry-run</code> validates a configuration without starting anything, and <code>-a start|stop|reload|restart</code> controls a running daemon, reload included, without dropping the process.</li>
            </ul>
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Testing">
          <Paragraph>
            Each module (config, logger, utils, server, daemon, http) is built as its own static
            library with a <code>criterion</code> unit test suite next to it, run independently
            through the module's own <code>check</code> target and aggregated by the top level
            build.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default Httpd;
