# WebCored Tools - Project Memory

## Overview
Modern Next.js 15 web application featuring a comprehensive collection of utility tools. Built with TypeScript, Tailwind CSS, and shadcn/ui components for a professional, responsive experience. Deployed as a static site on GitHub Pages with consistent design patterns throughout.

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router (static export)
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS v3.4 + CSS variables + shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and interactions
- **UI Components**: 15+ shadcn/ui components with Radix UI primitives
- **Icons**: Lucide React icon library
- **Data Processing**: Custom utility libraries per tool domain
- **Deployment**: GitHub Pages with conditional base paths
- **Storage**: Client-side localStorage for data persistence

### Project Structure
```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx             # Root layout with sidebar integration
│   ├── page.tsx               # Homepage with tools grid
│   ├── countdown-timer/       # Countdown timer tool (CRUD operations)
│   ├── percentage-calculator/ # Percentage calculator (4 modes)
│   ├── json-viewer/          # JSON viewer/parser (dual-panel)
│   ├── url-decoder/          # URL encoder/decoder (real-time)
│   └── tools/                # Legacy tool listing page
├── components/
│   ├── layout/               # Shared layout components
│   │   ├── tool-layout.tsx   # Main container layout
│   │   ├── tool-header.tsx   # Consistent page headers
│   │   ├── empty-state.tsx   # Placeholder content
│   │   └── action-dropdown.tsx # Three-dot action menus
│   ├── tools/                # Tool-specific components
│   │   └── tool-card.tsx     # Homepage tool cards
│   ├── calculator/           # Percentage calculator components
│   │   ├── percentage-input.tsx
│   │   └── calculation-result.tsx
│   ├── json/                 # JSON processing components
│   │   ├── json-input.tsx
│   │   └── json-output.tsx
│   ├── ui/                   # shadcn/ui component library
│   │   ├── button.tsx, card.tsx, dialog.tsx
│   │   ├── input.tsx, textarea.tsx, select.tsx
│   │   ├── sidebar.tsx, dropdown-menu.tsx
│   │   ├── alert.tsx, badge.tsx, skeleton.tsx
│   │   └── [12+ more components]
│   └── app-sidebar.tsx       # Main navigation sidebar
├── lib/                      # Utility libraries and business logic
│   ├── utils.ts             # Common utilities (cn function, etc.)
│   ├── countdown.ts         # Countdown timer logic and localStorage
│   ├── percentage.ts        # Percentage calculation modes
│   ├── json-utils.ts        # JSON validation and processing
│   └── url-utils.ts         # URL encoding/decoding functions
└── hooks/
    └── use-mobile.tsx       # Mobile detection hook
```

### Configuration Files
- `next.config.js` - Static export with GitHub Pages base path handling
- `tailwind.config.js` - Extended theme with CSS variables and animations
- `tsconfig.json` - Strict TypeScript configuration with path aliases
- `package.json` - Dependencies and scripts (dev port 3003)

## Implemented Tools

### 1. Countdown Timer (`/countdown-timer`)
**Status**: ✅ Fully Implemented
- **Features**: Create/edit/delete multiple timers, fullscreen mode, real-time updates
- **Storage**: localStorage persistence with UUID-based IDs
- **UI**: Card-based layout with ActionDropdown menus, animated list items
- **Components**: Dialog forms, validation, date/time inputs
- **Business Logic**: `src/lib/countdown.ts` with comprehensive timer management

### 2. Percentage Calculator (`/percentage-calculator`)
**Status**: ✅ Fully Implemented  
- **Features**: 4 calculation modes with real-time results and examples
  - Percentage of a number (25% of 200 = 50)
  - What percentage (50 is what % of 200 = 25%)
  - Percentage change (200 increased/decreased by 25% = 250/150)
  - Percentage difference (difference between 200 and 250 = 22.22%)
- **UI**: Mode selector, custom input components, clear functionality
- **Components**: `PercentageInput`, `CalculationResultDisplay` with error states
- **Business Logic**: `src/lib/percentage.ts` with validation and formatting

### 3. JSON Viewer / Parser (`/json-viewer`)
**Status**: ✅ Fully Implemented
- **Features**: Real-time validation, syntax highlighting, interactive tree view
- **UI**: Dual-panel layout (input/output), file upload, example data buttons
- **Components**: `JsonInput` with validation, `JsonOutput` with @uiw/react-json-view
- **Processing**: Format, minify, validate with detailed error messages
- **Business Logic**: `src/lib/json-utils.ts` with comprehensive validation

