export function buildTodoTitle(prefix: string = 'todo') {
  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  return `${prefix}-${suffix}`;
}
