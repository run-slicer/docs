---
title: Disassembly
description: Reference of the disassembly feature.
---

Disassembly is a reconstruction of a Java class file into a human-readable representation or into Java source code (decompilation), this is the main view you'll see in slicer.

The currently supported disassemblers/decompilers are:

-   JASM (disassembler, https://github.com/jumanji144/Jasm)
-   CFR (decompiler, https://github.com/leibnitz27/cfr)
-   Vineflower (default; decompiler, https://github.com/Vineflower/vineflower)
-   Procyon (decompiler, https://github.com/mstrobel/procyon)
-   slicer (pseudocode disassembler, https://github.com/run-slicer/asm)

Custom ones can be added through the [Disassembler API](/script/disasm) (popular ones are [here](/resources/scripts#disassembly)).

:::note

Compilation of Java source code into bytecode is a lossy process, therefore decompiled output is only a best-effort approximation by the decompiler and may not always be valid Java code.

This is especially the case with output from non-javac compilers (i.e. Kotlin, Groovy, ... compilers) or obfuscators, which often produce bytecode that does not have an approximate Java language construct and/or violates constraints of the Java language specification.

:::
