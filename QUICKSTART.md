# 🚀 Superhuman Framework - Quick Start Guide

Get the Superhuman Framework website running on your local machine in 5 minutes or less!

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### Check Your Installations

```bash
node --version  # Should be v18 or higher
npm --version   # Should be 8 or higher
git --version   # Should be 2.x or higher
```

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/georgebthomas-7002/superhumanframework.git
cd superhumanframework
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- And more...

### 3. Start the Development Server

```bash
npm run dev
```

The website will open automatically at `http://localhost:5173`

## 🎉 You're Done!

That's it! You should now see the Superhuman Framework website running locally.

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 📁 Project Structure

```
superhumanframework/
│
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   │
│   ├── components/          # Reusable UI components
│   │   ├── ContactSlideOut.jsx
│   │   ├── FAQAccordion.jsx
│   │   ├── MobileMenu.jsx
│   │   └── ...
│   │
│   ├── pages/               # Page components
│   │   ├── FrameworkPage.jsx
│   │   ├── CoachingPage.jsx
│   │   └── ...
│   │
│   ├── content/             # Markdown content
│   │   ├── articles/
│   │   └── podcasts/
│   │
│   ├── config/              # Configuration files
│   ├── utils/               # Helper functions
│   └── styles/              # Additional styles
│
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind configuration
```

## 🎨 Making Your First Change

### Edit the Homepage

1. Open `src/App.jsx`
2. Find the hero section
3. Make a change (e.g., update text)
4. Save the file
5. See your changes instantly in the browser!

### Add a New Component

```jsx
// src/components/MyComponent.jsx
import React from 'react';

export default function MyComponent() {
  return (
    <div className="p-4 bg-navy text-white">
      <h2>My New Component</h2>
    </div>
  );
}
```

Import and use it in `App.jsx`:

```jsx
import MyComponent from './components/MyComponent';

// Add it to your JSX:
<MyComponent />
```

## 🎯 Key Features to Explore

### 1. The Framework Page
Navigate to the Framework section to see:
- The 4 Cornerstones
- The 10 H Pillars
- Interactive content sections

### 2. Easter Eggs
Try these hidden features:
- **Konami Code**: ↑↑↓↓←→←→BA
- **Logo Click**: Click the logo 5 times
- **Quiz**: Complete the archetype quiz

### 3. Responsive Design
Resize your browser to see the responsive design in action!

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using the port (Mac/Linux)
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Module Not Found

If you see module errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Clear the Vite cache:

```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run dev
```

## 🔥 Hot Tips

1. **Auto-imports**: Most modern editors support auto-imports for components
2. **Tailwind IntelliSense**: Install the Tailwind CSS IntelliSense VS Code extension
3. **React DevTools**: Install React DevTools browser extension for debugging
4. **Fast Refresh**: Vite's HMR is super fast - just save and see changes instantly!

## 📚 Next Steps

- Read the full [README.md](README.md) for more details
- Check out [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
- Explore the [Tailwind Documentation](https://tailwindcss.com/docs)
- Learn about [React Hooks](https://react.dev/reference/react)
- Understand [Vite](https://vitejs.dev/guide/)

## 💬 Need Help?

- Check the [Issues](https://github.com/georgebthomas-7002/superhumanframework/issues) page
- Review the documentation in this repo
- Reach out to the maintainers

## 🎊 Welcome to the Team!

You're now ready to work on the Superhuman Framework website. Remember:

> "Stop Drifting. Start Designing. Become Superhuman."

Happy coding! 🚀
