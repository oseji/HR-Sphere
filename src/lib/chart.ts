// Shared Recharts styling helpers, theme-aware.

export const tooltipStyle = (dark: boolean) => ({
  background: dark ? "#161618" : "#ffffff",
  border: `1px solid ${dark ? "#27272a" : "#e2e8f0"}`,
  borderRadius: 8,
  fontSize: 12,
  color: dark ? "#f8fafc" : "#0f172a",
});

export const tickColor = (dark: boolean) => (dark ? "#94a3b8" : "#64748b");
export const gridColor = (dark: boolean) => (dark ? "#27272a" : "#e2e8f0");
