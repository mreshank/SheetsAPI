// Convert between 2D value arrays and JSON objects using the first row as headers.

export function rowsToObjects(values: string[][]): Record<string, string>[] {
  if (values.length === 0) return [];
  const [headers, ...rows] = values;
  return rows.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });
    return obj;
  });
}

export function objectToRow(obj: Record<string, unknown>, headers: string[]): string[] {
  return headers.map((h) => {
    const v = obj[h];
    if (v === undefined || v === null) return "";
    return typeof v === "string" ? v : JSON.stringify(v);
  });
}
