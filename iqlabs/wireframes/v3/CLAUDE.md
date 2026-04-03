# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a wireframe system for iQ Labs (laboratory equipment company). The wireframes are built in HTML/CSS and exported to Figma via the Figma MCP. The code serves as a generation tool—keep it simple and DRY since only the Figma output matters.

## Key Commands

**Preview pages:** Open any HTML file directly in browser (no build step)

**Send to Figma:** Pages include the Figma capture script automatically:
```html
<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
```

Use `generate_figma_design` MCP tool to capture pages into Figma.

## Architecture

### File Structure
- `pages/` - 28 HTML page templates (homepage, PDP, cart, account, blog, etc.)
- `components/` - Shared header.html and footer.html (loaded via JS fetch)
- `wireframe.css` - Single monolithic stylesheet (~7,400 lines)
- `js/shared.js` - Component loader and mobile nav/search toggles
- `assets/` - Images and SVG icons

### Page Template Structure
Every page has three nested layers:

```html
<div class="portal-wrapper">           <!-- Presentation wrapper for client review -->
  <header class="portal-header">       <!-- Page navigator dropdown -->
  <div class="portal-frame">
    <div class="wf-page-container">    <!-- Actual wireframe content -->
```

The portal wrapper provides navigation between all pages and a "Back to Hub" link.

### CSS Architecture
- **Prefix:** All wireframe classes use `wf-` prefix
- **Naming:** BEM convention (`.wf-component__element--modifier`)
- **Variables:** Design tokens in `:root` for colors, spacing, typography, radius, shadows
- **Grids:** `.wf-grid--2col`, `.wf-grid--3col`, `.wf-grid--4col`
- **Sections:** `.wf-section`, `.wf-section--accent`, `.wf-section--dark`
- **Breakpoints:** 600px, 768px, 1024px (mobile-first)

### Component Loading
Header and footer can be loaded dynamically via `js/shared.js`:
```javascript
loadComponent('wf-header-placeholder', '../components/header.html');
```

However, most pages include header/footer HTML directly for Figma capture compatibility.

## Design Tokens (CSS Variables)

**Colors:** `--white`, `--gray-100` through `--gray-800`, `--black`
**Portal:** `--portal-mint: #edfff7`, `--portal-teal: #32716a`
**Spacing:** `--space-xs` (4px) through `--space-3xl` (64px)
**Typography:** `--text-xs` (12px) through `--text-4xl` (36px)
**Radius:** `--radius-sm` (2px), `--radius-md` (4px), `--radius-lg` (8px)

## Figma MCP Integration

The project uses Figma MCP for HTML-to-design capture. When sending pages to Figma:

1. Open the page in browser
2. Use `generate_figma_design` tool with the page URL
3. Portal wrapper styling transfers to Figma as presentation context

The `use_figma` tool can modify designs directly in Figma after capture.

## Conventions

- Header and footer are repeated in each page (not dynamically loaded) for reliable Figma capture
- Portal nav dropdown lists all 28 pages for easy navigation during review
- SVG icons are embedded inline, not as external files
- No build process—edit files directly
