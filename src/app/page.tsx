"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projectsClosing, setProjectsClosing] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState<number[]>([]);
  const [landingCarouselIndex, setLandingCarouselIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const closeProjects = () => {
    setProjectsClosing(true);
    window.setTimeout(() => {
      setProjectsOpen(false);
      setProjectsClosing(false);
    }, 220);
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {
        // Autoplay might be blocked; user can click play again after interaction.
      });
    } else {
      audio.pause();
    }
  };

  const cards = [
    {
      title: "About Me",
      subtitle: (
        <>
          Currently exploring and building{" "}
          <span className="font-semibold">multimodal AI systems</span>: <br />
          voice interfaces, diffusion-based world models, and human-AI
          interaction.
        </>
      ),
      meta: [
        "Passionate about building from 0 → 1.",
        "Founding engineer at 3 startups backed by a16z, Sequoia, and Greylock.",
        "Alum of Berkeley EECS and UIUC CS",
        "Based in Berkeley, CA",
      ],
      accent: "Identity",
      icon: "/assets/px-mic.png",
    },
    {
      title: "Projects",
      subtitle: "Selected works and passion projects.",
      meta: [
        "Curio: Voice-Native Thinking Partner",
        "PandaX: Research on LLM and agentic memory for code optimization",
        "TexSense: Browser Extension for LaTeX Word Count on Overleaf",
      ],
      accent: "Portfolio",
      icon: "/assets/px-data.png",
    },
    {
      title: "Contact",
      subtitle: "Say hello or get matcha with me!",
      accent: "Reach",
      icon: "/assets/px-matcha.png",
      socials: [
        {
          label: "GitHub",
          href: "https://github.com/yinganwang",
          type: "github",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/yingan-wang/",
          type: "linkedin",
        },
        {
          label: "X",
          href: "https://x.com/hoodedalmond",
          type: "x",
        },
      ],
    },
  ];

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-indexed

  const projects = useMemo(
    () => [
      {
        title: "Curio",
        description:
          "Turn scattered thoughts into organized notes and actionable tasks, just by speaking with Curio.\nMore exciting features to come!",
        keywords: ["Voice AI", "Prototype"],
        features: [
          "Smooth conversation with minimal lag",
          "Real-time RAG and web search for accurate responses",
          "Save convesation summary seamlessly to Notion or Obsedian",
          "Explore topics based on embeddings from past conversations",
        ],
        screenshot: "/assets/knowledge-graph-viz.gif",
        media: ["/assets/knowledge-graph-viz.gif"],
        links: [
          {
            href: "https://youtu.be/h-W0l9oZV2E",
            type: "youtube",
            label: "Curio demo video",
          },
        ],
      },
      {
        title: "PandaX Notebook",
        description:
          "A multi-agent code rewrite system with agentic memory to optimize Python Pandas code, making data workflows faster and more efficient on GPU and CPU. Built on Jupyter Lab and Jupyter UI. More exciting features to come!",
        notes:
          "Advisors: Alvin Cheung, Sanjit Seshia, Sky Computing Lab, UC Berkeley.",
        keywords: [
          "Research",
          "LLM",
          "Agent memory",
          "Code Generation",
          "Open source",
          "Jupyter",
        ],
        screenshot: "/assets/pandax-demo.gif",
        media: ["/assets/pandax-demo.gif"],
        links: [
          {
            href: "https://youtu.be/O4_cakgj8aw",
            type: "youtube",
            label: "PandaX demo video",
          },
          {
            href: "https://github.com/yinganw/pandax-jupyter-notebook",
            type: "github",
            label: "PandaX Notebook Frontend source code",
          },
        ],
      },
      {
        title: "TexSense",
        description:
          "A browser extension that counts words in LaTeX as you type on Overleaf. Try it on Chrome or Firefox to boost your writing productivity!",
        keywords: ["Open Source", "Productivity"],
        screenshot: "/assets/texsense-demo.gif",
        media: ["/assets/texsense-demo.gif"],
        links: [
          {
            href: "https://github.com/yinganwang/texSense",
            type: "github",
            label: "TexSense source code",
          },
        ],
      },
    ],
    [],
  );

  const landingMedia = projects.flatMap((project) =>
    project.media?.length
      ? project.media
      : project.screenshot
        ? [project.screenshot]
        : [],
  );

  useEffect(() => {
    if (!projects.length) return;

    const getMedia = (project: { media?: string[]; screenshot?: string }) =>
      project.media?.length
        ? project.media
        : project.screenshot
          ? [project.screenshot]
          : [];

    const interval = window.setInterval(() => {
      setCarouselIndex((prev) =>
        projects.map((project, idx) => {
          const media = getMedia(project);
          if (!media.length) return 0;
          const current = prev[idx] ?? 0;
          return (current + 1) % media.length;
        }),
      );

      setLandingCarouselIndex((prev) => {
        if (!landingMedia.length) return 0;
        return (prev + 1) % landingMedia.length;
      });
    }, 2600);

    return () => window.clearInterval(interval);
  }, [projects, landingMedia.length]);

  return (
    <div className="min-h-screen paper-bg">
      <div className="paper-grid">
        <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-14">
          <header className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--muted-ink)]">
              <span className="rounded-full border border-[color:var(--line)] px-3 py-1">
                Vol. {year}
              </span>
              <span>Issue {month}</span>
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl">
                  Ying&apos;an Wang
                </h1>
                <p className="max-w-2xl text-lg leading-7 text-[color:var(--muted-ink)]">
                  Building multimodal AI products and experimental interfaces,
                  <br /> with a soft spot for art and creativity.
                </p>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white/80 shadow-[0_8px_18px_rgba(39,35,28,0.12)] sm:h-28 sm:w-28 lg:h-36 lg:w-36 card-shell group animate-fade-up">
                  <Image
                    src="/assets/px-me.png"
                    alt="Pixel portrait"
                    width={160}
                    height={160}
                    className="h-16 w-16 object-contain sm:h-20 sm:w-20 lg:h-28 lg:w-28"
                  />
                </div>
              </div>
            </div>
          </header>

          <section className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => {
              const isProjects = card.title === "Projects";

              const cardContent = (
                <>
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="card-shine h-full w-full rounded-3xl" />
                  </div>

                  <div className="relative flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-[0.65rem] uppercase tracking-[0.35em] text-[color:var(--accent-strong)]">
                          {card.accent}
                        </span>
                        <h2 className="text-2xl">{card.title}</h2>
                      </div>
                      <div className="flex shrink-0 h-12 w-12 items-center justify-center overflow-hidden animate-float">
                        <Image
                          src={card.icon}
                          alt={`${card.title} icon`}
                          width={48}
                          height={48}
                          className="object-contain h-9 w-9"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-[color:var(--muted-ink)]">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="relative flex flex-col gap-4 text-sm text-[color:var(--muted-ink)]">
                    {card.title === "Projects" ? (
                      <div className="h-32 overflow-hidden rounded-2xl border border-dashed border-[color:var(--line)] bg-white/70">
                        {landingMedia.length ? (
                          <Image
                            key={landingCarouselIndex}
                            src={
                              landingMedia[
                                landingCarouselIndex % landingMedia.length
                              ]
                            }
                            alt="Projects carousel"
                            width={640}
                            height={360}
                            className="h-full w-full object-cover transition-opacity duration-500"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-[color:var(--muted-ink)]">
                            Image / media placeholder
                          </div>
                        )}
                      </div>
                    ) : card.title === "About Me" ? null : card.title ===
                      "Contact" ? null : (
                      <div className="h-32 rounded-2xl border border-dashed border-[color:var(--line)] bg-white/70 p-4 text-xs uppercase tracking-[0.2em] text-[color:var(--muted-ink)]">
                        Image / media placeholder
                      </div>
                    )}
                  </div>

                  <ul className="flex flex-col gap-2 text-sm text-[color:var(--muted-ink)]">
                    {card.meta?.map((item) => (
                      <li
                        key={item}
                        className="relative pl-4 text-[0.9rem] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:bg-[color:var(--accent)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  {card.title === "Contact" && card.socials?.length ? (
                    <div className="flex items-center justify-center gap-3 text-[color:var(--accent-strong)]">
                      {card.socials.map((social) => (
                        <a
                          key={social.type}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={social.label}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/80 transition-transform duration-300 hover:-translate-y-0.5"
                        >
                          {social.type === "linkedin" ? (
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="currentColor"
                            >
                              <path d="M20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.65H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM6.95 20.45H3.72V9h3.23v11.45Z" />
                            </svg>
                          ) : social.type === "x" ? (
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M18.9 2H22l-7.1 8.1L23.5 22h-6.7l-5.2-6.5L5.4 22H2.3l7.6-8.6L.5 2h6.9l4.7 5.9L18.9 2Zm-1.2 18h1.7L6.7 4H4.9l12.8 16Z" />
                            </svg>
                          ) : (
                            <svg
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  ) : null}

                  <div className="relative mt-auto flex items-center justify-between text-xs uppercase tracking-[0.35em] text-[color:var(--muted-ink)]">
                    <span></span>
                    {card.title === "Projects" && (
                      <span className="rounded-full border border-[color:var(--line)] px-2 py-1">
                        Flip
                      </span>
                    )}
                  </div>
                </>
              );

              return (
                <div
                  key={card.title}
                  className={`group animate-fade-up ${
                    card.title === "Contact" ? "flex h-full flex-col" : ""
                  }`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {card.title === "Contact" && (
                    <div className="mb-4 flex w-full items-start justify-center gap-2">
                      <div className="flex h-auto min-h-[320px] w-full flex-col items-center gap-3 overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-5 shadow-[0_10px_24px_rgba(39,35,28,0.08),_0_2px_6px_rgba(39,35,28,0.06)] transition-transform duration-300 hover:-translate-y-1">
                        <Image
                          src={
                            isPlaying
                              ? "/assets/cassette-crop.gif"
                              : "/assets/cassette-crop.png"
                          }
                          alt="Cassette player"
                          width={120}
                          height={100}
                          className="h-40 w-full object-contain"
                          onError={() => setIsPlaying(false)}
                          onClick={() => {
                            setIsPlaying((prev) => !prev);
                            toggleAudio();
                          }}
                        />
                        <audio
                          ref={audioRef}
                          className="hidden"
                          autoPlay
                          preload="auto"
                          src="/assets/Painted-Paradise.mp3"
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          onEnded={() => setIsPlaying(false)}
                        />
                        <div className="flex flex-col items-center gap-1 text-center">
                          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--foreground)]">
                            Painted Paradise
                          </span>
                          <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted-ink)]">
                            Jiro Inagaki &amp; His Soul Media
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={toggleAudio}
                          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[color:var(--accent-strong)] transition-transform duration-300 hover:-translate-y-0.5"
                          aria-label={isPlaying ? "Pause audio" : "Play audio"}
                        >
                          {isPlaying ? "Pause" : "Play"}
                        </button>
                      </div>
                    </div>
                  )}
                  <div
                    className={`card-shell w-full ${
                      card.title === "Contact" ? "mt-auto" : "h-full"
                    }`}
                  >
                    {isProjects ? (
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded={projectsOpen}
                        onClick={() => setProjectsOpen(true)}
                        className="card relative flex h-full w-full flex-col gap-6 rounded-3xl px-7 py-8 text-left transition-transform duration-300 hover:-translate-y-1"
                      >
                        {cardContent}
                      </button>
                    ) : (
                      <div
                        className={`card relative flex h-full flex-col rounded-3xl px-7 text-left ${
                          card.title === "Contact" ? "gap-1 py-6" : "gap-6 py-8"
                        }`}
                      >
                        {cardContent}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </section>

          <footer className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--muted-ink)]">
            <span>Limited run</span>
            <span>Printed on paper, stored online.</span>
          </footer>
        </main>
      </div>
      {projectsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            aria-label="Close projects overlay"
            onClick={closeProjects}
            className={`absolute inset-0 bg-white/90 backdrop-blur-sm transition-opacity duration-200 ${
              projectsClosing ? "opacity-0" : "opacity-100"
            }`}
          />
          <div className="relative w-[92vw] max-w-5xl">
            <div className="card-shell">
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Projects"
                className={`card relative flex max-h-[86vh] flex-col gap-6 overflow-hidden rounded-[32px] px-8 py-10 transition-transform duration-200 ${
                  projectsClosing ? "scale-95" : "scale-100"
                }`}
              >
                <button
                  type="button"
                  onClick={closeProjects}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-white text-[8px] uppercase tracking-[0.2em] text-[color:var(--muted-ink)] transition-transform duration-300 hover:scale-105"
                >
                  Close
                </button>

                <div className="flex flex-col gap-2">
                  <span className="text-[0.65rem] uppercase tracking-[0.35em] text-[color:var(--accent-strong)]">
                    Portfolio
                  </span>
                  <h2 className="text-3xl">Project Details</h2>
                </div>

                <div className="grid gap-5 overflow-auto pr-1 sm:grid-cols-2">
                  {projects.map((project, projectIndex) => {
                    const media = project.media?.length
                      ? project.media
                      : project.screenshot
                        ? [project.screenshot]
                        : [];
                    const activeMedia = media.length
                      ? media[(carouselIndex[projectIndex] ?? 0) % media.length]
                      : null;

                    return (
                      <div
                        key={project.title}
                        className="group flex flex-col gap-4 rounded-3xl border border-[color:var(--line)] bg-white/80 p-5 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_14px_30px_rgba(39,35,28,0.12)]"
                      >
                        {project.links?.length ? (
                          <a
                            href={project.links[0].href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={project.links[0].label}
                            className="flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[color:var(--line)] bg-white/70 transition-transform duration-300 hover:scale-[1.02] sm:h-48"
                          >
                            {activeMedia ? (
                              <Image
                                key={activeMedia}
                                src={activeMedia}
                                alt={`${project.title} screenshot`}
                                width={640}
                                height={420}
                                className="h-full w-full object-cover transition-opacity duration-500"
                              />
                            ) : (
                              <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-ink)]">
                                Screenshot
                              </span>
                            )}
                          </a>
                        ) : (
                          <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[color:var(--line)] bg-white/70 sm:h-48">
                            {activeMedia ? (
                              <Image
                                key={activeMedia}
                                src={activeMedia}
                                alt={`${project.title} screenshot`}
                                width={640}
                                height={420}
                                className="h-full w-full object-cover transition-opacity duration-500"
                              />
                            ) : (
                              <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-ink)]">
                                Screenshot
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl">{project.title}</h3>
                            <div className="flex items-center gap-2">
                              {project.links?.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label={link.label}
                                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/80 text-[color:var(--accent-strong)] transition-transform duration-300 hover:-translate-y-0.5"
                                >
                                  {link.type === "youtube" ? (
                                    <svg
                                      aria-hidden="true"
                                      viewBox="0 0 24 24"
                                      className="h-4 w-4"
                                      fill="currentColor"
                                    >
                                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.1 31.1 0 0 0 0 12a31.1 31.1 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.1 31.1 0 0 0 24 12a31.1 31.1 0 0 0-.5-5.8ZM9.6 15.5V8.5l6.4 3.5-6.4 3.5Z" />
                                    </svg>
                                  ) : (
                                    <svg
                                      aria-hidden="true"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                      className="h-4 w-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z" />
                                    </svg>
                                  )}
                                </a>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-[color:var(--muted-ink)]">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1 text-[0.65rem] uppercase tracking-[0.28em] text-[color:var(--muted-ink)]">
                            {project.keywords.map((keyword) => {
                              const lowered = keyword.toLowerCase();
                              const tint =
                                lowered === "research"
                                  ? "bg-[color:var(--accent)]/20"
                                  : lowered === "open source"
                                    ? "bg-[color:var(--accent-strong)]/20"
                                    : "bg-white/80";

                              return (
                                <span
                                  key={keyword}
                                  className={`rounded-full border border-[color:var(--line)] px-3 py-1 ${tint}`}
                                >
                                  {keyword}
                                </span>
                              );
                            })}
                          </div>
                          {project.features?.length ? (
                            <ul className="flex list-disc flex-col gap-2 pl-4 text-xs text-[color:var(--muted-ink)] marker:text-[color:var(--accent)]">
                              {project.features.map((feature) => (
                                <li key={feature} className="leading-5">
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {project.notes ? (
                            <p className="pt-2 text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--muted-ink)]/80">
                              {project.notes}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
