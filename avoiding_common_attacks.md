## SWC-103 (Floating pragma)
Specific compiler pragma 0.8.0 used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## SWC-115 (tx.origin auth)
The contracts use msg.sender everywhere.

## Proper Use of Require, Assert and Revert
The require, revert and assert are used in a proper way. Please see rentProperty and rentPropertyDAT methods, where require is being used for input validation, revert is used for further validation and throwing exception with proper error message .