---
title: Deobfuscation
description: Reference of deobfuscation capabilities.
---

slicer does not employ any specific deobfuscation features, but it does take care to be as resilient as possible to generic obfuscation techniques, like:

-   intentionally corrupted/modified ZIP files
-   unverifiable bytecode

However, there is [a script](https://github.com/run-slicer/script-poke/releases) (GPL-licensed) available that performs basic bytecode deobfuscation transformations, like constant folding, dead code elimination, various peephole optimizations, inlining and more.

Note, this script may negatively impact your editor's performance due to its complexity.
