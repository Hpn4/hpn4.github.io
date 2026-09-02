import ZoomableImage from "../components/ZoomableImage";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("hmessager");

const HMessager = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            HMessager is a personal, work-in-progress Android messenger built around one goal:
            nobody but the two people in a conversation, not even the server relaying the
            messages, should be able to read them. It is based on the same cryptographic protocol
            as Signal, implemented from the published specification rather than through an
            existing library, and built with Jetpack Compose. It is still under development and
            not meant for real use yet.
          </Paragraph>
          <ZoomableImage src="/projects/hmessager/conv.png" alt="HMessager conversation screen" />
        </Section>

        <Connector />
        <Section title="How it works">
          <Paragraph>
            There are no accounts or phone numbers. To start a conversation, two people scan each
            other's QR code, which exchanges the keys needed to set up an encrypted session. A
            small self-hosted relay server (a plain WebSocket forwarder) then routes messages
            between clients by a hashed identity, without ever seeing their content, storing
            messages locally only for a recipient who is currently offline.
          </Paragraph>
          <Paragraph>
            Everything stored on the phone (conversations, keys, settings, media) is encrypted at
            rest with a key derived from a password chosen on first launch. There is no recovery
            path if that password is lost, by design: no backdoor means no backdoor for anyone.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Security">
          <Paragraph>
            Key exchange and message encryption follow the{" "}
            <a href="https://signal.org/docs/specifications/x3dh/" target="_blank" rel="noopener noreferrer">
              X3DH
            </a>{" "}
            and{" "}
            <a href="https://signal.org/docs/specifications/doubleratchet/" target="_blank" rel="noopener noreferrer">
              double ratchet
            </a>{" "}
            algorithms defined by the{" "}
            <a href="https://signal.org/docs/" target="_blank" rel="noopener noreferrer">
              Signal Protocol
            </a>
            , the same design used by Signal and WhatsApp: every message gets a fresh key, so
            recovering one message's key never exposes past or future ones. Underneath: Curve25519
            for the key agreement, HKDF and SHA3 for key derivation and hashing, AES-256 for
            encryption, and Ed25519/HMAC for signatures and message authentication.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Status">
          <Paragraph>
            Sending text, images, video, audio (with waveform preview), files and big emoji
            messages all work today. Group conversations are not supported yet, only one-to-one
            chats, and features like reactions, message editing and link previews are still on
            the list.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default HMessager;
