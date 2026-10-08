---
slug: beginners-tutorial-to-php-wordpress-developers
author:
  name: SiteBay
  email: support@sitebay.org
description: PHP implements much of WordPress's server-side behavior. Start with a small plugin in a development
  site rather than editing core files.
keywords:
- php
- wordpress
- development
- SiteBay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
image: get-started-php.png
title: PHP for WordPress
contributor:
  name: SiteBay
aliases:
- /development/php/beginners-tutorial-to-php/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- wp-basics
---

PHP implements much of WordPress's server-side behavior. Start with a small plugin in a development site rather than editing core files.

## Create a test plugin

Create `wp-content/plugins/sitebay-example/sitebay-example.php` in the selected development installation:

```php
<?php
/**
 * Plugin Name: SiteBay Example
 * Description: Adds a test footer message in WordPress administration.
 */
if (!defined('ABSPATH')) {
    exit;
}
add_filter('admin_footer_text', function ($text) {
    return esc_html('Development site');
});
```

This changes the administration footer after activation. It does not modify posts or create a public page.

## Check it

Run `php -l` against the file to check syntax, then activate the plugin on the development site. Open administration and verify the footer. Deactivate the plugin to remove the behavior.

## Add functionality safely

Actions run at defined points; filters return modified values. Validate incoming data, check authorization for privileged operations, and escape output for its context. A nonce does not replace a capability check.

Use the [PHP tutorial](https://www.php.net/manual/en/tutorial.php) for the language and [WordPress plugin security](https://developer.wordpress.org/plugins/security/) for the application boundary.
