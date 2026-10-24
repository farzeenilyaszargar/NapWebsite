type DocPage = {
  id: string;
  title: string;
  summary: string;
  topics: { title: string; body: string; items?: string[]; code?: string[] }[];
};

export const docPages: DocPage[] = [
  {
    id: "overview",
    title: "Overview",
    summary:
      "Nap is a Rust and GPUI desktop workspace for local coding agents. It brings sessions, transcripts, tool activity, worktrees, and checkpoints into one native interface.",
    topics: [
      {
        title: "What Nap does",
        body:
          "Nap gives every supported agent a shared place to run, review work, follow tool activity, and keep the project thread intact. It is meant to replace scattered terminal tabs with one native workspace where the conversation and the code changes stay connected.",
        items: ["Run agent CLIs", "Track transcripts", "Review tool activity", "Keep project context together"],
      },
      {
        title: "What it is built for",
        body:
          "The product is optimized for native performance, provider-neutral workflows, checkpointed project work, and keyboard-first operation. The goal is a focused control layer for people who already work with several agent tools and need a calmer way to manage them.",
        items: ["Native Rust + GPUI surface", "Provider-neutral sessions", "Checkpoint-aware project work"],
      },
      {
        title: "Current version",
        body:
          "The current app reference version is 0.0.4. Public-facing copy should treat this as an early release and avoid promising release infrastructure that is not configured yet.",
      },
      {
        title: "Mental model",
        body:
          "Think of Nap as the desk around your agents. The agents still do their own work through their first-party CLIs, while Nap organizes the sessions, output, state, and handoffs into one interface.",
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    summary:
      "Nap is currently documented around local development and macOS app builds. Public release distribution should only be described when a real release artifact exists.",
    topics: [
      {
        title: "Install dependencies",
        body:
          "Install JavaScript tooling first, then generate protocol bindings before starting the app when interfaces have changed.",
        code: ["bun install", "bun run protocol:generate"],
      },
      {
        title: "Run locally",
        body:
          "Use the development script to launch the local app workflow. During development the macOS bundle is created under target/debug/Nap.app.",
        code: ["bun run dev"],
      },
      {
        title: "Verify the workspace",
        body:
          "Run the Rust test suite before cutting builds or changing provider behavior.",
        code: ["cargo test --workspace"],
      },
      {
        title: "Before a release",
        body:
          "Confirm protocol generation, workspace tests, and the local development launch path before preparing release artifacts. The docs should not imply a public stable installer unless the artifact exists.",
        items: ["Generated protocol code is current", "Rust tests pass", "Development app launches", "Release artifact is available"],
      },
    ],
  },
  {
    id: "local-architecture",
    title: "Local architecture",
    summary:
      "Nap is local by design. Projects, sessions, transcripts, and provider state live on the user's machine rather than in a hosted account.",
    topics: [
      {
        title: "Where data lives",
        body:
          "Product data is stored under ~/.nap. macOS app data lives in Application Support/Nap. This keeps sessions and provider state close to the machine where the project is being edited.",
        items: ["~/.nap", "Application Support/Nap"],
      },
      {
        title: "No hosted sync",
        body:
          "The reference docs do not describe hosted cloud sync, telemetry, an analytics pipeline, or a public automatic update endpoint.",
        items: ["No hosted account sync", "No telemetry service", "No analytics pipeline", "No public updater endpoint"],
      },
      {
        title: "Why it matters",
        body:
          "Local architecture keeps project context, provider IDs, transcripts, and working state close to the machine doing the work.",
      },
      {
        title: "Operational boundaries",
        body:
          "When describing Nap, be precise: local-first does not mean every provider is offline. Agent CLIs may still call their own upstream services depending on the provider and user configuration.",
      },
    ],
  },
  {
    id: "sessions",
    title: "Sessions",
    summary:
      "Sessions are the running workspace for each provider. They keep prompts, responses, normalized events, tool calls, and file activity together.",
    topics: [
      {
        title: "One timeline",
        body:
          "Provider events are normalized so commands, file changes, searches, plans, reasoning, and text can live in a shared transcript model. This gives different CLIs a consistent shape without hiding their original behavior.",
        items: ["Commands", "File changes", "Searches", "Plans", "Tool calls", "Reasoning", "Text"],
      },
      {
        title: "Long-lived drivers",
        body:
          "Nap talks to coding-agent CLIs through long-lived driver sessions rather than treating each prompt as a disconnected command.",
      },
      {
        title: "Project context",
        body:
          "Sessions are meant to preserve the useful working context around a project instead of scattering it across terminals.",
      },
      {
        title: "What to inspect",
        body:
          "A good session view should make it obvious what the agent did, which files changed, what tools ran, and where the user can safely continue or switch providers.",
      },
    ],
  },
  {
    id: "checkpoints",
    title: "Checkpoints",
    summary:
      "Checkpoints help connect working tree changes to the conversation that produced them, making it easier to rewind or inspect agent work.",
    topics: [
      {
        title: "Working tree state",
        body:
          "Nap tracks project work around the same session view that contains the transcript and provider activity. The user should be able to understand code movement and conversation context together.",
      },
      {
        title: "Rollback context",
        body:
          "The product direction is to rewind the work and the conversation together, rather than only preserving chat text.",
      },
      {
        title: "Agent accountability",
        body:
          "Tool activity and file changes stay visible beside the agent's reasoning and output.",
      },
      {
        title: "Review workflow",
        body:
          "Before accepting agent work, review the transcript, tool activity, and changed files as one story. Checkpoints should make that review less fragile.",
      },
    ],
  },
  {
    id: "development-setup",
    title: "Development setup",
    summary:
      "The app is developed from the local workspace using Bun for web and tooling tasks, and Cargo for the Rust workspace.",
    topics: [
      {
        title: "Install and generate",
        body:
          "Set up packages and generated protocol code before running the development bundle. Regenerate protocol bindings whenever shared interfaces or provider event contracts change.",
        code: ["bun install", "bun run protocol:generate"],
      },
      {
        title: "Run tests",
        body:
          "Use the workspace test command for Rust verification. This is the baseline check before changing provider drivers, session state, checkpoint behavior, or release scripts.",
        code: ["cargo test --workspace"],
      },
      {
        title: "Start development",
        body: "The macOS development bundle is target/debug/Nap.app.",
        code: ["bun run dev"],
      },
      {
        title: "Developer rhythm",
        body:
          "For provider-facing work, make small changes, regenerate where needed, run the workspace tests, then launch the app and inspect the transcript behavior manually.",
      },
    ],
  },
  {
    id: "macos-build",
    title: "macOS build",
    summary:
      "macOS is the primary packaged platform. A local release bundle can be created with the release script and packaged into target/release/Nap.app.",
    topics: [
      {
        title: "Create a release bundle",
        body:
          "Run the release script from the app workspace. The output path described by the reference docs is target/release/Nap.app.",
        code: ["bun run release"],
      },
      {
        title: "Bundle identifiers",
        body:
          "The development bundle identifier is app.nap.dev. The release bundle identifier is app.nap.",
        items: ["Development: app.nap.dev", "Release: app.nap"],
      },
      {
        title: "Signing status",
        body:
          "Without Apple signing credentials, release bundles are ad-hoc signed. Notarized public distribution is not set up yet.",
      },
      {
        title: "Distribution wording",
        body:
          "Use careful language for macOS builds. If the build is ad-hoc signed, do not describe it as notarized or App Store ready.",
      },
    ],
  },
  {
    id: "github-actions",
    title: "GitHub actions",
    summary:
      "The repository includes macOS-only workflows for binaries and tests. The binary workflow is manually triggered and produces downloadable artifacts.",
    topics: [
      {
        title: "Run the binary workflow",
        body: "Trigger the macOS binary workflow manually when a build artifact is needed.",
        code: [
          'gh workflow run "macOS Binaries" --repo farzeenilyaszargar/NotNap --ref main',
          "gh run watch --repo farzeenilyaszargar/NotNap",
        ],
      },
      {
        title: "Artifacts",
        body:
          "Expected artifacts include nap-macos, Nap-macos.app.zip, and nap-macos-binaries.tar.gz. These should be checked before linking a website download to a release.",
        items: ["nap-macos", "Nap-macos.app.zip", "nap-macos-binaries.tar.gz"],
      },
      {
        title: "Workflow files",
        body: "The relevant references are .github/workflows/macos-binaries.yml and .github/workflows/test.yml.",
      },
      {
        title: "When to use Actions",
        body:
          "Use the GitHub workflow for repeatable macOS artifacts. Use local release builds when testing packaging changes before publishing.",
      },
    ],
  },
  {
    id: "providers",
    title: "Providers",
    summary:
      "Nap talks to coding-agent CLIs through provider drivers and presents their activity through shared transcript types.",
    topics: [
      {
        title: "Supported agents",
        body:
          "Reference providers include Codex CLI, Claude Code, Cursor CLI, OpenCode, Amp, Pi and Oh My Pi, Grok Build, Kimi Code, and DeepSeek Harness.",
        items: ["Codex CLI", "Claude Code", "Cursor CLI", "OpenCode", "Amp", "Grok Build", "Kimi Code", "DeepSeek Harness"],
      },
      {
        title: "Driver reference",
        body:
          "Provider implementation details live in docs/providers.md and crates/nap-core/src/driver/mod.rs.",
      },
      {
        title: "Shared events",
        body:
          "Provider output is normalized into events for commands, file changes, searches, plans, tool calls, reasoning, and text.",
      },
      {
        title: "Bring your own keys",
        body:
          "Nap should be described as running first-party CLIs under the hood. Users keep using each provider's own authentication flow, subscriptions, and local CLI setup.",
      },
    ],
  },
  {
    id: "platforms",
    title: "Platforms",
    summary:
      "macOS is the primary platform today. Linux and Windows packaging notes exist, but official public Linux binaries and Windows installers are not published yet.",
    topics: [
      {
        title: "macOS",
        body:
          "macOS is the primary packaged platform and the only platform described as release-ready in the reference material. The website can point macOS users to the latest release artifact when available.",
      },
      {
        title: "Linux",
        body:
          "Linux users build locally from the Rust workspace. A desktop file exists at resources/linux/app.nap.desktop, but no official public Linux binaries are documented yet.",
      },
      {
        title: "Windows",
        body:
          "Windows installer packaging can use resources/windows/nap.iss, but published installers are not documented yet. Windows users should be routed to the waitlist until a release exists.",
      },
      {
        title: "Public promises",
        body:
          "Keep platform language aligned with real artifacts. A waitlist is better than a broken installer link.",
      },
    ],
  },
  {
    id: "copy-guidance",
    title: "Copy guidance",
    summary:
      "Website copy should present Nap as native, local, provider-neutral, and careful about release status.",
    topics: [
      {
        title: "Use these claims",
        body:
          "Use native, local, provider-neutral, transcript-aware, checkpointed, and keyboard-first language.",
        items: ["Native", "Local", "Provider-neutral", "Transcript-aware", "Checkpointed", "Keyboard-first"],
      },
      {
        title: "Avoid these claims",
        body:
          "Do not claim hosted cloud sync, telemetry, automatic updates, notarized releases, or official Linux and Windows binaries until those are configured.",
        items: ["Hosted sync", "Telemetry", "Automatic updates", "Notarized releases", "Official Linux/Windows installers"],
      },
      {
        title: "Download copy",
        body: "Downloads should only be advertised when a build artifact or release exists.",
      },
      {
        title: "Tone",
        body:
          "The best copy for Nap is confident but restrained: explain the interface clearly, preserve the local-first promise, and avoid pretending the release pipeline is further along than it is.",
      },
    ],
  },
];

