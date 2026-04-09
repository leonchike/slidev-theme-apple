# Apple-Style Slidev Presentation Theme

You are creating slides using Slidev with a custom theme inspired by Apple's internal presentation design language. This theme features dark gradient cover slides, vibrant solid-color section dividers, clean white body pages with SF Pro typography, frosted glass highlight cards, monochrome code blocks, and a geometric tech-forward aesthetic. Follow these rules exactly when building or modifying slides.

## Setup

The presentation uses `theme: none` in frontmatter. All visual styling comes from `style.css`. Do not use any other Slidev theme.

```yaml
---
theme: none
title: Your Title Here
highlighter: shiki
drawings:
  persist: false
transition: fade
---
```

When this theme is installed as an npm package (`slidev-theme-apple`), use `theme: apple` instead of `theme: none`, and the `style.css` is loaded automatically.

## Slide Types

There are exactly three slide types. Each uses specific CSS classes applied via `<div>` wrappers inside the markdown. Do not use Slidev's built-in `layout:` frontmatter -- it will conflict with these custom classes.

---

### 1. Cover Slide

Full-bleed dark gradient background (near-black `#2d2d2d` to pure black `#000000`) filling the entire viewport. Large white semibold title in the upper portion. Optional subtitle in medium gray below the title. Brand name anchored to bottom-left in dark gray. Used only as the first slide in a deck.

```markdown
<div class="cover-slide">
<div>

# Your Presentation Title

<div class="subtitle">Optional subtitle or tagline goes here</div>

</div>
<div class="brand">Your Team Name</div>
</div>
```

**Rules:**
- Title should be short -- 3 to 8 words maximum
- The subtitle is optional; use it for a one-line description or tagline
- Do not add bullet points, lists, or code blocks to the cover slide
- The brand text is a short team or org identifier (e.g. "Platform Engineering")
- The cover div uses `position: absolute; inset: 0` to fill the slide -- do not override this

---

### 2. Section Slide (Transition)

Full-bleed solid vibrant-color background filling the entire viewport. A bordered pill label ("chapter pill") with a white border identifies the section. A large white semibold title is anchored to the bottom-left. Use these to introduce each major section of the deck.

```markdown
<div class="section-slide blue">
<div class="chapter-pill">Chapter Label</div>

# Section Title

</div>
```

**Available color classes:** `blue` (`#0071e3`), `purple` (`#bf5af2`), `teal` (`#30b0c7`), `dark` (`#1d1d1f`)

**Rules:**
- Always include a `chapter-pill` div with a short label (1-2 words)
- Title should be short and descriptive (2-6 words)
- Do not add body text, lists, or code blocks to section slides
- Vary the color class across sections for visual rhythm -- do not repeat the same color consecutively
- Content is anchored to bottom-left by design; do not change the positioning
- The section div uses `position: absolute; inset: 0` to fill the slide -- do not override this

---

### 3. Body Slide (Content)

Near-white (`#fbfbfd`) background with generous padding. Starts with a chapter header (pill in system blue + large semibold h1), followed by a two-column grid for content. This is where all substantive content lives.

```markdown
<div class="body-header">
<div class="chapter-pill">Chapter Label</div>

# Page Title

</div>

<div class="two-col">
<div>

## Left Column Heading

Body text goes here.

- Bullet point one
- Bullet point two

</div>
<div>

## Right Column Heading

More content here. Tables, code blocks, lists.

</div>
</div>
```

**Rules:**
- Always start with a `body-header` div containing the same chapter pill text as the preceding section slide
- The h1 in body-header should match or closely echo the section slide title
- Always use the `two-col` wrapper for body content -- do not use single-column layouts
- Each column should have its own h2 subheading
- Keep text concise -- this is a presentation, not a document

---

## Special Components

### Highlight Card

A frosted-glass style card for callout content on body slides. Light gray background with subtle border and rounded corners.

```markdown
<div class="highlight-card">

Content goes here -- text, metrics, or short lists.

</div>
```

Use inside `two-col` columns to visually separate key information from surrounding text. Multiple cards can be stacked with a small margin between them.

### Metric Display

Large number display for key statistics. System blue color, large semibold font with a small gray label below.

```markdown
<div class="metric">99.97%<span class="label">Platform uptime (trailing 90 days)</span></div>
```

Best used inside a `highlight-card` for visual separation. Can stack multiple metrics vertically in a column.

---

## Slide Sequencing Pattern

Every major topic follows this two-slide pattern:

```
Section Slide (colored, full-bleed) → Body Slide(s) (white, content)
```

A typical deck:

```
1. Cover Slide                        (dark gradient)
2. Section Slide                      (blue)         → introduces first topic
3. Body Slide                         (white)        → first topic content
4. Section Slide                      (purple)       → introduces second topic
5. Body Slide                         (white)        → second topic content
6. Section Slide                      (teal)         → introduces third topic
7. Body Slide                         (white)        → third topic content
8. Section Slide                      (dark)         → introduces fourth topic
9. Body Slide                         (white)        → fourth topic content
```

You can have multiple body slides for a single section if the content requires it. Keep the same chapter pill label across all body slides in a section.

---

## Typography Rules

| Element | Font | Weight | Size | Usage |
|---|---|---|---|---|
| **h1** | SF Pro Display (sans-serif) | 600 (semibold) | 2.4-3.2rem | Cover title, section title, body-header title only |
| **h2** | SF Pro Display (sans-serif) | 600 (semibold) | 1.15rem | Column subheadings inside `two-col` |
| **h3** | SF Pro Display (sans-serif) | 600 (semibold) | 0.95rem | Sub-sections within a column (use sparingly) |
| **Body** | SF Pro Text (sans-serif) | 400 (regular) | 0.88rem | Paragraphs, list items |
| **Bold** | SF Pro Text (sans-serif) | 600 (semibold) | inherit | Key terms, component names |
| **Inline code** | SF Mono | 500 | 0.82em | Tool names, API paths, config values |

