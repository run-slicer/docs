---
title: Disassembly
description: Reference of the disassembly feature.
---

Disassembly is a reconstruction of a Java class file into a human-readable representation or into Java source code (decompilation), this is the main view you'll see in slicer.

The currently supported disassemblers/decompilers are:

- JASM (disassembler, https://github.com/jumanji144/Jasm)
- CFR (decompiler, https://github.com/leibnitz27/cfr)
- Vineflower (default; decompiler, https://github.com/Vineflower/vineflower)
- Procyon (decompiler, https://github.com/mstrobel/procyon)
- slicer (pseudocode disassembler, https://github.com/run-slicer/asm)

Custom ones can be added through the [Disassembler API](/script/disasm) (popular ones are [here](/resources/scripts#disassembly)).

:::note

Compilation of Java source code into bytecode is a lossy process, therefore decompiled output is only a best-effort approximation by the decompiler and may not always be valid Java code.

This is especially the case with output from non-javac compilers (i.e. Kotlin, Groovy, ... compilers) or obfuscators, which often produce bytecode that does not have an approximate Java language construct and/or violates constraints of the Java language specification.

:::

## Integrated disassembler

slicer includes a basic disassembler to power several bytecode analysis features, such as:

- the [class view](/reference/class) (prettifying class file constructs)
- the [flow graph](/reference/flow) (prettifying instructions and computing the graph itself)
- the pseudocode disassembler

### Pseudocode

The disassembler produces pseudocode similar to Java, which allows you to view the rough structure of classes in a familiar way.

It does not resugar many code constructs, such as if statements and variable declarations, so knowledge of the JVM instruction set is highly necessary.

```java
// Source file: StringsDuplicates.java
package sample.string;

public super class StringsDuplicates extends java.lang.Object {
    private static final java.lang.String F;

    public StringsDuplicates() {
        // 0: aload this Lsample/string/StringsDuplicates;
        // 1: invokespecial java/lang/Object <init> ()V
        // 4: return
    }
    public static void main(java.lang.String[] args) {
        //  0: ldc "Hello this is a duplicate string"
        //  2: astore_1
        //  3: ldc "Hello this is a duplicate string"
        //  5: invokestatic sample/string/StringsDuplicates p (Ljava/lang/String;)V
        //  8: aload s Ljava/lang/String;
        //  9: invokestatic sample/string/StringsDuplicates p (Ljava/lang/String;)V
        // 12: invokestatic sample/string/StringsDuplicates duplicate ()Ljava/lang/String;
        // 15: invokestatic sample/string/StringsDuplicates p (Ljava/lang/String;)V
        // 18: ldc "Hello this is a duplicate string"
        // 20: invokestatic sample/string/StringsDuplicates p (Ljava/lang/String;)V
        // 23: return
    }
    private static java.lang.String duplicate() {
        // 0: ldc "Hello this is a duplicate string"
        // 2: areturn
    }
    public static void p(java.lang.String s) {
        // 0: getstatic java/lang/System out Ljava/io/PrintStream;
        // 3: aload s Ljava/lang/String;
        // 4: invokevirtual java/io/PrintStream println (Ljava/lang/String;)V
        // 7: return
    }
}
```
