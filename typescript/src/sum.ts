export const sum = (
  a: string | number,
  b: string | number
): string | number => {
  if (typeof a === "string" || typeof b === "string") {
    return String(a) + String(b);
  }
  return a + b;
};
