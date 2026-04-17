import { NextResponse } from 'next/server';
import { formNumber, formString, serverApi } from '../../../../lib/server-api';

export async function POST(request: Request) {
  const form = await request.formData();
  await serverApi('/legislative/documents', {
    method: 'POST',
    body: JSON.stringify({
      number: formString(form, 'number'),
      year: formNumber(form, 'year', new Date().getFullYear()),
      type: formString(form, 'type'),
      title: formString(form, 'title'),
      summary: formString(form, 'summary'),
      author: formString(form, 'author'),
    }),
  });
  return new Response(null, { status: 303, headers: { Location: '/legislativo' } });
}

