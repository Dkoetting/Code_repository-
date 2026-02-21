# CLAUDE.md

This file provides guidance for AI assistants (Claude Code and similar tools) working in this repository.

---

## Repository Overview

**Name:** Code_repository-
**Owner:** Dkoetting (Dr. DirKInstitute)
**Purpose:** Dr. DirKInstitute code repository (currently in initial setup phase)

The repository was initialized with a single commit and contains only a README at this time. This CLAUDE.md file was added to establish conventions and workflows early so that future contributors — human and AI alike — have a clear baseline to work from.

---

## Repository Structure

```
Code_repository-/
├── README.md       # Project overview
└── CLAUDE.md       # This file — AI assistant guidance
```

As the project grows, update this section to reflect new directories and their purposes.

---

## Git Workflow

### Branch Naming Convention

AI-generated feature branches follow a structured naming scheme:

```
claude/<task-slug>-<session-id>
```

Example: `claude/claude-md-mlwt9q19uzfg3g3c-StnYS`

Human contributor branches should follow a consistent, descriptive convention:

```
<username>/<short-description>
# e.g. dkoetting/add-auth-module
```

### Standard Workflow

1. Always develop on a dedicated feature branch — never commit directly to `master`.
2. Commit messages should be clear and imperative-mood, describing *what* and *why*:
   ```
   Add authentication module with JWT support
   Fix null pointer in user lookup when email is missing
   ```
3. Push with upstream tracking set:
   ```bash
   git push -u origin <branch-name>
   ```
4. Open a pull request for review before merging to `master`.

### Commit Signing

Commits in this repository are GPG/SSH signed. The signing key is configured at the environment level — do not modify signing configuration.

---

## Development Conventions

These conventions apply as the codebase grows. Establish and document language/framework-specific tooling here when the first substantive code is added.

### General Principles

- **Minimal changes**: Make only the changes required by the task. Avoid unsolicited refactoring, reformatting, or style fixes.
- **No speculative features**: Do not add functionality for hypothetical future requirements. Build for the current need.
- **Delete dead code**: If code is removed, delete it entirely — do not comment it out or leave stubs.
- **Avoid backwards-compatibility hacks**: Rename things cleanly; do not add shims or re-exports for removed symbols.
- **Validate at system boundaries only**: Trust internal code and framework contracts. Validate user input and external API responses at the edge.

### Security

- Never commit secrets, credentials, API keys, or tokens. Use environment variables or a secrets manager.
- Avoid introducing OWASP Top 10 vulnerabilities (SQL injection, XSS, command injection, etc.).
- If you identify a security issue while working on an unrelated task, note it in a comment or open an issue — do not silently fix unrelated code paths.

### Files and Structure

- Prefer editing existing files over creating new ones.
- Do not create documentation files (README, CHANGELOG, etc.) unless explicitly requested.
- Keep directory structure flat until complexity justifies nesting.

---

## Working with AI Assistants

### What to Tell Claude

When opening a new session, provide:

1. A description of the current task or bug.
2. Relevant file paths if known.
3. Any constraints (e.g., language version, framework version, existing API contracts).

### What Claude Should Always Do

- Read files before modifying them.
- Use the repository's existing patterns and style — do not impose a different style.
- Track multi-step tasks with a todo list and mark items complete as they finish.
- Commit and push on the designated `claude/` branch for the session.

### What Claude Should Never Do

- Push directly to `master`.
- Guess at parameters or file paths — investigate first.
- Add emojis, excessive comments, or motivational prose to code or commit messages.
- Provide time estimates.

---

## Adding New Languages or Frameworks

When the first substantive code is committed, update this file with a new section covering:

- How to install dependencies
- How to run the project locally
- How to run tests
- How to run linters / formatters
- Any environment variables required (names only, not values)

Template:

```markdown
## Development Setup

### Prerequisites
- ...

### Install Dependencies
```bash
# command here
```

### Run Locally
```bash
# command here
```

### Run Tests
```bash
# command here
```

### Lint / Format
```bash
# command here
```

### Environment Variables
| Variable | Description |
|----------|-------------|
| `FOO`    | Used for X  |
```

---

## Updating This File

Keep CLAUDE.md current as the project evolves. Specifically, update it when:

- A new language, framework, or major dependency is introduced.
- The directory structure changes significantly.
- A new development workflow or CI/CD pipeline is established.
- A convention is agreed upon that is not obvious from the code itself.
