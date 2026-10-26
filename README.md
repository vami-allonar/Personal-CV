# Joey Allonar — Personal CV Website

A responsive Curriculum Vitae (CV) website for Joey Allonar, fourth-year BS Information Technology student at Davao del Norte State College. Built to highlight professional background, education, skills, academic projects, and contact details.

## Technologies
- Next.js 15 (App Router)
- React 19
- WebGL and three.js for the sky-blue stripe background
- Framer Motion for section entrance animations
- CSS3 (responsive layout, scroll transitions and hover animations)
- Lucide React icons
- Vercel for deployment

## Run locally
1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Personalization checklist
- Add your real professional photo as `public/profile.jpg` (recommended square, JPG). Until then the page shows a clean JA fallback.
- Open `src/app/page.jsx` and fill out `profile.email`, `profile.github`, `profile.linkedin`, and optionally `profile.facebook` with genuine links. Empty links are intentionally disabled.
- Add project repository and deployed demo URLs in the `projects` array if public.
- Verify all descriptions and add confirmed achievements, certifications, senior high school and experiences if applicable. Do not invent details.
- Update the resume if your school/year/role changes.

## Deploy to Vercel
1. Create a **public** GitHub repository (suggested name: `personal-cv`).
2. Upload/push this project without the `node_modules` or `.next` folders.
3. Go to Vercel → Add New → Project → Import Git Repository.
4. Choose the repo; Vercel should detect Next.js. Select Deploy.
5. Check the live website on desktop and mobile.

**Student:** Joey Allonar  
**School:** Davao del Norte State College  
**Live Vercel link:** _Add actual URL after deployment_  
**GitHub repository:** _Add actual URL after creating the repo_

## Suggested meaningful Git commits
Use commits for real incremental work (do not fabricate history):
1. `chore: initialize Next.js CV project`
2. `feat: add profile and education sections`
3. `feat: add skills and project showcase`
4. `style: add responsive layout and scroll animations`
5. `docs: update README and deployment links`

## Structure
```
src/app/page.jsx      CV sections and profile/project content
src/app/globals.css   Visual style, motion and responsiveness
src/app/layout.jsx    HTML shell and metadata
public/profile.jpg    Your portrait (add your own)
```
