import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { API_URL } from '../../../../lib/api';
import { formString } from '../../../../lib/server-api';

export async function POST(request: Request) {
  const form = await request.formData();
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tenantSlug: formString(form, 'tenantSlug'),
      email: formString(form, 'email'),
      password: formString(form, 'password'),
    }),
  });

  if (!response.ok) {
    return new Response(null, { status: 303, headers: { Location: '/login?erro=credenciais' } });
  }

  const data = (await response.json()) as { accessToken: string };
  (await cookies()).set('access_token', data.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return new Response(null, { status: 303, headers: { Location: '/dashboard' } });
}

