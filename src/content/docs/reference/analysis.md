---
title: Analysis
description: Reference of analysis capabilities.
sidebar:
    badge:
        text: Experimental
        variant: danger
---

To enable features, such as the integrated pseudocode disassembler and the [class view](/reference/class), slicer creates in-memory models of classes.

By default, a partial version of the model is created for all classes in the background - this is called background analysis.
When a class is to be disassembled or the like, a full version of the model is created and cached.

:::tip

If you expect to load a large amount of classes (i.e. tens of thousands) into the workspace, you may want to disable background analysis
(`Analysis` -> untick `Background`) and rely only on just-in-time analysis to save on time and memory costs.

:::

## Search

Search allows you to search for identifying aspects of class files, such as constant pool values and class members.

The search tab can be opened like any unscoped tab, using `Analysis` -> `Search` or by pressing `Ctrl+Shift+F`.

There are three search modes, selectable in the dropdown menu:

- Partial match (case-sensitive)
- Exact match (case-sensitive)
- Regular expression (RegEx pattern occurrences)

![Search example](/assets/search.png)
