# slidev-theme-apple

Apple-inspired theme for [Slidev](https://sli.dev) -- dark gradient covers, vibrant solid-color section dividers, clean SF Pro typography, frosted glass elements for internal presentations and workshops.

## Install

```bash
npm install github:leonchike/slidev-theme-apple
```

## Usage

Set the theme in your `slides.md` frontmatter:

```yaml
---
theme: apple
---
```

## Slide types

The theme provides three slide types via CSS classes, plus special components for metrics and callouts.

### Cover slide

```markdown
<div class="cover-slide">
<div>

# Your Title

<div class="subtitle">Optional subtitle text</div>

</div>
<div class="brand">Team Name</div>
</div>
```

### Section slide (transition)

```markdown
<div class="section-slide blue">
<div class="chapter-pill">Chapter Label</div>

# Section Title

</div>
```

Color classes: `blue`, `purple`, `teal`, `dark`

### Body slide (content)

```markdown
<div class="body-header">
<div class="chapter-pill">Chapter Label</div>

# Page Title

</div>

<div class="two-col">
<div>

## Left Column

Content here.

</div>
<div>

## Right Column

Content here.

</div>
</div>
```

### Special components

**Highlight card** -- frosted glass callout:

```markdown
<div class="highlight-card">

Callout content goes here.

</div>
```

**Metric display** -- large stat with label:

```markdown
<div class="metric">99.97%<span class="label">Uptime (90 days)</span></div>
```

## Slide sequencing

Each topic follows the pattern: **Section Slide** (colored) then **Body Slide(s)** (white).

```
1. Cover Slide
2. Section Slide (blue)       → topic intro
3. Body Slide                  → topic content
4. Section Slide (purple)     → next topic
5. Body Slide                  → next topic content
...
```

## Development

```bash
npm install
npm run dev    # Preview example.md
```

## Design reference

See [DESIGN_SKILL.md](./DESIGN_SKILL.md) for detailed LLM-consumable instructions on applying this theme.
