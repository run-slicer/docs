---
title: Flow graph
description: Reference of the control flow graph feature.
---

slicer allows you to explore the control flow of a method using a top-to-bottom flow diagram.

This view can be opened in the context menu of a project entry (`Open as` -> `Flow graph`) or in the menu bar for an already opened view of a class file (`View` -> `Flow graph`).

## Components

A flow graph is composed of two parts: nodes and edges.

A node is a block of instructions, which are executed sequentially and an edge is a line that connects the execution of two blocks in a specific direction. An edge can represent:

 - a conditional/unconditional jump (a full line)
 - a natural flow of execution between two consecutive nodes (a dashed line)

Edges may also have hint labels, like `true`/`false` ("branch if comparison succeeds" instruction) or `default` (switch instruction default branch).

A node typically has 1 (unconditional jump), 2 (conditional jump) or more (switch conditional jump) edges, but it can also have no edges, which means it's dead code - it will _never_ be executed.

Every node must end with a branch (if, goto, switch or subroutine jump) or terminal instruction (return, throw or subroutine return), otherwise it does not pass [class file verification](https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-4.html#jvms-4.10.2.2) (execution fell off at end of code).

![](/assets/flow_graph.png)
