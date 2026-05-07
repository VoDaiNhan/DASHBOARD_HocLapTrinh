// Script để cập nhật các môn học còn lại lên 11 chương
// Chạy: node update_remaining_subjects.js

const fs = require('fs');
const path = require('path');

// Đọc file data.js hiện tại
const dataPath = path.join(__dirname, 'src/pages/ExerciseBank/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Tìm và thay thế phần 'Lập trình Front-end'
const frontendReplacement = `  'Lập trình Front-end': { 
    color: 'orange', 
    chapters: [
      { 
        id: 1, 
        title: 'Chương 1: HTML & CSS nền tảng', 
        basic: [
          sb('b1', 'HTML semantic tags', 'header,main,footer', 9.0, ['html', 'semantic']),
          sb('b2', 'Flexbox layout', 'display:flex', 8.5, ['css', 'flexbox']),
          ip('b3', 'CSS Grid', 'grid-template-areas', ['css', 'grid']),
          ns('b4', 'Responsive media queries', 'breakpoints', ['css', 'responsive']),
          ns('b5', 'CSS animation', 'keyframes,transition', ['css', 'animation']),
          ns('b6', 'Form validation HTML5', ':valid/:invalid', ['form', 'validation']),
          ns('b7', 'CSS variables', '--custom-property', ['css', 'variables']),
          ns('b8', 'Accessibility ARIA', 'aria-label,role', ['accessibility'])
        ], 
        advanced: [
          ns('a1', 'Mini project: Landing page', 'mobile-first+animation', ['mini-project', 'responsive']),
          ns('a2', 'CSS-in-JS Styled Components', 'dynamic styling', ['css-in-js', 'advanced']),
          ns('a3', 'Web Components với Shadow DOM', 'custom elements', ['web-components', 'shadow-dom']),
          ns('a4', 'CSS Houdini và Paint API', 'custom CSS properties', ['houdini', 'paint-api'])
        ] 
      },
      { 
        id: 2, 
        title: 'Chương 2: JavaScript ES6+', 
        basic: [
          ns('b1', 'let, const vs var', 'Block scoping', ['javascript', 'scoping']),
          ns('b2', 'Arrow functions', '() => {} syntax', ['javascript', 'arrow-functions']),
          ns('b3', 'Template literals', 'String interpolation', ['javascript', 'template-literals']),
          ns('b4', 'Destructuring assignment', 'Array và object destructuring', ['javascript', 'destructuring']),
          ns('b5', 'Spread và rest operators', '... operator', ['javascript', 'spread-rest']),
          ns('b6', 'Array methods', 'map, filter, reduce', ['javascript', 'array-methods']),
          ns('b7', 'Promises và async/await', 'Asynchronous programming', ['javascript', 'promises']),
          ns('b8', 'Modules import/export', 'ES6 modules', ['javascript', 'modules'])
        ], 
        advanced: [
          ns('a1', 'Closures và scope chain', 'Advanced scoping concepts', ['javascript', 'closures']),
          ns('a2', 'Prototypes và inheritance', 'Prototype-based OOP', ['javascript', 'prototypes']),
          ns('a3', 'Event loop và concurrency', 'JavaScript runtime model', ['javascript', 'event-loop']),
          ns('a4', 'Performance optimization', 'Memory management, profiling', ['javascript', 'performance'])
        ] 
      },
      { 
        id: 3, 
        title: 'Chương 3: React.js Framework', 
        basic: [
          ns('b1', 'JSX syntax', 'JavaScript XML', ['react', 'jsx']),
          ns('b2', 'Functional components', 'Component creation', ['react', 'components']),
          ns('b3', 'Props và PropTypes', 'Component communication', ['react', 'props']),
          ns('b4', 'useState hook', 'State management', ['react', 'usestate']),
          ns('b5', 'useEffect hook', 'Side effects', ['react', 'useeffect']),
          ns('b6', 'Event handling', 'onClick, onChange', ['react', 'events']),
          ns('b7', 'Conditional rendering', 'if statements trong JSX', ['react', 'conditional']),
          ns('b8', 'Lists và keys', 'Rendering arrays', ['react', 'lists'])
        ], 
        advanced: [
          ns('a1', 'Custom hooks', 'Reusable stateful logic', ['react', 'custom-hooks']),
          ns('a2', 'Context API', 'Global state management', ['react', 'context']),
          ns('a3', 'React Router', 'Client-side routing', ['react', 'router']),
          ns('a4', 'Performance optimization', 'useMemo, useCallback, React.memo', ['react', 'performance'])
        ] 
      },
      { 
        id: 4, 
        title: 'Chương 4: State Management', 
        basic: [
          ns('b1', 'Component state patterns', 'Local state best practices', ['state', 'local']),
          ns('b2', 'Lifting state up', 'State sharing between components', ['state', 'lifting']),
          ns('b3', 'useReducer hook', 'Complex state logic', ['state', 'reducer']),
          ns('b4', 'Context for global state', 'Provider pattern', ['context', 'global']),
          ns('b5', 'Redux basics', 'Actions, reducers, store', ['redux', 'basics']),
          ns('b6', 'Redux Toolkit', 'Modern Redux patterns', ['redux', 'toolkit']),
          ns('b7', 'Async actions', 'Redux Thunk, async middleware', ['redux', 'async']),
          ns('b8', 'State normalization', 'Flat state structure', ['state', 'normalization'])
        ], 
        advanced: [
          ns('a1', 'Zustand state management', 'Lightweight alternative', ['zustand', 'lightweight']),
          ns('a2', 'Recoil atomic state', 'Facebook\'s state library', ['recoil', 'atomic']),
          ns('a3', 'State machines', 'XState implementation', ['state-machine', 'xstate']),
          ns('a4', 'Optimistic updates', 'UI responsiveness patterns', ['optimistic', 'updates'])
        ] 
      },
      { 
        id: 5, 
        title: 'Chương 5: Styling và UI Libraries', 
        basic: [
          ns('b1', 'CSS Modules', 'Scoped CSS', ['css', 'modules']),
          ns('b2', 'Styled Components', 'CSS-in-JS', ['styled', 'components']),
          ns('b3', 'Tailwind CSS', 'Utility-first CSS', ['tailwind', 'utility']),
          ns('b4', 'Material-UI basics', 'Component library', ['mui', 'components']),
          ns('b5', 'Responsive design', 'Mobile-first approach', ['responsive', 'mobile']),
          ns('b6', 'Theme systems', 'Design tokens', ['theme', 'tokens']),
          ns('b7', 'Icon libraries', 'React Icons, Lucide', ['icons', 'libraries']),
          ns('b8', 'Animation libraries', 'Framer Motion basics', ['animation', 'framer'])
        ], 
        advanced: [
          ns('a1', 'Custom design system', 'Component library creation', ['design-system', 'custom']),
          ns('a2', 'Advanced animations', 'Complex motion patterns', ['animation', 'advanced']),
          ns('a3', 'CSS-in-JS performance', 'Runtime vs build-time', ['css-in-js', 'performance']),
          ns('a4', 'Accessibility patterns', 'WCAG compliance', ['accessibility', 'wcag'])
        ] 
      },
      { 
        id: 6, 
        title: 'Chương 6: Forms và Validation', 
        basic: [
          ns('b1', 'Controlled components', 'Form input handling', ['forms', 'controlled']),
          ns('b2', 'Uncontrolled components', 'useRef for forms', ['forms', 'uncontrolled']),
          ns('b3', 'Form validation', 'Client-side validation', ['validation', 'client']),
          ns('b4', 'React Hook Form', 'Performance-focused forms', ['forms', 'hook-form']),
          ns('b5', 'Formik library', 'Form state management', ['formik', 'state']),
          ns('b6', 'Yup validation schema', 'Schema-based validation', ['yup', 'schema']),
          ns('b7', 'File upload handling', 'File input và preview', ['upload', 'file']),
          ns('b8', 'Dynamic forms', 'Add/remove fields', ['forms', 'dynamic'])
        ], 
        advanced: [
          ns('a1', 'Multi-step forms', 'Wizard patterns', ['forms', 'wizard']),
          ns('a2', 'Form state persistence', 'Local storage integration', ['forms', 'persistence']),
          ns('a3', 'Real-time validation', 'Debounced validation', ['validation', 'realtime']),
          ns('a4', 'Complex form patterns', 'Nested objects, arrays', ['forms', 'complex'])
        ] 
      },
      { 
        id: 7, 
        title: 'Chương 7: API Integration và Data Fetching', 
        basic: [
          ns('b1', 'Fetch API basics', 'GET, POST requests', ['fetch', 'api']),
          ns('b2', 'Axios library', 'HTTP client library', ['axios', 'http']),
          ns('b3', 'useEffect for data fetching', 'Component lifecycle', ['useeffect', 'fetching']),
          ns('b4', 'Loading states', 'UI feedback patterns', ['loading', 'states']),
          ns('b5', 'Error handling', 'Try-catch, error boundaries', ['error', 'handling']),
          ns('b6', 'Custom hooks for API', 'Reusable data fetching', ['hooks', 'api']),
          ns('b7', 'SWR library', 'Data fetching với caching', ['swr', 'caching']),
          ns('b8', 'React Query basics', 'Server state management', ['react-query', 'server'])
        ], 
        advanced: [
          ns('a1', 'Advanced React Query', 'Mutations, optimistic updates', ['react-query', 'advanced']),
          ns('a2', 'GraphQL với Apollo', 'GraphQL client', ['graphql', 'apollo']),
          ns('a3', 'Real-time data', 'WebSockets, Server-Sent Events', ['realtime', 'websockets']),
          ns('a4', 'Offline-first patterns', 'Service workers, caching', ['offline', 'service-workers'])
        ] 
      },
      { 
        id: 8, 
        title: 'Chương 8: Testing Frontend Applications', 
        basic: [
          ns('b1', 'Jest testing framework', 'Unit test setup', ['jest', 'unit']),
          ns('b2', 'React Testing Library', 'Component testing', ['testing-library', 'components']),
          ns('b3', 'Testing hooks', 'Custom hook testing', ['testing', 'hooks']),
          ns('b4', 'Mocking API calls', 'Mock Service Worker', ['mocking', 'api']),
          ns('b5', 'Snapshot testing', 'Component snapshots', ['snapshot', 'testing']),
          ns('b6', 'Accessibility testing', 'jest-axe, screen readers', ['accessibility', 'testing']),
          ns('b7', 'Visual regression testing', 'Chromatic, Percy', ['visual', 'regression']),
          ns('b8', 'Test coverage', 'Coverage reports', ['coverage', 'reports'])
        ], 
        advanced: [
          ns('a1', 'End-to-end testing', 'Cypress, Playwright', ['e2e', 'cypress']),
          ns('a2', 'Performance testing', 'Lighthouse CI', ['performance', 'lighthouse']),
          ns('a3', 'Cross-browser testing', 'BrowserStack, Sauce Labs', ['cross-browser', 'testing']),
          ns('a4', 'Test automation', 'CI/CD integration', ['automation', 'cicd'])
        ] 
      },
      { 
        id: 9, 
        title: 'Chương 9: Performance Optimization', 
        basic: [
          ns('b1', 'React.memo optimization', 'Preventing re-renders', ['memo', 'optimization']),
          ns('b2', 'useMemo và useCallback', 'Expensive calculations', ['usememo', 'usecallback']),
          ns('b3', 'Code splitting', 'React.lazy, Suspense', ['code-splitting', 'lazy']),
          ns('b4', 'Bundle analysis', 'Webpack Bundle Analyzer', ['bundle', 'analysis']),
          ns('b5', 'Image optimization', 'Lazy loading, WebP', ['image', 'optimization']),
          ns('b6', 'Virtual scrolling', 'Large list performance', ['virtual', 'scrolling']),
          ns('b7', 'Web Vitals', 'Core Web Vitals metrics', ['web-vitals', 'metrics']),
          ns('b8', 'Performance profiling', 'React DevTools Profiler', ['profiling', 'devtools'])
        ], 
        advanced: [
          ns('a1', 'Server-side rendering', 'Next.js SSR', ['ssr', 'nextjs']),
          ns('a2', 'Static site generation', 'SSG patterns', ['ssg', 'static']),
          ns('a3', 'Progressive Web Apps', 'PWA features', ['pwa', 'progressive']),
          ns('a4', 'Edge computing', 'Edge functions, CDN', ['edge', 'computing'])
        ] 
      },
      { 
        id: 10, 
        title: 'Chương 10: Build Tools và Development Workflow', 
        basic: [
          ns('b1', 'Create React App', 'Zero-config setup', ['cra', 'setup']),
          ns('b2', 'Vite build tool', 'Fast development server', ['vite', 'fast']),
          ns('b3', 'ESLint configuration', 'Code linting', ['eslint', 'linting']),
          ns('b4', 'Prettier formatting', 'Code formatting', ['prettier', 'formatting']),
          ns('b5', 'Git hooks', 'Husky, lint-staged', ['git', 'hooks']),
          ns('b6', 'Environment variables', '.env files', ['env', 'variables']),
          ns('b7', 'Package management', 'npm, yarn, pnpm', ['package', 'management']),
          ns('b8', 'Development vs production', 'Build optimization', ['build', 'optimization'])
        ], 
        advanced: [
          ns('a1', 'Custom Webpack config', 'Advanced bundling', ['webpack', 'custom']),
          ns('a2', 'Micro-frontends', 'Module federation', ['micro-frontend', 'federation']),
          ns('a3', 'Monorepo management', 'Lerna, Nx', ['monorepo', 'lerna']),
          ns('a4', 'CI/CD for frontend', 'Automated deployment', ['cicd', 'deployment'])
        ] 
      },
      { 
        id: 11, 
        title: 'Chương 11: Advanced Frontend Concepts', 
        basic: [
          ns('b1', 'TypeScript với React', 'Type safety', ['typescript', 'react']),
          ns('b2', 'Component patterns', 'Render props, HOCs', ['patterns', 'components']),
          ns('b3', 'Error boundaries', 'Error handling patterns', ['error', 'boundaries']),
          ns('b4', 'Portals', 'Rendering outside component tree', ['portals', 'rendering']),
          ns('b5', 'Refs và DOM manipulation', 'Direct DOM access', ['refs', 'dom']),
          ns('b6', 'Internationalization', 'i18n, react-i18next', ['i18n', 'internationalization']),
          ns('b7', 'SEO optimization', 'Meta tags, structured data', ['seo', 'optimization']),
          ns('b8', 'Security best practices', 'XSS prevention, CSP', ['security', 'xss'])
        ], 
        advanced: [
          ns('a1', 'Micro-frontend architecture', 'Independent deployments', ['micro-frontend', 'architecture']),
          ns('a2', 'Web Assembly integration', 'WASM với React', ['wasm', 'integration']),
          ns('a3', 'Advanced TypeScript', 'Generic components, utility types', ['typescript', 'advanced']),
          ns('a4', 'Framework-agnostic components', 'Web Components, Stencil', ['framework-agnostic', 'web-components'])
        ] 
      },
    ]
  },`;

// Thay thế trong content
content = content.replace(
  /'Lập trình Front-end': \{[\s\S]*?\},\s*(?='Cơ sở dữ liệu')/,
  frontendReplacement
);

console.log('Updated Frontend chapters to 11');
console.log('Writing updated content to file...');
fs.writeFileSync(dataPath, content);
console.log('Done!');