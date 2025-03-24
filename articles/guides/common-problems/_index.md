---
author:
  name: SiteBay
  email: support@sitebay.org
description: 'A go-to guide for troubleshooting common WordPress problems on SiteBay, designed to get your site running smoothly again in no time.'
keywords: ["wordpress", "troubleshooting", "common problems", "fixes"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases: ['/wordpress/']
published: 2024-04-29
title: Troubleshooting WordPress on SiteBay
show_in_lists: true
---

# The Ultimate WordPress Troubleshooting Guide

## Why Even Experienced Developers Run Into These Common Problems

WordPress powers over 43% of all websites, but even the most experienced developers regularly encounter frustrating issues that can bring projects to a standstill. Whether you're building your first site or managing dozens of WordPress installations on SiteBay, this comprehensive troubleshooting toolkit will help you diagnose and fix problems in record time.

**What makes this guide different?** We've focused on the specific issues SiteBay users encounter in our unique Kubernetes-powered hosting environment, with proven solutions that work with our platform's architecture.

## The 6 Most Common WordPress Problems (And Their Quick Solutions)

### 1. The Dreaded White Screen of Death (WSOD)

**Symptoms:** Blank white page, no error messages, complete site lockout or specific pages affected

**Why It's Happening:** This notorious issue typically stems from:
- PHP memory limits being exceeded
- Plugin conflicts or errors
- Theme function conflicts
- Core WordPress file corruption

**Emergency Solutions:**

1. **Enable WordPress Debug Mode**: 
   
   Add these lines to your wp-config.php via Code Server to reveal hidden errors:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```

2. **Access via Safe Mode**:
   
   Temporarily disable all plugins with this WP-CLI command in Code Server:
   ```bash
   wp plugin deactivate --all
   ```

3. **Increase PHP Memory Limit**:
   
   SiteBay automatically allocates memory based on your plan, but you can request a temporary increase via support if needed.

4. **Theme Troubleshooting**:
   
   Switch to a default theme using:
   ```
   wp theme activate twentytwentythree
   ```

> **Pro Tip:** Use SiteBay's Time Machine feature to restore to a recent working state while you diagnose the issue. This gives you breathing room to solve the problem without site downtime.

### 2. Login Issues That Lock You Out

**Symptoms:** Unable to access wp-admin, login page refreshes without errors, or "incorrect password" despite correct credentials

**Why It's Happening:**
- Corrupted WordPress cookies
- Plugin conflicts affecting authentication
- Database table issues
- Security plugins blocking legitimate access

**Emergency Solutions:**

1. **Clear Browser Data**:
   
   Start with the simplest fix - clear cookies and cache for your site's domain.

2. **Password Reset Bypass**:
   
   If the normal reset doesn't work, use WP-CLI:
   ```
   wp user update USERNAME --user_pass=newpassword
   ```

3. **Check User Role Integrity**:
   
   Verify admin role is intact:
   ```
   wp user list --role=administrator
   ```

4. **Disable Security Plugins**:
   
   If you can access the database directly:
   ```sql
   UPDATE wp_options SET option_value = 'a:0:{}' WHERE option_name = 'active_plugins';
   ```

### 3. Performance Issues That Frustrate Visitors

**Symptoms:** Slow page loads, high server response time, timeouts during admin actions

**Why It's Happening:**
- Unoptimized images or excessive media
- Too many or poorly configured plugins
- Database bloat and inefficient queries
- Missing caching implementation

**Emergency Solutions:**

1. **Identify Resource Hogs**:
   
   Use SiteBay's integrated performance monitoring to identify problematic plugins:
   ```
   wp plugin list --format=csv | grep active
   ```

2. **Database Optimization**:
   
   Clean up your database:
   ```
   wp db optimize
   wp transient delete --all
   wp post delete $(wp post list --post_status=trash --format=ids)
   ```

3. **Image Optimization**:
   
   Bulk optimize existing images:
   ```
   wp media regenerate --only-missing
   ```

4. **Enable Object Caching**:
   
   SiteBay provides Redis object caching - ensure it's activated in your site settings.

> **Performance Breakthrough:** Enable SiteBay's CDN integration to instantly reduce load times by 30-60% for global audiences. This simple setting change delivers more performance impact than hours of manual optimization.

### 4. Database Connection Errors That Bring Everything Down

**Symptoms:** "Error establishing a database connection" message, intermittent connectivity, partial site functionality

**Why It's Happening:**
- Database credentials mismatch
- Corrupted database tables
- Excessive database connections
- Server resource limitations

**Emergency Solutions:**

1. **Verify Database Credentials**:
   
   Check wp-config.php for correct settings:
   ```php
   define('DB_NAME', 'database_name');
   define('DB_USER', 'database_user');
   define('DB_PASSWORD', 'database_password');
   define('DB_HOST', 'database_host');
   ```

2. **Repair Database Tables**:
   
   Run WordPress's built-in repair function by adding to wp-config.php:
   ```php
   define('WP_ALLOW_REPAIR', true);
   ```
   Then visit: yourdomain.com/wp-admin/maint/repair.php

3. **Check Database Size and Limits**:
   
   Verify you haven't exceeded your plan's database limits:
   ```bash
   wp db size
   ```

4. **Emergency Database Reset**:
   
   If tables are severely corrupted, SiteBay's Time Machine can restore your database to a previous working state.

### 5. Update Failures That Leave Sites Partially Broken

**Symptoms:** Updates stuck at specific percentage, partial theme/plugin functionality, mixed content warnings

**Why It's Happening:**
- Insufficient file permissions
- Incompatibilities between components
- Server timeout during update process
- Failed or incomplete file transfers

**Emergency Solutions:**

1. **Manual Update Mode**:
   
   Bypass automatic updater:
   ```
   wp core update --force
   wp plugin update --all
   wp theme update --all
   ```

2. **Identify Stuck Updates**:
   
   Check update status:
   ```
   wp core check-update
   wp plugin list --update=available --format=csv
   ```

3. **Restore and Retry**:
   
   Use SiteBay's Time Machine to restore pre-update, then update components individually rather than in bulk.

4. **Staging Environment Update**:
   
   Test updates on a staging site first (included with all SiteBay plans) to identify potential issues.

### 6. Permalink and 404 Errors That Affect SEO

**Symptoms:** Pages return 404 errors despite existing, new content unreachable, incorrect URL structures

**Why It's Happening:**
- Permalink settings not saved properly
- .htaccess issues (though SiteBay uses Nginx, not Apache)
- Permalink cache conflicts
- Custom permalink structure errors

**Emergency Solutions:**

1. **Resave Permalinks**:
   
   Often the simplest fix: go to Settings > Permalinks and click Save Changes without making any changes.

2. **Flush Rewrite Rules**:
   
   Force regeneration with:
   ```
   wp rewrite flush --hard
   ```

3. **Check Permalink Structure**:
   
   Verify your structure:
   ```
   wp option get permalink_structure
   ```

4. **Nginx Configuration Check**:
   
   SiteBay automatically manages Nginx configs, but contact support if you suspect a server-level permalink issue.

## Advanced Troubleshooting for Persistent Problems

### Debug Mode Tools You Need to Master

Enable these debug options in wp-config.php for deeper insights:

```php
// Display all PHP errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// WordPress specific debugging
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', true);
define('SAVEQUERIES', true);
```

### When to Use SiteBay's Advanced Platform Features

| Problem Type | SiteBay Feature to Use | When to Use It |
|--------------|------------------------|----------------|
| Content Issues | Time Machine | When content was accidentally deleted or corrupted |
| Code Changes | Git Integration | For tracking theme/plugin development changes |
| Testing Updates | Staging Environment | Before applying major updates to production |
| Performance Analysis | Performance Monitoring | When identifying resource-intensive plugins |
| Security Incidents | Security Scans | After suspected compromise or unusual activity |

### Creating an Emergency Recovery Plan

Prepare for future emergencies by:

1. **Setting Up Regular Backups**:
   ```
   wp schedule-backup daily
   ```

2. **Documenting Your Site Structure**:
   ```
   wp plugin list --format=csv > plugins-inventory.csv
   wp theme list --format=csv > themes-inventory.csv
   ```

3. **Creating Emergency Access Credentials**:
   ```
   wp user create emergency_user emergency@example.com --role=administrator --user_pass=secure_temporary_password
   ```

4. **Maintaining a Local Development Copy**:
   Use SiteBay's Git integration to keep local and production environments synchronized.

