import {
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const CHROME_STORE_URL = "https://chrome.google.com/webstore";
const PUBLIC_APP_URL =
  import.meta.env.VITE_PUBLIC_APP_URL ?? "https://arcalist.app";
const CHECKOUT_RETURN_URL =
  import.meta.env.VITE_CHECKOUT_RETURN_URL ??
  `${PUBLIC_APP_URL}/billing/return`;
const CHECKOUT_CANCEL_URL =
  import.meta.env.VITE_CHECKOUT_CANCEL_URL ?? `${PUBLIC_APP_URL}/pricing`;

// Do not expose Dodo secret keys in frontend. Checkout sessions requiring secrets must be created server-side.
const checkoutRedirectUrls = {
  // Server-side checkout creation should pass this as return_url.
  returnUrl: CHECKOUT_RETURN_URL,
  // Server-side checkout creation should pass this as cancel_url.
  cancelUrl: CHECKOUT_CANCEL_URL,
};

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Free vs Pro", href: "/pricing" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

const features = [
  {
    title: "Visual Boards",
    text: "Organize bookmarks into clean draggable boards that keep related links together.",
    icon: "boards",
    featured: true,
  },
  {
    title: "Multiple Pages",
    text: "Separate work, study, finance, and personal browsing into dedicated spaces.",
    icon: "pages",
  },
  {
    title: "Quick Save",
    text: "Save useful pages fast so you can organize them without breaking your flow.",
    icon: "save",
    featured: true,
  },
  {
    title: "Local First",
    text: "Use Arcalist instantly with a local-first experience before you ever need sync.",
    icon: "local",
  },
  {
    title: "Import / Export",
    text: "Bring in your existing bookmarks and keep backups whenever you want.",
    icon: "import",
  },
  {
    title: "Privacy Blur",
    text: "Hide sensitive bookmark content with one click when sharing your screen.",
    icon: "blur",
  },
  {
    title: "Custom Wallpapers",
    text: "Personalize your workspace with wallpapers that make your new tab feel yours.",
    icon: "wallpaper",
  },
  {
    title: "Cloud Sync",
    text: "Upgrade when you're ready to keep your bookmarks available across devices.",
    icon: "sync",
    pro: true,
  },
];

const freeFeatures = [
  "Unlimited bookmarks",
  "Up to 3 pages",
  "Up to 10 boards per page",
  "Local storage",
  "Basic search",
  "Basic wallpapers",
  "Import / export",
  "Drag and drop",
  "Privacy blur",
];

const proFeatures = [
  "Unlimited pages",
  "Unlimited boards",
  "Cloud sync",
  "Cross-browser sync",
  "Smart collections",
  "Productivity analytics",
  "Time spent on websites with bar graphs",
  "Premium themes",
  "Custom wallpaper upload",
  "Workspace and page sharing",
];

const useCases = [
  {
    title: "Developers",
    text: "Keep docs, GitHub repos, tools, and project links organized.",
    icon: "code",
  },
  {
    title: "Students",
    text: "Save learning resources, courses, notes, and research links.",
    icon: "book",
  },
  {
    title: "Creators",
    text: "Organize inspiration, assets, references, and publishing tools.",
    icon: "spark",
  },
  {
    title: "Professionals",
    text: "Separate client links, dashboards, and daily workspaces.",
    icon: "briefcase",
  },
];

const steps = [
  "Install Arcalist",
  "Open a new tab",
  "Create pages and boards",
  "Save and organize bookmarks",
  "Upgrade to Pro when you need sync and unlimited workspaces",
];

const faqs = [
  {
    question: "Is Arcalist free?",
    answer:
      "Yes. Arcalist includes a free plan with unlimited bookmarks, up to 3 pages, up to 10 boards per page, local storage, import/export, drag and drop, and privacy blur.",
  },
  {
    question: "What does Pro unlock?",
    answer:
      "Pro unlocks unlimited pages, unlimited boards, cloud sync, cross-browser sync, smart collections, productivity analytics, custom wallpaper upload, premium themes, and sharing features.",
  },
  {
    question: "Can I use Arcalist without signing in?",
    answer:
      "Yes. Arcalist is local-first, so you can start organizing bookmarks without needing cloud sync right away.",
  },
  {
    question: "Can I import my existing bookmarks?",
    answer:
      "Yes. You can import your existing bookmarks and organize them into pages and boards inside Arcalist.",
  },
  {
    question: "Does Arcalist replace my browser's new tab?",
    answer:
      "Yes. Arcalist transforms the new tab into a visual bookmark workspace designed for cleaner browsing.",
  },
  {
    question: "Can I share workspaces or pages?",
    answer:
      "Sharing is planned as a Pro feature, allowing you to share specific pages or workspaces through links.",
  },
];

function App() {
  const route = getCurrentRoute();

  if (route === "/billing/return") {
    return (
      <PageShell>
        <BillingReturnPage />
      </PageShell>
    );
  }

  if (route === "/pricing") {
    return (
      <PageShell>
        <PricingPage />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <UseCasesSection />
        <WorkflowSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
    </PageShell>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-arca-bg text-arca-text">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function getCurrentRoute() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  return pathname || "/";
}

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-arca-primary/15 bg-arca-bg/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        <a href="/" className="flex items-center gap-3" aria-label="Arcalist home">
          <LogoMark />
          <span className="text-lg font-semibold tracking-wide">Arcalist</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-arca-muted transition hover:text-arca-text"
            >
              {link.label}
            </a>
          ))}
        </div>
        <ChromeButton className="hidden md:inline-flex" label="Add to Chrome" />
        <ChromeButton className="inline-flex md:hidden" label="Add" />
      </nav>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="relative grid h-10 w-10 place-items-center rounded-2xl border border-arca-primary/35 bg-arca-primary/12 shadow-cyan">
      <span className="absolute inset-1 rounded-xl bg-arca-primary opacity-90" />
      <span className="relative text-base font-black text-arca-text">A</span>
    </span>
  );
}

function ChromeButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href={CHROME_STORE_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-arca-primary px-5 py-3 text-sm font-semibold text-arca-text shadow-glow transition hover:-translate-y-0.5 hover:bg-arca-secondary hover:shadow-cyan focus:outline-none focus:ring-2 focus:ring-arca-primary focus:ring-offset-2 focus:ring-offset-arca-bg ${className}`}
    >
      {label}
    </a>
  );
}

function HeroSection() {
  const flipWords = ["focused", "organized", "personal", "beautiful", "productive"];
  const [flipIndex, setFlipIndex] = useState(0);
  const currentWord = flipWords[flipIndex] ?? flipWords[0];
  const article = currentWord === "organized" ? "an" : "a";

  return (
    <section id="top" className="relative isolate px-5 pt-32 lg:px-8">
      <BackgroundBeamsWithCollision>
        <div className="absolute inset-0 -z-20 subtle-grid" />
        <div className="absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-arca-highlight/35 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute right-0 top-80 -z-10 h-64 w-64 rounded-full bg-arca-primary/18 blur-3xl" />
      </BackgroundBeamsWithCollision>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mx-auto mb-6 inline-flex rounded-full border border-arca-primary/45 bg-arca-panel/85 px-4 py-2 text-sm font-semibold text-arca-accent shadow-sm shadow-arca-primary/10 backdrop-blur">
            Beautiful bookmark organization for your new tab
          </p>
          <h1 className="text-balance text-5xl font-bold leading-tight tracking-normal text-arca-text sm:text-6xl lg:text-7xl">
            Turn your new tab into {article}{" "}
            <ContainerTextFlip
              words={flipWords}
              activeIndex={flipIndex}
              onIndexChange={setFlipIndex}
            />{" "}
            bookmark workspace
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-arca-muted">
            Arcalist helps you organize bookmarks into pages and boards, personalize
            your new tab, and keep your browsing workflow clean.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ChromeButton label="Add to Chrome" />
            <a
              href="#features"
              className="rounded-full border border-arca-primary/25 bg-arca-panel/45 px-6 py-3 text-sm font-semibold text-arca-text transition hover:-translate-y-0.5 hover:border-arca-secondary/60 hover:bg-arca-primary/12 focus:outline-none focus:ring-2 focus:ring-arca-highlight focus:ring-offset-2 focus:ring-offset-arca-bg"
            >
              See Features
            </a>
          </div>
        </div>
        <ProductMockup />
      </div>
    </section>
  );
}

function BackgroundBeamsWithCollision({ children }: { children: ReactNode }) {
  const beams = Array.from({ length: 7 });

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,209,209,0.55),transparent_32rem)]" />
      {beams.map((_, index) => (
        <span
          key={index}
          className="warm-beam"
          style={
            {
              left: `${8 + index * 14}%`,
              animationDelay: `${index * 0.65}s`,
              animationDuration: `${5.6 + index * 0.42}s`,
              opacity: 0.34 + (index % 3) * 0.065,
            } as CSSProperties
          }
        />
      ))}
      <span className="beam-collision beam-collision-one" />
      <span className="beam-collision beam-collision-two" />
      {children}
    </div>
  );
}

function ContainerTextFlip({
  words,
  activeIndex,
  onIndexChange,
}: {
  words: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      onIndexChange((activeIndex + 1) % words.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [activeIndex, onIndexChange, prefersReducedMotion, words.length]);

  return (
    <span className="flip-text-container" aria-live="polite">
      <span key={words[activeIndex]} className="flip-text-word">
        {words[activeIndex]}
      </span>
    </span>
  );
}

function CardContainer({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const [transform, setTransform] = useState("");
  const prefersReducedMotion = usePrefersReducedMotion();

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / rect.width) * 7;
    const rotateX = -((y - rect.height / 2) / rect.height) * 7;

    setTransform(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`,
    );
  }

  return (
    <div
      className={`card-3d-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform("")}
      style={{ ...style, transform }}
    >
      {children}
    </div>
  );
}

function CardBody({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`card-3d-body ${className}`} style={style}>
      {children}
    </div>
  );
}

function CardItem({
  children,
  className = "",
  translateZ = 24,
}: {
  children: ReactNode;
  className?: string;
  translateZ?: number;
}) {
  return (
    <div
      className={`card-3d-item ${className}`}
      style={{ "--card-z": `${translateZ}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function ProductMockup() {
  const boards = [
    {
      title: "DEV TOOLS",
      items: ["GitHub", "React Docs", "Vercel", "MDN Web Docs", "Tailwind CSS"],
      more: 4,
    },
    {
      title: "AI TOOLS",
      items: ["ChatGPT", "Claude", "Perplexity", "Gemini", "Prompt Library"],
      more: 6,
    },
    {
      title: "DESIGN",
      items: ["Figma", "Color Palette", "Design System", "Icons", "Inspiration"],
      more: 3,
    },
    {
      title: "LEARNING",
      items: [
        "Course Notes",
        "JavaScript Guide",
        "DSA Practice",
        "Research Paper",
        "Tutorial Queue",
      ],
      more: 8,
    },
    {
      title: "PRODUCTIVITY",
      items: ["Notion", "Linear", "Calendar", "Task Board", "Weekly Plan"],
      more: 2,
    },
    {
      title: "READ LATER",
      items: ["Startup Ideas", "UX Article", "Browser APIs", "SaaS Notes", "Case Study"],
      more: 5,
    },
  ];

  const actions = [
    { label: "Search bookmarks", icon: "search" },
    { label: "AI collections", icon: "sparkle", pro: true },
    { label: "Analytics", icon: "chart", pro: true },
    { label: "Privacy blur", icon: "eye-off" },
    { label: "Import bookmarks", icon: "download" },
    { label: "Change layout", icon: "grid" },
    { label: "Trash", icon: "trash" },
    { label: "Settings", icon: "settings" },
  ];

  return (
    <div className="product-preview mx-auto mt-16 max-w-7xl">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.24em] text-arca-primary">
        YOUR NEW TAB, ORGANIZED
      </p>
      <CardContainer>
        <CardBody className="rounded-[2rem] border border-arca-primary/25 bg-arca-panel/65 p-2 shadow-card backdrop-blur-xl sm:p-3">
        <div className="overflow-hidden rounded-[1.5rem] border border-arca-primary/15 bg-arca-bg">
          <div className="flex items-center gap-2 border-b border-arca-primary/15 bg-arca-panel/45 px-4 py-3 sm:px-5 sm:py-4">
            <span className="h-3 w-3 rounded-full bg-arca-anchor" />
            <span className="h-3 w-3 rounded-full bg-arca-primary" />
            <span className="h-3 w-3 rounded-full bg-arca-secondary" />
            <div className="ml-3 hidden flex-1 rounded-full border border-arca-primary/15 bg-arca-bg/70 px-4 py-2 text-sm text-arca-muted/70 sm:block">
              chrome://newtab - Arcalist Workspace
            </div>
            <div className="ml-3 flex-1 rounded-full border border-arca-primary/15 bg-arca-bg/70 px-3 py-2 text-xs text-arca-muted/70 sm:hidden">
              Arcalist Workspace
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden bg-[radial-gradient(circle_at_16%_18%,rgba(255,148,148,0.16),transparent_18rem),radial-gradient(circle_at_86%_20%,rgba(255,209,209,0.42),transparent_20rem),#FFF5E4] p-4 pr-14 sm:p-6 sm:pr-20 lg:p-7 lg:pr-24">
            <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {["Home", "Work", "Learning", "Personal", "Finance"].map(
                (page, index) => (
                  <button
                    key={page}
                    type="button"
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                      index === 0
                        ? "border-arca-primary/50 bg-arca-primary text-arca-text shadow-cyan"
                        : "border-arca-primary/15 bg-arca-panel/55 text-arca-muted hover:border-arca-primary/40 hover:text-arca-text"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                type="button"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-arca-primary/20 bg-arca-panel/60 text-arca-primary transition hover:border-arca-primary/50 hover:text-arca-text"
                aria-label="Add page"
              >
                +
              </button>
            </div>

            <div className="overflow-x-auto pb-4 pr-1 [scrollbar-color:#FF9494_transparent] md:overflow-visible md:pb-0">
              <div className="grid min-w-[72rem] grid-cols-6 gap-4 md:min-w-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {boards.map((board, boardIndex) => (
                  <CardContainer
                    key={board.title}
                    className="preview-board"
                    style={
                      {
                        "--preview-delay": `${120 + boardIndex * 90}ms`,
                      } as CSSProperties
                    }
                  >
                    <CardBody className="h-full rounded-3xl border border-arca-primary/25 bg-arca-panel/80 p-4 shadow-card backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <DragDots />
                        <h3 className="truncate text-xs font-bold uppercase tracking-[0.16em] text-arca-text">
                          {board.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-arca-primary/10 px-2 py-1 text-[0.65rem] font-semibold text-arca-primary">
                        {board.items.length}
                      </span>
                    </div>
                    <div className="my-3 h-px bg-arca-primary/15" />
                    <div className="space-y-2">
                      {board.items.map((bookmark, itemIndex) => (
                        <div
                          key={bookmark}
                          className="group flex items-center gap-2 rounded-2xl border border-transparent bg-arca-bg/70 px-2.5 py-2 transition hover:border-arca-primary/25 hover:bg-arca-panel"
                        >
                          <span
                            className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[0.68rem] font-bold text-arca-text ${
                              itemIndex % 3 === 0
                                ? "bg-arca-primary"
                                : itemIndex % 3 === 1
                                  ? "bg-arca-secondary"
                                  : "bg-arca-highlight"
                            }`}
                          >
                            {bookmark.charAt(0)}
                          </span>
                          <span className="min-w-0 truncate text-sm font-medium text-arca-text/90">
                            {bookmark}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="mt-3 text-xs font-semibold text-arca-primary transition hover:text-arca-text"
                    >
                      Show more ({board.more})
                    </button>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full border border-arca-primary/25 bg-arca-panel/80 text-arca-primary shadow-cyan backdrop-blur transition hover:border-arca-primary/55 hover:text-arca-text sm:bottom-6 sm:left-6"
              aria-label="Change wallpaper"
            >
              <PreviewIcon name="image" />
            </button>

            <aside className="absolute right-3 top-24 z-20 flex flex-col gap-2 sm:right-5 sm:top-28">
              {actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="relative grid h-9 w-9 place-items-center rounded-full border border-arca-primary/20 bg-arca-panel/80 text-arca-primary shadow-lg shadow-arca-primary/10 backdrop-blur transition hover:border-arca-primary/55 hover:bg-arca-secondary/60 hover:text-arca-text sm:h-11 sm:w-11"
                  aria-label={action.label}
                >
                  <PreviewIcon name={action.icon} />
                  {action.pro && (
                    <span className="absolute -right-1 -top-1 rounded-full border border-arca-primary/30 bg-arca-bg px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-normal text-arca-primary">
                      Pro
                    </span>
                  )}
                </button>
              ))}
            </aside>
          </div>
        </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}

function DragDots() {
  return (
    <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <span key={index} className="h-1 w-1 rounded-full bg-arca-anchor/70" />
      ))}
    </span>
  );
}

function PreviewIcon({ name }: { name: string }) {
  const common = {
    className: "h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" />
      </svg>
    );
  }

  if (name === "sparkle") {
    return (
      <svg {...common}>
        <path d="M12 3 10 9.8 3 12l7 2.2 2 6.8 2-6.8 7-2.2-7-2.2z" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M8 19v-7" />
        <path d="M12 19V9" />
        <path d="M16 19v-4" />
        <path d="M20 19V7" />
      </svg>
    );
  }

  if (name === "eye-off") {
    return (
      <svg {...common}>
        <path d="m3 3 18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A9.7 9.7 0 0 1 12 5c5 0 8.5 4.4 9.5 7a12.4 12.4 0 0 1-2.4 3.6" />
        <path d="M6.5 6.8A12.1 12.1 0 0 0 2.5 12c1 2.6 4.5 7 9.5 7a9.7 9.7 0 0 0 3-.5" />
      </svg>
    );
  }

  if (name === "download") {
    return (
      <svg {...common}>
        <path d="M12 3v11" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    );
  }

  if (name === "grid") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="6" height="6" rx="1.2" />
        <rect x="14" y="4" width="6" height="6" rx="1.2" />
        <rect x="4" y="14" width="6" height="6" rx="1.2" />
        <rect x="14" y="14" width="6" height="6" rx="1.2" />
      </svg>
    );
  }

  if (name === "trash") {
    return (
      <svg {...common}>
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M6 7l1 14h10l1-14" />
        <path d="M9 7V4h6v3" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.4-.2-.1a1.7 1.7 0 0 0-2 .1 1.7 1.7 0 0 0-.8 1.7V22H9.2v-.2a1.7 1.7 0 0 0-.8-1.7 1.7 1.7 0 0 0-2-.1l-.2.1-2-3.4.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.4-1H3V10h.2a1.7 1.7 0 0 0 1.4-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-3.4.2.1a1.7 1.7 0 0 0 2-.1 1.7 1.7 0 0 0 .8-1.7V2h5.6v.2a1.7 1.7 0 0 0 .8 1.7 1.7 1.7 0 0 0 2 .1l.2-.1 2 3.4-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.4 1h.2v3.6h-.2a1.7 1.7 0 0 0-1.4 1.1Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="m4 15 4-4 4 4 2-2 6 6" />
      <circle cx="16" cy="9" r="1.5" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-arca-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-normal text-arca-text sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-5 text-lg leading-8 text-arca-muted">{text}</p>}
    </div>
  );
}

function FeaturesSection() {
  const highlightedFeatures = features.filter((feature) => feature.featured);
  const supportingFeatures = features.filter((feature) => !feature.featured);

  return (
    <section id="features" className="relative overflow-hidden px-5 py-32 lg:px-8">
      <PathsBackground />
      <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-arca-primary/22 blur-3xl" />
      <div className="absolute bottom-24 right-[-6rem] h-80 w-80 rounded-full bg-arca-secondary/70 blur-3xl" />
      <div className="absolute inset-0 subtle-grid opacity-45" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="FEATURES"
          title="Everything you need to organize your web"
          text="Arcalist gives you a clean, flexible bookmark workspace for saving, organizing, and personalizing your browsing flow."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {highlightedFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              featured
            />
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {supportingFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index + highlightedFeatures.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PathsBackground() {
  const paths = [
    "M-80 168C62 70 184 66 304 154C426 244 545 244 672 154C800 64 940 56 1098 154C1210 224 1334 226 1496 142",
    "M-64 250C94 168 220 170 336 252C464 344 582 344 724 246C872 144 1014 148 1144 236C1262 316 1398 326 1530 246",
    "M-88 334C52 278 184 300 308 378C444 464 578 454 720 356C862 258 1018 250 1160 338C1288 418 1408 438 1510 392",
    "M-40 86C82 38 220 26 372 92C534 164 658 160 806 82C946 8 1092 24 1230 94C1348 154 1444 166 1530 128",
    "M-36 438C124 396 262 428 394 500C538 578 686 562 836 466C986 370 1120 376 1258 454C1368 516 1468 530 1546 498",
  ];

  return (
    <div className="paths-background" aria-hidden="true">
      <svg viewBox="0 0 1440 620" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathsRose" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FF9494" stopOpacity="0.4" />
            <stop offset="48%" stopColor="#FFD1D1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#B84E4E" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        {paths.map((path, index) => (
          <path
            key={path}
            d={path}
            stroke="url(#pathsRose)"
            opacity={0.34 - index * 0.035}
          />
        ))}
      </svg>
    </div>
  );
}

function FeatureCard({
  feature,
  index,
  featured = false,
}: {
  feature: (typeof features)[number];
  index: number;
  featured?: boolean;
}) {
  return (
    <CardContainer className="h-full">
      <CardBody
      className={`feature-card group h-full ${featured ? "feature-card-featured" : ""}`}
      style={
        {
          "--feature-delay": `${index * 80}ms`,
        } as CSSProperties
      }
    >
      <CardItem className="relative flex h-full flex-col" translateZ={28}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="feature-icon-badge">
            <FeatureIcon name={feature.icon} />
          </div>
          {feature.pro && (
            <span className="rounded-full border border-arca-primary/45 bg-arca-highlight/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-arca-accent shadow-sm">
              Pro
            </span>
          )}
        </div>
        <h3
          className={`font-bold tracking-normal text-arca-text ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {feature.title}
        </h3>
        <p className="mt-3 max-w-xl leading-7 text-arca-muted">{feature.text}</p>
        <div className={featured ? "mt-auto pt-8" : "mt-7"}>
          <div
            className={`rounded-full bg-arca-primary/75 shadow-cyan ${
              featured ? "h-1.5 w-28" : "h-1 w-16"
            }`}
          />
        </div>
      </CardItem>
      </CardBody>
    </CardContainer>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const common = {
    className: "h-6 w-6",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "boards") {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="7" height="14" rx="2" />
        <rect x="13" y="5" width="7" height="6" rx="2" />
        <rect x="13" y="13" width="7" height="6" rx="2" />
      </svg>
    );
  }

  if (name === "pages") {
    return (
      <svg {...common}>
        <path d="M5 5h10l4 4v10H5z" />
        <path d="M15 5v4h4" />
        <path d="M8 13h8" />
        <path d="M8 16h6" />
      </svg>
    );
  }

  if (name === "save") {
    return (
      <svg {...common}>
        <path d="M5 4h12l2 2v14H5z" />
        <path d="M8 4v6h8V4" />
        <path d="M8 20v-6h8v6" />
      </svg>
    );
  }

  if (name === "local") {
    return (
      <svg {...common}>
        <path d="M4 7h16" />
        <path d="M6 7v11h12V7" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
      </svg>
    );
  }

  if (name === "import") {
    return (
      <svg {...common}>
        <path d="M12 3v11" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 20h14" />
      </svg>
    );
  }

  if (name === "blur") {
    return (
      <svg {...common}>
        <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" />
        <path d="M9.5 9.5h5v5h-5z" />
      </svg>
    );
  }

  if (name === "wallpaper") {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="m4 15 4-4 4 4 2-2 6 6" />
        <circle cx="16" cy="9" r="1.4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M17 3h4v4" />
      <path d="M3 11a8 8 0 0 1 13.6-5.6L21 7" />
      <path d="M7 21H3v-4" />
      <path d="M21 13a8 8 0 0 1-13.6 5.6L3 17" />
    </svg>
  );
}

function BillingReturnPage() {
  return (
    <main className="relative isolate min-h-screen px-5 pb-24 pt-32 lg:px-8">
      <div className="absolute inset-0 -z-20 subtle-grid opacity-60" />
      <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-arca-secondary/80 blur-3xl" />
      <div className="absolute bottom-20 right-[-6rem] -z-10 h-80 w-80 rounded-full bg-arca-primary/20 blur-3xl" />
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-4xl items-center justify-center">
        <section className="w-full rounded-[2rem] border border-arca-primary/30 bg-arca-panel/90 px-6 py-12 text-center shadow-card backdrop-blur-xl sm:px-10 sm:py-16">
          {/* This page is only a post-checkout UX page. Pro access must be granted only by the verified Dodo webhook on the backend. */}
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-arca-primary/35 bg-arca-primary/15 text-arca-accent shadow-cyan">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h1 className="mt-7 text-4xl font-bold tracking-normal text-arca-text sm:text-5xl">
            Payment successful
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-arca-muted">
            Open Arcalist again. Your Pro access will activate automatically once
            payment is confirmed.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-arca-muted/85">
            If Pro does not appear immediately, wait a few seconds and refresh
            Arcalist. Your access is activated securely through payment verification.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={PUBLIC_APP_URL}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-arca-primary px-6 py-3 text-sm font-semibold text-arca-text shadow-glow transition hover:-translate-y-0.5 hover:bg-arca-secondary hover:shadow-cyan focus:outline-none focus:ring-2 focus:ring-arca-primary focus:ring-offset-2 focus:ring-offset-arca-bg"
            >
              Back to Arcalist
            </a>
            <a
              href={checkoutRedirectUrls.cancelUrl}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-arca-primary/30 bg-arca-bg/70 px-6 py-3 text-sm font-semibold text-arca-text transition hover:-translate-y-0.5 hover:border-arca-primary/60 hover:bg-arca-secondary/50 focus:outline-none focus:ring-2 focus:ring-arca-highlight focus:ring-offset-2 focus:ring-offset-arca-bg"
            >
              Go to pricing
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function PricingPage() {
  return (
    <main className="pt-20">
      <PricingSection showCancelNotice={isCheckoutCancellation()} />
    </main>
  );
}

function isCheckoutCancellation() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status")?.trim().toLowerCase();
  const checkout = params.get("checkout")?.trim().toLowerCase();

  return (
    status === "cancelled" ||
    status === "canceled" ||
    checkout === "cancelled" ||
    checkout === "canceled"
  );
}

function PricingSection({
  showCancelNotice = false,
}: {
  showCancelNotice?: boolean;
}) {
  return (
    <section id="pricing" className="relative bg-arca-section px-5 py-24 lg:px-8">
      <div className="absolute inset-0 subtle-grid opacity-50" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Free vs Pro"
          title="Start locally. Upgrade when you need more."
          text="Arcalist stays useful from day one, with Pro designed for people who want unlimited workspaces and sync."
        />
        {showCancelNotice && (
          <p className="mx-auto mt-7 max-w-2xl rounded-2xl border border-arca-primary/30 bg-arca-bg/70 px-5 py-4 text-center text-sm font-semibold text-arca-accent shadow-sm">
            Checkout cancelled. You can upgrade anytime.
          </p>
        )}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          <PlanCard
            title="Free"
            subtitle="Everything you need to start organizing."
            features={freeFeatures}
            cta="Start Free"
          />
          <PlanCard
            title="Pro"
            subtitle="For users who want unlimited organization and sync."
            features={proFeatures}
            cta="Add to Chrome"
            featured
          />
        </div>
        <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-6 text-arca-muted">
          Pro features will be available after upgrade. Free users can still use
          Arcalist locally.
        </p>
      </div>
    </section>
  );
}

function PlanCard({
  title,
  subtitle,
  features,
  cta,
  featured = false,
}: {
  title: string;
  subtitle: string;
  features: string[];
  cta: string;
  featured?: boolean;
}) {
  return (
    <CardContainer className="h-full">
      <CardBody
      className={`glass-card flex h-full flex-col p-7 pb-8 ${
        featured ? "border-arca-highlight/50 shadow-glow" : ""
      }`}
    >
      <CardItem className="flex items-start justify-between gap-4" translateZ={24}>
        <div>
          <h3 className="text-3xl font-bold text-arca-text">{title}</h3>
          <p className="mt-2 text-arca-muted">{subtitle}</p>
        </div>
        {featured && (
          <span className="rounded-full border border-arca-primary/40 bg-arca-primary/10 px-3 py-1 text-xs font-semibold text-arca-primary">
            Upgrade
          </span>
        )}
      </CardItem>
      <CardItem className="mt-8 flex-1" translateZ={18}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm text-arca-muted">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-arca-primary/25 text-xs font-bold text-arca-accent">
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardItem>
      <CardItem className="mt-8 self-start" translateZ={30}>
        <ChromeButton label={cta} className="px-6" />
      </CardItem>
      </CardBody>
    </CardContainer>
  );
}

function UseCasesSection() {
  return (
    <section className="relative px-5 py-28 lg:px-8">
      <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-arca-highlight/6 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="USE CASES"
          title="Built for everyday browsing workflows"
          text="Whether you are coding, studying, creating, or managing work, Arcalist keeps your links organized by context."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase) => (
            <CardContainer key={useCase.title} className="h-full">
              <CardBody className="group use-case-card h-full">
              <CardItem className="relative" translateZ={24}>
                <div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl border border-arca-primary/25 bg-arca-primary/10 text-arca-primary transition group-hover:border-arca-primary/55 group-hover:bg-arca-secondary/45">
                  <UseCaseIcon name={useCase.icon} />
                </div>
                <h3 className="text-xl font-semibold text-arca-text">
                  {useCase.title}
                </h3>
                <p className="mt-3 leading-7 text-arca-muted/82">{useCase.text}</p>
              </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseIcon({ name }: { name: string }) {
  const common = {
    className: "h-6 w-6",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "code") {
    return (
      <svg {...common}>
        <path d="m9 18-6-6 6-6" />
        <path d="m15 6 6 6-6 6" />
      </svg>
    );
  }

  if (name === "book") {
    return (
      <svg {...common}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5v16" />
        <path d="M8 7h8" />
        <path d="M8 11h6" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...common}>
        <path d="M12 3 9.7 9.7 3 12l6.7 2.3L12 21l2.3-6.7L21 12l-6.7-2.3z" />
        <path d="M19 3v4" />
        <path d="M21 5h-4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
      <path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M4 12h16" />
    </svg>
  );
}

function WorkflowSection() {
  const { ref, isActive, activeStep } = useTimelineInView(steps.length);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative overflow-hidden bg-arca-section px-5 py-28 lg:px-8"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-arca-primary/20" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-arca-highlight/6 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="How it works" title="Get started in seconds" />
        <div
          className={`relative mx-auto mt-16 max-w-6xl md:px-8 ${
            isActive ? "timeline-active" : ""
          }`}
        >
          <div className="timeline-track left-8 top-0 h-full w-px rounded-full md:left-[10%] md:right-[10%] md:top-8 md:h-px md:w-auto">
            <div
              className="timeline-progress"
              style={
                {
                  "--timeline-progress": isActive ? "100%" : "0%",
                } as CSSProperties
              }
            />
          </div>
          <div className="grid gap-10 md:grid-cols-5 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step}
              className="relative grid grid-cols-[4rem_1fr] items-start gap-5 md:block md:text-center"
            >
              <div
                className={`timeline-node z-10 grid h-16 w-16 place-items-center rounded-full border border-arca-primary/45 bg-arca-bg text-lg font-bold text-arca-text md:mx-auto ${
                  activeStep >= index ? "timeline-node-active" : ""
                }`}
                style={
                  {
                    "--step-delay": `${260 + index * 520}ms`,
                  } as CSSProperties
                }
              >
                {index + 1}
              </div>
              <h3 className="pt-4 text-base font-semibold leading-7 text-arca-text md:mx-auto md:mt-5 md:max-w-[12rem] md:pt-0">
                {step}
              </h3>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function useTimelineInView(stepCount: number) {
  const ref = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsActive(true);
      setActiveStep(stepCount - 1);
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [stepCount]);

  useEffect(() => {
    if (!isActive || activeStep >= 0) {
      return;
    }

    const timers = Array.from({ length: stepCount }).map((_, index) =>
      window.setTimeout(() => setActiveStep(index), 240 + index * 560),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [activeStep, isActive, stepCount]);

  return { ref, isActive, activeStep };
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="px-5 py-28 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions before you install"
          text="Everything you need to know before making Arcalist your new tab workspace."
        />
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <CardContainer>
      <CardBody
        className={`faq-card rounded-3xl border bg-arca-panel/95 p-0 shadow-card backdrop-blur-xl transition duration-300 ${
          isOpen
            ? "border-arca-primary/55 shadow-glow"
            : "border-arca-primary/28 hover:border-arca-primary/45"
        }`}
      >
        <button
          type="button"
          className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-7"
          aria-expanded={isOpen}
          onClick={onToggle}
        >
          <CardItem className="text-lg font-bold text-arca-text" translateZ={20}>
            {faq.question}
          </CardItem>
          <CardItem translateZ={28}>
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-arca-primary/35 bg-arca-secondary/55 text-xl font-semibold text-arca-accent transition duration-300 ${
                isOpen ? "rotate-45 bg-arca-primary/35" : ""
              }`}
              aria-hidden="true"
            >
              +
            </span>
          </CardItem>
        </button>
        <div
          className={`faq-answer-grid px-6 sm:px-7 ${
            isOpen ? "faq-answer-open" : ""
          }`}
        >
          <div className="overflow-hidden">
            <CardItem translateZ={12}>
              <p className="border-t border-arca-primary/18 pb-6 pt-4 leading-7 text-arca-muted">
                {faq.answer}
              </p>
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

function FinalCtaSection() {
  return (
    <section className="px-5 pb-24 lg:px-8">
      <CardContainer className="mx-auto max-w-5xl">
        <CardBody className="overflow-hidden rounded-[2rem] border border-arca-primary/35 bg-arca-panel/80 px-6 py-16 text-center shadow-glow backdrop-blur-xl sm:px-10">
          <CardItem translateZ={28}>
            <h2 className="text-3xl font-bold tracking-normal text-arca-text sm:text-5xl">
              Ready to organize your bookmarks?
            </h2>
          </CardItem>
          <CardItem translateZ={18}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-arca-muted">
              Create a cleaner, faster, and more personal new tab experience with
              Arcalist.
            </p>
          </CardItem>
          <CardItem className="mt-8" translateZ={34}>
            <ChromeButton label="Add to Chrome" />
          </CardItem>
        </CardBody>
      </CardContainer>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-arca-primary/15 px-5 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-lg font-semibold text-arca-text">Arcalist</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-arca-muted">
            A modern bookmark manager for your browser's new tab.
          </p>
        </div>
        <FooterLinks
          title="Product"
          links={[
            { label: "Features", href: "/#features" },
            { label: "Free vs Pro", href: "/pricing" },
            { label: "FAQ", href: "/#faq" },
          ]}
        />
        <FooterLinks
          title="Legal"
          links={[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
          ]}
        />
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-sm text-arca-muted">
        © 2026 Arcalist. All rights reserved.
      </p>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-arca-anchor">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-arca-muted transition hover:text-arca-text"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
