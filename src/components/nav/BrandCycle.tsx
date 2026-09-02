import { useEffect, useState } from "react";

const WORDS = ["senigout", "etienne", "23y", "hpn4"];
const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz0134579";
const FRAME_MS = 45;
const REVEAL_STEPS = 10;
const HOLD_MS = 1300;

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export default function BrandCycle() {
  const [text, setText] = useState(WORDS[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let wordIndex = 0;

    function scrambleInto(target: string) {
      return new Promise<void>((resolve) => {
        const revealAt = Array.from({ length: target.length }, () => REVEAL_STEPS - Math.floor(Math.random() * 4));
        let frame = 0;

        const id = setInterval(() => {
          frame++;
          let out = "";
          let allRevealed = true;
          for (let i = 0; i < target.length; i++) {
            if (frame >= revealAt[i]) {
              out += target[i];
            } else {
              allRevealed = false;
              out += randomChar();
            }
          }
          if (!cancelled) setText(out);
          if (allRevealed || frame > REVEAL_STEPS + 6) {
            clearInterval(id);
            resolve();
          }
        }, FRAME_MS);
      });
    }

    async function loop() {
      while (!cancelled) {
        await new Promise((r) => setTimeout(r, HOLD_MS));
        if (cancelled) return;
        wordIndex = (wordIndex + 1) % WORDS.length;
        await scrambleInto(WORDS[wordIndex]);
      }
    }

    loop();
    return () => {
      cancelled = true;
    };
  }, []);

  return <span className="brand-cycle">{text}</span>;
}
