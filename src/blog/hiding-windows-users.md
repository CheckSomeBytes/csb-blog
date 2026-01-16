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

## Creating the Account

First, we create a new user account that will later be hidden.

[![Create Account](/blog-images/HidingUsers-CreateAccount.png)](/blog-images/HidingUsers-CreateAccount.png)

[![Initial Login Screen](/blog-images/HidingUsers-InitialLogin.png)](/blog-images/HidingUsers-InitialLogin.png)

## The Technique

The method involves modifying the Windows Registry at:

```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon
```

Users must create nested keys for "SpecialAccounts" and "UserList," then add a DWORD value matching the account name, setting it to `0` to hide or `1` to reveal.

[![Creating Registry Keys](/blog-images/HidingUsers-CreatingRegistyKeys.png)](/blog-images/HidingUsers-CreatingRegistyKeys.png)

[![Creating Registry Values](/blog-images/HidingUsers-CreatingRegistyValues.png)](/blog-images/HidingUsers-CreatingRegistyValues.png)

[![Setting Registry Values](/blog-images/HidingUsers-SettingRegistryValues.png)](/blog-images/HidingUsers-SettingRegistryValues.png)

## What Becomes Hidden

The registry modification successfully hides accounts from:

- Login screen user lists
- Start Menu user switcher
- Windows Settings account list
- File sharing permission menus

[![New Login Page](/blog-images/HidingUsers-NewLoginPage.png)](/blog-images/HidingUsers-NewLoginPage.png)

[![Start Menu](/blog-images/HidingUsers-StartMenu.gif)](/blog-images/HidingUsers-StartMenu.gif)

[![Account List](/blog-images/HidingUsers-AccountList.png)](/blog-images/HidingUsers-AccountList.png)

[![Share List](/blog-images/HidingUsers-ShareList.png)](/blog-images/HidingUsers-ShareList.png)

## Detectable Artifacts

Despite the hiding technique, forensic evidence persists in several locations:

- **Home directories** remain visible in the file system

[![User Directory](/blog-images/HidingUsers-UserDirectory.png)](/blog-images/HidingUsers-UserDirectory.png)

[![Login Error](/blog-images/HidingUsers-LoginError.png)](/blog-images/HidingUsers-LoginError.png)

- **User Account Pictures** folder at `C:\ProgramData\Microsoft\User Account Pictures` retains files even after account deletion

[![User Account Pictures](/blog-images/HidingUsers-UserAccountPictures.png)](/blog-images/HidingUsers-UserAccountPictures.png)

- **SAM Registry hive** (`SAM\Domains\Account\Users\`) maintains account data
- Various registry locations preserve account information

[![User Registry](/blog-images/HidingUsers-UserRegistry.png)](/blog-images/HidingUsers-UserRegistry.png)

## Conclusion

This technique targets average users rather than digital forensics professionals. Organizations implementing account creation monitoring and registry key surveillance would likely detect this evasion method.
