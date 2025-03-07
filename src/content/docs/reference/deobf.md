---
title: Deobfuscation
description: Reference of deobfuscation capabilities.
---

slicer does not employ any specific deobfuscation features, but it does take care to be as resilient as possible to common obfuscation techniques, like:

- intentionally corrupted/modified ZIP files
- unverifiable bytecode

Disassemblers/decompilers **may fail** or take a considerable amount of time to complete when faced with more advanced obfuscation,
however you should still be able to use the [integrated disassembler](/reference/disasm#integrated-disassembler) to view a representation of the bytecode.
