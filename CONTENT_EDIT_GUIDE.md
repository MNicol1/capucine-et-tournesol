# Guide to Editing Content within Github

All text content is located in the src/content folder. The content folder has both an EN folder (English) and FR folder (for French version).

The content files are organized and named according to their associated page (i.e. mission.md for the "Our Mission" page) or component (header or footer).

The content files are either in .json or .md file formats (or sometimes both). Some pages do not have .md files because the content is not in long form or it is specifically structured (i.e Contact or Products page). But all text content can be edited within the either the .json or .md files.

Some .md files are paired with a small .json file (e.g. mission-meta.json). These hold short text like navigation headings, meta titles, or page labels.

## What goes where (.json vs .md) ?

JSON -> Small, functional pieces of text that affect the page’s structure, not the main content.
i.e. lables, navigation links, button text, products tables, img alt text, short captions, etc.
MD -> Main, or any long content > paragraphs, articles, long sections of text and associated headings.

Quick rule:

If it’s short and structural → it's in JSON files.

If it’s long and formatted → it's in Markdown files.

## How to Edit Content in GitHub

### 1. Log in

- Go to [github.com](https://github.com) and sign in with your account. (Setup 2FA for added security)

### 2. Find the content

- Within the site's repository, open the `src/content` folder.
- Choose the correct language folder:
  - `en/` → English content
  - `fr/` → French content

### 3. Pick the file

- Look for the file name that matches the page you want to edit.  
  Examples:
  - `mission.md` → “Our Mission” page
  - `products.json` → "Products" page

### 4. Edit the file

- Click on the file.
- In the top-right, click the **pencil icon** (✏️) to edit.
- Make your text changes directly:
  - In `.json` files → only edit the text inside the quotes (`" "`).
  - In `.md` files → edit the text content, headings, or paragraphs as explained earlier in this guide.
- You can preview these changes by clicking **Preview** tab.

### 5. Save your changes

- Scroll down to the bottom of the page.
- Add a short description of what you changed in the “Commit changes” box (e.g., _“Updated mission statement wording”_).
- Click **Commit changes** (the green button).

### 6. Publish

- Once committed, your changes are automatically saved in the repository, and the changes will appear live on the site after a short delay.

---

⚠️ **Tips**

- Always double-check spelling and formatting before saving.
- If you make a mistake, you can go back to the file history and restore an earlier version.
- If you get lost in the folders, use the **breadcrumb path** at the top of the GitHub page (the clickable folder names) to go back to the project root or the `content` folder.

## Basic Rules of Editing Markdown (.md files):

The majority of this site’s text content is stored in Markdown files (those with an .md extension).

For editing purposes, here are helpful markdown file format instructions. For the most part, you can just edit the text content directly where you see it.

### Paragraphs

For paragraph spacing, just type normally and leave a space in between sentence(s) to create new paragraphs.

**Simple example:**

This a paragraph one. With another sentence here as example.

This is another paragraph. This creates a space in between.

---

### Headings

Use `#` at the start of a line, or `##`, `###`, etc. for lower heading hiearchy.

i.e.:

## Our Slow-Cooked Dishes

eguals to

```
## Our Slow-Cooked Dishes

# Main Title   → <h1> (used for main page title)
## Section     → <h2> (used for section headings)
### Subsection → <h3> (used for subheadings)
```

---

### Bold and Italic

- Bold → `**This is bolded text**` → **text**
- Italic → `*This is italic text*` → _text_ or _text_

---

### Special Format and Styling

Sometimes you’ll see HTML tags within the markdown, like this:

```html
<p class="content-centered">Text here</p>

⚠️ Do not remove or edit the html tags. Leave them as is.

<p class="...">. Only edit the text inside.</p>
```

## Editing JSON files

Only change the text within the quotes. Be sure to always leave the text within quotation marks, and keep or place a comma (,) after the last quotation mark if there is a line after the first. But if it is the last line in a json file do not have a comma.

⚠️ Always use straight quotes " not smart quotes “ ”.
⚠️ Don’t remove commas between items.

Example:

{
"text1": "Where Eating Becomes Nourishment"
}

{
"text1": "Where Eating Becomes Nourishment",
"text2": "Serving the Mile-End for Over 30 Years"
}

If you want to hide or remove text without deleting the line, replace the text with empty quotes "". For example:

{
"text1": ""
}

### Important Notes When Mixing Markdown and HTML

- Always leave a **blank line between Markdown text and HTML tags**.  
  Example:

  ```md
  <div class="mission-intro">

  This line is inside the div.

  </div>
  ```
