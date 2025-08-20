# QWEN.md - Project Context for `zeyn-landing`

This file provides context for Qwen Code about the `zeyn-landing` project located at `/Users/rafal/projects/editor/zeyn-landing`. This is an Astro-based static website project.

## Project Overview

*   **Name:** zeyn-landing
*   **Type:** Static Website / Landing Page
*   **Framework:** Astro v5.13.2
*   **Language:** JavaScript/TypeScript (ECMAScript Modules)
*   **Package Manager:** Bun
*   **Description:** This is a basic Astro project, likely serving as a landing page. It uses Astro's component-based architecture with `.astro` files for pages, layouts, and components. The initial structure includes a welcome page.

## Project Structure

The project follows the standard Astro directory layout:

*   `src/`: Contains the source code.
    *   `assets/`: Static assets like images (e.g., `astro.svg`, `background.svg`).
    *   `components/`: Reusable Astro components (e.g., `Welcome.astro`).
    *   `layouts/`: Layout components that wrap pages (e.g., `Layout.astro`).
    *   `pages/`: Page components that define routes (e.g., `index.astro` for the root route).
*   `public/`: Contains static files served directly (e.g., `favicon.svg`).
*   `package.json`: Defines project metadata, dependencies, and scripts.
*   `astro.config.mjs`: Astro configuration file.
*   `README.md`: Basic setup and command instructions.

## Building and Running

These are the standard commands for working with this Astro project, as defined in `package.json`:

*   **Install Dependencies:** `bun install`
*   **Development Server:** `bun dev` (Starts a local dev server, typically at `localhost:4321`)
*   **Build for Production:** `bun build` (Builds the static site into the `./dist/` directory)
*   **Preview Build:** `bun preview` (Previews the built site locally)
*   **Astro CLI:** `bun astro ...` (Runs Astro CLI commands like `astro add`, `astro check`)
*   **Help:** `bun astro -- --help`

## Development Conventions

*   **Framework:** Astro is used for static site generation. Components are written in `.astro` files, which can contain HTML, CSS (within `<style>` tags), and JavaScript/TypeScript (within frontmatter `---` blocks or client-side `<script>` tags).
*   **Routing:** File-based routing is used. Files in `src/pages/` correspond to website routes.
*   **Layouts:** Layouts in `src/layouts/` are used to provide a common structure for pages.
*   **Styling:** CSS is typically written within `<style>` tags inside `.astro` component files, often using Astro's scoped styling features or global styles as needed.
*   **Assets:** Static assets are placed in `src/assets/` for processing or `public/` for direct serving.