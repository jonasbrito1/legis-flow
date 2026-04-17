const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export type DashboardStats = {
  documents: number;
  sessions: number;
  processes: number;
  esicOpen: number;
  files: number;
};

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha na API: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export { API_URL };

