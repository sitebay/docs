import os
import shutil

# Renaming public to docs
if os.path.exists('public'):
    os.rename('public', 'docs')

# Checking if docs exists (this also handles the case when 'public' did not exist)
if os.path.exists('docs'):
    # Creating new directory support
    support_dir = os.path.join('docs', 'support')
    os.makedirs(support_dir, exist_ok=True)

    # Iterating over each item in the docs directory
    for item in os.listdir('docs'):
        # Creating absolute path
        item_path = os.path.join('docs', item)

        # Checking if the item is a directory and its name does not start with 'index' or 'sitemap'
        if os.path.isdir(item_path) and not item.startswith(('index','sitemap')):
            # Moving directory to the support directory
            shutil.move(item_path, support_dir)
        else:
            # Printing a message when a directory is not moved
            print(f"Directory '{item}' not moved to 'support'.")

print("Done!")
