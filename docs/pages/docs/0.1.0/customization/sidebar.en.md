---
title: Sidebar
description: Describes how the sidebar engine works, and some customizations.
tags: docs, nextjs, code, search
---

# Sidebar

The sidebar is auto-generated by Engrafia, whenever you create a new file, or a new folder, inside `pages` folder, a new entry will be created in the sidebar. But some customizations can be made in the sidebar.

## Items organization

Engrafia allows you to organize your contents inside a category, to do that, you just need to add a new entry in metadata config, `position`:

```md
---
title: Basic info
description: Basic information about how Engrafia works.
tags: docs, engrafia, nextjs
position: 1
---
```

Just add a number that represents the position of the item in the relative category.

## Sidebar icon

Another customization that can be made is to add a custom icon for every sidebar category. to do that, just add an SVG icon with the same name as the category, and add the `loadSidebarIcons:true` property in `theme.config.js`.

![sidebar-docs](/imgs/sidebar.png)
