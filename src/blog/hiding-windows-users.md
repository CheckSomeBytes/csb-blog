---
slug: "hiding-windows-users"
title: "Making Windows Users 'Invisible'"
description: "How attackers can conceal user accounts on Windows systems using registry modifications"
date: 2022-01-09
author: "Ryan Thompson"
tags: ["windows", "security", "forensics", "persistence"]
featured: false
editable: false
---

This article examines how attackers can conceal user accounts on Windows systems to maintain persistent access without detection. The technique exploits registry settings to hide backdoor accounts from standard user interfaces.

## The Technique

The method involves modifying the Windows Registry at:

```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon
```

Users must create nested keys for "SpecialAccounts" and "UserList," then add a DWORD value matching the account name, setting it to `0` to hide or `1` to reveal.

## What Becomes Hidden

The registry modification successfully hides accounts from:

- Login screen user lists
- Start Menu user switcher
- Windows Settings account list
- File sharing permission menus

## Detectable Artifacts

Despite the hiding technique, forensic evidence persists in several locations:

- **Home directories** remain visible in the file system
- **User Account Pictures** folder at `C:\ProgramData\Microsoft\User Account Pictures` retains files even after account deletion
- **SAM Registry hive** (`SAM\Domains\Account\Users\`) maintains account data
- Various registry locations preserve account information

## Conclusion

This technique targets average users rather than digital forensics professionals. Organizations implementing account creation monitoring and registry key surveillance would likely detect this evasion method.
