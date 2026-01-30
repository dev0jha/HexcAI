export function grabUserNameInitials(username: string): string {
  const words = username.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}
