const CHROME_STORE_URL = "https://chrome.google.com/webstore";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Free vs Pro", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const features = [
  {
    title: "Visual Boards",
    text: "Organize bookmarks into clean drag-and-drop boards.",
  },
  {
    title: "Multiple Pages",
    text: "Separate work, learning, entertainment, finance, and personal links.",
  },
  {
    title: "Quick Save",
    text: "Save useful links instantly while browsing.",
  },
  {
    title: "Local First",
    text: "Use Arcalist without forcing cloud sync from day one.",
  },
  {
    title: "Import / Export",
    text: "Bring your bookmarks in and back them up whenever needed.",
  },
  {
    title: "Privacy Blur",
    text: "Blur your bookmarks with one click when sharing your screen.",
  },
  {
    title: "Custom Wallpapers",
    text: "Personalize your workspace with beautiful backgrounds.",
  },
  {
    title: "Cloud Sync",
    text: "Keep your bookmarks available across browsers and devices with Pro.",
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
  },
  {
    title: "Students",
    text: "Save learning resources, courses, notes, and research links.",
  },
  {
    title: "Creators",
    text: "Organize inspiration, assets, references, and publishing tools.",
  },
  {
    title: "Professionals",
    text: "Separate client links, dashboards, and daily workspaces.",
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
      "Yes. Arcalist has a free plan with unlimited bookmarks, 3 pages, 10 boards per page, local storage, import/export, drag and drop, and privacy blur.",
  },
  {
    question: "What do I get with Pro?",
    answer:
      "Pro unlocks unlimited pages, unlimited boards, cloud sync, cross-browser sync, smart collections, productivity analytics, premium themes, custom wallpaper upload, and workspace sharing.",
  },
  {
    question: "Can I use Arcalist without cloud sync?",
    answer:
      "Yes. Arcalist is local-first, so you can organize bookmarks without signing in or syncing.",
  },
  {
    question: "Can I import my existing bookmarks?",
    answer:
      "Yes. Arcalist supports importing bookmarks so you can move your existing workflow into a cleaner workspace.",
  },
  {
    question: "Does Arcalist replace my new tab?",
    answer:
      "Yes. Arcalist turns your browser's new tab into a visual bookmark dashboard.",
  },
  {
    question: "Can I share a workspace or page?",
    answer:
      "Sharing is planned as a Pro feature, allowing you to share pages or workspaces through links.",
  },
];

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-arca-bg text-arca-text">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <UseCasesSection />
        <WorkflowSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-arca-bg/75 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Arcalist home">
          <LogoMark />
          <span className="text-lg font-semibold tracking-wide">Arcalist</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
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
    <span className="relative grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10 shadow-cyan">
      <span className="absolute inset-1 rounded-xl bg-gradient-to-br from-arca-primary via-arca-highlight to-arca-secondary opacity-90" />
      <span className="relative text-base font-black text-white">A</span>
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
      className={`items-center justify-center rounded-full bg-gradient-to-r from-arca-primary to-arca-secondary px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-cyan focus:outline-none focus:ring-2 focus:ring-arca-secondary focus:ring-offset-2 focus:ring-offset-arca-bg ${className}`}
    >
      {label}
    </a>
  );
}

