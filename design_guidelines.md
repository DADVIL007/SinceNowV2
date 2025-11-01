# SinceNow v2 Design Guidelines

## Design Approach
**Reference-Based Modern Wellness Aesthetic** - Drawing inspiration from premium productivity and wellness apps (Calm, Headspace, Notion) combined with modern glassmorphism trends. The design should feel emotionally resonant, futuristic yet warm, and create a sense of progress and accomplishment.

## Core Design Principles
1. **Emotional Immediacy** - Every element should evoke progress, hope, and personal achievement
2. **Living Interface** - Continuous subtle motion creates the feeling that time is flowing
3. **Glassmorphic Depth** - Layered transparency creates sophisticated visual hierarchy
4. **Dopamine Design** - Strategic use of color, motion, and celebration to reward engagement

## Typography System

**Primary Font Stack**: Poppins (headings, emphasis) + Inter (body, counters)

- **Hero Headline**: 48px/56px (mobile: 32px/40px), Poppins Semi-Bold, centered
- **Event Card Title**: 24px/32px, Poppins Medium
- **Live Counter Numbers**: 36px/44px, Inter Bold, tabular-nums for smooth transitions
- **Counter Labels** (days, hours, etc.): 12px/16px, Inter Regular, uppercase tracking-wide
- **Motivational Quotes**: 14px/20px, Inter Regular, italic
- **Button Text**: 16px/24px, Poppins Medium
- **Body/Helper Text**: 14px/20px, Inter Regular

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24 (e.g., p-4, gap-8, mb-12)

**Container Structure**:
- Fullscreen viewport (100vh) with gradient background
- Central content area: max-w-6xl centered with px-6 (mobile: px-4)
- Hero section: Centered, pt-24 pb-16
- Event grid: 3-column desktop (grid-cols-3), 2-column tablet (md:grid-cols-2), 1-column mobile, gap-6

## Visual Design System

### Glassmorphism Implementation
- **Event Cards**: 
  - Semi-transparent white/dark background (opacity 10-15%)
  - Backdrop blur: 24px
  - Border: 1px solid white/20% opacity
  - Rounded corners: 24px
  - Padding: p-8
  - Subtle drop shadow for depth

- **Input Fields**:
  - Same glass treatment, padding p-4
  - Rounded corners: 16px
  - Focus state: Increase border opacity and add soft glow

- **Buttons**:
  - Primary CTA: Solid gradient fill (no transparency), rounded-full
  - Secondary actions: Glass treatment with border
  - Padding: px-8 py-4
  - Blur background when overlaying images/gradients

### Animated Gradient Background
- **Desktop**: Slow-moving diagonal gradient (20s animation loop)
- **Color Progression**: Deep purple → Electric blue → Soft pink → Warm orange → back to purple
- **Pattern**: Large soft blobs/orbs that morph and drift
- **Overlay**: Subtle noise texture (5% opacity) for depth
- **Alternative**: Particle system with 40-60 glowing dots moving in slow Brownian motion

### Dark/Light Mode Specifications
**Light Mode**:
- Background gradient: Soft pastels (lavender, mint, peach)
- Glass cards: White with 12% opacity
- Text: Charcoal gray (near-black)
- Accents: Vibrant blues and purples

**Dark Mode**:
- Background gradient: Deep cosmic colors (navy, purple, deep teal)
- Glass cards: White with 8% opacity
- Text: Off-white (95% brightness)
- Accents: Neon blues, electric purples, bright magentas

**Toggle**: Floating pill-shaped switch (top-right), sun/moon icons, smooth 400ms transition

## Component Library

### Event Input Section (Hero)
- Centered card (max-w-2xl)
- Headline with gradient text effect
- Two input fields side-by-side on desktop, stacked mobile
- Dropdown or toggle for "Since" vs "Until" mode
- Date picker with time selector (optional time appears on toggle)
- Large gradient CTA button "Start Tracking" with pulsing glow on hover
- Spacing: mb-16 below hero

### Event Tracker Cards
**Card Anatomy** (top to bottom):
1. Event Title (h3, mb-3)
2. Mode Badge ("Since" or "Until" - small pill, top-right absolute position)
3. Live Counter Display:
   - Large numbers in 2x2 or 4-column grid
   - Days | Hours on top row, Minutes | Seconds below
   - Labels underneath each number
   - Smooth fade transition between number changes
4. Progress Ring (Until mode only):
   - Circular SVG stroke animation
   - Percentage completion inside
   - Positioned absolute top-right or center-bottom
5. Motivational Quote (mt-6, opacity-80, italic)
6. Action Bar (mt-4):
   - Share icon button (left)
   - Delete icon button (right)
   - Icons visible on hover/always visible on mobile
   - Glass buttons with subtle hover scale

### Milestone Celebrations
When events hit 7, 30, 100, 365 days:
- Animated confetti overlay (brief, 2-3 seconds)
- Card gets temporary golden glow border
- Small badge appears: "🎉 Milestone!" 
- Gentle bounce animation on the card

### Empty State
Before any events are added:
- Centered illustration or animated icon
- Friendly copy: "Your journey starts here. Add your first moment."
- Soft pulsing animation on the CTA

### Share Card Generation
Modal overlay with glassmorphism:
- Preview of shareable card design
- Event name at top
- Large counter display
- Emoji and celebratory text
- "Copy Text" and "Download Image" buttons
- Close button (top-right X)

## Micro-Interactions & Animations

**Number Counter Animation**: 
- requestAnimationFrame-based smooth counting
- Numbers "roll" upward with 200ms easing when updating
- Slight scale pulse (1.0 → 1.05 → 1.0) on milestone hits

**Card Entrance**:
- Stagger animation: Each card fades in and slides up with 100ms delay between cards
- Initial load: 400ms ease-out

**Hover States**:
- Cards: Subtle lift (translateY -4px) and enhanced glow
- Buttons: Scale 1.02, increased shadow
- Icons: Rotate or bounce on hover

**Background Elements**:
- Gradient: 20-30s continuous morph
- Particles (if used): Slow drift, 40-80s per particle to cross screen
- No parallax (keeps it smooth)

## Responsive Behavior

**Desktop (1024px+)**:
- 3-column grid for event cards
- Side-by-side input fields
- Floating mode toggle in top-right

**Tablet (768px - 1023px)**:
- 2-column grid
- Stacked inputs with reduced padding
- Adjusted counter font sizes

**Mobile (< 768px)**:
- Single column grid
- Full-width cards with p-6
- Simplified counter layout (2x2 grid instead of 4-column)
- Always-visible action buttons (no hover needed)
- Reduced animation complexity for performance

## Accessibility Considerations
- High contrast mode support for counter numbers
- Reduced motion mode: Disable gradient animation and particle effects
- Focus visible states on all interactive elements
- ARIA labels for icon-only buttons
- Screen reader announcements for milestone achievements

## Images

**No hero background image needed** - The animated gradient background serves as the primary visual element. The design relies on glassmorphism, gradients, and motion rather than photography.

**Icon Usage**: 
- Heroicons or Font Awesome for Share/Delete actions
- Custom emoji or icon for milestone badges (🎉, 🔥, ⭐)
- Sun/Moon icons for theme toggle

## Performance Priorities
- Lazy-load animations until cards are in viewport
- Use CSS transforms (not position changes) for smooth 60fps
- Debounce counter updates to every 1 second (not every millisecond)
- Optimize gradient with CSS vs JavaScript where possible
- LocalStorage operations async to avoid blocking UI