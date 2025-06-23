---
title: Disassembly
description: Reference of the disassembly feature.
---

Disassembly is a reconstruction of a Java class file into a human-readable representation or into Java source code (decompilation), this is the main view you'll see in slicer.

Custom ones can be added through the [Disassembler API](/script/disasm) (popular ones are [here](/resources/scripts#disassembly)).

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

### Integrated disassembler (slicer)

slicer includes a basic disassembler to power several bytecode analysis features, such as:

- the [class view](/reference/class) (prettifying class file constructs)
- the [flow graph](/reference/graph#control-flow) (prettifying instructions and computing the graph itself)
- the [search](/reference/analysis#search) (prettifying constant pool entries)
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

#### Constant pool

Constant pool entries are represented in a format consisting of the entry type identifier and the stringified value of the entry.

- `UTF8 <value>` - any string-like value defined in the class file (names, descriptors, strings, ...)
- `INTEGER/FLOAT/LONG/DOUBLE <value>` - primitives defined in the class file
- `CLASS <class name in internal format, UTF8 value>` - class reference
- `STRING "<UTF8 value>"` - string literal defined in the class file
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
