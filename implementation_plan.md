# HabitFlow Landing Page Implementation Plan

The current homepage is an unstyled database skeleton. We will transform this into a premium, high-converting landing page designed to WOW unauthenticated users. 

## Proposed Changes

### 1. [app/page.tsx](file:///media/Hybrid/Coding/habitflow/app/page.tsx) [MODIFY]
- **Auth Redirect:** We will import `auth()` from Clerk. If `userId` exists, the page will instantly `redirect("/dashboard")`. This ensures authenticated users bypass the marketing page.
- **Hero Section:**
  - **Headline:** "Master your habits. Achieve your goals."
  - **Subheadline:** "HabitFlow helps you build consistency, track your progress, and take control of your daily routines with a beautiful, distraction-free interface."
  - **Aesthetics:** We'll use a `zinc-950` background with a subtle, glowing radial gradient (e.g., mixing indigo and purple) behind the hero text to give it a modern, premium feel.
- **Call-to-Action (CTA):**
  - Primary Button: "Get Started" (links to `/sign-up`, solid white or brand color).
  - Secondary Button: "Log In" (links to `/sign-in`, outlined/ghost style).
- **Features Section:**
  - A 3-column grid highlighting core features using `lucide-react` icons.
  - Features: "Task Tracking" (CheckCircle), "Privacy First" (Shield), "Stay Consistent" (TrendingUp).
  - Cards will feature glassmorphic styling (semi-transparent zinc-900 with subtle borders).

### 2. Assets [NEW]
- **Hero Mockup Image:** I will use the AI image generation tool to create an aesthetic, abstract representation of a productivity dashboard to anchor the right side or bottom of the hero section.

## Verification Plan

### Manual Verification
1. I will ask you to visit `http://localhost:3000` while **logged out** to review the aesthetics, layout, responsiveness, and gradients.
2. I'll ask you to verify that clicking "Get Started" and "Log In" take you to the correct Clerk authentication pages.
3. I'll ask you to log in, and then attempt to visit `http://localhost:3000` directly to ensure it automatically redirects you to `/dashboard`.
