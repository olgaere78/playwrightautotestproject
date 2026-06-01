import { TODO_TITLE_MAX_LEN } from '../utils/todoTitle';

export const invalidTodoItems = [
  '', // empty
  '   ', // whitespace-only
  '1abc', // starts with digit
  'ab c', // contains space
  'ab!c', // special char
  'ab-c', // special char
  '😀', // non-latin
  'A'.repeat(TODO_TITLE_MAX_LEN + 1), // too long
];
