# Skincare Ingredient Analyzer - Design Guidelines

## Design Approach: Beauty & Wellness Analysis Interface

**Framework Selection**: Clean, modern design with beauty industry aesthetics
**Rationale**: This is a skincare analysis tool where users want to understand ingredient benefits and concerns. The interface should feel trustworthy, educational, and aligned with beauty/wellness aesthetics while maintaining clarity.

## Core Design Philosophy

Create a sophisticated, clean interface that communicates skincare information clearly. Visual design should support easy comprehension of ingredient analysis, benefits, and potential concerns without overwhelming users. Balance professional expertise with approachable, beauty-focused aesthetics.

## Color Palette

**Light Mode:**
- Background: 210 20% 98% (soft white)
- Surface: 0 0% 100% (pure white)
- Primary: 280 60% 55% (sophisticated purple)
- Success/Benefit: 140 60% 45% (natural green)
- Warning/Concern: 35 100% 50% (attention orange)
- Danger/Avoid: 0 85% 55% (alert red)
- Text Primary: 215 25% 15%
- Text Secondary: 215 15% 45%

**Dark Mode:**
- Background: 215 25% 8%
- Surface: 215 20% 12%
- Primary: 280 55% 65%
- Success/Benefit: 140 50% 55%
- Warning/Concern: 35 90% 60%
- Danger/Avoid: 0 75% 65%
- Text Primary: 210 15% 95%
- Text Secondary: 210 10% 70%

## Typography

**Font Families:**
- Primary: Inter (Google Fonts) - UI, body text, ingredient names
- Monospace: JetBrains Mono - technical data, INCI names

**Scale:**
- Hero/Page Title: text-4xl font-bold
- Section Headers: text-2xl font-semibold
- Card Titles: text-lg font-medium
- Body: text-base
- Small/Meta: text-sm
- Ingredient Tags: text-xs font-semibold uppercase tracking-wide

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section spacing: py-12, py-16
- Card gaps: gap-4, gap-6
- Form elements: space-y-4

**Container Strategy:**
- Main content: max-w-4xl mx-auto
- Wide sections: max-w-6xl mx-auto
- Forms: max-w-2xl mx-auto

## Component Library

### Navigation
Simple header with logo, main CTA, and theme toggle. Sticky positioning with subtle shadow on scroll. Include trust indicator (e.g., "Powered by AI Analysis").

### Hero Section
**Layout**: Centered content with gradient background (primary to darker shade)
**Elements**: 
- Bold headline emphasizing ingredient analysis
- Subheadline explaining the scanning process
- Primary URL input field with analyze button
- Trust badges (ingredient database, analysis accuracy)
- NO hero image - focus on immediate utility

### URL Input Component
Large, prominent input field with:
- Website icon prefix
- Placeholder: "Enter skincare product page URL"
- Integrated analyze button (primary color, prominent)
- Loading state with animated analyzing indicator
- Validation feedback (green checkmark/red error)

### Ingredient Analysis Cards
Critical component requiring maximum clarity:
- Border color indicates rating (green for beneficial, yellow for caution, red for concern)
- Ingredient name in bold
- Rating badge (BENEFICIAL / CAUTION / AVOID)
- Pros section with bullet points
- Cons section with bullet points
- Grid layout: 1 column on mobile, 2 on tablet, 3 on desktop

### Ingredient List Display
- White/dark surface card with subtle shadow
- Monospace font for technical ingredient names (INCI)
- Highlight analyzed ingredients with colored backgrounds
- Expandable/collapsible for long lists
- Copy-to-clipboard functionality

### Analysis Results Section
Structured layout showing:
- Overall product safety rating (large, color-coded badge)
- List of analyzed ingredients with pros/cons
- Key benefits summary
- Potential concerns summary
- AI confidence indicator
- Timestamp of analysis

### Action Buttons
- Primary: Solid background, bold text (Analyze, Scan)
- Secondary: Outline style (Clear, Try Another)
- Icon buttons: Ghost style (Share, Print, Save)

### Rating Indicators
- Analyzing: Animated pulse with purple color
- Beneficial: Green checkmark with fade-in
- Concern: Red alert icon with subtle animation
- Caution: Yellow warning with subtle glow

## Visual Treatments

**Shadows**: Minimal, subtle depth
- Cards: shadow-sm
- Elevated elements: shadow-md
- Modals/overlays: shadow-lg

**Borders**: 
- Default: 1px solid, subtle gray
- Active/Focus: 2px solid, primary color
- Rating borders: 2px solid, rating color

**Corners**: 
- Cards/containers: rounded-lg
- Buttons: rounded-md
- Tags/badges: rounded-full
- Input fields: rounded-md

**Animations**: Minimal, purposeful
- Loading spinners: Smooth rotation
- Status changes: 200ms fade transitions
- Card hover: Subtle lift (transform translateY)
- NO decorative animations

## Accessibility & Safety Considerations

- WCAG AAA contrast ratios for all rating indicators
- Color-blind safe palette (never rely on color alone)
- Clear textual labels alongside color indicators
- Large touch targets (min 44px) for mobile
- Screen reader friendly ingredient announcements
- Keyboard navigation support throughout

## Mobile Responsiveness

- Single column layouts below md breakpoint
- Stack ingredient cards vertically
- Full-width input fields
- Sticky analyze button at bottom on mobile
- Collapsible ingredient lists for space efficiency

## Trust & Credibility Elements

- Display data sources (cosmetic ingredient databases)
- Show AI model confidence scores
- Include disclaimer about skin sensitivity
- Timestamp all analyses
- Clear indication when data may be incomplete

This design prioritizes clarity, trust, and comprehensive ingredient analysis while maintaining a modern, beauty-focused aesthetic.
