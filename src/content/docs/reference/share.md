---
title: Sharing
description: Reference of sharing capabilities.
---

<style>
  table td {
    vertical-align: middle;
  }
</style>

slicer allows you to read files from an HTTP server (with an appropriate CORS setup) using the `url` search parameter.
This is useful for embedding slicer into outside web applications and allowing users to automatically source arbitrary files.

## Example

source URL: `https://raw.githubusercontent.com/GenericException/SkidSuite/refs/heads/master/obf/obf-sample-test.jar`<br>
slicer URL: `https://slicer.run?url=https://raw.githubusercontent.com/GenericException/SkidSuite/refs/heads/master/obf/obf-sample-test.jar`

If you need a space for uploading files to share, [bytebin](https://bytebin.lucko.me) and curl is a safe choice:

```bash
echo "https://bytebin.lucko.me/$(curl --progress-bar --data-binary @./path/to/file.jar -XPOST https://bytebin.lucko.me/post | jq -r '.key')"
```

## Buttons

A set of stylized buttons is provided for linking to slicer, akin to GitHub repository badges or the Vercel deploy button.

| Button                                       | URL                                       | Markdown                                                                     |
| -------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| ![](https://slicer.run/button.svg)           | `https://slicer.run/button.svg`           | `[![](https://slicer.run/button.svg)](https://slicer.run?url=...)`           |
| ![](https://slicer.run/button-decompile.svg) | `https://slicer.run/button-decompile.svg` | `[![](https://slicer.run/button-decompile.svg)](https://slicer.run?url=...)` |
