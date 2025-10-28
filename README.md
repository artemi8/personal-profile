# personal-profile

A futuristic single-page portfolio to showcase an AI engineer’s background, skills, and GitHub projects. The page is built with vanilla HTML, CSS, and JavaScript.

## Getting started

Open `index.html` directly in a browser or host it on any static site provider.

## Customising the profile

Update `script.js` with your own information:

- `profile` — name, headline, subtitle, GitHub handle, and core strengths.
- `skillGroups` — categories and bullet points for your technical stack.
- `timeline` — professional milestones.
- `featuredProjects` — fallback highlights if the GitHub API is unreachable.

The Projects section automatically fetches repositories from the configured GitHub username, highlighting the most starred entries.

## Features

- Glassmorphism-inspired design with light/dark theme toggle
- Animated scroll reveals and floating hero orbs
- GitHub integration with graceful fallbacks
- Sticky scroll-to-top control and responsive layout

Feel free to deploy the site as-is or adapt the styling in `styles.css` to match your personal brand.