### 4. URL Encoder / Decoder (`/url-decoder`)
**Status**: ✅ Fully Implemented
- **Features**: Real-time encoding/decoding, copy-to-clipboard functionality
- **UI**: Mode selector dropdown, large textarea input, result display with copy button
- **Processing**: encodeURIComponent/decodeURIComponent with error handling
- **Components**: Select dropdown, Textarea, Card-based result display
- **Business Logic**: `src/lib/url-utils.ts` with input validation and error states

## Design System & Layout Standards

### Layout Components
All tools follow consistent layout patterns using these components:

#### 1. ToolLayout (`src/components/layout/tool-layout.tsx`)
```tsx
// Provides: container max-w-6xl mx-auto with consistent spacing
<ToolLayout>
  {children}
</ToolLayout>
```

#### 2. ToolHeader (`src/components/layout/tool-header.tsx`)
```tsx
// Provides: consistent title/description pattern with optional action button
<ToolHeader
  title="Tool Name"
  description="Tool description text"
  action={<Button>Optional Action</Button>}
/>
```

#### 3. EmptyState (`src/components/layout/empty-state.tsx`)
```tsx
// Provides: consistent placeholder content for empty states
<EmptyState
  title="No items yet"
  description="Description of empty state"
  action={<Button>Create First Item</Button>}
/>
```

#### 4. ActionDropdown (`src/components/layout/action-dropdown.tsx`)
```tsx
// Provides: three-dot menu with consistent styling using MoreVertical icon
<ActionDropdown>
  <DropdownMenuItem>Edit</DropdownMenuItem>
  <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
</ActionDropdown>
```

### Standard Page Structure Pattern
```tsx
'use client'

import { ToolLayout } from '@/components/layout/tool-layout'
import { ToolHeader } from '@/components/layout/tool-header'
import { EmptyState } from '@/components/layout/empty-state'

export default function ToolPage() {
  return (
    <ToolLayout>
      <ToolHeader
        title="Tool Name"
        description="Tool description"
        action={/* Optional header action */}
      />
      
      {/* Tool content or empty state */}
      {hasContent ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* Tool-specific content */}
        </div>
      ) : (
        <EmptyState
          title="No items yet"
          description="Create your first item"
          action={/* Create button */}
        />
      )}
    </ToolLayout>
  )
}
```

## UI/UX Design Patterns

### Typography System
- **Page Titles**: `text-3xl font-bold tracking-tight` (ToolHeader)
- **Descriptions**: `text-muted-foreground` for secondary text
- **Card Titles**: `font-semibold text-lg` for content headers
- **Body Text**: Default with `leading-relaxed` for readability
- **Monospace**: `font-mono` for code, results, and technical content

### Spacing & Layout
- **Page Container**: `container max-w-6xl mx-auto px-4` (ToolLayout)
- **Section Spacing**: `space-y-6` between major sections
- **Item Spacing**: `space-y-4` between list items and components
- **Card Content**: `max-w-2xl mx-auto` for optimal reading width
- **Card Padding**: Consistent `p-4` for card content areas

### Color System (CSS Variables)
- **Primary Actions**: Default button styling with hover states
- **Destructive Actions**: `text-destructive focus:text-destructive` for delete operations
- **Muted Text**: `text-muted-foreground` for secondary information
- **Success States**: `text-green-600` for valid states and confirmations
- **Error States**: `text-destructive` with `bg-destructive/10` backgrounds
- **Card Backgrounds**: Default card styling with subtle hover effects

### Interactive Elements
- **Action Menus**: Always use `ActionDropdown` with `MoreVertical` icon
- **Primary Buttons**: `variant="outline"` for main actions
- **Secondary Buttons**: `variant="ghost"` for dropdown menu items
- **Copy Buttons**: Icon + text pattern with success feedback
- **Hover States**: Subtle transitions with `transition-colors`
- **Form Validation**: Real-time validation with inline error messages

## Sidebar Navigation System

### Structure (`src/components/app-sidebar.tsx`)
- **Brand**: "WebCored Tools" with "W" logo in primary color
- **Navigation**: Collapsible icon sidebar with tool list
- **Footer**: Copyright + GitHub icon link to repository
- **Responsive**: Mobile sheet overlay for small screens

### Tool Registration Pattern
```tsx
const data = {
  tools: [
    {
      name: "Tool Display Name",
      url: "/tool-route", 
      icon: LucideIcon,
    },
    // Add new tools here
  ]
}
```

### Homepage Integration (`src/app/page.tsx`)
```tsx
const tools = [
  {
    id: 'tool-id',
    name: 'Tool Name',
    description: 'Tool description for homepage card',
    icon: LucideIcon,
    href: '/tool-route',
    color: 'bg-color-500', // Unique color per tool
  }
]
```

