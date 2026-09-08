import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("myvswitch");

const MyVSwitch = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            MyVSwitch is a software virtual network switch written in C, built as a recruitment
            test for{" "}
            <a href="https://github.com/Hpn4/myvswitch" target="_blank" rel="noopener noreferrer">
              La Forge
            </a>
            , the entity within EPITA that runs the school's IT infrastructure, servers, tooling
            and network, much like a company's IT department. It reproduces the core behaviour of
            a real Ethernet switch: MAC learning and forwarding, 802.1Q VLANs and port mirroring,
            all driven through an interactive Cisco style CLI.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Forwarding">
          <Paragraph>
            An <code>epoll</code> event loop multiplexes every attached interface. Each incoming
            frame updates a forwarding information base (FIB) that learns source MAC addresses per
            port, and frames to unknown destinations are flooded to every other port until the FIB
            learns where they actually live. A <code>trace</code> command prints source MAC,
            destination MAC and ethertype for every received frame, live.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="VLANs">
          <Paragraph>
            Ports are <strong>access</strong> or <strong>trunk</strong>, Cisco style, with every
            interface starting out in VLAN 1, access mode. Trunk ports support{" "}
            <strong>VLAN mapping</strong>, rewriting a VLAN ID at the edge of the trunk in both
            directions, and <strong>QinQ</strong>, any number of stacked VLAN tags on a single
            frame, preserved end to end when forwarding.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Port mirroring">
          <Paragraph>
            Monitor sessions copy traffic to an analyzer port for inspection: each session watches
            either a set of interfaces or a single VLAN, and every matching frame gets duplicated
            to the session's analyzer port. The same interface or VLAN can be watched by several
            sessions at once.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="CLI and testing">
          <Paragraph>
            The interactive shell (built on <code>readline</code>) has autocompletion and{" "}
            <code>show</code> commands for the FIB, interfaces, VLANs and monitor sessions. The
            test suite combines <code>criterion</code> unit tests on frame parsing with an end to
            end suite that drives the switch's VLAN, mapping, QinQ and mirroring behaviour over
            real Linux network namespaces.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default MyVSwitch;
