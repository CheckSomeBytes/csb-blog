---
slug: "bit-masking-with-sticky-notes"
title: "TCPDump Bit-Masking (With Sticky Notes)"
description: "A teaching method for understanding bit-masking in network analysis using sticky notes as a conceptual framework"
date: 2021-05-22
author: "Ryan Thompson"
tags: ["tcpdump", "networking", "packet-analysis", "teaching"]
featured: false
editable: false
---

This article presents a teaching method for understanding bit-masking in network analysis by using "sticky notes" as a conceptual framework. This approach helped students grasp a notoriously difficult topic better than traditional mathematical explanations.

## TCP Flags Foundation

TCP flags are located at byte offset 13 in the TCP header (referenced as `tcp[13]`). These eight flags—CWR, ECE, URG, ACK, PUSH, RESET, SYN, and FIN—communicate connection intent.

The flags can be divided into:

- **Congestion flags:** CWR, ECE
- **Functional flags:** URG, ACK, PUSH, RESET, SYN, FIN

## The Sticky Notes Metaphor

Think of masking this way:

- `0` - Ignore this bit/flag value (cover it with a sticky note)
- `1` - Preserve this bit/flag value

Blue sticky notes conceptually cover irrelevant bits, forcing them to zero during filtering.

## Practical Scenarios

### Scenario 1: Finding SYN + ACK Packets

To identify connection acceptance (SYN + ACK packets) while disregarding congestion flags:

```bash
tcp[13] & 0x3F = 0x12
```

### Scenario 2: Finding Any SYN Packets

To detect any SYN-flagged packets regardless of other flags:

```bash
tcp[13] & 0x02 = 0x02
```

## Filter Syntax Pattern

Both examples demonstrate how bit-masking syntax follows the pattern:

```
<proto>[offset] & <bit-mask> <operator> <value>
```
