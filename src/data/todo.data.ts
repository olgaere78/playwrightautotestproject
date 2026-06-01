// Deterministic test data for validation scenarios (no randomness).
// TodoMVC persists items in localStorage, and our fixture clears it per test.
export const todoItems = [
  'A', // min length
  'a1', // letters + digits
  'AlphaNumeric123',
  'X'.repeat(100), // boundary-ish length
  'EditedTitle',
];
