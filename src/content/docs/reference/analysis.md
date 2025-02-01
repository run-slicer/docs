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

Currently, the partial model is not used for anything, however in the future it will be used to facilitate class member and constant search.

:::tip

If you expect to load a large amount of classes (i.e. tens of thousands) into the workspace, you may want to disable background analysis
(`Analysis` -> untick `Background`) and rely only on just-in-time analysis to save on time and memory costs.

:::
