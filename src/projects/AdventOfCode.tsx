import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("adventofcode");

const AdventOfCode = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            <a href="https://adventofcode.com/" target="_blank" rel="noopener noreferrer">
              Advent of Code
            </a>{" "}
            is a set of daily programming puzzles released every December, two per day
            (a warm up part, then a twist on it). This repository holds my solutions in{" "}
            <strong>Python</strong>, spanning <strong>2015</strong> and every edition from{" "}
            <strong>2022 to 2025</strong>. 2015 is only partly solved, picked up years later just
            for fun. 2025 is fully solved, but the event itself only released 12 days that year:
            its creator said running it was taking up too much of his own time, and the same may
            happen again this year. Some of the slower puzzles were rewritten in{" "}
            <strong>C</strong>.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="A few recurring themes">
          <Paragraph>
            The puzzles reuse classic computer science techniques like:
          </Paragraph>
          <Paragraph>
            <ul>
              <li>
                <strong>Graphs and pathfinding.</strong> In{" "}
                <a href="https://adventofcode.com/2024/day/18" target="_blank" rel="noopener noreferrer">
                  2024 day 18, "RAM Run"
                </a>
                , walls fall onto a grid over time, so the solution runs Dijkstra's algorithm
                repeatedly, combined with a binary search to find the exact moment the exit
                becomes unreachable. In{" "}
                <a href="https://adventofcode.com/2015/day/9" target="_blank" rel="noopener noreferrer">
                  2015 day 9, "All in a Single Night"
                </a>
                , the map is a graph of cities and distances, so the puzzle is a small
                traveling salesman problem.
              </li>
              <li>
                <strong>Dynamic programming.</strong> Some puzzles only become fast enough once you
                notice they can be broken into smaller, repeated subproblems, like in{" "}
                <a href="https://adventofcode.com/2023/day/12" target="_blank" rel="noopener noreferrer">
                  2023 day 12, "Hot Springs"
                </a>.
              </li>
              <li>
                <strong>Geometry.</strong> A few puzzles are about areas and coordinates. In{" "}
                <a href="https://adventofcode.com/2023/day/18" target="_blank" rel="noopener noreferrer">
                  2023 day 18, "Lavaduct Lagoon"
                </a>
                , a sequence of dig instructions traces the outline of a giant lagoon, and its area
                is computed from the corner coordinates with the shoelace formula, plus
                Pick's theorem to account for the trench's thickness.
              </li>
            </ul>
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Tooling">
          <Paragraph>
            A couple of small shell scripts remove the daily busywork. One downloads each day's puzzle
            input automatically. Another computes average solve time, rank and score across all puzzles.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default AdventOfCode;
