# Plain Text Sanitizer
**A lightweight, precision utility for extracting clean, filename-safe text from the web.**

---

## Overview
Plain Text Sanitizer is a specialized browser extension designed for developers, archivists, and power users who need to copy text from web pages directly into scripts, filenames, or command-line environments. Unlike standard "copy as plain text" tools, this extension offers a surgical sanitization engine that resolves character conflicts before they hit your clipboard.

**Primary Environment:** This extension was developed and tested exclusively on **Brave**. While compatible with other Chromium environments, Brave remains the recommended target.

### The Sanitization Engine
The extension features a multi-stage processing pipeline that transforms raw selection data into clean strings. It specifically targets characters that are illegal in Windows filesystems (`\ / : * ? " < > |`) or problematic in scripting environments like PowerShell.

Key operational features include:
1. **Filename-Safe Conversions:** Instead of simply stripping slashes or question marks, the engine can swap them for "Legal" full-width variants (∕, ？, ；) that are visually similar but safely accepted by filesystems and terminal parsers.
2. **Formatting Enforcement:** Optional lowercase conversion and "Part" prefix removal (e.g., changing "Part 1" to "1") for standardized naming conventions.
3. **Line Break Integrity:** By default, the extension preserves structural paragraph breaks, ensuring that multi-line data remains readable for AI analysis or documentation.

### In-Page Visual Confirmation
To maintain a "noise-free" experience, the extension bypasses system-level notifications. Instead, it injects a silent, high-z-index "Toast" notification directly into the active webpage. This provides immediate visual feedback that the sanitized text has been successfully committed to the clipboard without triggering OS-level "Do Not Disturb" or "Focus Assist" blocks.

## Feature Reference

| Option | Description |
| :--- | :--- |
| **Lowercase Mode** | Converts all copied text to lowercase. Ideal for case-sensitive filesystems or consistent log entries. |
| **Convert / to ∕** | Replaces the standard forward slash with a Division Slash (U+2215). This allows "slashes" to appear in filenames without breaking directory paths. |
| **Use Legal Full-width ？；** | Replaces standard question marks and semicolons with wide variants. This prevents PowerShell and other shells from misinterpreting text as command delimiters. |
| **Remove "Part"** | Automatically strips the word "Part" when followed by numbers (e.g., "Part 01" becomes "01"), streamlining the naming of episodic media. |
| **Remove Illegal Characters** | The "Master Filter." Strips `\ / : * ? " < > \|` and the standard (legal) `;` from the copied text. If a "Legal" conversion above is enabled, those characters are converted instead of removed. |

---

## Dependencies
* **Browser:** Brave (Recommended) or other Chromium-based browsers (Chrome, Edge, Vivaldi).
* **Manifest Version:** Built on Manifest V3.
* **Limitations:** Browser security architecture prevents the extension from running on internal pages (e.g., `brave://settings`, `brave://extensions`) or the Web Store.

## Support & Maintenance
**This repository is provided "as-is" for archival purposes.** The author is not actively looking for feedback, feature requests, or bug reports. The issue tracker is disabled, and the author will not be responding to inquiries regarding setup or usage.

## Disclaimer
*This extension modifies your clipboard content. The author is not responsible for any accidental data loss, overwritten clipboard history, or script errors resulting from the use of sanitized text. Always verify critical filenames and scripts before execution.*

---
> **Document Control**
> *This document is up-to-date with the following version of Plain Text Sanitizer.*
> *2026.06.29__15.29.30*