# Guide to Editing Content in Github

To easily locate and edit content, use the [Content Panel](https://capucine-et-tournesol.com/ct-panel), which provides direct links to the French and English files.

This guide is a reference for editing, formatting, and avoiding mistakes when working with `.md` and `.json` files.

## How Content is Organized

All text content for the site is located in the `src/content` folder of this code repository. This folder has two subfolders:

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
2. Click the link for the page file you want to edit (English or French).
   - GitHub will open the file directly in edit view.
   - If not logged in, you’ll be prompted to log in first.
3. Make your text changes.
   - In **.json files**, only edit the text inside the quotes (`" "`).
   - In **.md files**, edit the text content, headings, or paragraphs.
   - Use the **Preview** tab (for Markdown) to check formatting and verify your edits.
4. Add a short description of your changes.
5. Click **Commit changes** (green button).

Once committed, the site will automatically redeploy with your changes after a short delay.

## Editing Markdown Basics

Most of this site’s text content is stored in Markdown files (`.md`).

For editing, use these helpful Markdown formatting guidelines. In most cases, you can simply edit the text directly.

### Paragraphs

Write normally and leave a blank line between paragraphs.

**Simple example:**

```md
This is paragraph one.

This is another paragraph.
```

---

### Headings

Use `#` at the start of a line:

```
# Main Title   → <h1> (used for main page title)
## Section     → <h2> (used for section headings)
### Subsection → <h3> (used for subheadings)
```

---

### Bold and Italic

Use `*` around words or sentences to bold or italicize:

```
**Bold text** → Bold
*Italic text* → Italic
```

---

### HTML and Markdown

Sometimes HTML tags are used in markdown for layout purposes.

⚠️ Do not remove or edit the HTML tags. Only change the text inside.

```html
<p class="...">Only edit the text inside like here.</p>
```

Always leave a **blank line between Markdown text and HTML tags**.  
 Example:

```md
<div class="mission-intro">

This line is inside the div.

</div>
```

For further details, refer to the [Markdown guide](https://www.markdownguide.org/basic-syntax/) for help with text formatting.

---

## Editing JSON Files

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

```json
{
  "text1": ""
}
```

---

## Tips & Recovery

- Always double-check spelling and formatting before saving.
- You can preview `.md` changes using GitHub’s **Preview** tab.
- You can use the breadcrumb path at the top of GitHub to navigate back to folders.
- If you make a mistake, use the **History** tab in GitHub to restore an earlier version.

---

## Editing Without the Content Panel

You can also browse files directly in GitHub. This is optional if you prefer navigating manually instead of using the Content Panel:

1. Go to `src/content/en` or `src/content/fr`.
2. Find the file matching the page name (e.g., `mission.md`, `products.json`).
3. Edit as described above.
