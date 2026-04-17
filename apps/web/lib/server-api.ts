import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_URL } from './api';

type Json = Record<string, unknown>;

export async function getAccessToken() {
  return (await cookies()).get('access_token')?.value;
}

export async function requireAccessToken() {
  const token = await getAccessToken();
  if (!token) redirect('/login');
  return token;
}

export async function serverApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await requireAccessToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);

  if (!(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (response.status === 401 || response.status === 403) {
    redirect('/login');
  }

  if (!response.ok) {
    throw new Error(`Falha na API ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function publicApi<T>(path: string, body: Json): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha na API publica ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function formString(form: FormData, key: string, fallback = '') {
  const value = form.get(key);
  return typeof value === 'string' ? value : fallback;
}

export function formNumber(form: FormData, key: string, fallback = 0) {
  const value = Number(form.get(key));
  return Number.isFinite(value) ? value : fallback;
}

