import ClipVideo from "../components/ClipVideo";
import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("rl-breakout");

const RLBreakout = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            RL Breakout is a personal project exploring{" "}
            <a href="https://hpn4.github.io/QuartzObsidian/EPITA/IA/ML/Reinforcement-Learning/" target="_blank" rel="noopener noreferrer">
              reinforcement learning
            </a>
            . The idea: teach an AI to play the classic Atari game Breakout, just by trial and
            error. There is no dataset and no instructions. The agent only sees the game screen and
            its score. It has to figure out on its own that moving the paddle to hit the ball (and
            aiming it at bricks) is a good idea. By the end of training, the best agent could clear
            an entire wall of bricks on its own.
          </Paragraph>
          <ClipVideo src="/projects/rl-breakout/wall-break.mp4" alt="Best RL Breakout run breaking through the wall" />
        </Section>

        <Connector />
        <Section title="How the agent learns">
          <Paragraph>
            This is different from most{" "}
            <a href="https://hpn4.github.io/QuartzObsidian/EPITA/IA/ML/" target="_blank" rel="noopener noreferrer">
              machine learning
            </a>
            , which trains on a fixed set of labeled examples. Here, the agent plays the game using{" "}
            <a href="https://gymnasium.farama.org/" target="_blank" rel="noopener noreferrer">
              Gymnasium
            </a>{" "}
            (a standard toolkit that simulates Atari games and lets code control the
            paddle). After every move it gets a small reward (points for breaking a brick) or
            nothing. Over tens of thousands of games, a neural network gradually learns which
            moves, in which situations, tend to lead to a higher score. This family of techniques
            is called Deep Q-Learning, and the project compares five versions of it:
          </Paragraph>
          <Paragraph>
            <ul>
              <li>
                Vanilla DQN (
                <a href="https://arxiv.org/abs/1312.5602" target="_blank" rel="noopener noreferrer">
                  Mnih et al., 2013
                </a>
                )
              </li>
              <li>
                Double DQN (
                <a href="https://arxiv.org/abs/1509.06461" target="_blank" rel="noopener noreferrer">
                  van Hasselt et al., 2015
                </a>
                )
              </li>
              <li>
                Dueling DQN (
                <a href="https://arxiv.org/abs/1511.06581" target="_blank" rel="noopener noreferrer">
                  Wang et al., 2015
                </a>
                )
              </li>
              <li>
                Distributional DQN (C51) (
                <a href="https://arxiv.org/abs/1707.06887" target="_blank" rel="noopener noreferrer">
                  Bellemare et al., 2017
                </a>
                )
              </li>
              <li>
                Noisy Networks (
                <a href="https://arxiv.org/abs/1706.10295" target="_blank" rel="noopener noreferrer">
                  Fortunato et al., 2017
                </a>
                )
              </li>
            </ul>
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Tools">
          <Paragraph>
            Built with <strong>PyTorch</strong> for the neural networks and{" "}
            <strong>Gymnasium</strong> for the Breakout environment, with NumPy/pandas for tracking
            results and Matplotlib for the training charts.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default RLBreakout;
