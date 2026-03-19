# Hybrid Landing Page Implementation Plan

We are adapting our existing landing page to incorporate the sleekest, highest-converting elements from the "Google Stitch" mockup while maintaining our sustainable Tailwind V4 stack and Next.js App Router architecture.

## Proposed Integrations ("Best of Both Worlds")

### 1. Hero Section Upgrades [MODIFY]
- **The "Pulse" Badge:** Add the Stitch `Version 2.0 Now Live` stylistic badge (small glowing pill) right above the main `H1` headline to create a sense of momentum.
- **Copy:** Maintain our exact headline and subheadline (it maps to the actual product). Keep our CTA buttons, but maybe tweak the shape or glow.

### 2. Hybrid App Mockup Enhancement [MODIFY]
- **Realistic Habit Cards:** Instead of generic animated lines in our CSS Mockup, we will build out the 3 visual Habit Cards featured in the Stitch mock: 
  - "Hydration" (with a Droplet icon and a 2.4L progress bar)
  - "Deep Work" (with a Zap/Lightning icon and 4.5h progress bar)
  - "Meditation" (with a Brain/Lotus icon and 20m progress bar)
- We will use standard Lucide React icons to replicate these widgets within our glassy, hover-tilted dashboard frame.

### 3. The Bottom "Bento CTA" [NEW]
- We will add the high-converting secondary CTA section from Stitch right above the footer.
- **Left Block:** A large, dark card stating "Ready to enter the void? Join 50,000+ high-performers" with a final "Get Early Access" or "Sign Up" button.
- **Right Block:** A bold, solid-color card (Indigo or Purple) shouting "98% Success Rate" with an animated icon, identical to the Stitch flow-state metrics.

### 4. Footer Expansion [MODIFY]
- Expand our currently minimalistic footer to be a dual-layout footer.
- Keep the `A PeoLabs Project` tag on the bottom right.
- Add standard links (`Privacy`, `Terms`, `Status`, `Contact`) aligned in the center.

## Technical Details
- We are **rejecting** the heavy Material 3 Tailwind config override found in the Stitch file. We will recreate all visual treatments using our existing modern Tailwind V4 setup (`bg-zinc-950`, `text-indigo-400`, native `blur`).
- No changes to routing or `auth()`.

## Verification Plan
1. Check that the new "Version 2.0" badge matches the styling perfectly.
2. Confirm the dashboard mockup accurately displays the 3 new tracking widgets.
3. Validate typography and hover effects on the new Bottom Bento CTA section.
4. Ensure the Footer expansions break correctly on mobile without causing horizontal scrolling.
