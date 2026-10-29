/**
 * Diagram kit — technical SVG figures for the campus-dev theme.
 *
 * Rules:
 * - inline SVG only; no raster, no external references;
 * - theme palette and typography;
 * - 2px strokes, 4–6px radius, no shadows/gradients;
 * - every figure carries <title>/<desc> and an aria-label.
 *
 * Use from a throwaway Node script, print the result, and paste it into the
 * slide inside <div class="media">…</div>.
 */

export const palette = {
  navy: '#101f38',
  ink: '#1f2937',
  muted: '#5b6472',
  line: '#e3e6eb',
  card: '#f4f5f7',
  blue: '#1e88e5',
  purple: '#7c3aed',
  orange: '#d9481f',
  teal: '#0e9f6e',
  white: '#ffffff',
};

export const fonts = {
  display: "'Oswald', 'Arial Narrow', sans-serif",
  body: "'Carlito', 'Calibri', Arial, sans-serif",
  mono: "'Roboto Mono', Consolas, monospace",
};

const esc = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/** Root SVG. */
export function svg({ width = 960, height = 420, title = '', desc = '', children = '' } = {}) {
  const label = esc(desc || title);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">`,
    title ? `<title>${esc(title)}</title>` : '',
    desc ? `<desc>${esc(desc)}</desc>` : '',
    children,
    '</svg>',
  ].join('');
}

/** Text. */
export function text({
  x,
  y,
  value,
  size = 16,
  weight = 400,
  color = palette.ink,
  family = fonts.body,
  anchor = 'start',
  baseline = 'middle',
  letterSpacing = 0,
} = {}) {
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" dominant-baseline="${baseline}" letter-spacing="${letterSpacing}">${esc(value)}</text>`;
}

/** Rect. */
export function rect({
  x,
  y,
  w,
  h,
  fill = palette.card,
  stroke = 'none',
  strokeWidth = 2,
  rx = 6,
} = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
}

/** Label in mono, uppercase — use for small category tags. */
export function label({ x, y, value, color = palette.muted, size = 13, anchor = 'start' } = {}) {
  return text({
    x,
    y,
    value: String(value).toUpperCase(),
    size,
    weight: 700,
    color,
    family: fonts.mono,
    anchor,
    letterSpacing: 0.6,
  });
}

/** Box with a title and optional subtitle. */
export function box({
  x,
  y,
  w = 180,
  h = 80,
  label: title = '',
  sub = '',
  color = palette.blue,
  fill = palette.card,
  rx = 6,
} = {}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const titleY = sub ? cy - 8 : cy;
  return [
    rect({ x, y, w, h, fill, stroke: color, strokeWidth: 2, rx }),
    text({
      x: cx,
      y: titleY,
      value: title,
      size: 17,
      weight: 700,
      color: palette.navy,
      family: fonts.body,
      anchor: 'middle',
    }),
    sub
      ? text({
          x: cx,
          y: cy + 16,
          value: sub,
          size: 12.5,
          color: palette.muted,
          anchor: 'middle',
        })
      : '',
  ].join('');
}

export function cpu(options = {}) {
  return box({ color: palette.blue, ...options });
}

export function memory(options = {}) {
  return box({ color: palette.teal, ...options });
}

export function storage(options = {}) {
  return box({ color: palette.navy, ...options });
}

/** Horizontal bus/band. */
export function bus({ x, y, w = 240, h = 26, label: title = '', color = palette.navy } = {}) {
  return [
    rect({ x, y, w, h, fill: color, stroke: 'none', rx: 4 }),
    text({
      x: x + w / 2,
      y: y + h / 2,
      value: title,
      size: 12,
      weight: 700,
      color: palette.white,
      family: fonts.mono,
      anchor: 'middle',
      letterSpacing: 0.5,
    }),
  ].join('');
}

/** Arrow with a filled head. */
export function arrow({
  x1,
  y1,
  x2,
  y2,
  color = palette.blue,
  width = 2,
  label: title = '',
  dashed = false,
} = {}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const baseX = x2 - Math.cos(angle) * size;
  const baseY = y2 - Math.sin(angle) * size;
  const leftX = baseX + Math.cos(angle + Math.PI / 2) * size * 0.55;
  const leftY = baseY + Math.sin(angle + Math.PI / 2) * size * 0.55;
  const rightX = baseX + Math.cos(angle - Math.PI / 2) * size * 0.55;
  const rightY = baseY + Math.sin(angle - Math.PI / 2) * size * 0.55;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return [
    `<line x1="${x1}" y1="${y1}" x2="${baseX}" y2="${baseY}" stroke="${color}" stroke-width="${width}" ${dashed ? 'stroke-dasharray="6 5"' : ''} />`,
    `<polygon points="${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}" fill="${color}" />`,
    title
      ? text({
          x: midX,
          y: midY - 9,
          value: title,
          size: 12,
          color: palette.muted,
          anchor: 'middle',
        })
      : '',
  ].join('');
}

/** Simple divider line. */
export function line({ x1, y1, x2, y2, color = palette.line, width = 1, dashed = false } = {}) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dashed ? 'stroke-dasharray="6 5"' : ''} />`;
}

/** Figure caption drawn inside the SVG (prefer the HTML .caption for slides). */
export function caption({ x, y, value, color = palette.muted } = {}) {
  return text({ x, y, value, size: 11, color, family: fonts.mono });
}
