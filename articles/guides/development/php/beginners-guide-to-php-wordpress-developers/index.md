---
slug: beginners-tutorial-to-php-wordpress-developers
author:
  name: SiteBay
  email: support@sitebay.org
description: 'PHP basics for WordPress development on SiteBay.'
keywords: ['php', 'wordpress', 'development', 'SiteBay']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2024-12-04
modified_by:
  name: SiteBay
image: get-started-php.png
title: "PHP for WordPress Developers"
contributor:
  name: SiteBay
aliases: ['/development/php/beginners-tutorial-to-php/']
---

PHP powers WordPress. Learn the basics to customize your SiteBay site.

## Why Learn PHP

- Customize beyond themes/plugins
- Create unique functionality
- Understand how WordPress works

## PHP Basics

```php
<?php
// Variables
$name = "SiteBay";

// Functions
function greet($name) {
    return "Hello, " . $name;
}

// Conditionals
if ($condition) {
    // do something
}

// Loops
foreach ($items as $item) {
    echo $item;
}
?>
```

## Create Your First Plugin

1. Go to `wp-content/plugins/`
2. Create `my-plugin.php`

```php
<?php
/*
Plugin Name: My Plugin
Description: My first plugin
*/

add_filter('admin_footer_text', function() {
    return 'Custom footer text';
});
```

3. Activate in WordPress Dashboard → Plugins

## Key Concepts

| Concept | Purpose |
|---------|---------|
| Hooks | Inject code at specific points |
| Filters | Modify data |
| Actions | Execute code on events |

## Best Practices

- Sanitize user inputs
- Use WordPress functions (not raw PHP)
- Check WordPress Codex for documentation
