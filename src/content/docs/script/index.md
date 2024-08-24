---
title: Introduction
description: Introduction to the slicer scripting API.
---

slicer features a simple JavaScript scripting API, useful for doing preprocessing on class files, e.g. deobfuscation.

Every script must default export two essential properties, `load` and `unload` functions, however it can also expose metadata to display to the user.

```js
export default {
    name: "example script", // optional
    description: "An example slicer script in JS.", // optional
    version: "1.0.0-SNAPSHOT", // optional
    load() /*: void | Promise<void> */ {
        console.log("Loaded!");
    },
    unload() /*: void | Promise<void> */ {
        console.log("Unloaded!");
    },
} /* satisfies Script */;
```

:::tip

TypeScript type definitions for the API are available [here](https://github.com/run-slicer/script).

:::

Scripts are meant to be fairly simple, but they can also be pretty extensive, so for convenience, a TypeScript+Rollup example project is provided [here](https://github.com/run-slicer/script-template).

## Context

Every script is assigned a "script context", which provides them with the power to manipulate with slicer itself - you will need it for basically everything.

This context is always passed into `load` and `unload`, where you can access it:

```js
export default {
    name: "example script",
    // ...
    load(context /*: ScriptContext */) {
        console.log("Loaded!");
        console.log("That's us: ", context.script.name);
    },
    unload(context /*: ScriptContext */) {
        console.log("Unloaded!");
    },
};
```

Each context also has a parent context (`context.parent`), in most cases it will be the "root context".

The root context represents the slicer scripting engine itself, you can identify it by the script name (`rootContext.script.name === "slicer"`) or the fact that it has no parent - it is the root after all (`rootContext.parent === null`).
