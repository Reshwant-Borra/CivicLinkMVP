export default async function fetchJson(url: string, options: RequestInit = {}): Promise<any> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Network response was not ok (status ${res.status})`);
  }
  return res.json();
}
