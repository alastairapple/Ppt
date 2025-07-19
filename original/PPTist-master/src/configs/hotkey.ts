export const enum KEYS {
  C = 'C',
  X = 'X',
  Z = 'Z',
  Y = 'Y',
  A = 'A',
  G = 'G',
  L = 'L',
  F = 'F',
  D = 'D',
  B = 'B',
  P = 'P',
  O = 'O',
  R = 'R',
  T = 'T',
  MINUS = '-',
  EQUAL = '=',
  DIGIT_0 = '0',
  DELETE = 'DELETE',
  UP = 'ARROWUP',
  DOWN = 'ARROWDOWN',
  LEFT = 'ARROWLEFT',
  RIGHT = 'ARROWRIGHT',
  ENTER = 'ENTER',
  SPACE = ' ',
  TAB = 'TAB',
  BACKSPACE = 'BACKSPACE',
  ESC = 'ESCAPE',
  PAGEUP = 'PAGEUP',
  PAGEDOWN = 'PAGEDOWN',
  F5 = 'F5',
}

interface HotkeyItem {
  type: string
  children: {
    label: string
    value?: string
  }[] 
}

export const HOTKEY_DOC: HotkeyItem[] = [
  {
    type: 'General',
    children: [
      { label: 'Cut', value: 'Ctrl + X' },
      { label: 'Copy', value: 'Ctrl + C' },
      { label: 'Paste', value: 'Ctrl + V' },
      { label: 'Paste as plain text', value: 'Ctrl + Shift + V' },
      { label: 'Quick Copy Paste', value: 'Ctrl + D' },
      { label: 'Select all', value: 'Ctrl + A' },
      { label: 'Undo', value: 'Ctrl + Z' },
      { label: 'Redo', value: 'Ctrl + Y' },
      { label: 'Delete', value: 'Delete / Backspace' },
      { label: 'Multiple selection', value: 'Hold Ctrl or Shift' },
      { label: 'Open find and replace', value: 'Ctrl + F' },
      { label: 'Print', value: 'Ctrl + P' },
      { label: 'Close dialog', value: 'ESC' },
    ],
  },
  {
    type: 'Slideshow',
    children: [
      { label: 'Start slideshow from beginning', value: 'F5' },
      { label: 'Start slideshow from current slide', value: 'Shift + F5' },
      { label: 'Switch to previous slide', value: '↑ / ← / PgUp' },
      { label: 'Switch to next slide', value: '↓ / → / PgDown' },
      { label: 'Switch to next slide', value: 'Enter / Space' },
      { label: 'Exit slideshow', value: 'ESC' },
    ],
  },
  {
    type: 'Slide Editing',
    children: [
      { label: 'New slide', value: 'Enter' },
      { label: 'Move canvas', value: 'Space + Mouse Drag' },
      { label: 'Zoom canvas', value: 'Ctrl + Mouse Wheel' },
      { label: 'Zoom in canvas', value: 'Ctrl + =' },
      { label: 'Zoom out canvas', value: 'Ctrl + -' },
      { label: 'Fit canvas to current screen', value: 'Ctrl + 0' },
      { label: 'Previous page (no element selected)', value: '↑' },
      { label: 'Next page (no element selected)', value: '↓' },
      { label: 'Previous page', value: 'Mouse Wheel Up / PgUp' },
      { label: 'Next page', value: 'Mouse Wheel Down / PgDown' },
      { label: 'Quickly create text', value: 'Double-click blank space / T' },
      { label: 'Quickly create rectangle', value: 'R' },
      { label: 'Quickly create circle', value: 'O' },
      { label: 'Quickly create line', value: 'L' },
      { label: 'Exit drawing state', value: 'Right Mouse Button' },
    ],
  },
  {
    type: 'Element Operations',
    children: [
      { label: 'Move', value: '↑ / ← / ↓ / →' },
      { label: 'Lock', value: 'Ctrl + L' },
      { label: 'Group', value: 'Ctrl + G' },
      { label: 'Ungroup', value: 'Ctrl + Shift + G' },
      { label: 'Bring to top', value: 'Alt + F' },
      { label: 'Send to bottom', value: 'Alt + B' },
      { label: 'Lock aspect ratio', value: 'Hold Ctrl or Shift' },
      { label: 'Create horizontal / vertical lines', value: 'Hold Ctrl or Shift' },
      { label: 'Cycle focus element', value: 'Tab' },
      { label: 'Confirm image crop', value: 'Enter' },
      { label: 'Complete custom shape drawing', value: 'Enter' },
    ],
  },
  {
    type: 'Table Editing',
    children: [
      { label: 'Focus to next cell', value: 'Tab' },
      { label: 'Move focus cell', value: '↑ / ← / ↓ / →' },
      { label: 'Insert row above', value: 'Ctrl + ↑' },
      { label: 'Insert row below', value: 'Ctrl + ↓' },
      { label: 'Insert column to the left', value: 'Ctrl + ←' },
      { label: 'Insert column to the right', value: 'Ctrl + →' },
    ],
  },
  {
    type: 'Chart Data Editing',
    children: [
      { label: 'Focus to next row', value: 'Enter' },
    ],
  },
  {
    type: 'Text Editing',
    children: [
      { label: 'Bold', value: 'Ctrl + B' },
      { label: 'Italic', value: 'Ctrl + I' },
      { label: 'Underline', value: 'Ctrl + U' },
      { label: 'Inline code', value: 'Ctrl + E' },
      { label: 'Superscript', value: 'Ctrl + ;' },
      { label: 'Subscript', value: `Ctrl + '` },
      { label: 'Select paragraph', value: `ESC` },
    ],
  },
  {
    type: 'Other Quick Operations',
    children: [
      { label: 'Add image - Paste image from system clipboard' },
      { label: 'Add image - Drag local image into canvas' },
      { label: 'Add image - Paste SVG code into canvas' },
      { label: 'Add image - Paste image link from pexels' },
      { label: 'Add text - Paste text from system clipboard' },
      { label: 'Add text - Drag selected text from external source into canvas' },
      { label: 'Text editing - Supports markdown syntax for creating lists and quotes' },
    ],
  },
]