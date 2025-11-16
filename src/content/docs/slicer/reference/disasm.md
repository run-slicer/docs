---
title: Disassembly
description: Reference of the disassembly feature.
---

Disassembly is a reconstruction of a Java class file into a human-readable representation or into Java source code (decompilation), this is the main view you'll see in slicer.

Custom ones can be added through the [Disassembler API](/slicer/script/disasm) (popular ones are [here](/slicer/resources/scripts#disassembly)).

:::note

Compilation of Java source code into bytecode is a lossy process, therefore decompiled output is only a best-effort approximation by the decompiler and may not always be valid Java code.

This is especially the case with output from non-javac compilers (i.e. Kotlin, Groovy, ... compilers) or obfuscators, which often produce bytecode that does not have an approximate Java language construct and/or violates constraints of the Java language specification.

:::

## Decompilers

The currently supported decompilers are:

- CFR (decompiler, https://github.com/leibnitz27/cfr)
- Vineflower (default; decompiler, https://github.com/Vineflower/vineflower)
- Procyon (decompiler, https://github.com/mstrobel/procyon)

### CFR

[CFR](https://github.com/leibnitz27/cfr) is a general-purpose Java decompiler developed by Lee Benfield.

It supports Java features up to Java 14, it is quite fast and produces decently accurate output.
However, when it comes to obfuscation, the output accuracy is not great, and it quickly resorts to producing unreadable pseudocode.

<details>
  <summary>Example output</summary>

```java
package sample.math;

public class HeapSort {
    public void sort(int[] arr) {
        int i;
        int n = arr.length;
        for (i = n / 2 - 1; i >= 0; --i) {
            this.heapify(arr, n, i);
        }
        for (i = n - 1; i >= 0; --i) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            this.heapify(arr, i, 0);
        }
    }

    void heapify(int[] arr, int n, int i) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        if (l < n && arr[l] > arr[largest]) {
            largest = l;
        }
        if (r < n && arr[r] > arr[largest]) {
            largest = r;
        }
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            this.heapify(arr, n, largest);
        }
    }

    static void printArray(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; ++i) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = new int[]{12, 11, 13, 5, 6, 7};
        HeapSort ob = new HeapSort();
        ob.sort(arr);
        System.out.println("Sorted array is:");
        HeapSort.printArray(arr);
    }
}
```

</details>

<details>
  <summary>Example output (obfuscated; ZKM 17.0)</summary>

```java
package sample.math;

public class HeapSort {
    public static boolean F;
    private static final String a;

    public void N(Object[] objectArray) {
        int n;
        long l = (Long)objectArray[0];
        int[] nArray = (int[])objectArray[1];
        long l2 = l ^ 0x75AF228E50B2L;
        int n2 = nArray.length;
        for (n = n2 / 2 - 1; n >= 0; --n) {
            Object[] objectArray2 = new Object[4];
            objectArray2[3] = n;
            objectArray2[2] = n2;
            objectArray2[1] = l2;
            objectArray2[0] = nArray;
            this.q(objectArray2);
        }
        for (n = n2 - 1; n >= 0; --n) {
            int n3 = nArray[0];
            nArray[0] = nArray[n];
            nArray[n] = n3;
            Object[] objectArray3 = new Object[4];
            objectArray3[3] = 0;
            objectArray3[2] = n;
            objectArray3[1] = l2;
            objectArray3[0] = nArray;
            this.q(objectArray3);
        }
    }

    void q(Object[] objectArray) {
        block14: {
            int n;
            int n2;
            long l;
            int n3;
            int[] nArray;
            block13: {
                int n4;
                int n5;
                block11: {
                    boolean bl;
                    long l2;
                    block12: {
                        boolean bl2;
                        int n6;
                        block10: {
                            block8: {
                                block9: {
                                    nArray = (int[])objectArray[0];
                                    l2 = (Long)objectArray[1];
                                    n3 = (Integer)objectArray[2];
                                    n5 = (Integer)objectArray[3];
                                    l = l2 ^ 0L;
                                    n2 = n5;
                                    int n7 = 2 * n5 + 1;
                                    bl = F;
                                    n6 = 2 * n5 + 2;
                                    n = n7;
                                    n4 = n3;
                                    if (bl) break block8;
                                    if (n >= n4) break block9;
                                    n = nArray[n7];
                                    n4 = nArray[n2];
                                    bl2 = bl;
                                    if (l2 < 0L) break block10;
                                    if (bl2) break block8;
                                    if (n > n4) {
                                        n2 = n7;
                                    }
                                }
                                n = n6;
                                n4 = n3;
                            }
                            bl2 = bl;
                        }
                        if (bl2) break block11;
                        if (n >= n4) break block12;
                        n = nArray[n6];
                        n4 = nArray[n2];
                        if (l2 <= 0L || bl) break block11;
                        if (n > n4) {
                            n2 = n6;
                        }
                    }
                    n = n2;
                    n4 = bl ? 1 : 0;
                    if (l2 <= 0L) break block11;
                    if (n4 != 0) break block13;
                    n4 = n5;
                }
                if (n == n4) break block14;
                n = nArray[n5];
            }
            int n8 = n;
            nArray[n5] = nArray[n2];
            nArray[n2] = n8;
            Object[] objectArray2 = new Object[4];
            objectArray2[3] = n2;
            objectArray2[2] = n3;
            objectArray2[1] = l;
            objectArray2[0] = nArray;
            this.q(objectArray2);
        }
    }

    static void t(Object[] objectArray) {
        int[] nArray = (int[])objectArray[0];
        long l = (Long)objectArray[1];
        int n = nArray.length;
        for (int i = 0; i < n; ++i) {
            System.out.print(nArray[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        long l;
        long l2 = l = 54536233763080L;
        long l3 = l2 ^ 0x56D9CC7B6245L;
        long l4 = l2 ^ 0x767115DAF19BL;
        int[] nArray = new int[]{12, 11, 13, 5, 6, 7};
        HeapSort heapSort = new HeapSort();
        Object[] objectArray = new Object[2];
        objectArray[1] = nArray;
        objectArray[0] = l4;
        heapSort.N(objectArray);
        System.out.println(a);
        Object[] objectArray2 = new Object[2];
        objectArray2[1] = l3;
        objectArray2[0] = nArray;
        HeapSort.t(objectArray2);
    }

    /*
     * Handled impossible loop by duplicating code
     * Enabled aggressive block sorting
     */
    static {
        char[] cArray;
        block12: {
            int n;
            int n2;
            char[] cArray2;
            int n3;
            block11: {
                char[] cArray3 = ">LT4+ )\fQT!7d`\u001e\u0019".toCharArray();
                n3 = 0;
                int n4 = cArray3.length;
                cArray2 = cArray3;
                n2 = n4;
                if (n4 <= 1) break block11;
                cArray = cArray2;
                n = n2;
                if (n2 <= n3) break block12;
            }
            do {
                char[] cArray4 = cArray2;
                char[] cArray5 = cArray2;
                int n5 = n3;
                while (true) {
                    int n6;
                    char c = cArray4[n5];
                    switch (n3 % 7) {
                        case 0: {
                            n6 = 109;
                            break;
                        }
                        case 1: {
                            n6 = 35;
                            break;
                        }
                        case 2: {
                            n6 = 38;
                            break;
                        }
                        case 3: {
                            n6 = 64;
                            break;
                        }
                        case 4: {
                            n6 = 78;
                            break;
                        }
                        case 5: {
                            n6 = 68;
                            break;
                        }
                        default: {
                            n6 = 9;
                        }
                    }
                    cArray4[n5] = (char)(c ^ n6);
                    ++n3;
                    cArray2 = cArray5;
                    n2 = n2;
                    if (n2 != 0) break;
                    cArray5 = cArray2;
                    n = n2;
                    n5 = n2;
                    cArray4 = cArray2;
                }
                cArray = cArray2;
                n = n2;
            } while (n2 > n3);
        }
        a = new String(cArray).intern();
    }
}
```

</details>

#### Options

| Name                         | Type            | Default                                                                                   | Description                                                                          |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `stringbuffer`               | Boolean         | `false` if class file from version JAVA_5 or greater                                      | Convert new StringBuffer().append.append.append to string + string + string          |
| `stringbuilder`              | Boolean         | `true` if class file from version JAVA_5 or greater                                       | Convert new StringBuilder().append.append.append to string + string + string         |
| `stringconcat`               | Boolean         | `true` if class file from version JAVA_9 or greater                                       | Convert usages of StringConcatFactor to string + string + string                     |
| `decodeenumswitch`           | Boolean         | `true` if class file from version JAVA_5 or greater                                       | Re-sugar switch on enum                                                              |
| `sugarenums`                 | Boolean         | `true` if class file from version JAVA_5 or greater                                       | Re-sugar enums                                                                       |
| `decodestringswitch`         | Boolean         | `true` if class file from version JAVA_7 or greater                                       | Re-sugar switch on String                                                            |
| `previewfeatures`            | Boolean         | `true`                                                                                    | Decompile preview features if class was compiled with 'javac --enable-preview'       |
| `sealed`                     | Boolean         | `true` if class file from version JAVA_18 or greater, or experimental in JAVA_16, JAVA_17 | Decompile 'sealed' constructs                                                        |
| `switchexpression`           | Boolean         | `true` if class file from version JAVA_14 or greater, or experimental in JAVA_12, JAVA_13 | Re-sugar switch expression                                                           |
| `recordtypes`                | Boolean         | `true` if class file from version JAVA_16 or greater, or experimental in JAVA_14, JAVA_15 | Re-sugar record types                                                                |
| `instanceofpattern`          | Boolean         | `true` if class file from version JAVA_16 or greater, or experimental in JAVA_14, JAVA_15 | Re-sugar instanceof pattern matches                                                  |
| `arrayiter`                  | Boolean         | `true` if class file from version JAVA_5 or greater                                       | Re-sugar array based iteration                                                       |
| `collectioniter`             | Boolean         | `true` if class file from version JAVA_5 or greater                                       | Re-sugar collection based iteration                                                  |
| `tryresources`               | Boolean         | `true` if class file from version JAVA_7 or greater                                       | Reconstruct try-with-resources                                                       |
| `decodelambdas`              | Boolean         | `true` if class file from version JAVA_8 or greater                                       | Re-build lambda functions                                                            |
| `innerclasses`               | Boolean         | `true`                                                                                    | Decompile inner classes                                                              |
| `forbidmethodscopedclasses`  | Boolean         | `false`                                                                                   | Don't allow method scoped classes                                                    |
| `forbidanonymousclasses`     | Boolean         | `false`                                                                                   | Don't allow anonymous classes                                                        |
| `hideutf`                    | Boolean         | `true`                                                                                    | Hide UTF8 characters - quote them instead of showing the raw characters              |
| `hidelongstrings`            | Boolean         | `false`                                                                                   | Hide very long strings - useful if obfuscators have placed fake code in strings      |
| `removeboilerplate`          | Boolean         | `true`                                                                                    | Remove boilderplate functions - constructor boilerplate, lambda deserialisation etc. |
| `removeinnerclasssynthetics` | Boolean         | `true`                                                                                    | Remove (where possible) implicit outer class references in inner classes             |
| `relinkconst`                | Boolean         | `true`                                                                                    | Relink constants - if there is an inlined reference to a field, attempt to de-inline |
| `relinkconststring`          | Boolean         | Value of option 'relinkconst'                                                             | Relink constant strings                                                              |
| `liftconstructorinit`        | Boolean         | `true`                                                                                    | Lift initialisation code common to all constructors into member initialisation       |
| `removedeadmethods`          | Boolean         | `true`                                                                                    | Remove pointless methods - default constructor etc.                                  |
| `removebadgenerics`          | Boolean         | `true`                                                                                    | Hide generics where we've obviously got it wrong, and fallback to non-generic        |
| `sugarasserts`               | Boolean         | `true`                                                                                    | Re-sugar assert calls                                                                |
| `sugarboxing`                | Boolean         | `true`                                                                                    | Where possible, remove pointless boxing wrappers                                     |
| `sugarretrolambda`           | Boolean         | `false`                                                                                   | Where possible, resugar uses of retro lambda                                         |
| `decodefinally`              | Boolean         | `true`                                                                                    | Re-sugar finally statements                                                          |
| `tidymonitors`               | Boolean         | `true`                                                                                    | Remove support code for monitors - e.g. catch blocks just to exit a monitor          |
| `commentmonitors`            | Boolean         | `false`                                                                                   | Replace monitors with comments - useful if we're completely confused                 |
| `lenient`                    | Boolean         | `false`                                                                                   | Be a bit more lenient in situations where we'd normally throw an exception           |
| `comments`                   | Boolean         | `true`                                                                                    | Output comments describing decompiler status, fallback flags etc.                    |
| `forcetopsort`               | Boolean or null | `null`                                                                                    | Force basic block sorting                                                            |
| `forceclassfilever`          | String or null  | `null`                                                                                    | Force the version of the classfile                                                   |
| `forloopaggcapture`          | Boolean or null | `null`                                                                                    | Allow for loops to aggressively roll mutations into update section                   |
| `forcetopsortaggress`        | Boolean or null | `null`                                                                                    | Force extra aggressive topsort options                                               |
| `forcetopsortnopull`         | Boolean or null | `null`                                                                                    | Force topsort not to pull try blocks                                                 |
| `forcecondpropagate`         | Boolean or null | `null`                                                                                    | Pull results of deterministic jumps back through some constant assignments           |
| `reducecondscope`            | Boolean or null | `null`                                                                                    | Reduce the scope of conditionals, possibly generating more anonymous blocks          |
| `forcereturningifs`          | Boolean or null | `null`                                                                                    | Move return up to jump site                                                          |
| `ignoreexceptionsalways`     | Boolean         | `false`                                                                                   | Drop exception information (WARNING : changes semantics, dangerous!)                 |
| `antiobf`                    | Boolean         | `false`                                                                                   | Undo various obfuscations                                                            |
| `obfcontrol`                 | Boolean         | Value of option 'antiobf'                                                                 | Undo control flow obfuscation                                                        |
| `obfattr`                    | Boolean         | Value of option 'antiobf'                                                                 | Undo attribute obfuscation                                                           |
| `constobf`                   | Boolean         | Value of option 'antiobf'                                                                 | Undo constant obfuscation                                                            |
| `hidebridgemethods`          | Boolean         | !Value of option 'obfattr'                                                                | Hide bridge methods                                                                  |
| `ignoreexceptions`           | Boolean         | `false`                                                                                   | Drop exception information if completely stuck                                       |
| `forceexceptionprune`        | Boolean or null | `null`                                                                                    | Remove nested exception handlers if they don't change semantics                      |
| `aexagg`                     | Boolean or null | `null`                                                                                    | Try to extend and merge exceptions more aggressively                                 |
| `aexagg2`                    | Boolean or null | `null`                                                                                    | Try to extend and merge exceptions more aggressively (may change semantics)          |
| `recovertypeclash`           | Boolean or null | `null`                                                                                    | Split lifetimes where analysis caused type clash                                     |
| `recovertypehints`           | Boolean or null | `null`                                                                                    | Recover type hints for iterators from first pass                                     |
| `recover`                    | Boolean         | `true`                                                                                    | Allow more and more aggressive options to be set if decompilation fails              |
| `eclipse`                    | Boolean         | `true`                                                                                    | Enable transformations to handle Eclipse code better                                 |
| `override`                   | Boolean         | `true` if class file from version JAVA_6 or greater                                       | Generate @Override annotations                                                       |
| `showinferrable`             | Boolean         | `false` if class file from version JAVA_7 or greater                                      | Decorate methods with explicit types if not implied by arguments                     |
| `allowcorrecting`            | Boolean         | `true`                                                                                    | Allow transformations which correct errors                                           |
| `labelledblocks`             | Boolean         | `true`                                                                                    | Allow code to be emitted which uses labelled blocks                                  |
| `j14classobj`                | Boolean         | `false` if class file from version JAVA_5 or greater                                      | Reverse java 1.4 class object construction                                           |
| `hidelangimports`            | Boolean         | `true`                                                                                    | Hide imports from java.lang.                                                         |
| `recpass`                    | Integer         | `0`                                                                                       | Decompile specifically with recovery options from pass #X                            |
| `rename`                     | Boolean         | `false`                                                                                   | Synonym for 'renamedupmembers' + 'renameillegalidents' + 'renameenumidents'          |
| `renamedupmembers`           | Boolean         | `Value of option 'rename'`                                                                | Rename ambiguous/duplicate fields                                                    |
| `renamesmallmembers`         | Integer         | `0`                                                                                       | Rename small members                                                                 |
| `renameillegalidents`        | Boolean         | `Value of option 'rename'`                                                                | Rename identifiers which are not valid java identifiers                              |
| `renameenumidents`           | Boolean         | `Value of option 'rename'`                                                                | Rename ENUM identifiers which do not match their 'expected' string names             |
| `removedeadconditionals`     | Boolean or null | `null`                                                                                    | Remove code that can't be executed                                                   |
| `aggressivedoextension`      | Boolean or null | `null`                                                                                    | Fold impossible jumps into do loops with 'first' test                                |
| `aggressiveduff`             | Boolean or null | `null`                                                                                    | Fold duff device style switches with additional control                              |
| `aggressivedocopy`           | Integer         | `0`                                                                                       | Clone code from impossible jumps into loops with 'first' test                        |
| `aggressivesizethreshold`    | Integer         | `13000`                                                                                   | Opcode count at which to trigger aggressive reductions                               |
| `staticinitreturn`           | Boolean         | `true`                                                                                    | Try to remove return from static init                                                |
| `usenametable`               | Boolean         | `true`                                                                                    | Use local variable name table if present                                             |
| `pullcodecase`               | Boolean         | `false`                                                                                   | Pull code into case statements agressively                                           |
| `allowmalformedswitch`       | Boolean or null | `null`                                                                                    | Allow potentially malformed switch statements                                        |
| `elidescala`                 | Boolean         | `false`                                                                                   | Elide things which aren't helpful in scala output                                    |
| `usesignatures`              | Boolean         | `true`                                                                                    | Use signatures in addition to descriptors                                            |
| `lomem`                      | Boolean         | `false`                                                                                   | Be more agressive about uncaching in order to reduce memory footprint                |
| `importfilter`               | String or null  | `null`                                                                                    | Substring regex - import classes only when fqn matches this pattern                  |
| `trackbytecodeloc`           | Boolean         | `false`                                                                                   | Propagate bytecode location info                                                     |
| `dumpexceptionstacktrace`    | Boolean         | `true`                                                                                    | Whether to dump the stack trace of exceptions which occurred during decompilation    |

### Vineflower

[Vineflower](https://github.com/Vineflower/vineflower) is a fork of the [Fernflower](https://github.com/JetBrains/intellij-community/tree/master/plugins/java-decompiler/engine)
analytical decompiler, developed by an independent team.

It improves on the already great accuracy of Fernflower and also supports most modern Java features, e.g. records,
enhanced pattern matching and much more. It also includes rudimentary support for resugaring Kotlin class files.

<details>
  <summary>Example output</summary>

```java
package sample.math;

public class HeapSort {
   public void sort(int[] arr) {
      int n = arr.length;

      for (int i = n / 2 - 1; i >= 0; i--) {
         this.heapify(arr, n, i);
      }

      for (int i = n - 1; i >= 0; i--) {
         int temp = arr[0];
         arr[0] = arr[i];
         arr[i] = temp;
         this.heapify(arr, i, 0);
      }
   }

   void heapify(int[] arr, int n, int i) {
      int largest = i;
      int l = 2 * i + 1;
      int r = 2 * i + 2;
      if (l < n && arr[l] > arr[i]) {
         largest = l;
      }

      if (r < n && arr[r] > arr[largest]) {
         largest = r;
      }

      if (largest != i) {
         int swap = arr[i];
         arr[i] = arr[largest];
         arr[largest] = swap;
         this.heapify(arr, n, largest);
      }
   }

   static void printArray(int[] arr) {
      int n = arr.length;

      for (int i = 0; i < n; i++) {
         System.out.print(arr[i] + " ");
      }

      System.out.println();
   }

   public static void main(String[] args) {
      int[] arr = new int[]{12, 11, 13, 5, 6, 7};
      HeapSort ob = new HeapSort();
      ob.sort(arr);
      System.out.println("Sorted array is:");
      printArray(arr);
   }
}
```

</details>

<details>
  <summary>Example output (obfuscated; ZKM 17.0)</summary>

```java
package sample.math;

public class HeapSort {
   public static boolean F;
   private static final String a;

   public void N(Object[] var1) {
      long var2 = (Long)var1[0];
      int[] var4 = (int[])var1[1];
      long var5 = var2 ^ 129395059478706L;
      int var7 = var4.length;

      for (int var8 = var7 / 2 - 1; var8 >= 0; var8--) {
         Object[] var10006 = new Object[]{null, null, null, var8};
         var10006[2] = var7;
         var10006[1] = var5;
         var10006[0] = var4;
         this.q(var10006);
      }

      for (int var10 = var7 - 1; var10 >= 0; var10--) {
         int var9 = var4[0];
         var4[0] = var4[var10];
         var4[var10] = var9;
         Object[] var11 = new Object[]{null, null, null, 0};
         var11[2] = var10;
         var11[1] = var5;
         var11[0] = var4;
         this.q(var11);
      }
   }

   void q(Object[] var1) {
      int[] var2;
      long var3;
      int var5;
      int var6;
      long var7;
      byte var9;
      int var10;
      int var12;
      int var10000;
      int var10001;
      byte var10002;
      label69: {
         var2 = (int[])var1[0];
         var3 = (Long)var1[1];
         var5 = (Integer)var1[2];
         var6 = (Integer)var1[3];
         var7 = var3 ^ 0L;
         var10 = var6;
         int var11 = 2 * var6 + 1;
         var9 = F;
         var12 = 2 * var6 + 2;
         var10000 = var11;
         var10001 = var5;
         label68:
         if (var9 == 0) {
            if (var11 < var5) {
               var10000 = var2[var11];
               var10001 = var2[var6];
               var10002 = var9;
               if (var3 < 0L) {
                  break label69;
               }

               if (var9 != 0) {
                  break label68;
               }

               if (var10000 > var10001) {
                  var10 = var11;
               }
            }

            var10000 = var12;
            var10001 = var5;
         }

         var10002 = var9;
      }

      label73: {
         label56:
         if (var10002 == 0) {
            if (var10000 < var10001) {
               var10000 = var2[var12];
               var10001 = var2[var10];
               if (var3 <= 0L || var9 != 0) {
                  break label56;
               }

               if (var10000 > var10001) {
                  var10 = var12;
               }
            }

            var10000 = var10;
            var10001 = var9;
            if (var3 > 0L) {
               if (var9 != 0) {
                  break label73;
               }

               var10001 = var6;
            }
         }

         if (var10000 == var10001) {
            return;
         }

         var10000 = var2[var6];
      }

      int var13 = var10000;
      var2[var6] = var2[var10];
      var2[var10] = var13;
      Object[] var10006 = new Object[]{null, null, null, var10};
      var10006[2] = var5;
      var10006[1] = var7;
      var10006[0] = var2;
      this.q(var10006);
   }

   static void t(Object[] var0) {
      int[] var1 = (int[])var0[0];
      long var2 = (Long)var0[1];
      int var4 = var1.length;

      for (int var5 = 0; var5 < var4; var5++) {
         System.out.print(var1[var5] + " ");
      }

      System.out.println();
   }

   public static void main(String[] args) {
      long var1 = 54536233763080L;
      long var3 = var1 ^ 95493438530117L;
      long var5 = var1 ^ 130228070052251L;
      int[] var7 = new int[]{12, 11, 13, 5, 6, 7};
      HeapSort var8 = new HeapSort();
      var8.N(new Object[]{var5, var7});
      System.out.println(a);
      t(new Object[]{var7, var3});
   }

   // $VF: Irreducible bytecode was duplicated to produce valid code
   static {
      char[] var10001 = ">LT4+ )\fQT!7d`\u001e\u0019".toCharArray();
      int var10003 = var10001.length;
      int var0 = 0;
      char[] var10 = var10001;
      int var3 = var10003;
      char[] var16;
      int var10004;
      if (var10003 <= 1) {
         var16 = var10001;
         var10004 = var0;
      } else {
         var10 = var10001;
         var3 = var10003;
         if (var10003 <= var0) {
            String var24 = new String(var10001).intern();
            byte var8 = -1;
            a = var24;
            return;
         }

         var16 = var10001;
         var10004 = var0;
      }

      while (true) {
         char var10005 = var16[var10004];
         byte var10006;
         switch (var0 % 7) {
            case 0:
               var10006 = 109;
               break;
            case 1:
               var10006 = 35;
               break;
            case 2:
               var10006 = 38;
               break;
            case 3:
               var10006 = 64;
               break;
            case 4:
               var10006 = 78;
               break;
            case 5:
               var10006 = 68;
               break;
            default:
               var10006 = 9;
         }

         var16[var10004] = (char)(var10005 ^ var10006);
         var0++;
         if (var3 == 0) {
            var10004 = var3;
            var16 = var10;
         } else {
            if (var3 <= var0) {
               String var23 = new String(var10).intern();
               byte var7 = -1;
               a = var23;
               return;
            }

            var16 = var10;
            var10004 = var0;
         }
      }
   }
}
```

</details>

#### Options

| Name                                 | Type           | Default                                                                                                                                                                             | Description                                                                                                                                                                                       |
| ------------------------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `remove-bridge`                      | Boolean        | `1`                                                                                                                                                                                 | Removes any methods that are marked as bridge from the decompiled output.                                                                                                                         |
| `remove-synthetic`                   | Boolean        | `1`                                                                                                                                                                                 | Removes any methods and fields that are marked as synthetic from the decompiled output.                                                                                                           |
| `decompile-inner`                    | Boolean        | `1`                                                                                                                                                                                 | Process inner classes and add them to the decompiled output.                                                                                                                                      |
| `decompile-java4`                    | Boolean        | `1`                                                                                                                                                                                 | Resugar the Java 1-4 class reference format instead of leaving the synthetic code.                                                                                                                |
| `decompile-assert`                   | Boolean        | `1`                                                                                                                                                                                 | Decompile assert statements.                                                                                                                                                                      |
| `hide-empty-super`                   | Boolean        | `1`                                                                                                                                                                                 | Hide super() calls with no parameters.                                                                                                                                                            |
| `hide-default-constructor`           | Boolean        | `1`                                                                                                                                                                                 | Hide constructors with no parameters and no code.                                                                                                                                                 |
| `decompile-generics`                 | Boolean        | `1`                                                                                                                                                                                 | Decompile generics in classes, methods, fields, and variables.                                                                                                                                    |
| `incorporate-returns`                | Boolean        | `1`                                                                                                                                                                                 | Integrate returns better in try-catch blocks instead of storing them in a temporary variable.                                                                                                     |
| `ensure-synchronized-monitors`       | Boolean        | `1`                                                                                                                                                                                 | If a synchronized block has a monitorenter without any corresponding monitorexit, try to deduce where one should be to ensure the synchronized is correctly decompiled.                           |
| `decompile-enums`                    | Boolean        | `1`                                                                                                                                                                                 | Decompile enums.                                                                                                                                                                                  |
| `decompile-preview`                  | Boolean        | `1`                                                                                                                                                                                 | Decompile features marked as preview or incubating in the latest Java versions.                                                                                                                   |
| `remove-getclass`                    | Boolean        | `1`                                                                                                                                                                                 | Remove synthetic getClass() calls created by code such as 'obj.new Inner()'.                                                                                                                      |
| `keep-literals`                      | Boolean        | `0`                                                                                                                                                                                 | Keep NaN, infinities, and pi values as is without resugaring them.                                                                                                                                |
| `boolean-as-int`                     | Boolean        | `1`                                                                                                                                                                                 | Represent integers 0 and 1 as booleans.                                                                                                                                                           |
| `ascii-strings`                      | Boolean        | `0`                                                                                                                                                                                 | Encode non-ASCII characters in string and character literals as Unicode escapes.                                                                                                                  |
| `synthetic-not-set`                  | Boolean        | `0`                                                                                                                                                                                 | Treat some known structures as synthetic even when not explicitly set.                                                                                                                            |
| `undefined-as-object`                | Boolean        | `1`                                                                                                                                                                                 | Treat nameless types as java.lang.Object.                                                                                                                                                         |
| `use-lvt-names`                      | Boolean        | `1`                                                                                                                                                                                 | Use LVT names for local variables and parameters instead of var<index>\_<version>.                                                                                                                |
| `use-method-parameters`              | Boolean        | `1`                                                                                                                                                                                 | Use method parameter names, as given in the MethodParameters attribute.                                                                                                                           |
| `remove-empty-try-catch`             | Boolean        | `1`                                                                                                                                                                                 | Remove try-catch blocks with no code.                                                                                                                                                             |
| `decompile-finally`                  | Boolean        | `1`                                                                                                                                                                                 | Decompile finally blocks.                                                                                                                                                                         |
| `lambda-to-anonymous-class`          | Boolean        | `0`                                                                                                                                                                                 | Decompile lambda expressions as anonymous classes.                                                                                                                                                |
| `bytecode-source-mapping`            | Boolean        | `0`                                                                                                                                                                                 | Map Bytecode to source lines.                                                                                                                                                                     |
| `ignore-invalid-bytecode`            | Boolean        | `0`                                                                                                                                                                                 | Ignore bytecode that is malformed.                                                                                                                                                                |
| `verify-anonymous-classes`           | Boolean        | `0`                                                                                                                                                                                 | Verify that anonymous classes are local.                                                                                                                                                          |
| `ternary-constant-simplification`    | Boolean        | `0`                                                                                                                                                                                 | Fold branches of ternary expressions that have boolean true and false constants.                                                                                                                  |
| `pattern-matching`                   | Boolean        | `1`                                                                                                                                                                                 | Decompile with if and switch pattern matching enabled.                                                                                                                                            |
| `try-loop-fix`                       | Boolean        | `1`                                                                                                                                                                                 | Fixes rare cases of malformed decompilation when try blocks are found inside of while loops                                                                                                       |
| `ternary-in-if`                      | Boolean        | `1`                                                                                                                                                                                 | Tries to collapse if statements that have a ternary in their condition.                                                                                                                           |
| `decompile-switch-expressions`       | Boolean        | `1`                                                                                                                                                                                 | Decompile switch expressions in modern Java class files.                                                                                                                                          |
| `show-hidden-statements`             | Boolean        | `0`                                                                                                                                                                                 | Display hidden code blocks for debugging purposes.                                                                                                                                                |
| `override-annotation`                | Boolean        | `1`                                                                                                                                                                                 | Display override annotations for methods known to the decompiler.                                                                                                                                 |
| `simplify-stack`                     | Boolean        | `1`                                                                                                                                                                                 | Simplify variables across stack bounds to resugar complex statements.                                                                                                                             |
| `verify-merges`                      | Boolean        | `0`                                                                                                                                                                                 | Tries harder to verify the validity of variable merges. If there are strange variable recompilation issues, this is a good place to start.                                                        |
| `old-try-dedup`                      | Boolean        | `0`                                                                                                                                                                                 | Use the old try deduplication algorithm for methods with obfuscated exceptions, which inserts dummy exception handlers instead of duplicating blocks                                              |
| `explicit-generics`                  | Boolean        | `0`                                                                                                                                                                                 | Put explicit diamond generic arguments on method calls.                                                                                                                                           |
| `inline-simple-lambdas`              | Boolean        | `1`                                                                                                                                                                                 | Remove braces on simple, one line, lambda expressions.                                                                                                                                            |
| `rename-members`                     | Boolean        | `0`                                                                                                                                                                                 | Rename classes, fields, and methods with a number suffix to help in deobfuscation.                                                                                                                |
| `new-line-separator`                 | Boolean        | `1`                                                                                                                                                                                 | Use \n instead of \r\n for new lines. Deprecated, do not use.                                                                                                                                     |
| `indent-string`                      | String         | `"   "`                                                                                                                                                                             | A string of spaces or tabs that is placed for each indent level.                                                                                                                                  |
| `preferred-line-length`              | Integer        | `160`                                                                                                                                                                               | Max line length before formatting is applied.                                                                                                                                                     |
| `banner`                             | String         | `""`                                                                                                                                                                                | A message to display at the top of the decompiled file.                                                                                                                                           |
| `error-message`                      | String         | `"Please report this to the Vineflower issue tracker, at https://github.com/Vineflower/vineflower/issues with a copy of the class file (if you have the rights to distribute it!)"` | Message to display when an error occurs in the decompiler.                                                                                                                                        |
| `warn-inconsistent-inner-attributes` | Boolean        | `1`                                                                                                                                                                                 | Warn about inconsistent inner class attributes                                                                                                                                                    |
| `dump-bytecode-on-error`             | Boolean        | `1`                                                                                                                                                                                 | Put the bytecode in the method body when an error occurs.                                                                                                                                         |
| `dump-exception-on-error`            | Boolean        | `1`                                                                                                                                                                                 | Put the exception message in the method body or source file when an error occurs.                                                                                                                 |
| `decompiler-comments`                | Boolean        | `1`                                                                                                                                                                                 | Sometimes, odd behavior of the bytecode or unfixable problems occur. This enables or disables the adding of those to the decompiled output.                                                       |
| `sourcefile-comments`                | Boolean        | `0`                                                                                                                                                                                 | Add debug comments showing the class SourceFile attribute if present.                                                                                                                             |
| `decompile-complex-constant-dynamic` | Boolean        | `0`                                                                                                                                                                                 | Some constant-dynamic expressions can't be converted to a single Java expression with identical run-time behaviour. This decompiles them to a similar non-lazy expression, marked with a comment. |
| `force-jsr-inline`                   | Boolean        | `0`                                                                                                                                                                                 | Forces the processing of JSR instructions even if the class files shouldn't contain it (Java 7+)                                                                                                  |
| `dump-text-tokens`                   | Boolean        | `0`                                                                                                                                                                                 | Dump Text Tokens on each class file                                                                                                                                                               |
| `remove-imports`                     | Boolean        | `0`                                                                                                                                                                                 | Remove import statements from the decompiled code                                                                                                                                                 |
| `mark-corresponding-synthetics`      | Boolean        | `0`                                                                                                                                                                                 | Mark lambdas and anonymous and local classes with their respective synthetic constructs                                                                                                           |
| `validate-inner-classes-names`       | Boolean        | `1`                                                                                                                                                                                 | Validates that the inner class name is correct (if it is separated using "$" for example BaseClass$InnerClass). If not then inner class won't be processed.                                       |
| `kt-show-public`                     | Boolean        | `true`                                                                                                                                                                              | If a construct is public, show the public keyword                                                                                                                                                 |
| `kt-enable`                          | Boolean        | `true`                                                                                                                                                                              | Decompile Kotlin classes as Kotlin instead of Java                                                                                                                                                |
| `kt-unknown-defaults`                | String         | `...`                                                                                                                                                                               | String to use for unknown default arguments, or empty to not indicate unknown defaults                                                                                                            |
| `kt-collapse-string-concat`          | Boolean        | `true`                                                                                                                                                                              | Convert string concatenations to Kotlin string templates.                                                                                                                                         |
| `variable-renaming`                  | String or null | `null`                                                                                                                                                                              | Use a custom renamer for variable names. Built-in options include "jad" and "tiny".                                                                                                               |
| `rename-parameters`                  | Boolean        | `false`                                                                                                                                                                             | Use the custom renamer for parameters in addition to locals.                                                                                                                                      |

### Procyon

[Procyon](https://github.com/mstrobel/procyon) is a suite of metaprogramming tools for Java, including a decompiler, developed by Mike Strobel.

It can be quite slow, especially with larger class files, however it excels at decompiling obfuscated class files into readable output,
thanks to its large collection of optimization passes done on its internal bytecode representation.

<details>
  <summary>Example output</summary>

```java
package sample.math;

public class HeapSort
{
    public void sort(final int[] arr) {
        final int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; --i) {
            this.heapify(arr, n, i);
        }
        for (int i = n - 1; i >= 0; --i) {
            final int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            this.heapify(arr, i, 0);
        }
    }

    void heapify(final int[] arr, final int n, final int i) {
        int largest = i;
        final int l = 2 * i + 1;
        final int r = 2 * i + 2;
        if (l < n && arr[l] > arr[largest]) {
            largest = l;
        }
        if (r < n && arr[r] > arr[largest]) {
            largest = r;
        }
        if (largest != i) {
            final int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            this.heapify(arr, n, largest);
        }
    }

    static void printArray(final int[] arr) {
        for (int n = arr.length, i = 0; i < n; ++i) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(final String[] args) {
        final int[] arr = { 12, 11, 13, 5, 6, 7 };
        final HeapSort ob = new HeapSort();
        ob.sort(arr);
        System.out.println("Sorted array is:");
        printArray(arr);
    }
}
```

</details>

<details>
  <summary>Example output (obfuscated; ZKM 17.0)</summary>

```java
package sample.math;

public class HeapSort
{
    public static boolean F;
    private static final String a;

    public void N(final Object[] array) {
        final long longValue = (long)array[0];
        final int[] array2 = (int[])array[1];
        final long n = longValue ^ 0x75AF228E50B2L;
        final int length = array2.length;
        for (int i = length / 2 - 1; i >= 0; --i) {
            this.q(new Object[] { array2, n, length, i });
        }
        for (int j = length - 1; j >= 0; --j) {
            final int n2 = array2[0];
            array2[0] = array2[j];
            array2[j] = n2;
            this.q(new Object[] { array2, n, j, 0 });
        }
    }

    void q(final Object[] array) {
        final int[] array2 = (int[])array[0];
        final long longValue = (long)array[1];
        final int intValue = (int)array[2];
        final int intValue2 = (int)array[3];
        final long n = longValue ^ 0x0L;
        int n2 = intValue2;
        final boolean f = HeapSort.F;
        final int n3 = 2 * intValue2 + 1;
        final boolean b = f;
        final int n4 = 2 * intValue2 + 2;
        int n6;
        final int n5 = n6 = n3;
        final int n8;
        final int n7 = n8 = intValue;
        if (b || n5 >= n7) {
            goto Label_0129;
        }
        final int n9 = array2[n3];
        final int n10 = array2[n2];
        final boolean b2 = b;
        if (longValue < 0L || b2) {
            int n13 = 0;
            Label_0205: {
                Label_0194: {
                    if (!b2) {
                        if (n5 < n7) {
                            final int n11 = array2[n4];
                            final int n12 = array2[n2];
                            if (longValue <= 0L || b) {
                                break Label_0194;
                            }
                            if (n11 > n12) {
                                n2 = n4;
                            }
                        }
                        n13 = (n6 = n2);
                        final boolean b3 = b;
                        if (longValue > 0L && b3) {
                            break Label_0205;
                        }
                    }
                }
                if (n9 == n10) {
                    return;
                }
                n13 = array2[intValue2];
            }
            final int n14 = n13;
            array2[intValue2] = array2[n2];
            array2[n2] = n14;
            this.q(new Object[] { array2, n, intValue, n2 });
            return;
        }
        if (n9 > n10) {
            n2 = n3;
            goto Label_0125;
        }
        goto Label_0125;
    }

    static void t(final Object[] array) {
        final int[] array2 = (int[])array[0];
        ((Long)array[1]).longValue();
        for (int length = array2.length, i = 0; i < length; ++i) {
            System.out.print(array2[i] + " ");
        }
        System.out.println();
    }

    public static void main(final String[] args) {
        final long n = 54536233763080L;
        final long n2 = n ^ 0x56D9CC7B6245L;
        final long n3 = n ^ 0x767115DAF19BL;
        final int[] array = { 12, 11, 13, 5, 6, 7 };
        new HeapSort().N(new Object[] { n3, array });
        System.out.println(HeapSort.a);
        t(new Object[] { array, n2 });
    }

    static {
        final char[] charArray = ">LT4+ )\fQT!7d`\u001e\u0019".toCharArray();
        int length;
        int n2;
        final int n = n2 = (length = charArray.length);
        int n3 = 0;
        while (true) {
            Label_0120: {
                if (n > 1) {
                    break Label_0120;
                }
                length = (n2 = n3);
                do {
                    final char c = charArray[n2];
                    charArray[length] = (char)(c ^ switch (n3 % 7) {
                        case 0 -> 'm';
                        case 1 -> '#';
                        case 2 -> '&';
                        case 3 -> '@';
                        case 4 -> 'N';
                        case 5 -> 'D';
                        default -> '\t';
                    });
                    ++n3;
                } while (n == 0);
            }
            if (n <= n3) {
                a = new String(charArray).intern();
                return;
            }
            continue;
        }
    }
}
```

</details>

#### Options

| Name                                                  | Type    | Default | Description                                                                  |
| ----------------------------------------------------- | ------- | ------- | ---------------------------------------------------------------------------- |
| `always-generate-exception-variable-for-catch-blocks` | Boolean | `true`  | Always generate an exception variable for catch blocks, even if it is unused |
| `disable-for-each-transforms`                         | Boolean | `false` | Disable transforms for for-each loops                                        |
| `exclude-nested-types`                                | Boolean | `false` | Exclude nested types from decompilation                                      |
| `flatten-switch-blocks`                               | Boolean | `false` | Drop unnecessary braces in switch blocks                                     |
| `force-explicit-imports`                              | Boolean | `true`  | Force fully qualified type names in output                                   |
| `force-explicit-type-arguments`                       | Boolean | `false` | Force explicit type arguments on method calls                                |
| `force-fully-qualified-references`                    | Boolean | `false` | Force fully qualified references                                             |
| `include-error-diagnostics`                           | Boolean | `true`  | Include error diagnostics in output                                          |
| `include-line-numbers-in-bytecode`                    | Boolean | `true`  | Include line numbers in bytecode comments                                    |
| `merge-variables`                                     | Boolean | `false` | Merge variables with non-overlapping scopes                                  |
| `preview-features-enabled`                            | Boolean | `false` | Enable decompilation of preview features                                     |
| `retain-pointless-switches`                           | Boolean | `false` | Retain switches that could be replaced with if statements                    |
| `retain-redundant-casts`                              | Boolean | `false` | Retain redundant type casts                                                  |
| `show-debug-line-numbers`                             | Boolean | `false` | Show line numbers from debug info in comments                                |
| `show-synthetic-members`                              | Boolean | `false` | Show synthetic (compiler-generated) members                                  |
| `simplify-member-references`                          | Boolean | `false` | Simplify member references by removing redundant qualifiers                  |
| `text-block-line-minimum`                             | Integer | `3`     | Minimum number of lines required for text block formatting                   |
| `unicode-output-enabled`                              | Boolean | `false` | Enable unicode characters in output                                          |

## Disassemblers

The currently supported disassemblers are:

- JASM (disassembler, https://github.com/jumanji144/Jasm)
- slicer (pseudocode disassembler, https://github.com/run-slicer/asm)

### JASM

[JASM](https://github.com/jumanji144/Jasm) is a modular (Java and soon Dalvik) disassembler, developed by the team behind [Recaf](https://github.com/Col-E/Recaf).

It produces clean and easily comprehensible output with a focus on obfuscation resilience.

<details>
  <summary>Example output</summary>

```
.sourcefile "HeapSort.java"
.super java/lang/Object
.class public super sample/math/HeapSort {


    .method public <init> ()V {
        parameters: { this },
        code: {
        A:
            line 8
            aload this
            invokespecial java/lang/Object.<init> ()V
            return
        B:
        }
    }

    .method public sort ([I)V {
        parameters: { this, arr },
        code: {
        A:
            line 16
            aload arr
            arraylength
            istore n
        B:
            line 19
            iload n
            iconst_2
            idiv
            iconst_1
            isub
            istore i
        C:
            iload i
            iflt F
        D:
            line 20
            aload this
            aload arr
            iload n
            iload i
            invokevirtual sample/math/HeapSort.heapify ([III)V
        E:
            line 19
            iinc i -1
            goto C
        F:
            line 23
            iload n
            iconst_1
            isub
            istore i
        G:
            iload i
            iflt M
        H:
            line 25
            aload arr
            iconst_0
            iaload
            istore temp
        I:
            line 26
            aload arr
            iconst_0
            aload arr
            iload i
            iaload
            iastore
        J:
            line 27
            aload arr
            iload i
            iload temp
            iastore
        K:
            line 30
            aload this
            aload arr
            iload i
            iconst_0
            invokevirtual sample/math/HeapSort.heapify ([III)V
        L:
            line 23
            iinc i -1
            goto G
        M:
            line 32
            return
        N:
        }
    }

    .method heapify ([III)V {
        parameters: { this, arr, n, i },
        code: {
        A:
            line 45
            iload i
            istore largest
        B:
            line 46
            iconst_2
            iload i
            imul
            iconst_1
            iadd
            istore l
        C:
            line 47
            iconst_2
            iload i
            imul
            iconst_2
            iadd
            istore r
        D:
            line 50
            iload l
            iload n
            if_icmpge E
            aload arr
            iload l
            iaload
            aload arr
            iload largest
            iaload
            if_icmple E
            iload l
            istore largest
        E:
            line 53
            iload r
            iload n
            if_icmpge F
            aload arr
            iload r
            iaload
            aload arr
            iload largest
            iaload
            if_icmple F
            iload r
            istore largest
        F:
            line 56
            iload largest
            iload i
            if_icmpeq K
        G:
            line 57
            aload arr
            iload i
            iaload
            istore swap
        H:
            line 58
            aload arr
            iload i
            aload arr
            iload largest
            iaload
            iastore
        I:
            line 59
            aload arr
            iload largest
            iload swap
            iastore
        J:
            line 62
            aload this
            aload arr
            iload n
            iload largest
            invokevirtual sample/math/HeapSort.heapify ([III)V
        K:
            line 64
            return
        L:
        }
    }

    .method static printArray ([I)V {
        parameters: { arr },
        code: {
        A:
            line 73
            aload arr
            arraylength
            istore n
        B:
            line 74
            iconst_0
            istore i
        C:
            iload i
            iload n
            if_icmpge F
        D:
            line 75
            getstatic java/lang/System.out Ljava/io/PrintStream;
            new java/lang/StringBuilder
            dup
            invokespecial java/lang/StringBuilder.<init> ()V
            aload arr
            iload i
            iaload
            invokevirtual java/lang/StringBuilder.append (I)Ljava/lang/StringBuilder;
            ldc " "
            invokevirtual java/lang/StringBuilder.append (Ljava/lang/String;)Ljava/lang/StringBuilder;
            invokevirtual java/lang/StringBuilder.toString ()Ljava/lang/String;
            invokevirtual java/io/PrintStream.print (Ljava/lang/String;)V
        E:
            line 74
            iinc i 1
            goto C
        F:
            line 76
            getstatic java/lang/System.out Ljava/io/PrintStream;
            invokevirtual java/io/PrintStream.println ()V
        G:
            line 77
            return
        H:
        }
    }

    .method public static main ([Ljava/lang/String;)V {
        parameters: { args },
        code: {
        A:
            line 81
            bipush 6
            newarray int
            dup
            iconst_0
            bipush 12
            iastore
            dup
            iconst_1
            bipush 11
            iastore
            dup
            iconst_2
            bipush 13
            iastore
            dup
            iconst_3
            iconst_5
            iastore
            dup
            iconst_4
            bipush 6
            iastore
            dup
            iconst_5
            bipush 7
            iastore
            astore arr
        B:
            line 83
            new sample/math/HeapSort
            dup
            invokespecial sample/math/HeapSort.<init> ()V
            astore ob
        C:
            line 84
            aload ob
            aload arr
            invokevirtual sample/math/HeapSort.sort ([I)V
        D:
            line 86
            getstatic java/lang/System.out Ljava/io/PrintStream;
            ldc "Sorted array is:"
            invokevirtual java/io/PrintStream.println (Ljava/lang/String;)V
        E:
            line 87
            aload arr
            invokestatic sample/math/HeapSort.printArray ([I)V
        F:
            line 88
            return
        G:
        }
    }

}
```

</details>

#### Options

| Name     | Type   | Default  | Description                                           |
| -------- | ------ | -------- | ----------------------------------------------------- |
| `indent` | String | `"    "` | The indentation string to use when formatting output. |

### Integrated disassembler (slicer)

slicer includes a basic disassembler to power several bytecode analysis features, such as:

- the [class view](/slicer/reference/class) (prettifying class file constructs)
- the [flow graph](/slicer/reference/graph#control-flow) (prettifying instructions and computing the graph itself)
- the [search](/slicer/reference/analysis#search) (prettifying constant pool entries)
- the pseudocode disassembler

<details>
  <summary>Example output</summary>

```java
// Source file: HeapSort.java
package sample.math;

public super class HeapSort extends java.lang.Object {
    public HeapSort() {
        // 0: aload this Lsample/math/HeapSort;
        // 1: invokespecial java/lang/Object <init> ()V
        // 4: return
    }
    public void sort(int[] arr) {
        //  0: aload arr [I
        //  1: arraylength
        //  2: istore n I
        //  3: iload n I
        //  4: iconst_2
        //  5: idiv
        //  6: iconst_1
        //  7: isub
        //  8: istore i I
        //  9: iload i I
        // 10: iflt 26
        // 13: aload this Lsample/math/HeapSort;
        // 14: aload arr [I
        // 15: iload n I
        // 16: iload i I
        // 17: invokevirtual sample/math/HeapSort heapify ([III)V
        // 20: iinc i I -1
        // 23: goto 9
        // 26: iload n I
        // 27: iconst_1
        // 28: isub
        // 29: istore i I
        // 30: iload i I
        // 31: iflt 63
        // 34: aload arr [I
        // 35: iconst_0
        // 36: iaload
        // 37: istore temp I
        // 39: aload arr [I
        // 40: iconst_0
        // 41: aload arr [I
        // 42: iload i I
        // 43: iaload
        // 44: iastore
        // 45: aload arr [I
        // 46: iload i I
        // 47: iload temp I
        // 49: iastore
        // 50: aload this Lsample/math/HeapSort;
        // 51: aload arr [I
        // 52: iload i I
        // 53: iconst_0
        // 54: invokevirtual sample/math/HeapSort heapify ([III)V
        // 57: iinc i I -1
        // 60: goto 30
        // 63: return
    }
    void heapify(int[] arr, int n, int i) {
        //  0: iload i I
        //  1: istore largest I
        //  3: iconst_2
        //  4: iload i I
        //  5: imul
        //  6: iconst_1
        //  7: iadd
        //  8: istore l I
        // 10: iconst_2
        // 11: iload i I
        // 12: imul
        // 13: iconst_2
        // 14: iadd
        // 15: istore r I
        // 17: iload l I
        // 19: iload n I
        // 20: if_icmpge 38
        // 23: aload arr [I
        // 24: iload l I
        // 26: iaload
        // 27: aload arr [I
        // 28: iload largest I
        // 30: iaload
        // 31: if_icmple 38
        // 34: iload l I
        // 36: istore largest I
        // 38: iload r I
        // 40: iload n I
        // 41: if_icmpge 59
        // 44: aload arr [I
        // 45: iload r I
        // 47: iaload
        // 48: aload arr [I
        // 49: iload largest I
        // 51: iaload
        // 52: if_icmple 59
        // 55: iload r I
        // 57: istore largest I
        // 59: iload largest I
        // 61: iload i I
        // 62: if_icmpeq 91
        // 65: aload arr [I
        // 66: iload i I
        // 67: iaload
        // 68: istore swap I
        // 70: aload arr [I
        // 71: iload i I
        // 72: aload arr [I
        // 73: iload largest I
        // 75: iaload
        // 76: iastore
        // 77: aload arr [I
        // 78: iload largest I
        // 80: iload swap I
        // 82: iastore
        // 83: aload this Lsample/math/HeapSort;
        // 84: aload arr [I
        // 85: iload n I
        // 86: iload largest I
        // 88: invokevirtual sample/math/HeapSort heapify ([III)V
        // 91: return
    }
    static void printArray(int[] arr) {
        //  0: aload arr [I
        //  1: arraylength
        //  2: istore n I
        //  3: iconst_0
        //  4: istore i I
        //  5: iload i I
        //  6: iload n I
        //  7: if_icmpge 43
        // 10: getstatic java/lang/System out Ljava/io/PrintStream;
        // 13: new java/lang/StringBuilder
        // 16: dup
        // 17: invokespecial java/lang/StringBuilder <init> ()V
        // 20: aload arr [I
        // 21: iload i I
        // 22: iaload
        // 23: invokevirtual java/lang/StringBuilder append (I)Ljava/lang/StringBuilder;
        // 26: ldc " "
        // 28: invokevirtual java/lang/StringBuilder append (Ljava/lang/String;)Ljava/lang/StringBuilder;
        // 31: invokevirtual java/lang/StringBuilder toString ()Ljava/lang/String;
        // 34: invokevirtual java/io/PrintStream print (Ljava/lang/String;)V
        // 37: iinc i I 1
        // 40: goto 5
        // 43: getstatic java/lang/System out Ljava/io/PrintStream;
        // 46: invokevirtual java/io/PrintStream println ()V
        // 49: return
    }
    public static void main(java.lang.String[] args) {
        //  0: bipush 6
        //  2: newarray t
        //  4: dup
        //  5: iconst_0
        //  6: bipush 12
        //  8: iastore
        //  9: dup
        // 10: iconst_1
        // 11: bipush 11
        // 13: iastore
        // 14: dup
        // 15: iconst_2
        // 16: bipush 13
        // 18: iastore
        // 19: dup
        // 20: iconst_3
        // 21: iconst_5
        // 22: iastore
        // 23: dup
        // 24: iconst_4
        // 25: bipush 6
        // 27: iastore
        // 28: dup
        // 29: iconst_5
        // 30: bipush 7
        // 32: iastore
        // 33: astore arr [I
        // 34: new sample/math/HeapSort
        // 37: dup
        // 38: invokespecial sample/math/HeapSort <init> ()V
        // 41: astore ob Lsample/math/HeapSort;
        // 42: aload ob Lsample/math/HeapSort;
        // 43: aload arr [I
        // 44: invokevirtual sample/math/HeapSort sort ([I)V
        // 47: getstatic java/lang/System out Ljava/io/PrintStream;
        // 50: ldc "Sorted array is:"
        // 52: invokevirtual java/io/PrintStream println (Ljava/lang/String;)V
        // 55: aload arr [I
        // 56: invokestatic sample/math/HeapSort printArray ([I)V
        // 59: return
    }
}
```

</details>

#### Options

| Name             | Type    | Default  | Description                                                                                                         |
| ---------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `indent`         | String  | `"    "` | The indentation string to use when formatting output.                                                               |
| `fullyQualified` | Boolean | `true`   | Whether class references should be fully qualified, i.e. contain the package name in-line rather than in an import. |
| `verbose`        | Boolean | `true`   | Whether a verbose disassembly should be produced, i.e. contain attribute info.                                      |

#### Constant pool

Constant pool entries are represented in a format consisting of the entry type identifier and the stringified value of the entry.

- `UTF8 <value>` - any string-like value defined in the class file (names, descriptors, strings, ...)
- `Integer/FLOAT/LONG/DOUBLE <value>` - primitives defined in the class file
- `CLASS <class name in internal format, UTF8 value>` - class reference
- `String "<UTF8 value>"` - string literal defined in the class file
- `METHOD_TYPE <method descriptor, UTF8 value>` - method descriptor reference
- `MODULE/PACKAGE <module/package name, UTF8 value>` - module-info/package-info name data
- `FIELDREF/METHODREF/INTERFACE_METHODREF <owner name, CLASS value> <member name and descriptor, NAME_AND_TYPE value>` - class member reference
- `NAME_AND_TYPE <name, UTF8 value> <descriptor, UTF8 value>` - member name and descriptor reference
- `DYNAMIC/INVOKE_DYNAMIC <bootstrap method index> <member name and descriptor, NAME_AND_TYPE value>`
- `METHOD_HANDLE <handle kind> <METHODREF value>`
  - handle kinds: `GET_FIELD`, `GET_STATIC`, `PUT_FIELD`, `PUT_STATIC`, `INVOKE_VIRTUAL`, `INVOKE_STATIC`, `INVOKE_SPECIAL`, `NEW_INVOKE_SPECIAL`, `INVOKE_INTERFACE`

#### Pseudocode

The disassembler produces pseudocode similar to Java, which allows you to view the rough structure of classes in a familiar way.

It does not resugar many code constructs, such as if statements and variable declarations, so knowledge of the JVM instruction set is highly necessary.

```java
// Source file: StringsDuplicates.java
package sample.string;

public super class StringsDuplicates extends java.lang.Object {
    private static final java.lang.String F = "Hello this is a duplicate string";

    public StringsDuplicates() {
        // 0: aload this Lsample/string/StringsDuplicates;
        // 1: invokespecial java/lang/Object <init> ()V
        // 4: return
    }
    public static void main(java.lang.String[] args) {
        //  0: ldc "Hello this is a duplicate string"
        //  2: astore s Ljava/lang/String;
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

##### Header

Dissecting the class header, we can make out that we're looking at a regular class named `StringsDuplicates` with the modifiers `ACC_PUBLIC` and `ACC_SUPER`, and a super class of `java.lang.Object`.

Furthermore, it's located in the `sample.string` package and was compiled from a `StringsDuplicates.java` source file.

```java "StringsDuplicates.java" "sample.string" "public super" "StringsDuplicates" "java.lang.Object"
// Source file: StringsDuplicates.java
package sample.string;

public super class StringsDuplicates extends java.lang.Object {
    // ...
}
```

##### Members

Our class contains a couple of methods and one self-explanatory field, with one method resugared to its original constructor syntax.
The field has an assigned value, showing a value from its `ConstantValue` attribute.

Code inside the methods is represented via string representations of individual instructions and their offsets.

Instructions may also be encased in a try-catch statement with a virtual goto in the handler, signifying an entry in the exception handler table.

```java "java.lang.String F" "StringsDuplicates()" "4:" "23:" "return"
// ...
private static final java.lang.String F = "Hello this is a duplicate string";

public StringsDuplicates() {
    // 0: aload this Lsample/string/StringsDuplicates;
    // 1: invokespecial java/lang/Object <init> ()V
    // 4: return
}
public static void main(java.lang.String[] args) {
    //  0: ldc "Hello this is a duplicate string"
    //  2: astore s Ljava/lang/String;
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

// ...
```
