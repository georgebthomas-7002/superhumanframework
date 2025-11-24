# Contributing to Superhuman Framework

Thank you for your interest in contributing to the Superhuman Framework website! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/superhumanframework.git
   cd superhumanframework
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Workflow

### Running the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Code Style Guidelines

### General Principles

- Write clean, readable, and maintainable code
- Follow existing code patterns and conventions
- Keep components small and focused on a single responsibility
- Use meaningful variable and function names

### React/JSX Guidelines

- Use functional components with hooks
- Keep components in the `src/components/` directory
- Keep pages in the `src/pages/` directory
- Use proper prop validation
- Avoid inline styles; use Tailwind CSS utility classes

### CSS/Tailwind Guidelines

- Use Tailwind utility classes whenever possible
- Follow the existing color scheme:
  - Navy: `#142d63`
  - Teal: `#028393`
  - Orange: `#f65625`
  - Soft Orange: `#faaa68`
- Ensure responsive design for all screen sizes

### File Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── content/         # Markdown content files
├── config/          # Configuration files
├── utils/           # Utility functions
└── styles/          # Custom styles
```

## 🧪 Testing

Before submitting a pull request:

1. Test your changes locally
2. Ensure the build completes without errors
3. Check responsiveness on different screen sizes
4. Test in multiple browsers (Chrome, Firefox, Safari)

## 📤 Submitting Changes

1. **Commit your changes** with a clear message:
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request** on GitHub with:
   - A clear title describing the change
   - A detailed description of what changed and why
   - Screenshots for UI changes
   - Reference to any related issues

### Commit Message Guidelines

Use conventional commit prefixes:

- `Add:` New features or content
- `Fix:` Bug fixes
- `Update:` Updates to existing features
- `Refactor:` Code refactoring
- `Docs:` Documentation changes
- `Style:` Code style changes (formatting, etc.)
- `Test:` Adding or updating tests

Example:
```
Add: Contact form validation
Fix: Mobile menu not closing on navigation
Update: Hero section copy and CTA
```

## 🐛 Reporting Bugs

If you find a bug:

1. Check if it's already reported in the Issues
2. If not, create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

## 💡 Feature Requests

We welcome feature suggestions! Please:

1. Check existing issues first
2. Create a new issue describing:
   - The problem you're trying to solve
   - Your proposed solution
   - Any alternative solutions considered

## 📋 Code Review Process

1. All submissions require review
2. Maintainers will review your PR within 5 business days
3. Address any requested changes
4. Once approved, a maintainer will merge your PR

## 🤝 Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

## ❓ Questions?

If you have questions about contributing:

- Check existing documentation
- Review closed issues for similar questions
- Open a new issue with the `question` label

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to the Superhuman Framework! Together, we're helping people stop drifting and start designing their lives. 🚀
