# Allergen Scanner Web Application - Design Guidelines

## Design Approach: Health & Safety Utility Interface

**Framework Selection**: Material Design foundation with health-safety enhancements
**Rationale**: This is a utility-focused tool where accuracy, clarity, and trust are paramount. The interface must prioritize information hierarchy and immediate comprehension of allergen warnings.

## Core Design Philosophy

Create a clean, trustworthy interface that communicates health information clearly. Visual design should support rapid comprehension of allergen data without distraction. Balance professional medical-grade clarity with approachable, modern aesthetics.

## Color Palette

**Light Mode:**
- Background: 210 20% 98% (soft white)
- Surface: 0 0% 100% (pure white)
- Primary: 210 100% 45% (trust blue)
- Success/Safe: 140 60% 45% (clear green)
- Warning: 35 100% 50% (attention orange)
- Danger/Allergen: 0 85% 55% (alert red)
- Text Primary: 215 25% 15%
- Text Secondary: 215 15% 45%

**Dark Mode:**
- Background: 215 25% 8%
- Surface: 215 20% 12%
- Primary: 210 100% 60%
- Success/Safe: 140 50% 55%
- Warning: 35 90% 60%
- Danger/Allergen: 0 75% 65%
- Text Primary: 210 15% 95%
- Text Secondary: 210 10% 70%

## Typography

**Font Families:**
- Primary: Inter (Google Fonts) - UI, body text, data display
- Monospace: JetBrains Mono - ingredient lists, technical data

**Scale:**
- Hero/Page Title: text-4xl font-bold
- Section Headers: text-2xl font-semibold
- Card Titles: text-lg font-medium
- Body: text-base
- Small/Meta: text-sm
- Allergen Tags: text-xs font-semibold uppercase tracking-wide

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
Simple header with logo, main CTA, and theme toggle. Sticky positioning with subtle shadow on scroll. Include trust indicator (e.g., "FDA Allergen Database").

### Hero Section
**Layout**: Centered content with gradient background (primary to darker shade)
**Elements**: 
- Bold headline emphasizing safety/accuracy
- Subheadline explaining the scanning process
- Primary URL input field with scan button
- Trust badges (allergen databases used, accuracy metrics)
- NO hero image - focus on immediate utility

### URL Input Component
Large, prominent input field with:
- Website icon prefix
- Placeholder: "Enter product page URL"
- Integrated scan button (primary color, prominent)
- Loading state with animated scanning indicator
- Validation feedback (green checkmark/red error)

### Allergen Warning Cards
Critical component requiring maximum clarity:
- Border color indicates severity (red for present, green for clear, yellow for uncertain)
- Large allergen icon/emoji (🥜 🥛 🥚 🐟 🌾 etc.)
- Allergen name in bold
- Status badge (DETECTED / NOT FOUND / UNCERTAIN)
- Supporting details in smaller text
- Grid layout: 2 columns on desktop, 1 on mobile

### Ingredient List Display
- White/dark surface card with subtle shadow
- Monospace font for ingredient text
- Highlight detected allergens with colored backgrounds
- Expandable/collapsible for long lists
- Copy-to-clipboard functionality

### Analysis Results Section
Structured layout showing:
- Overall safety score (large, color-coded badge)
- Grid of allergen cards (8 common allergens)
- Detected ingredients list
- AI confidence indicator
- Timestamp of analysis

### Action Buttons
- Primary: Solid background, bold text (Scan, Analyze)
- Secondary: Outline style (Clear, Try Another)
- Icon buttons: Ghost style (Share, Print, Save)

### Status Indicators
- Scanning: Animated pulse with blue color
- Success: Green checkmark with fade-in
- Error: Red alert icon with shake animation
- Warning: Yellow caution with subtle glow

## Visual Treatments

**Shadows**: Minimal, subtle depth
- Cards: shadow-sm
- Elevated elements: shadow-md
- Modals/overlays: shadow-lg

**Borders**: 
- Default: 1px solid, subtle gray
- Active/Focus: 2px solid, primary color
- Allergen warnings: 2px solid, status color

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

- WCAG AAA contrast ratios for all allergen warnings
- Color-blind safe palette (never rely on color alone)
- Clear textual labels alongside color indicators
- Large touch targets (min 44px) for mobile
- Screen reader friendly allergen announcements
- Keyboard navigation support throughout

## Mobile Responsiveness

- Single column layouts below md breakpoint
- Stack allergen cards vertically
- Full-width input fields
- Sticky scan button at bottom on mobile
- Collapsible ingredient lists for space efficiency

## Trust & Credibility Elements

- Display data sources (USDA, FDA allergen databases)
- Show AI model confidence scores
- Include disclaimer about medical advice
- Timestamp all analyses
- Clear indication when data may be incomplete

This design prioritizes clarity, trust, and rapid comprehension of health-critical information while maintaining a modern, professional aesthetic.