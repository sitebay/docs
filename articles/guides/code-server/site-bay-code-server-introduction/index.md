---
slug: site-bay-code-server-introduction
author:
  name: SiteBay
  email: support@sitebay.org
keywords: ["getting started", "intro", "basics", "first steps"]
description: 'This tutorial will help you use Code Server with your WordPress site on SiteBay.'
og_description: "Learn how to use VS Code in the browser to manage your WP site with our Getting Started tutorial."
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-25
modified_by:
  name: SiteBay
published: 2024-04-04
title: SiteBay Code Server
show_on_frontpage: true
title_short: "Get Started"
weight: 10
icon: "book"
show_on_rss_feed: false
---

# Code Server: The Developer's Secret to WordPress Mastery

## Why This Browser-Based Editor Changes Everything About WordPress Development

Traditional WordPress development typically forces you into one of two frustrating workflows:

1. Install and maintain a complex local development environment with database synchronization issues
2. Edit files through clunky WordPress admin editors with no developer tooling

**SiteBay's Code Server eliminates these pain points entirely** by bringing the full power of Visual Studio Code directly to your browser. This revolutionary approach combines the convenience of browser-based editing with professional-grade development tools, creating the ultimate WordPress editing experience.

## Five Ways Code Server Transforms Your WordPress Development Process

### 1. Code From Anywhere, On Any Device

Free yourself from the constraints of your development machine:

- **Access your sites from any computer** with a modern browser - no software installation required
- **Make emergency fixes on the go** using tablets or borrowed computers
- **Collaborate seamlessly** with team members without environment configuration
- **Switch between devices** while maintaining your exact coding state

*"Code Server saved our launch day when our developer's laptop died. He borrowed a computer, logged in, and fixed the critical issue in minutes."* — SiteBay Customer

### 2. Experience the Full Power of VS Code in Your Browser

Enjoy all the features that make VS Code the world's favorite code editor:

- **Syntax highlighting** for WordPress-specific PHP, JavaScript, CSS, and HTML
- **Intelligent code completion** that understands WordPress hooks and functions
- **Built-in terminal** for running WP-CLI commands
- **Git integration** for version control
- **File tree navigation** for easy project browsing
- **Multiple tabs and split views** for efficient coding
- **Search and replace** across your entire site

### 3. WordPress-Specific Tooling Pre-Configured

Code Server comes pre-loaded with extensions and configurations optimized for WordPress development:

- **PHP Intelephense** - Advanced PHP code intelligence
- **WordPress Hooks IntelliSense** - Autocomplete for WordPress hooks
- **WordPress Snippets** - Common WordPress code patterns
- **ESLint & Prettier** - Code formatting and standards enforcement
- **Path Intellisense** - Autocompletion for file paths

### 4. Seamless Staging Environment Integration

Test changes thoroughly before they go live:

- **One-click staging access** - Switch between live and staging environments
- **Stage-specific WP-CLI commands** - Use `wp plugin list --path=/bitnami/stagewordpress` and similar commands
- **Isolated testing** - Experiment without affecting your live site
- **Quick deployment** - Easily move changes from staging to production

### 5. Enhanced Security and Permissions Management

Develop with confidence knowing your site remains secure:

- **Automatic application password handling** - No credential management required
- **Proper file permissions** - Never worry about breaking permissions again
- **Secure authentication** - Two-factor authentication compatible
- **Session management** - Automatic timeouts for enhanced security

## Getting Started with Code Server in 3 Simple Steps

### Step 1: Access Your Code Server

1. Log in to your [SiteBay dashboard](https://my.sitebay.org)
2. Navigate to your WordPress site
3. Click the "Code Server" button
4. Your browser-based VS Code environment will load automatically

### Step 2: Navigate Your WordPress Files

The familiar VS Code interface will appear with your WordPress site's files already loaded:

- `/bitnami/wordpress` - Your live site files
- `/bitnami/stagewordpress` - Your staging site files (if enabled)

Common WordPress directories you'll use:

- `wp-content/themes/your-theme` - Your active theme files
- `wp-content/plugins` - Plugin files
- `wp-content/uploads` - Media files

### Step 3: Make Your First Edit

1. Navigate to your theme's `style.css` file
2. Make a small change
3. Save the file (Ctrl+S or Command+S)
4. View your site to see the change immediately

## Pro Tips: Maximizing Your Code Server Experience

### Terminal Power-User Commands

Execute these commands in the built-in terminal for advanced functionality:

```
# View WordPress version
wp core version --path=/bitnami/wordpress

# List installed plugins on staging
wp plugin list --path=/bitnami/stagewordpress

# Check for theme updates
wp theme list --update=available --path=/bitnami/wordpress

# Run a database search and replace (use with caution!)
wp search-replace 'old-text' 'new-text' --path=/bitnami/wordpress
```

### Custom Environment Configuration

Create these files to customize your development environment:

- `.vscode/settings.json` - Editor preferences
- `.editorconfig` - Formatting standards
- `.eslintrc` - JavaScript linting rules
- `.prettierrc` - Code formatting rules

### Keyboard Shortcuts Worth Memorizing

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Quick file open | Ctrl+P | Cmd+P |
| Command palette | Ctrl+Shift+P | Cmd+Shift+P |
| Find in files | Ctrl+Shift+F | Cmd+Shift+F |
| Terminal toggle | Ctrl+` | Cmd+` |
| Split editor | Ctrl+\ | Cmd+\ |
| Format document | Shift+Alt+F | Shift+Option+F |

## Common Questions About Code Server

### How does Code Server compare to local development?

Code Server eliminates environment setup, offers instant access from any device, and provides a standardized development experience. While local development provides offline capability, Code Server offers superior convenience and consistency.

### Is there any performance difference compared to desktop VS Code?

The browser-based environment performs nearly identically to desktop VS Code for typical WordPress development tasks. You may notice minimal lag with very large files or complex operations, but most users report no perceptible difference.

### Can I install additional VS Code extensions?

Currently, Code Server comes pre-configured with essential WordPress development extensions. While custom extension installation isn't supported, we regularly update the included extensions based on user feedback.

### How are changes deployed to my live site?

When editing files in the `/bitnami/wordpress` directory, changes are applied instantly to your live site. For safer development, we recommend using the staging environment first, then deploying to production.

