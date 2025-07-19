<p align="center">
    <img src='/public/icons/android-chrome-192x192.png' />
</p>

<p align="center">
    <a href="https://www.github.com/pipipi-pikachu/PPTist/stargazers" target="_black"><img src="https://img.shields.io/github/stars/pipipi-pikachu/PPTist?logo=github" alt="stars" /></a>
    <a href="https://www.github.com/pipipi-pikachu/PPTist/network/members" target="_black"><img src="https://img.shields.io/github/forks/pipipi-pikachu/PPTist?logo=github" alt="forks" /></a>
    <a href="https://www.github.com/pipipi-pikachu/PPTist/blob/master/LICENSE" target="_black"><img src="https://img.shields.io/github/license/pipipi-pikachu/PPTist?color=%232DCE89&logo=github" alt="license" /></a>
    <a href="https://www.typescriptlang.org" target="_black"><img src="https://img.shields.io/badge/language-TypeScript-blue.svg" alt="language"></a>
    <a href="https://github.com/pipipi-pikachu/PPTist/issues" target="_black"><img src="https://img.shields.io/github/issues-closed/pipipi-pikachu/PPTist.svg" alt="issue"></a>
    <a href="https://gitee.com/pptist/PPTist" target="_black"><img src="https://gitee.com/pptist/PPTist/badge/star.svg?version=latest" alt="gitee"></a>
</p>

[Simplified Chinese](README_zh.md) | English

# 🎨 PPTist
> PowerPoint-ist (`/'pauəpɔintist/`), a web-based presentation (slideshow) application. This application replicates most of the commonly used features of Microsoft Office PowerPoint. It supports various essential element types such as text, images, shapes, lines, charts, tables, videos, audio, and formulas. You can edit and present slides directly in a web browser.

