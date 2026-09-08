import Connector from "../components/Connector";
import Page from "../components/Page";
import { Banner, Section, Paragraph } from "../components/Projects";
import { getProject } from "../data/projects";

const project = getProject("malloc");

const Malloc = () => {
  return (
    <Page>
      <Banner project={project} />

      <div className="project-body">
        <Connector />
        <Section title="Overview">
          <Paragraph>
            A thread-safe memory allocator in C, built as a solo school project at EPITA:{" "}
            <code>malloc</code>, <code>free</code>, <code>realloc</code>, <code>calloc</code>,{" "}
            <code>posix_memalign</code> and <code>aligned_alloc</code>, compiled into a shared
            library that can replace glibc's allocator via <code>LD_PRELOAD</code>. It is preceded
            by five smaller weekly exercises exploring the building blocks before the final
            allocator ties them together.
          </Paragraph>
        </Section>

        <Connector />
        <Section title="The allocator">
          <Paragraph>
            <ul>
              <li>Memory is requested from the kernel with <code>mmap</code> and released with <code>munmap</code>, not grown as one big heap with <code>sbrk</code>.</li>
              <li>Free blocks live in a doubly linked free list, split when a smaller size fits and merged with contiguous neighbors on free to fight fragmentation.</li>
              <li>Large allocations get their own dedicated <code>mmap</code>ed pages instead of going through the free list.</li>
              <li>Every entry point is guarded by a single mutex, making the allocator safe to call from multiple threads.</li>
            </ul>
          </Paragraph>
        </Section>

        <Connector />
        <Section title="Preliminary exercises">
          <Paragraph>
            Five standalone exercises led up to the allocator: <code>alignment</code> rounds a
            size up to the nearest boundary, <code>beware_overflow</code> is an overflow-safe{" "}
            <code>nmemb * size</code> for <code>calloc</code> style APIs, <code>page_begin</code>{" "}
            finds the start of the memory page containing a pointer, <code>block_allocator</code>{" "}
            is a minimal linked-list allocator over a fixed arena, and <code>my_recycler</code> is
            a fixed-size block recycler with O(1) allocate/free for objects of a single size.
          </Paragraph>
        </Section>
      </div>
    </Page>
  );
};

export default Malloc;
