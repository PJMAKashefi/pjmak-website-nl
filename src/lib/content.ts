/**
 * Helpers for the editable site content.
 *
 * Page text lives in `src/content/copy.ts` as `{ en, nl }` pairs. Each pair is
 * addressable by a dot path ("hero.title", "services.items.2.body"). The
 * database stores overrides for those paths; anything not overridden falls
 * back to the text shipped in code, so a page can never render empty.
 */

export type Pair = { en: string; nl: string };
export type ListPair = { en: string[]; nl: string[] };

export type EditableBlock = {
  key: string;
  label: string;
  isList: boolean;
  defaultEn: string;
  defaultNl: string;
};

export type Overrides = Record<string, { en: string; nl: string }>;

const isPair = (v: unknown): v is Pair | ListPair => {
  if (typeof v !== "object" || v === null) return false;
  const keys = Object.keys(v);
  return keys.length === 2 && keys.includes("en") && keys.includes("nl");
};

const isStringPair = (v: Pair | ListPair): v is Pair => typeof (v as Pair).en === "string";

/** Turn a dot path into a readable label for the admin screen. */
export function labelForKey(key: string): string {
  return key
    .split(".")
    .filter((p) => p !== "items" && p !== "steps")
    .map((p) => (/^\d+$/.test(p) ? `#${Number(p) + 1}` : p.replace(/([a-z])([A-Z])/g, "$1 $2")))
    .join(" · ");
}

/** Walk the copy object and list every editable bilingual pair. */
export function flattenCopy(source: unknown, prefix = ""): EditableBlock[] {
  const out: EditableBlock[] = [];

  const walk = (node: unknown, path: string) => {
    if (isPair(node)) {
      const list = !isStringPair(node);
      out.push({
        key: path,
        label: labelForKey(path),
        isList: list,
        defaultEn: list ? (node.en as string[]).join("\n") : (node.en as string),
        defaultNl: list ? (node.nl as string[]).join("\n") : (node.nl as string),
      });
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, i) => walk(child, path ? `${path}.${i}` : String(i)));
      return;
    }
    if (typeof node === "object" && node !== null) {
      for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
    }
  };

  walk(source, prefix);
  return out;
}

/** Return a copy of `source` with database overrides applied. */
export function applyOverrides<T>(source: T, overrides: Overrides, prefix = ""): T {
  if (!overrides || Object.keys(overrides).length === 0) return source;

  const clone = (node: unknown, path: string): unknown => {
    if (isPair(node)) {
      const override = overrides[path];
      if (!override) return node;
      if (isStringPair(node)) return { en: override.en, nl: override.nl };
      const toList = (v: string) =>
        v
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
      return { en: toList(override.en), nl: toList(override.nl) };
    }
    if (Array.isArray(node)) return node.map((child, i) => clone(child, path ? `${path}.${i}` : String(i)));
    if (typeof node === "object" && node !== null) {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(node)) out[k] = clone(v, path ? `${path}.${k}` : k);
      return out;
    }
    return node;
  };

  return clone(source, prefix) as T;
}

/** Group blocks by their top-level page/section for the admin screen. */
export function groupBlocks(blocks: EditableBlock[]): { group: string; blocks: EditableBlock[] }[] {
  const map = new Map<string, EditableBlock[]>();
  for (const b of blocks) {
    const group = b.key.split(".")[0] ?? "other";
    const list = map.get(group) ?? [];
    list.push(b);
    map.set(group, list);
  }
  return [...map.entries()].map(([group, items]) => ({ group, blocks: items }));
}
