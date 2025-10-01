---
title: Workspace
description: Overview of the workspace manipulation API.
---

The workspace API allows you to manipulate file entries that slicer is currently holding onto (i.e. files in the `Project` tab).

Entries can be looked up and CRDed using the `WorkspaceContext` API available in [the context](/slicer/script/#context).

```js
context.workspace.entries(); // lists all entries in the workspace
context.workspace.find("..."); // tries to find an entry by its name, returns null if not found
context.workspace.remove("..."); // removes an entry by its name
context.workspace.clear(); // removes all entries in the workspace

// adds an entry with a specified name
// the data must be either an Uint8Array or a Blob
// returns the created entry or an already-existing entry with the same name
await context.workspace.add("...", data);
```

Each entry has an associated unique name, an internal type and data reading functions:

```js
{
    type: "file", // "file", "class", "archive", "memory", ...
    name: "sample/math/BinarySearch.class", // the entry name
    bytes: async function () { /* ... */ }, // gets the entry data as an Uint8Array
    blob: async function () { /* ... */ }, // gets the entry data as a Blob
}
```
