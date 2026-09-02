import Pipeline from "../components/Pipeline";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("epita-forge-deploy");

const ForgeDeploy = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            A deployment exercise from{" "}
            <a href="https://github.com/Hpn4/epita-forge-deploy" target="_blank" rel="noopener noreferrer">
              La Forge
            </a>
            , EPITA's dev lab: take a project from nothing to a running, self-updating production
            stack. Everything is code, in one repository: provision a cloud VM, configure it,
            install Kubernetes on it, then hand it over to a GitOps controller that keeps every
            piece of infrastructure and every app in sync with what's committed, automatically.
          </Paragraph>
          <Pipeline
            stages={[
              { label: "Terraform", detail: "provision the VM + DNS" },
              { label: "Ansible", detail: "bootstrap the host" },
              { label: "k3s", detail: "install Kubernetes" },
              { label: "ArgoCD", detail: "GitOps, app of apps" },
              { label: "Apps", detail: "stay in sync automatically" },
            ]}
          />
        </Section>

        <Connector />
        <Section title="Provisioning">
          <Paragraph>
            <a href="https://www.terraform.io/" target="_blank" rel="noopener noreferrer">
              Terraform
            </a>{" "}
            provisions the actual compute instance on EPITA's internal{" "}
            <a href="https://www.openstack.org/" target="_blank" rel="noopener noreferrer">
              OpenStack
            </a>{" "}
            cloud (VM, SSH keypair) and every DNS record the services below will need, before a
            single line of application config exists. Nothing about the infrastructure is created
            by hand.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Bootstrapping">
          <Paragraph>
            <a href="https://www.ansible.com/" target="_blank" rel="noopener noreferrer">
              Ansible
            </a>{" "}
            takes the fresh VM and turns it into a usable host: SSH hardening, PostgreSQL, and a
            self-hosted wiki (HedgeDoc) behind Nginx, in case something needs to be documented
            before Kubernetes is even running. Its database password is Ansible Vault-encrypted in
            the repository rather than sitting in plaintext.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="GitOps">
          <Paragraph>
            Once{" "}
            <a href="https://k3s.io/" target="_blank" rel="noopener noreferrer">
              k3s
            </a>{" "}
            (a lightweight Kubernetes distribution) is installed on that same VM,{" "}
            <a href="https://argo-cd.readthedocs.io/" target="_blank" rel="noopener noreferrer">
              ArgoCD
            </a>{" "}
            takes over for good, using the "app of apps" pattern: one root Application watches a
            folder of other Application manifests, each pointing at a different piece of
            infrastructure. From then on, deploying something new, or changing something existing,
            is a git commit, not a command run by hand on the server.
          </Paragraph>
          <Paragraph>
            <ul>
              <li><strong>ingress-nginx</strong> and <strong>cert-manager</strong>: routes traffic in and issues TLS certificates automatically.</li>
              <li><strong>The Zalando postgres-operator</strong>: a 2-instance Postgres cluster with a separate database and user per microservice, and continuous backups streamed to S3.</li>
              <li><strong>MinIO</strong>: S3-compatible object storage, used both as app storage and as that backup target.</li>
              <li><strong>Strimzi</strong>: a Kafka cluster, installed straight from its Helm chart.</li>
            </ul>
          </Paragraph>
        </Section>

        <Connector />
        <Section title="The application">
          <Paragraph>
            All of that infrastructure exists to run something real: a small custom microservices
            app (five services, each with its own database, talking to each other and to MinIO,
            behind OIDC-based authentication). It is the concrete target that proves the
            infrastructure actually works, not just infrastructure for its own sake.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Notes">
          <Paragraph>
            The published repository has real secrets and Terraform state stripped out (each has a{" "}
            <code>.example</code> file documenting its shape instead), and internal EPITA
            hostnames replaced with placeholders. Everything else, every manifest and every role,
            is exactly what was actually deployed.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default ForgeDeploy;
