---
title: Playground
description: A quick description of the script playground.
---

The script playground is a quick and convenient way to introspect the current instance of slicer and to prototype scripts.

It can be viewed by opening a `Playground` tab in slicer, revealing an interface akin to the Developer Console in most browsers.
Unlike the DevTools console, it does not print logging information and is made purely to evaluate JS statements.

## Usage

The playground has access to the root scripting context under the `context` global variable, so you can do anything that the scripting API can.

**Note**, the evaluator context is cleared when the tab is closed - you will lose any defined local variables.

![Playground example](/assets/playground.png)
