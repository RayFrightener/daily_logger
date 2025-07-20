# Daily Task Logger – [Live](https://dailytasklogger.vercel.app/)

A personal productivity platform to track daily goals, log progress, and visualize consistency over time.

- Built a modular, Supabase-backed backend with full CRUD operations and per-task time tracking, modeled around microservice principles
- Engineered responsive, accessible frontend dashboards using MUI and Chart.js to deliver clear visual feedback and frictionless daily logging
- Wrote integration tests for core logging flows using Jest, ensuring data reliability across edge cases and regressions
- Monitored performance and usage patterns through Supabase logs and tailored optimizations for key user workflows
- Deployed with automated CI/CD pipelines via GitHub Actions and Vercel for fast, reliable updates

**Tech:** React, Next.js, TypeScript, Supabase, PostgreSQL, MUI, Chart.js

## Features

- **Welcome Page:** Start with a message that reconnects you to your essence.
- **Define Goals:** Add, edit, and delete your personal objectives.
- **Daily Logging:** Log time spent on each goal with intuitive time pickers.
- **Visual Dashboards:** View daily, weekly, and monthly summaries with interactive charts.
- **Feedback:** Submit feedback directly from the app.
- **Authentication:** Secure sign-in with Google.
- **Moderation:** Soft-delete and flagging for safe, respectful interactions.

## Structure

```
├── src/
│   ├── components/         # Reusable React components (UI, modals, forms, charts)
│   ├── pages/              # Next.js pages (routing, SSR)
│   ├── styles/             # CSS modules for scoped styling
│   ├── utils/              # Supabase client/server utilities
├── public/                 # Static assets (images, favicon, etc.)
├── .env.local              # Environment variables
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.mjs         # Next.js configuration
├── README.md               # Project overview and instructions
└── .gitignore              # Git ignore rules
```

## Resume

Interested in my experience? [Download my resume](https://pranshublog-rho.vercel.app/softwareEngineerPranshuChawlaResume2025.docx.pdf).

## For Recruiters

- Full-stack engineer with a focus on clarity, scalability, and user experience
- Projects demonstrate end-to-end skills: database design, API development, UI/UX
- Code is clean, modular, and production-ready

## Contact

- [LinkedIn](https://www.linkedin.com/in/pranshu-chawla-/)
- [GitHub](https://github.com/RayFrightener)
- Email: pranshuchawla19@gmail.com

---

Feel free to explore the code

## Commit Message Categories

| Category   | Use For                                           | Example                                      |
|------------|---------------------------------------------------|----------------------------------------------|
| **fix:**   | Bug fixes, typos, small readability edits         | `fix: correct typo in about page`            |
| **feat:**  | Adding new features, sections, or content         | `feat: add new project cards to about page`  |
| **refactor:** | Improving code, structure, or design (no new features) | `refactor: revamp about page layout and styles` |
| **docs:**  | Documentation changes (README, comments, etc.)    | `docs: update about page description`        |
| **style:** | Formatting, CSS, or visual improvements           | `style: enhance project card appearance`     |