import { NextResponse } from 'next/server';
import { formString, serverApi } from '../../../../lib/server-api';

export async function POST(request: Request) {
  const form = await request.formData();
  await serverApi('/administrative/processes', {
    method: 'POST',
    body: JSON.stringify({
      subject: formString(form, 'subject'),
      description: formString(form, 'description'),
      sectorId: formString(form, 'sectorId') || undefined,
    }),
  });
  return NextResponse.redirect(new URL('/administrativo', request.url), { status: 303 });
}

