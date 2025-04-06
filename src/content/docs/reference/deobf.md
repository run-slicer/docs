---
title: Deobfuscation
description: Reference of deobfuscation capabilities.
---

slicer does not employ any obfuscator-specific deobfuscation features, but it does take care to be as resilient as possible to common obfuscation techniques, like:

- intentionally corrupted/modified ZIP files
- unverifiable bytecode, "ASM crashers"

Disassemblers/decompilers **may fail** or take a considerable amount of time to complete when faced with more advanced obfuscation,
however you should still be able to use the [integrated disassembler](/reference/disasm#integrated-disassembler) to view a representation of the bytecode.

## Transformers

Generic deobfuscation features are implemented as a part of the analysis cycle via [transformers](/reference/analysis#transformers).

In general, there is no silver bullet option against obfuscation, so you will have to manually examine any obfuscation techniques
and apply transformers based on those observations. However, it is a good idea to start with the `Normalization -> Verify attributes`
transformer to lower the chance of disassembler failures.
