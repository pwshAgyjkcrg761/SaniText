// ==============================================================================
// SCRIPT: background.js for Plain Text Copier
// VERSION: 2026.06.29__15.29.30
// TARGET: Brave 1.91.180 / Chromium 149.0.7827.201
//
// Copyright (C) 2026 pwshAgyjkcrg761
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// ==============================================================================
// <PROTECTED>
// ==============================================================================
// AI INSTRUCTIONS v2026.06.24__06.54.45 : 
//
// 1. MESSAGE STAMP: 
//    - Every response containing code MUST begin with a standalone version stamp.
//    - Use CHICAGO TIME (Central Time), 24-hour clock.
//    - Format: YYYY.MM.DD__HH.MM.SS.
//    - CRITICAL: Use the time provided in the prompt or at https://www.timeanddate.com/worldclock/usa/chicago. Ensure minutes are exact.
//
// 2. VERSION SNIPPET PROHIBITION:
//    - DO NOT provide code snippets, anchors, or steps to update the script's internal VERSION comment or $scriptVersion variable. 
//    - The user handles internal file versioning manually based on the Message Stamp.
//
// 3. SCRIPT OUTPUT (SURGICAL FIXES ONLY):
//    - Provide minimal, highly targeted, surgical edits. Do not rewrite large blocks or entire functions.
//    - Always use a codebox with a copy button.
//    - Multiple modifications MUST be presented strictly ONE step at a time. Wait for user confirmation before proceeding to the next step. 
//    - DO NOT modify or refactor any code inside <PROTECTED> tags.
//
// 4. VERBATIM ANCHOR PROTOCOL (FOR NOTEPAD++):
//    - To facilitate "Find" in Notepad++, always structure edits with:
//      - "Verbatim Anchor (Before)" - The exact lines of existing code immediately before the change.
//      - "Verbatim Anchor (After)" - The exact lines of existing code immediately after the change.
//      - "Snippet to REPLACE" - The exact code block to be deleted.
//      - "What to PASTE in its place" - The new code block to be inserted.
//    - Do not summarize, truncate, or refactor the existing code used as an anchor.
//    - Match spaces, comments, and symbols exactly as they appear in the file.
//
// 5. CONTENT PRESERVATION:
//    - Do not remove, modify, or strip out telemetry data or DevDebug information from any provided code.
// ==============================================================================
// </PROTECTED>
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['lowerCaseEnabled', 'slashEnabled', 'legalQEnabled', 'partEnabled', 'sanitizeEnabled'], (data) => {
    const isModified = Object.values(data).some(val => val === true);
    const title = isModified ? "Copy (Sanitized)" : "Copy to Plain Text";
    chrome.contextMenus.create({
      id: "copyPlainText",
      title: title,
      contexts: ["selection"]
    });
  });
});

chrome.storage.onChanged.addListener(async () => {
  const data = await chrome.storage.local.get(['lowerCaseEnabled', 'slashEnabled', 'legalQEnabled', 'partEnabled', 'sanitizeEnabled']);
  const isModified = Object.values(data).some(val => val === true);
  const title = isModified ? "Copy (Sanitized)" : "Copy to Plain Text";
  chrome.contextMenus.update("copyPlainText", { title: title });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "copyPlainText") {
    const data = await chrome.storage.local.get(['lowerCaseEnabled', 'slashEnabled', 'legalQEnabled', 'partEnabled', 'sanitizeEnabled']);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (settings) => {
        // Grab the raw text from the window selection to preserve line breaks
        let rawText = window.getSelection().toString();
        if (!rawText.trim()) return;
        let text = rawText;

        // 1. Remove "Part" before numbers
        if (settings.partEnabled) {
          text = text.replace(/\bpart\s+(\d+)\b/gi, '$1');
        }

        // 2. Handle Slashes
        if (settings.slashEnabled) {
          text = text.replace(/[\/\uff0f]/g, '\u2215');
        }

        // 3. Handle Question Marks & Semicolons
        if (settings.legalQEnabled) {
          text = text.replace(/\?/g, '\uff1f').replace(/;/g, '\uff1b');
        }

        // 4. Sanitize Illegal Characters
        if (settings.sanitizeEnabled) {
          let regex = settings.legalQEnabled ? /[\\:*?"<>|]/g : /[\\:*?"<>|?;]/g;
          text = text.replace(regex, '');
          if (!settings.slashEnabled) {
            text = text.replace(/[\/\uff0f]/g, '');
          }
        }

        // 5. Space & Line Break Cleaning
        // Process line by line to preserve line breaks
        text = text.split(/\r?\n/).map(line => {
          let l = line.replace(/\s+([.,!?;？；])/g, '$1'); 
          return l.replace(/[ \t]{2,}/g, ' ').trim();
        }).join('\n').trim();

        // 6. Lowercase
        if (settings.lowerCaseEnabled) {
          text = text.toLowerCase();
        }

        // Copy the processed text to clipboard
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Visual confirmation inside the browser page
        const notification = document.createElement('div');
        notification.textContent = 'Copied to Clipboard';
        notification.style.cssText = `
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #323232;
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 4px;
          font-family: sans-serif;
          font-size: 13px;
          z-index: 2147483647;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.style.opacity = '1', 10);
        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
      },
      args: [data]
    });
  }
});