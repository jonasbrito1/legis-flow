import { NextResponse } from 'next/server';
import { formString, serverApi } from '../../../lib/server-api';

export async function POST(request: Request) {
  const form = await request.formData();
  await serverApi('/users', {
    method: 'POST',
    body: JSON.stringify({
      name: formString(form, 'name'),
      email: formString(form, 'email'),
      password: formString(form, 'password'),
      role: formString(form, 'role', 'SERVIDOR'),
      sectorId: formString(form, 'sectorId') || undefined,
    }),
  });
  return new Response(null, { status: 303, headers: { Location: '/usuarios' } });
}

