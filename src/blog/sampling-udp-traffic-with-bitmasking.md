---
slug: "sampling-udp-traffic-with-bitmasking"
title: "Sampling UDP Packets w/ TCPDump Bit-Masking"
description: "Techniques for capturing representative UDP network traffic samples using IP checksum bit-masking"
date: 2021-08-31
author: "Ryan Thompson"
tags: ["tcpdump", "networking", "packet-analysis"]
featured: false
editable: false
---

This article examines techniques for capturing representative network traffic samples rather than complete packet captures, particularly focusing on UDP protocols where traditional handshake-based sampling isn't available.

## Why Sample Instead of Full Capture

On congested networks, complete packet capture creates unwieldy files quickly. Sampling allows longer capture windows while remaining manageable in size, increasing the likelihood of discovering intermittent activity.

## TCP Bottleneck Method

TCP connections can be sampled via the SYN-ACK handshake, which occurs exactly once per successful connection. This uses the filter:

```bash
tcp[13] & 0x3F = 0x12
```

## UDP Sampling Challenge

Unlike TCP, UDP has no required handshake or flag-based filtering mechanism. The solution leverages IP checksum randomness for representative sampling since "the IP checksum is calculated from 11 fields in the IP header."

## Why Not UDP Checksum?

UDP checksums proved unreliable for sampling because they're derived from only three header fields, leading to collisions when multiple packets share identical source ports, destination ports, and sizes.

## IP Checksum Approach

The IP checksum demonstrates sufficient randomness for sampling purposes. Bit-masking the final byte (`ip[11]`) allows selective capture:

| Filter | Approximate Capture Rate |
|--------|--------------------------|
| `ip[11] & 0x01 = 0x01` | 50% |
| `ip[11] & 0x03 = 0x03` | 25% |
| `ip[11] & 0x07 = 0x07` | 12.5% |

## Validation Testing

I tested this theory against a 16.6 million packet capture, confirming that IP checksum values distribute evenly across hex values and that filtered samples maintain similar traffic patterns to unfiltered data, proving the method's validity.
