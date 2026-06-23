# Daniel Salamone — Personal Portfolio Website

A minimal, modern, and fully responsive personal portfolio website designed to showcase my digital webapps, software and games.

This project is built and optimized exclusively for production hosting and live usage via GitHub Pages.

---

## 🌐 Live Website

The production build of the portfolio is publicly available and accessible at:
https://danysalamone.github.io

---

## Key Features

- **Minimalist Design**: Engineered with flexible layouts, precise typography (Space Grotesk and JetBrains Mono), and polished UI components.
- **Theme Toggle (Dark/Light Mode)**: Seamlessly transitions between light and dark visual themes using CSS Custom Properties synced with client-side storage.
- **Lightweight Multi-page Structure**: Split into optimized semantic pages (Home, About, Portfolio) to ensure rapid loading times and clean navigation.
- **Privacy-First Analytics**: Integrated with Plausible Analytics for lightweight, cookie-free, and anonymous metrics tracking.
- **SEO & Social Sharing Optimization**: Embedded with structured Open Graph metadata and high-definition asset icons (apple-touch-icon, favicon-96x96) to generate uniform card previews across messaging apps (WhatsApp, Telegram) and social networks.

---

## CV Protection & Privacy Guard (Modal CV)

To safeguard sensitive information, prevent unauthorized automated collection, and govern how personal details are handled, the website implements a custom JavaScript interception layer. 

Clicking the `CV Preview` button overrides standard browser behaviors and halts the direct preview until the user reads and confirms compliance with the official privacy modal statement.

### The Confidentiality and Data Protection Notice:
Before accessing the underlying `cv.pdf` resource file, the visitor is presented with the following mandatory disclaimer layout:

> **CONFIDENTIALITY AND DATA PROTECTION NOTICE**
> 
> By downloading, accessing, reviewing, retaining, or otherwise using this Curriculum Vitae, you acknowledge and agree that all personal information contained herein is confidential and is provided exclusively for the purpose of evaluating my professional qualifications, experience, skills, and suitability for employment, consulting, collaboration, or business opportunities.
> 
> The recipient shall not, without my prior written consent, copy, reproduce, distribute, publish, disclose, transfer, sell, share with third parties, store in external databases, or otherwise process any personal information contained in this document for purposes other than the legitimate evaluation of my professional profile.
> 
> Any processing of personal data contained in this CV must be carried out in compliance with applicable data protection and privacy laws, including, where applicable, Regulation (EU) 2016/679 (General Data Protection Regulation – GDPR) and related legislation.
> 
> Unauthorized use, disclosure, dissemination, or retention of the information contained in this document is strictly prohibited and may constitute a violation of applicable privacy, confidentiality, and data protection laws.
> 
> All intellectual property rights, privacy rights, and rights relating to my personal data are expressly reserved. Receipt or access to this CV does not grant any license, authorization, or right to use the information contained herein beyond the purpose expressly stated above.

### Pipeline Security & Validation:
- **Interception Logic**: Blocks direct access to the document path string, isolating the asset behind explicit user action.
- **Analytics Pipeline Execution**: This interstitial interface ensures custom data download triggers are successfully recorded by Plausible Analytics before rendering the document window, preventing script dropping from rapid redirect responses.

---

## Project Structure

- `index.html`: Core entrance page featuring the animated Hero section, welcome message, and main navigation paths.
- `about.html`: Detailed professional profile, educational background, technical skills matrices, and the protected CV download modal gateway.
- `portfolio.html`: Portfolio showroom hosting filterable personal WebApps, standalone software utilities, and game development projects. Going to WebApps/Software and Videogames pages allows to download my files and projects.
- `style.css`: Master style layout containing variables, responsive device breakpoints, core animations, and theme schemas.
- `transitions.js`: Script coordinating site-wide transitions, dark/light theme switching (`localStorage`), and modal dialog opening/closing states.
- `cv.pdf`: Secure Curriculum Vitae file.
- `favicon-96x96.png`: High-definition primary web browser tab identity asset.
- `apple-touch-icon.png`: Apple iOS home screen launcher asset and third-party chat messaging preview image fallback.
- `og-image.png`: High-resolution card display graphic requested by the Open Graph protocol.
- `downloads/`: This directory contains my projects in order to being downloaded by users.

---

## Technical Stack

- **HTML5**: Semantically structured markup optimized for screen readers and search engines.
- **CSS3**: Layout design utilizing advanced flexbox structures, responsive fluid rules, keyframe animations, and run-time theme toggle variables.
- **JavaScript**: Vanilla event loops handling interactive layouts, UI state switches, and the context protection popup mechanisms.

---

## License & Redistribution

© 2026 Daniel Salamone. This platform's operational contents may be shared, referenced, and utilized across commercial and non-commercial professional channels, subject to clear source attribution.
