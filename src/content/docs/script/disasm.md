---
title: Disassembler
description: Overview of the disassembler API.
---

The disassembler API allows you to introspect and manipulate disassemblers in slicer. slicer offers several disassemblers/decompilers [out of the box](../reference/disasm.md), but this API makes it possible to add custom ones via a script.

All disassembler operations are done via a `DisassemblerContext`, which you can once again access on [the context](./index.md#context).

```js
context.disasm.all(); // lists all disassemblers
context.disasm.find("vf"); // finds a disassembler by its ID, returns null if not found; this example returns the Vineflower decompiler

// these operations do NOT persist and work only within the current instance of slicer
context.disasm.add({ ... }); // adds a custom disassembler
context.disasm.remove("vf"); // removes a disassembler by its ID
```

Every disassembler needs an ID and a `run` function that disassembles a class file byte array into a string representation. Optionally, a human-readable label can also be supplied.

:::tip

If your disassembler outputs Java source code, add a `language: "java"` property to enable Java syntax highlighting!

_The possible values of the property are an implementation detail and subject to change._

:::

```js
const myDisasm /*: Disassembler */ = {
    id: "my-disasm",
    label: "My disassembler", // optional
    language: "java", // optional

    run(data /*: Uint8Array */) /*: string | Promise<string> */ {
        // disassembler logic goes here
    },
};

export default {
    // ...
    load(context /*: ScriptContext */) {
        context.disasm.add(myDisasm);
    },
    unload(context /*: ScriptContext */) {
        context.disasm.remove(myDisasm.id);
    },
};
```
