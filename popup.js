// ==============================================================================
// SCRIPT: popup.js for Plain Text Sanitizer
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
const lowerToggle = document.getElementById('lowerCaseToggle');
const slashToggle = document.getElementById('slashToggle');
const legalQToggle = document.getElementById('legalQToggle');
const partToggle = document.getElementById('partToggle');
const sanitizeToggle = document.getElementById('sanitizeToggle');

const keys = ['lowerCaseEnabled', 'slashEnabled', 'legalQEnabled', 'partEnabled', 'sanitizeEnabled'];

chrome.storage.local.get(keys, (data) => {
  lowerToggle.checked = data.lowerCaseEnabled || false;
  slashToggle.checked = data.slashEnabled || false;
  legalQToggle.checked = data.legalQEnabled || false;
  partToggle.checked = data.partEnabled || false;
  sanitizeToggle.checked = data.sanitizeEnabled || false;
});

lowerToggle.addEventListener('change', () => chrome.storage.local.set({ lowerCaseEnabled: lowerToggle.checked }));
slashToggle.addEventListener('change', () => chrome.storage.local.set({ slashEnabled: slashToggle.checked }));
legalQToggle.addEventListener('change', () => chrome.storage.local.set({ legalQEnabled: legalQToggle.checked }));
partToggle.addEventListener('change', () => chrome.storage.local.set({ partEnabled: partToggle.checked }));
sanitizeToggle.addEventListener('change', () => chrome.storage.local.set({ sanitizeEnabled: sanitizeToggle.checked }));