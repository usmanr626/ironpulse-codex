"use client";

import { SCROLL_STAGES } from "@/lib/constants";

type ScrollStoryProps = {
  registerPanel: (index: number) => (element: HTMLDivElement | null) => void;
  registerDot: (index: number) => (element: HTMLSpanElement | null) => void;
  onReplay: () => void;
};

export function ScrollStory({ registerPanel, registerDot, onReplay }: ScrollStoryProps) {
  return (
    <div className="story-panels relative w-full max-w-xl">
      {SCROLL_STAGES.map((stage, index) => (
        <article
          key={stage.eyebrow}
          ref={registerPanel(index)}
          className="story-panel flex min-h-screen flex-col justify-center py-24 opacity-100 transition-opacity duration-500 motion-reduce:min-h-0 motion-reduce:py-12"
        >
          <div className="mb-8 flex gap-2" aria-hidden="true">
            {SCROLL_STAGES.map((dotStage, dotIndex) => (
              <span
                key={`${stage.eyebrow}-${dotStage.eyebrow}`}
                ref={index === 0 ? registerDot(dotIndex) : undefined}
                className={`h-px w-12 origin-left ${
                  dotIndex <= index ? "bg-zinc-50/80" : "bg-zinc-50/24"
                }`}
              />
            ))}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ember-400/90">{stage.eyebrow}</p>
          <h2 className="mt-4 max-w-[12ch] text-3xl font-semibold leading-none tracking-normal text-white sm:text-5xl">
            {stage.heading}
          </h2>
          <p className="mt-5 max-w-sm text-base leading-7 text-zinc-300 sm:text-lg">{stage.body}</p>
          {stage.cta === "final" ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onReplay}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/18 bg-white px-5 text-sm font-semibold text-black outline-none transition hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950"
              >
                Replay Animation
              </button>
              <a
                href="#built-with-codex"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/18 px-5 text-sm font-semibold text-zinc-100 outline-none transition hover:border-white/40 hover:bg-white/8 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950"
              >
                View Source
              </a>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
