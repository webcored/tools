# WebCored Tools

A comprehensive collection of free online utilities built with modern web technologies. This Next.js application provides professional-grade tools for developers and everyday users, featuring real-time processing, responsive design, and a consistent user experience.

## 🌐 Live Demo

**Production:** [https://tools.webcored.com/](https://tools.webcored.com/)

## 🛠️ Built With

- **Framework:** Next.js 15 with App Router and TypeScript
- **Styling:** Tailwind CSS v3.4 + shadcn/ui components + CSS variables
- **UI Components:** 15+ shadcn/ui components with Radix UI primitives
- **Icons:** Lucide React icon library
- **Animations:** Framer Motion for smooth transitions
- **JSON Processing:** @uiw/react-json-view for syntax highlighting
- **Date Handling:** date-fns for date calculations
- **Utilities:** class-variance-authority, clsx, tailwind-merge
- **Storage:** localStorage with error handling and fallbacks
- **Deployment:** GitHub Pages with static export

## ⚡ Available Tools

### 🕒 Countdown Timer
- **Create & Manage:** Up to 10 simultaneous countdown timers
- **Real-time Updates:** Live countdown with days, hours, minutes, seconds
- **CRUD Operations:** Add, edit, delete timers with form validation
- **Fullscreen Mode:** Presentation mode for events and deadlines
- **Persistent Storage:** localStorage with UUID-based identification
- **Date Validation:** Prevents past dates with helpful error messages

### 🧮 Percentage Calculator
- **4 Calculation Modes:**
  - Percentage of a number (25% of 200 = 50)
  - What percentage (50 is what % of 200 = 25%)
  - Percentage change (200 increased by 25% = 250)
  - Percentage difference (difference between 200 and 250)
- **Real-time Results:** Instant calculations as you type
- **Custom Components:** Specialized input fields with validation
- **Examples:** Built-in examples for each calculation mode
- **Error Handling:** Comprehensive validation with helpful messages

### 📄 JSON Viewer / Parser
- **Dual-Panel Layout:** Input and output side-by-side
- **Real-time Validation:** Instant JSON syntax checking
- **Interactive Tree View:** Collapsible/expandable JSON structure
- **Syntax Highlighting:** Color-coded JSON with @uiw/react-json-view
- **File Upload:** Direct JSON file processing
- **Multiple Views:** Tree, formatted, and minified display modes
- **Error Detection:** Detailed error messages with line numbers

### 🔗 URL Encoder / Decoder  
- **Mode Selection:** Toggle between encode and decode operations
- **Real-time Processing:** Instant results as you type
- **Copy Functionality:** One-click copy to clipboard with feedback
- **Error Handling:** Validation for malformed URLs
- **Large Text Support:** Handles long URLs and query strings
- **Clear Interface:** Clean input/output design

## 🏗️ Architecture & Design

### Component System
- **Layout Components:** ToolLayout, ToolHeader, EmptyState, ActionDropdown
- **Design Consistency:** Unified spacing, typography, and interaction patterns
- **Responsive Design:** Mobile-first approach with progressive enhancement
- **Accessibility:** WCAG compliant with keyboard navigation support

### Data Management
- **Client-side Storage:** localStorage for persistent user data
- **State Management:** React hooks with custom validation logic
- **Real-time Updates:** useEffect patterns for live data processing
- **Error Boundaries:** Comprehensive error handling throughout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/webcored/tools.git
cd tools
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3003](http://localhost:3003) in your browser

### Available Scripts

```bash
npm run dev      # Start development server on port 3003
npm run build    # Build for production (static export)
npm run start    # Start production server
npm run lint     # Run ESLint with Next.js rules
```

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx             # Root layout with sidebar & SEO
│   ├── page.tsx               # Homepage with tools grid
│   ├── countdown-timer/       # Countdown timer tool
│   ├── percentage-calculator/ # Percentage calculator tool  
│   ├── json-viewer/          # JSON viewer/parser tool
│   ├── url-decoder/          # URL encoder/decoder tool
│   └── globals.css           # Global styles & CSS variables
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
│   │   └── [12+ more components]
│   └── app-sidebar.tsx       # Main navigation sidebar
├── lib/                      # Utility libraries & business logic
│   ├── utils.ts             # Common utilities (cn function, etc.)
│   ├── countdown.ts         # Countdown timer logic & localStorage
│   ├── percentage.ts        # Percentage calculation modes
│   ├── json-utils.ts        # JSON validation & processing
│   └── url-utils.ts         # URL encoding/decoding functions
└── hooks/
    └── use-mobile.tsx       # Mobile detection hook
```

## 🔧 Configuration

### Next.js Configuration
- **Static Export:** Optimized for GitHub Pages deployment
- **Base Path:** Conditional `/tools` path for GitHub Pages
- **Image Optimization:** Disabled for static compatibility
- **TypeScript:** Strict mode with path aliases (@/ imports)

### Tailwind CSS
- **Custom Theme:** Extended colors with CSS variables
- **shadcn/ui Integration:** Consistent component theming
- **Responsive Breakpoints:** Mobile-first design system
- **Animation Support:** tailwindcss-animate plugin

### Development Workflow
- **Port 3003:** Non-conflicting development port
- **ESLint:** Next.js recommended rules with TypeScript
- **Component Installation:** `npx shadcn@latest add component-name`

## 🎨 Design System

### Layout Standards
- **Container:** `max-w-6xl mx-auto` for consistent page width
- **Spacing:** `space-y-6` between sections, `space-y-4` between items
- **Typography:** Consistent text sizes and weights across tools
- **Color System:** CSS variables for theme consistency

### Component Patterns  
- **Cards:** shadcn Card components with `p-4` padding
- **Forms:** Consistent input validation and error states
- **Actions:** ActionDropdown for all item-level operations
- **Loading:** Skeleton components for loading states
- **Animations:** Framer Motion for list transitions

## 📱 Browser Support

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** iOS Safari 14+, Chrome Mobile 90+
- **Features:** ES2020, CSS Grid, Flexbox, CSS Variables
- **PWA:** Basic PWA support with manifest.json

## 🚀 Deployment

### GitHub Pages
- **Automatic Deployment:** Pushes to main branch trigger deployment
- **Custom Domain:** Deployed to tools.webcored.com subdomain
- **Static Assets:** Optimized for CDN delivery
- **DNS Configuration:** CNAME record pointing to GitHub Pages

### Build Optimization
- **Code Splitting:** Automatic route-based splitting
- **Asset Optimization:** Minified CSS and JavaScript
- **Image Handling:** Optimized for static export
- **Bundle Analysis:** Built-in Next.js bundle analyzer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Follow the existing code patterns and component structure
4. Add your tool to the sidebar navigation and homepage
5. Commit your changes (`git commit -m 'Add amazing tool'`)
6. Push to the branch (`git push origin feature/amazing-tool`)
7. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Site:** [https://tools.webcored.com/](https://tools.webcored.com/)
- **Repository:** [https://github.com/webcored/tools](https://github.com/webcored/tools)
- **Issues:** [https://github.com/webcored/tools/issues](https://github.com/webcored/tools/issues)

---

**Built with ❤️ by WebCored**