function HeroSection() {
  return (
    <section id="top" className="relative isolate px-5 pt-32 lg:px-8">
      <div className="absolute inset-0 -z-20 subtle-grid" />
      <div className="absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-arca-primary/30 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute right-0 top-80 -z-10 h-64 w-64 rounded-full bg-arca-secondary/20 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mx-auto mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-arca-highlight backdrop-blur">
            Beautiful bookmark organization for your new tab
          </p>
          <h1 className="text-balance text-5xl font-bold leading-tight tracking-normal text-white sm:text-6xl lg:text-7xl">
            Turn your new tab into a focused bookmark workspace
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-arca-muted">
            Arcalist helps you organize bookmarks into pages and boards, personalize
            your new tab, and keep your browsing workflow clean.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ChromeButton label="Add to Chrome" />
            <a
              href="#features"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-arca-secondary/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-arca-highlight focus:ring-offset-2 focus:ring-offset-arca-bg"
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

function ProductMockup() {
  const boards = [
    {
      title: "Build",
      items: ["React Docs", "Linear Board", "Vercel Deploy"],
    },
    {
      title: "Research",
      items: ["Figma Kit", "Stripe Console", "Product Notes"],
    },
    {
      title: "Review",
      items: ["Launch Notes", "Read Later"],
    },
  ];

  const actions = [
    { label: "Add bookmark", icon: "+" },
    { label: "Blur bookmarks", icon: "B" },
    { label: "Search workspace", icon: "S" },
    { label: "More actions", icon: "..." },
  ];

  return (
    <div className="mx-auto mt-16 max-w-6xl rounded-[2rem] border border-white/15 bg-white/[0.06] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#090d19]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-5 py-4">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <div className="ml-4 hidden flex-1 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-400 sm:block">
            chrome://newtab - Arcalist Workspace
          </div>
        </div>
        <div className="grid gap-5 p-5 lg:grid-cols-[190px_1fr_76px] lg:p-7">
          <aside className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Pages
            </p>
            {["Work", "Learning", "Finance", "Personal"].map((page, index) => (
              <div
                key={page}
                className={`mt-3 rounded-2xl px-4 py-3 text-sm ${
                  index === 0
                    ? "bg-gradient-to-r from-arca-primary/80 to-arca-secondary/70 text-white"
                    : "bg-white/[0.04] text-slate-300"
                }`}
              >
                {page}
              </div>
            ))}
          </aside>
          <section className="min-h-[420px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.025] p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-arca-secondary">Today workspace</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
                  Focus Board
                </h2>
              </div>
              <div className="flex gap-2">
                {["Docs", "Tools", "Inspiration"].map((tab) => (
                  <span
                    key={tab}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-300"
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {boards.map((board, boardIndex) => (
                <div
                  key={board.title}
                  className="rounded-3xl border border-white/10 bg-[#0d1424]/85 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{board.title}</h3>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-400">
                      {board.items.length}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {board.items.map((bookmark, itemIndex) => (
                        <div
                          key={bookmark}
                          className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 transition hover:border-arca-secondary/40"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`h-9 w-9 rounded-xl ${
                                itemIndex % 2 === 0
                                  ? "bg-arca-primary/40"
                                  : "bg-arca-secondary/30"
                              }`}
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-white">
                                {bookmark}
                              </p>
                              <p className="truncate text-xs text-slate-500">
                                saved workspace link
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <aside className="grid grid-cols-4 gap-3 lg:grid-cols-1">
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                className="grid h-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-sm font-semibold text-slate-300 transition hover:border-arca-highlight/50 hover:text-white"
                aria-label={action.label}
              >
                {action.icon}
              </button>
            ))}
          </aside>
        </div>
      </div>
    </div>
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
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-arca-secondary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-normal text-white sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg leading-8 text-arca-muted">{text}</p>}
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Everything you need to organize your web" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article key={feature.title} className="group glass-card p-6">
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10 text-sm font-bold text-arca-highlight transition group-hover:border-arca-secondary/50 group-hover:text-arca-secondary">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 leading-7 text-arca-muted">{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="relative bg-arca-section px-5 py-24 lg:px-8">
      <div className="absolute inset-0 subtle-grid opacity-50" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Free vs Pro"
          title="Start locally. Upgrade when you need more."
          text="Arcalist stays useful from day one, with Pro designed for people who want unlimited workspaces and sync."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
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
    <article
      className={`glass-card p-7 ${
        featured ? "border-arca-highlight/50 shadow-glow" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-arca-muted">{subtitle}</p>
        </div>
        {featured && (
          <span className="rounded-full border border-arca-secondary/40 bg-arca-secondary/10 px-3 py-1 text-xs font-semibold text-arca-secondary">
            Upgrade
          </span>
        )}
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm text-slate-300">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-arca-primary/25 text-xs text-arca-highlight">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ChromeButton label={cta} className="mt-8 w-full" />
    </article>
  );
}

function UseCasesSection() {
  return (
    <section className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Built for everyday browsing workflows" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase) => (
            <article key={useCase.title} className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
              <p className="mt-3 leading-7 text-arca-muted">{useCase.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="how-it-works" className="bg-arca-section px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="How it works" title="Get started in seconds" />
        <div className="relative mt-14 grid gap-4 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-arca-secondary/50 to-transparent md:block" />
          {steps.map((step, index) => (
            <article key={step} className="relative glass-card p-5 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-arca-secondary/40 bg-arca-bg text-lg font-bold text-white shadow-cyan">
                {index + 1}
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">{step}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Questions before you install" />
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group glass-card p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-white">
                {faq.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-arca-secondary transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-arca-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="px-5 pb-24 lg:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-arca-primary/25 via-white/[0.07] to-arca-secondary/20 px-6 py-16 text-center shadow-glow backdrop-blur-xl sm:px-10">
        <h2 className="text-3xl font-bold tracking-normal text-white sm:text-5xl">
          Ready to organize your bookmarks?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
          Create a cleaner, faster, and more personal new tab experience with
          Arcalist.
        </p>
        <div className="mt-8">
          <ChromeButton label="Add to Chrome" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-lg font-semibold">Arcalist</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-arca-muted">
            A modern bookmark manager for your browser's new tab.
          </p>
        </div>
        <FooterLinks
          title="Product"
          links={[
            { label: "Features", href: "#features" },
            { label: "Free vs Pro", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
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
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-arca-muted transition hover:text-white"
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
