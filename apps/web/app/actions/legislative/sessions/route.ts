import { NextResponse } from 'next/server';
import { formString, serverApi } from '../../../../lib/server-api';

export async function POST(request: Request) {
  const form = await request.formData();
  await serverApi('/legislative/sessions', {
    method: 'POST',
    body: JSON.stringify({
      title: formString(form, 'title'),
      date: formString(form, 'date'),
      agenda: formString(form, 'agenda'),
    }),
  });
  return new Response(null, { status: 303, headers: { Location: '/legislativo' } });
}

