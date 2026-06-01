export const TODO_TITLE_MAX_LEN = 100;

export function validateTodoTitle(title: string) {
  if (typeof title !== 'string') return { ok: false as const, reason: 'Title must be a string' };

  const trimmed = title.trim();
  if (!trimmed) return { ok: false as const, reason: 'Title must not be empty' };

  if (trimmed.length > TODO_TITLE_MAX_LEN) {
    return { ok: false as const, reason: `Title must be <= ${TODO_TITLE_MAX_LEN} characters` };
  }

  // Rule: only Latin letters/digits, no spaces, must start with a letter.
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(trimmed)) {
    return {
      ok: false as const,
      reason: 'Title must be alphanumeric (A-Z, a-z, 0-9), no spaces, and start with a letter',
    };
  }

  return { ok: true as const, value: trimmed };
}

export function ensureTodoTitle(title: string) {
  const result = validateTodoTitle(title);
  if (!result.ok) throw new Error(result.reason);
  return result.value;
}