## Technical Implementation Patterns

### Data Management
- **Client-side Storage**: localStorage for user data with JSON serialization
- **State Management**: React useState/useEffect patterns with custom hooks
- **Real-time Updates**: useEffect intervals for live data (countdown timers)
- **Form Validation**: Client-side validation with immediate feedback

### Component Patterns
- **Cards**: shadcn `Card` with consistent `p-4` padding
- **Forms**: shadcn `Input`, `Button`, `Dialog`, `Select` components
- **Actions**: Always use `ActionDropdown` for item-level actions  
- **Loading States**: shadcn `Skeleton` components for loading placeholders
- **Animations**: Framer Motion `AnimatePresence` for list animations
- **Copy Functionality**: Clipboard API with success feedback states

### Error Handling
- **Validation**: Input validation with inline error messages
- **Try-Catch**: Proper error boundaries around parsing operations
- **User Feedback**: Error states with helpful messages and recovery options
- **Fallbacks**: Empty states and placeholder content for missing data

### Performance Optimizations
- **Static Export**: Pre-built static files for fast loading
- **Code Splitting**: Automatic Next.js code splitting by route
- **Image Optimization**: Disabled for static export compatibility
- **Memoization**: useCallback for expensive operations and event handlers

## Development Workflow

### Development Commands
```bash
npm run dev      # Start development server on port 3003
npm run build    # Build for production (static export)
npm run start    # Start production server (not used for GitHub Pages)
npm run lint     # Run ESLint with Next.js configuration
```

### New Tool Development Checklist
1. **Create Tool Page**: `src/app/tool-name/page.tsx` following standard pattern
2. **Business Logic**: Create utility library in `src/lib/tool-utils.ts`
3. **Components**: Build tool-specific components in `src/components/tool/`
4. **Navigation**: Add to sidebar in `src/components/app-sidebar.tsx`
5. **Homepage**: Add tool card to `src/app/page.tsx`
6. **Styling**: Follow design system patterns and responsive design
7. **Testing**: Manual testing across desktop/tablet/mobile viewports

### shadcn/ui Component Installation
```bash
npx shadcn@latest add component-name
```
- Components auto-installed with proper theming
- Always check existing components before adding new ones
- Customize via `tailwind.config.js` CSS variables

### Deployment Configuration
- **GitHub Pages**: Automatic deployment from main branch
- **Base Path**: Conditional `/tools` path for GitHub Pages
- **Asset Prefix**: Handles static asset serving
- **Image Optimization**: Disabled for static export compatibility

## Quality Assurance

### Testing Checklist
- [ ] All tool pages load correctly without errors
- [ ] Sidebar navigation works on all screen sizes  
- [ ] Responsive design (mobile 375px / tablet 768px / desktop 1200px+)
- [ ] Action dropdowns function properly with keyboard navigation
- [ ] Form validation works with proper error messages
- [ ] Data persistence works correctly (localStorage)
- [ ] Copy-to-clipboard functionality works across browsers
- [ ] Real-time processing updates immediately
- [ ] Error states display helpful messages
- [ ] Loading states provide appropriate feedback

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES2020, CSS Grid, Flexbox, CSS Variables
- **Polyfills**: None required for target browser support

### Accessibility Standards
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: ARIA labels and descriptions where needed
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Visible focus indicators and logical tab order

## Future Enhancement Areas

### Planned Features
- **Tool Search**: Filter/search functionality for tool discovery
- **Keyboard Shortcuts**: Global shortcuts for common actions
- **Theme System**: Dark/light mode toggle with system preference
- **Export/Import**: Data export capabilities for tools with storage
- **Tool Categories**: Organize tools by type (utility, converter, calculator)

### Technical Improvements
- **PWA Support**: Service worker for offline functionality
- **Performance**: Bundle analysis and optimization
- **Testing**: Unit tests with Jest/React Testing Library
- **Monitoring**: Error tracking and analytics integration
- **SEO**: Meta tags and structured data for better discoverability

### New Tool Ideas
- **Text Tools**: Base64 encoder/decoder, hash generators, text diff
- **Image Tools**: Image resizer, format converter, color picker
- **Developer Tools**: Lorem ipsum generator, UUID generator, timestamp converter
- **Math Tools**: Unit converter, scientific calculator, equation solver

---

**Last Updated**: January 25, 2025  
**Version**: 2.0.0  
**Maintainer**: Claude (AI Assistant)  
**Repository**: https://github.com/webcored/tools  
**Live Site**: https://webcored.github.io/tools/