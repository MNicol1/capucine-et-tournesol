# Guide to Editing Content in Github

For the easiest way to locate and edit files, use the [Content Panel](https://capucine-et-tournesol.com/ct-panel). It provides direct links to the correct French and English files.

Once you open a file from the panel, GitHub will take you straight to the editor. (If you’re not logged in yet, GitHub will prompt you to log in first.)

This guide is a **detailed reference** for editing, formatting, and avoiding mistakes when working with `.md` and `.json` files.

## How Content is Organized

All text content for the site is located in the `src/content` folder. This folder has two subfolders:

- **en/** → English content
- **fr/** → French content

The content files are organized and named according to their associated **page** (e.g., `mission.md` for the "Our Mission" page) or **component** (e.g., `header.json`, `footer.json`).

Content is stored in either **Markdown (.md)** or **JSON (.json)** format:

- **JSON** → short, functional text such as labels, navigation links, buttons, image alt text, or page metadata.
- **Markdown** → longer content such as paragraphs, articles, or sections with headings.

Some pages use only JSON (e.g., **Contact** or **Products**) because their content is structured rather than long-form text. Some Markdown pages are paired with a small JSON file (e.g., `mission-meta.json`) to hold short items such as navigation headings, meta titles, or page labels.

👉 **Quick rule:**

If it’s short and structural → it's in JSON files.

If it’s long and formatted → it's in Markdown files.

## How to Edit Content (via Content Panel)

1. Open the [Content Panel](https://capucine-et-tournesol.com/ct-panel).
2. Click the link for the file you want to edit (English or French).
   - GitHub will open the file directly in edit view.
   - If not logged in, you’ll be prompted to log in first.
3. Make your text changes.
   - In **.json files**, only edit the text inside the quotes (`" "`).
   - In **.md files**, edit the content, headings, or paragraphs.
   - Use the **Preview** tab (for Markdown) to check formatting and verify your edits.
4. Add a short description of your changes.
5. Click **Commit changes** (green button).

Once committed, the site will automatically redeploy with your changes after a short delay.

## Basic Rules of Editing Markdown (.md files):

The majority of this site’s text content is stored in Markdown files (those with an .md extension).

For editing purposes, here are helpful markdown file format instructions. For the most part, you can just edit the text content directly where you see it.

### Paragraphs

Write normally and leave a blank line between paragraphs.

**Simple example:**

```md
This is paragraph one.

This is another paragraph.
```

---

### Headings

Use # at the start of a line:

```
# Main Title   → <h1> (used for main page title)
## Section     → <h2> (used for section headings)
### Subsection → <h3> (used for subheadings)
```

---

### Bold and Italic

```
**Bold text** → Bold
*Italic text* → Italic
```

---

### HTML and Markdown

Sometimes HTML tags are used in markdown for layout purposes.

```html
⚠️ Do not remove or edit the html tags. Only change the text inside.

<p class="...">. Only edit the text inside like here.</p>
```

Always leave a **blank line between Markdown text and HTML tags**.  
 Example:

```md
<div class="mission-intro">

This line is inside the div.

</div>
```

For further details, refer to the <a href="https://www.markdownguide.org/basic-syntax/" target="_blank">Markdown guide</a> for help with text formatting.

## Editing JSON files

- Only change the text inside the quotes (`" "`).
- Always keep **commas, quotes, and brackets** intact.
- Use straight quotes (`"`) — not smart quotes (“ ”).
- If it’s the last line in the file, do not add a trailing comma.

Example:

```json
{
  "text1": "Where Eating Becomes Nourishment",
  "text2": "Serving the Mile-End for Over 30 Years"
}
```

To hide or disable text without deleting the line, replace with empty quotes:

{<br/>
"text1": ""<br/>
}

## Tips & Recovery

- Double-check spelling and formatting before saving.
- You can preview `.md` changes using GitHub’s **Preview** tab.
- You can use the breadcrumb path at the top of GitHub to navigate back to folders.
- If you make a mistake, use the **History** tab in GitHub to restore an earlier version.

---

## Editing Without the Content Panel

You can also browse files directly in GitHub. This is optional if you prefer navigating manually instead of using the Content Panel:

1. Go to `src/content/en` or `src/content/fr`.
2. Find the file matching the page name (e.g., `mission.md`, `products.json`).
3. Edit as described above.
