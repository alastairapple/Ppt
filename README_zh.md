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

Simplified Chinese | [English](README.md)

# 🎨 PPTist
> PowerPoint-ist (/'pauəpɔintist/), a web-based online presentation (slide) application, replicates most of the commonly used functions of Office PowerPoint. It supports the most common element types: text, images, shapes, lines, charts, tables, videos, audio, and formulas. You can edit and present slides in a web browser.

<b>Online Experience Link 👉: [https://pipipi-pikachu.github.io/PPTist/](https://pipipi-pikachu.github.io/PPTist/)</b>

# ✨ Project Features
1. Easy to Develop: Built with Vue3.x + TypeScript, no UI component library dependency, minimal reliance on third-party components, making style customization and feature expansion more effortless.
2. Easy to Use: Context menus everywhere, dozens of keyboard shortcuts, and countless refinements to editing details, striving to replicate a desktop application-level experience.
3. Rich Functionality: Supports most common elements and functions in PPT, AI-generated PPT, export in multiple formats, basic editing and preview on mobile devices, and more.

# 👀 Important Notice
1. This project is a "Web Slides Application," not a "Low-Code Platform," "H5 Editor," "Image Editor," "Whiteboard Application," etc.
2. The target audience for this project is **developers who need to develop web slides, requiring basic web development experience**. The provided link is just a demo address and does not offer any online services. You should not use this project directly as a tool, nor does it support out-of-the-box usage. If you just need a service or tool, consider more excellent and mature products such as [Slidev](https://sli.dev/), [revealjs](https://revealjs.com/), etc.
3. Here we have summarized some [Frequently Asked Questions](/doc/Q&A.md). When submitting Issues and PRs for the first time, please be sure to read this document in advance.

# 🚀 Project Running
```
npm install

npm run dev
```
Visit in your browser: http://127.0.0.1:5173/

> Note: If you deploy this project on your own server and find that initialization fails, it's because the initialization data is stored in the author's private object storage, which is not publicly accessible. You will need to transfer the data to your own server/object storage service/database/local frontend storage.

# 📚 Feature List
### Basic Features
- History (Undo, Redo)
- Keyboard Shortcuts
- Context Menu
- Export Local Files (PPTX, JSON, Images, PDF)
- Import/Export Proprietary .pptist Files
- Print
- AI Generate PPT
### Slide Page Editing
- Add, Delete Pages
- Adjust Page Order
- Copy and Paste Pages
- Slide Sectioning
- Background Settings (Solid Color, Gradient, Image)
- Set Canvas Size
- Gridlines
- Rulers
- Canvas Zoom and Pan
- Theme Settings
- Extract Style from Existing Slides
- Speaker Notes (Rich Text)
- Slide Templates
- Page Transition Animations
- Element Animations (Entrance, Exit, Emphasis)
- Selection Panel (Hide Elements, Sort Layers, Name Elements)
- Page and Node Type Labeling (Can be used for template-related features)
- Find/Replace
- Comments
### Slide Element Editing
- Add, Delete Elements
- Copy and Paste Elements
- Drag and Drop Elements
- Rotate Elements
- Scale Elements
- Multi-select Elements (Marquee Selection, Click Selection)
- Group Elements
- Batch Edit Elements
- Lock Elements
- Element Snapping (Move and Scale)
- Adjust Element Layers
- Align Elements to Canvas
- Align Elements to Other Elements
- Distribute Elements Evenly
- Dragging to Add Text and Images
- Paste External Images
- Set Element Coordinates, Dimensions, and Rotation Angle
- Element Hyperlinks (Link to Webpages, Link to Other Slide Pages)
#### Text
- Rich Text Editing (Color, Highlight, Font, Font Size, Bold, Italic, Underline, Strikethrough, Superscript, Inline Code, Quote, Hyperlink, Alignment, Numbering, Bullet Points, Paragraph Indentation, Clear Formatting)
- Line Height
- Letter Spacing
- Paragraph Spacing
- First Line Indentation
- Fill Color
- Border
- Shadow
- Transparency
- Vertical Text
- AI Rewriting/Expansion/Abbreviation
#### Images
- Crop (Custom, By Shape, By Aspect Ratio)
- Rounded Corners
- Filters
- Tinting (Mask)
- Flip
- Border
- Shadow
- Replace Image
- Reset Image
- Set as Background Image
#### Shapes
- Draw Arbitrary Polygons
- Draw Arbitrary Lines (Simulate by creating open shapes)
- Replace Shape
- Fill (Solid Color, Gradient, Image)
- Border
- Shadow
- Transparency
- Flip
- Shape Format Painter
- Edit Text (Supports rich text, similar to rich text editing for text elements)
#### Lines
- Straight Lines, Basic Polyline/Curves
- Color
- Width
- Style (Solid, Dashed, Dotted)
- End Cap Styles
#### Charts (Bar Chart, Column Chart, Line Chart, Area Chart, Scatter Chart, Pie Chart, Doughnut Chart, Radar Chart)
- Chart Type Conversion
- Data Editing
- Background Fill
- Theme Colors
- Coordinate Text Color
- Stacking Mode, Smooth Curves, etc.
#### Tables
- Add/Delete Rows and Columns
- Theme Settings (Theme Color, Header Row, Total Row, First Column, Last Column)
- Merge Cells
- Cell Styles (Fill Color, Text Color, Bold, Italic, Underline, Strikethrough, Alignment)
- Borders
#### Videos
- Preview Cover Setting
- Autoplay
#### Audio
- Icon Color
- Autoplay
- Loop Playback
#### Formulas
- LaTeX Editing
- Color Settings
- Formula Line Thickness Settings
### Slide Presentation
- Brush Tools (Pen/Shape/Arrow/Highlighter Annotation, Eraser, Blackboard Mode)
- All Slides Preview
- Thumbnail Navigation at Bottom
- Timer Tool
- Laser Pointer
- Automatic Presentation
- Speaker View
### Mobile
- Basic Editing
    - Page Add, Delete, Copy, Notes, Undo/Redo
    - Insert Text, Image, Rectangle, Circle
    - General Element Operations: Move, Scale, Rotate, Copy, Delete, Layer Adjustment, Alignment
    - Element Styles: Text (Bold, Italic, Underline, Strikethrough, Font Size, Color, Alignment Direction), Fill Color
- Basic Preview
- Playback Preview

# 🎯 Development
There is no complete development documentation at the moment, but the following documents may be helpful:
- [Project Directory and Data Structure](/doc/DirectoryAndData.md)
- [Basic Principles of Canvas and Elements](/doc/Canvas.md)
- [How to Customize an Element](/doc/CustomElement.md)
- [About AIPPT](/doc/AIPPT.md)

Here are some auxiliary development tools/repositories:
- PPTX to JSON reference: [pptxtojson](https://github.com/pipipi-pikachu/pptxtojson)
- Shape Drawing: [svgPathCreator](https://github.com/pipipi-pikachu/svgPathCreator)

# 📄 Copyright Statement/Open Source License
[AGPL-3.0 License](/LICENSE) | Copyright © 2020-PRESENT [pipipi-pikachu](https://github.com/pipipi-pikachu)

# 🧮 Commercial Use
- This project is prohibited from being used for closed-source commercial purposes. If you wish to use PPTist for commercial project profit, please respect open source and **strictly adhere to the [AGPL-3.0 License](https://www.gnu.org/licenses/agpl-3.0.html)** and contribute back to the open-source community (this is what the author advocates);
- If, for any reason, you must use it for closed-source commercial purposes and cannot comply with the AGPL-3.0 agreement, you may choose to:
    1. Use an earlier version under the Apache 2.0 license [ (This version's last update was May 2022 and is no longer maintained; click here to download the code)](https://github.com/pipipi-pikachu/PPTist/archive/f1a35bb8e045124e37dcafd6acbf40b4531b69aa.zip);
    2. Become a significant contributor to the project (becoming a contributor after violating the license does not fall under this category), including:
        - Your code is referenced as a dependency by this project, including: npm installation, script/style file references, code snippet references (references will be noted);
        - You have submitted significant PRs or Issues to this project (judged subjectively by the author; eligible PRs or Issues will be tagged with `important contribution`);
        - You have participated long-term in the maintenance/advancement of this project, such as providing effective peripheral tools or creating numerous templates (judged subjectively by the author);
    3. [Contact the author via email](mailto:pipipi_pikachu@163.com) to purchase an independent commercial license. Independent license pricing:
        - One year: 1999 Yuan
        - Three years: 2999 Yuan
        - Perpetual: 5499 Yuan
        - The above prices do not apply if you violate the agreement and are found by the author;
- It is recommended to prioritize complying with the AGPL-3.0 agreement. If you wish to purchase an independent commercial license, please note:
    - Independent commercial license means: granting you permission to use the code for commercial activities separately without needing to comply with the AGPL-3.0 agreement;
    - It is a license grant only (not a sale of software or services). There are no "premium versions" or "paid versions." No online services are provided, no technical support or consultation, no custom development, and no more templates, let alone a directly deliverable product;
    - This software is not out-of-the-box. You will need to implement backend data reading/storage capabilities yourself at a minimum. Therefore, using this project requires basic web development experience (understanding what frontend & backend are, where data comes from & how it's stored, what APIs are, what cross-domain is, etc.);
    - After licensing, you are still prohibited from reselling, licensing, open-sourcing, or maliciously distributing the source code;
    - After licensing, if needed, background logic related to AIPPT and current template data can be provided for reference (but they are very simple and contain no core logic; it is highly recommended to implement your own);
    - Please conduct thorough research in advance to determine if PPTist meets your needs, both in terms of functionality (whether it meets business requirements) and development (whether you accept the current technology stack/implementation plan);
    - The author cannot "provide legal documents to prove that my Github account belongs to me." If this is a concern, please consider other avenues;
    - Objects on the [Blacklist](/doc/Blacklist.md) are not eligible to obtain independent commercial licenses or contribute code through payment;
    - The author advocates for asynchronous communication. **We do not add WeChat/QQ/phone numbers, etc.** For any licensing-related questions, please contact us by email. For feature requests/bug reports/technical solution inquiries, please use [Issues](https://github.com/pipipi-pikachu/PPTist/issues), thank you for your understanding.

---
# 🔔 Other Notes
## What is the AGPL-3.0 License
The core requirements of the license, explained in plain language, are as follows:
- **Open Source Obligation**: If you use AGPL code, regardless of how you or your downstream users use/modify it, you must make your final code fully public (not just the modified parts, and changing the framework or rewriting it does not disconnect it from the original code). You must also continue to open-source it under the AGPL license, maintaining its contagiousness.
- **Network Services Must Also Be Open Source**: Even if you only use AGPL code to build a website or network service, when others use your service via the network, you must also comply with the aforementioned **open source obligation**.
- **Retain Copyright Notices**: You cannot remove the original author's information and license notices from the code. You must inform others where the code originated from.
- **No Additional Restrictions**: You cannot add restrictions to AGPL code, such as preventing others from redistributing it or requiring them to pay to use the code.
- **Disclaimer**: The author does not guarantee that the code is bug-free and is not responsible for any consequences of its use.

For detailed license content, please refer to the official documentation: [AGPL-3.0 License](https://www.gnu.org/licenses/agpl-3.0.html)