<b>Try it online👉：[https://pipipi-pikachu.github.io/PPTist/](https://pipipi-pikachu.github.io/PPTist/)</b>

# ✨ Highlights
1. <b>Easy Development</b>: Built with Vue 3.x and TypeScript, it does not rely on UI component libraries and avoids third-party components as much as possible. This makes styling customization easier and functionality extension more convenient.
2. <b>User Friendly</b>: It offers a context menu available everywhere, dozens of keyboard shortcuts, and countless editing detail optimizations, striving to replicate a desktop application-level experience.
3. <b>Feature Rich</b>: Supports most of the commonly used elements and functionalities found in PowerPoint, supports AI-generated PPTs, supports exporting in various formats, and offers basic editing and previewing on mobile devices.

# 👀 Front-Row Reminder
1. This project is a "Web Slideshow Application", not a "low-code platform", "H5 editor", "image editor", "whiteboard application", or similar tools.
2. The target audience for this project is <b>developers with needs for [Web slideshow] development; basic web development experience is required</b>. The provided link is merely a demo address and does not offer any online services. You should not use this project directly as a tool, nor does it support out-of-the-box functionality. If you simply need a service or tool, you can opt for more excellent and mature products such as: [Slidev](https://sli.dev/) or [revealjs](https://revealjs.com/).
3. Here are some summarized [Frequently Asked Questions](/doc/Q&A.md). When raising Issues or submitting PRs for the first time, be sure to read this document in advance.

# 🚀 Installation
```
npm install

npm run dev
```
Browser access: http://127.0.0.1:5173/

> Note: If you deploy this project on your own server and find that it fails to initialize, it's because the initialization data is stored in the author's private object storage and is not publicly accessible. You'll need to transfer the data to your own server, object storage service, database, or front-end local storage.

# 📚 Features
### Basic Features
- History (undo, redo)
- Shortcuts
- Right-click menu
- Export local files (PPTX, JSON, images, PDF)
- Import and export pptist files
- Print
- AI PPT
### Slide Page Editing
- Add/delete pages
- Copy/paste pages
- Adjust page order
- Create sections
- Background settings (solid color, gradient, image)
- Set canvas size
- Gridlines
- Rulers
- Canvas zoom and move
- Theme settings
- Extract slides style
- Speaker notes (rich text)
- Slide templates
- Transition animations
- Element animations (entrance, exit, emphasis)
- Selection panel (hide elements, layer sorting, element naming)
- Labels for Page and Node Types (usable for template-related features)
- Find/replace
- Annotations
### Slide Element Editing
- Add/delete elements
- Copy/paste elements
- Drag to move elements
- Rotate elements
- Scale elements
- Multiple element selection (marquee, point selection)
- Group multiple elements
- Batch edit multiple elements
- Lock elements
- Magnetic alignment of elements (move and scale)
- Adjust element layer
- Align elements to canvas
- Align elements to other elements
- Evenly distribute multiple elements
- Drag to add text and images
- Paste external images
- Set element coordinates, size, and rotation
- Element hyperlinks (link to webpage, link to other slide pages)
#### Text
- Rich text editing (color, highlight, font, font size, bold, italic, underline, strikethrough, subscript, inline code, quote, hyperlink, alignment, numbering, bullet points, paragraph indent, clear formatting)
- Line height
- Character spacing
- Paragraph spacing
- First line indent
- Fill color
- Border
- Shadow
- Transparency
- Vertical text
- AI Rewrite/Expand/Abbreviate
#### Images
- Crop (custom, shape, aspect ratio)
- Rounding
- Filters
- Tint (mask)
- Flip
- Border
- Shadow
- Replace image
- Reset image
- Set as background
#### Shapes
- Draw any polygon
- Draw any line (unclosed shape simulation)
- Replace shape
- Fill (solid color, gradient, image)
- Border
- Shadow
- Transparency
- Flip
- Shape format painter
- Edit text (supports rich text, similar to text element’s rich text editing)
#### Lines
- Straight lines, polylines, curves
- Color
- Width
- Style (solid, dashed, dotted)
- Endpoint style
#### Charts (bar, column, line, area, scatter, pie, donut, radar)
- Chart type conversion
- Data editing
- Background fill
- Theme color
- Coordinate system and axis text color
- Other chart settings
- Border
#### Tables
- Add/delete rows and columns
- Theme settings (theme color, header, total row, first column, last column)
- Merge cells
- Cell styles (fill color, text color, bold, italic, underline, strikethrough, alignment)
- Border
#### Video
- Preview cover settings
- Auto play
#### Audio
- Icon color
- Auto play
- Loop play
#### Formulas
- LaTeX editing
- Color settings
- Formula line thickness settings
### Slide Show
- Brush tools (pen/shape/arrow/highlighter annotation, eraser, blackboard mode)
- Preview all slides
- Bottom thumbnails navigation
- Timer tool
- Laser pointer
- Auto play
- Speaker view
### Mobile
- Basic editing
  - Add/delete/copy/note/undo redo pages
  - Insert text, images, rectangles, circles
  - General element operations: move, scale, rotate, copy, delete, layer adjust, align
  - Element styles: text (bold, italic, underline, strikethrough, font size, color, alignment), fill color
- Basic preview
- Play preview

# 👀 FAQ
Some common problems: [FAQ](/doc/Q&A.md)

# 🎯 Supplement
There is currently no complete development documentation, but the following documents may be of some help to you:
- [Project Directory and Data Structure](/doc/DirectoryAndData.md)
- [Fundamentals of Canvas and Elements](/doc/Canvas.md)
- [How to Customize an Element](/doc/CustomElement.md)
- [About AIPPT](/doc/AIPPT.md)

Here are some auxiliary development tools/repositories:
- Import PPTX file reference: [pptxtojson](https://github.com/pipipi-pikachu/pptxtojson)
- Draw shape: [svgPathCreator](https://github.com/pipipi-pikachu/svgPathCreator)

# 📄 License
[AGPL-3.0 License](https://github.com/pipipi-pikachu/PPTist/blob/master/LICENSE) | Copyright © 2020-PRESENT [pipipi-pikachu](https://github.com/pipipi-pikachu)

# 🧮 Commercial
If you wish to use this project for commercial gain, I hope you will respect open source and strictly adhere to the AGPL-3.0 license, giving back to the open-source community. Or contact the author for an independent commercial license.

# 🧮 Commercial Use
- This project is prohibited from being used for commercial purposes with its source code closed. If you wish to use PPTist for commercial project profit, please respect open source and **strictly follow the [AGPL-3.0 License](https://www.gnu.org/licenses/agpl-3.0.html)**, giving back to the open-source community (this is advocated by the author);
- If, for any reason, you must use it for closed-source commercial purposes and cannot comply with the AGPL-3.0 license, you may choose to:
    1. Use the earlier Apache 2.0 licensed version [ (this version was last updated in May 2022 and is no longer maintained; click here to download the code)](https://github.com/pipipi-pikachu/PPTist/archive/f1a35bb8e045124e37dcafd6acbf40b4531b69aa.zip);
    2. Become a significant contributor to the project (becoming a contributor after violating the agreement is not included in this option), which includes:
        - Your code is referenced as a dependency by this project, including: npm installation, script/style file references, code snippet references (references will be noted);
        - You have submitted important PRs or Issues to this project (judged subjectively by the author; compliant PRs or Issues will be tagged with `important contribution`);
        - You have been involved in the maintenance/promotion of this project for a long time, such as providing useful auxiliary tools or creating numerous templates for this project (judged subjectively by the author);
    3. [Contact the author via email](mailto:pipipi_pikachu@163.com) to purchase an independent commercial license. Independent license pricing:
        - 1999 yuan per year
        - 2999 yuan for three years
        - 5499 yuan for permanent use
        - The above prices do not apply if you are found by the author to have violated the agreement;
- It is recommended to prioritize compliance with the AGPL-3.0 license. If you wish to purchase an independent commercial license, please note:
    - An independent commercial license means: authorizing you to use the code for commercial purposes without having to comply with the AGPL-3.0 license;
    - This is an authorization only (not selling software or services). There are no other "Ngh advanced versions/paid versions," no online services are provided, no technical support or consultation is provided, no custom development is provided, and no directly deliverable products are provided;
    - This software is not ready to use out of the box. You will need to connect at least your own backend data reading/storage capabilities. Therefore, using this project requires basic web development experience (understanding what frontend & backend are, where data comes from & how it's stored, what an interface is, what cross-domain is, etc.);
    - After authorization, you are still prohibited from reselling, licensing, open-sourcing, or maliciously distributing the source code;
    - After authorization, if needed, AI PPT related backend logic and current template data can be provided for reference (but they are very simple, with no core logic, and it is recommended to implement them yourself);
    - Please conduct thorough research in advance to determine if PPTist meets your requirements, both in terms of functionality (whether it can meet business needs) and development (whether you accept the current technology stack/implementation plan);
    - The author cannot "provide legal documents to prove that my Github account belongs to me." If you are concerned about this, please consider other options;
    - Objects on the [blacklist](/doc/Blacklist.md) are not eligible to obtain independent commercial licenses or contribute code through payment;
    - The author advocates asynchronous communication. **Do not add WeChat/QQ/phone numbers, etc.** For any authorization-related questions, please contact by email. For feature requests/bug reports/technical solution inquiries, please use [Issues](https://github.com/pipipi-pikachu/PPTist/issues). Thank you for your understanding.

---
# 🔔 Other Information
## What is the AGPL-3.0 License?
The core requirements of the license, explained in simple terms, are as follows:
- **Open Source Obligation**: If you use AGPL code, regardless of how you or your downstream users use or modify it, you must fully disclose all your final code and continue to open-source it under the AGPL license, maintaining its contagiousness. This does not mean just providing the modified parts, nor does rewriting the framework disconnect it from the original code.
- **Network Services Must Also Be Open Source**: Even if you only use AGPL code to build a website or network service, you must comply with the aforementioned **open source obligation** when others use your service via the network.
- **Retain Copyright Notices**: You cannot delete the original author's information and license declarations in the code; you must inform everyone where the code came from.
- **No Additional Restrictions**: You cannot add restrictions to AGPL code, such as preventing others from redistributing it or requiring them to pay to use the code.
- **Disclaimer**: The author does not guarantee that the code is bug-free and is not responsible for the consequences of its use.

For detailed license content, please refer to the official documentation: [AGPL-3.0 License](https://www.gnu.org/licenses/agpl-3.0.html)