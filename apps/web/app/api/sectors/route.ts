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
  return NextResponse.redirect(new URL('/administrativo', request.url), { status: 303 });
}

