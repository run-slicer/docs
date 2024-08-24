---
title: Editor
description: Overview of the editor manipulation API.
---

The editor API allows you to introspect and trigger updates to the currently opened editor panes, like refreshing them in case of an option changing and the view now being invalid.

A basic unit of the editor is a tab. Tabs can be looked up using the `EditorContext` API, which you can get, once again, from [the context](./index.md#context).

```js
context.editor.tabs(); // gets all currently opened tabs
context.editor.find("..."); // find a tab by its ID, returns null if not found
context.editor.current(); // gets the currently active tab, returns null if there's no active tab

// mark a tab with an ID as dirty, making it refresh once the user makes it active
// the "hard" boolean flag signals whether:
// the entire lifecycle of the tab should be destroyed and recreated (hard refresh; the workspace entry should be read again, triggering a preload event)
// or just signalled to reread the existing data (soft refresh; disassembling/reading)
await context.editor.refresh("...", false);
```

Each tab has an associated unique ID, a non-unique label and optionally a workspace entry:

```js
// pretty representation of a Tab object
// "unspecific" types are values reserved for use with functionality that does not have an API variant yet
{
    type: "code", // one of "unspecific", "welcome", "code", "hex" or "flow_graph"; see the TabType type
    id: "code:sample/math/BinarySearch.class", // the ID of the tab; DO NOT parse this, the structure is an implementation detail!
    label: "BinarySearch.class", // the tab label, as seen by the user
    entry: { // the workspace entry, can be null
        type: "class", // one of "unspecific" or "class"; see the EntryType type
        name: "sample/math/BinarySearch.class", // the entry name, this is the workspace path
    },
}
```
