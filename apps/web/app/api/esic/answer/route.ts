import { NextResponse } from 'next/server';
import { formString, serverApi } from '../../../../lib/server-api';

export async function POST(request: Request) {
  const form = await request.formData();
  await serverApi(`/esic/requests/${formString(form, 'id')}/answer`, {
    method: 'POST',
    body: JSON.stringify({ answer: formString(form, 'answer') }),
  });
  return NextResponse.redirect(new URL('/esic', request.url), { status: 303 });
}