**Font fallback chain:** SF Pro Display/Text → -apple-system → BlinkMacSystemFont → Helvetica Neue → Inter → sans-serif

**Critical rules:**
- Never use h1 inside the `two-col` body area -- only in cover-slide, section-slide, and body-header
- Keep body text to 1-3 short paragraphs per column
- Use `**bold**` for emphasis, especially for introducing named components or tools
- Headings use tight letter-spacing (-0.02em to -0.03em); body text uses normal spacing

---

## Code Blocks

Code blocks render with a light gray background (`#f5f5f7`) and dark text (`#1d1d1f`). All Shiki syntax highlighting colors are overridden to this single dark color for a clean, uniform look. Corners are rounded at 12px (Apple's signature radius).

**Best practices:**
- Keep blocks to 15 lines or fewer
- Use for architecture diagrams (ASCII art), API schemas, SSE event formats, or short code snippets
- Do not use for long source code listings -- summarize instead
- Do not attempt to use syntax highlighting colors -- the theme forces all tokens to dark charcoal

```
POST /api/v2/deployments
{
  "service": "checkout-api",
  "version": "2.14.0",
  "strategy": "canary"
}
```

---

## Tables

Tables are minimal: transparent background, semibold bottom border on header, thin `#d2d2d7` separators between rows, no alternating row colors.

```markdown
| Column A | Column B |
|---|---|
| **Row label** | Description text |
| **Row label** | Description text |
```

Keep tables to 8 rows or fewer. If you need more, split across slides.

---

## Lists

Unordered lists use standard filled disc bullets in dark gray. Do not use custom bullet characters or emoji.

```markdown
- **Bold lead** -- followed by description text
- Another item
- A third item
```

---

## Color Palette Reference

| Token | Hex | Usage |
|---|---|---|
| `--ap-black` | `#1d1d1f` | Primary text, dark section background |
| `--ap-white` | `#fbfbfd` | Body slide background |
| `--ap-pure-white` | `#ffffff` | Text on dark/colored backgrounds |
| `--ap-gray-light` | `#f5f5f7` | Code blocks, highlight card background |
| `--ap-gray-medium` | `#86868b` | Secondary text, cover subtitle, metric labels |
| `--ap-gray-dark` | `#6e6e73` | Tertiary text, cover brand text, list markers |
| `--ap-border` | `#d2d2d7` | Table row borders |
| `--ap-border-light` | `#e8e8ed` | Highlight card border |
| `--ap-blue` | `#0071e3` | System blue -- section bg, body pill, metrics, links, progress bar |
| `--ap-purple` | `#bf5af2` | Section accent |
| `--ap-teal` | `#30b0c7` | Section accent |
| `--ap-orange` | `#ff9f0a` | Available for extensions |
| `--ap-gradient-start` | `#2d2d2d` | Cover slide gradient start |
| `--ap-gradient-end` | `#000000` | Cover slide gradient end |
| `--ap-code-bg` | `#f5f5f7` | Code block and inline code background |
| `--ap-code-text` | `#1d1d1f` | Code block text |

---

## CSS Architecture Notes

These details are important if you need to debug layout issues:

- **Full-bleed slides**: Cover and section slides use `position: absolute; inset: 0` to fill the entire slide viewport. The parent `.slidev-layout` has its padding zeroed via `.slidev-layout:has(.cover-slide)` and `.slidev-layout:has(.section-slide)`.
- **Shiki override**: Syntax highlighting token colors are force-overridden to `--ap-code-text` using `.slidev-layout pre .shiki span { color: var(--ap-code-text) !important; }`.
- **Font loading**: Google Fonts are imported in `theme.css` for Inter (fallback) and JetBrains Mono. SF Pro fonts are system fonts available on macOS by default.
- **CSS variable prefix**: All custom variables use the `--ap-` namespace (Apple) to avoid conflicts.
- **Highlight cards**: Use `backdrop-filter: blur(20px)` for frosted glass effect where supported, with a solid `#f5f5f7` fallback.
- **Metric display**: Large semibold numbers in system blue with a small gray label via `.metric .label`.

---

## Things to Avoid

- **Do not** use Slidev's built-in layout frontmatter (`layout: cover`, `layout: section`, `layout: two-cols`, etc.). Use the custom div classes described above.
- **Do not** use dark backgrounds on code blocks. The theme uses light gray.
- **Do not** add emojis, icons, or decorative SVG elements.
- **Do not** use single-column body layouts. Always use the `two-col` grid.
- **Do not** put more than ~120 words per column. Add another body slide if needed.
- **Do not** use h1 anywhere except inside `cover-slide`, `section-slide`, and `body-header` divs.
- **Do not** apply custom font colors or inline color styles. Let the theme handle all colors.
- **Do not** manually number slides. Slidev handles page numbers automatically.
- **Do not** use `---` as a visual horizontal rule inside a slide. In Slidev, `---` on its own line is a slide separator.
- **Do not** override `position`, `inset`, or `padding` on `.cover-slide` or `.section-slide` divs.
- **Do not** use warm/serif fonts. This theme is geometric sans-serif throughout.

---

## File Structure

When used directly (not as an npm theme):

```
presentation/
├── slides.md          # All slide content
├── style.css          # Theme styles (do not modify)
├── package.json       # Slidev CLI + theme dependencies
└── DESIGN_SKILL.md    # This file
```

**Commands:**
- `npm run dev` -- Start dev server with hot reload
- `npm run build` -- Build static SPA to `dist/`
- `npm run export` -- Export slides to PDF
