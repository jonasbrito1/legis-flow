import { NextResponse } from 'next/server';
import { formString, serverApi } from '../../../lib/server-api';

export async function POST(request: Request) {
  const form = await request.formData();
  await serverApi('/tenancy/sectors', {
    method: 'POST',
    body: JSON.stringify({
      name: formString(form, 'name'),
      acronym: formString(form, 'acronym'),
    }),
  });
  return new Response(null, { status: 303, headers: { Location: '/administrativo' } });
}

