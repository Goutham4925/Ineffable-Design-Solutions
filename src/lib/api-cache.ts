type CacheEntry<T> = { data: T; expires: number };

const store = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

export async function cachedFetch<T>(url: string, ttlMs = 60_000): Promise<T> {
  const now = Date.now();
  const hit = store.get(url) as CacheEntry<T> | undefined;
  if (hit && hit.expires > now) return hit.data;

  // deduplicate concurrent requests for same URL
  if (inflight.has(url)) return inflight.get(url) as Promise<T>;

  const promise = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<T>;
    })
    .then((data) => {
      store.set(url, { data, expires: Date.now() + ttlMs });
      inflight.delete(url);
      return data;
    })
    .catch((err) => {
      inflight.delete(url);
      throw err;
    });

  inflight.set(url, promise);
  return promise;
}

export function bustCache(urlSubstring: string) {
  for (const key of store.keys()) {
    if (key.includes(urlSubstring)) store.delete(key);
  }
}
