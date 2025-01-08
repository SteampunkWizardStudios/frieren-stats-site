export default function aggregateMaps<K, V>(rankings: Map<K, V>[]): Map<K, V[]> {
  const result = new Map<K, V[]>();

  for (const ranking of rankings) {
    for (const [key, value] of ranking) {
      if (result.has(key)) {
        result.get(key)?.push(value);
      } else {
        result.set(key, [value]);
      }
    }
  }

  return result;
}