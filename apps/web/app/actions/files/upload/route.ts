import { NextResponse } from 'next/server';
import { API_URL } from '../../../../lib/api';
import { formString, requireAccessToken } from '../../../../lib/server-api';

export async function POST(request: Request) {
  const token = await requireAccessToken();
  const form = await request.formData();
  const file = form.get('file');
  const upload = new FormData();
  if (file instanceof File) upload.set('file', file);

  const params = new URLSearchParams();
  for (const key of ['documentId', 'processId', 'esicId']) {
    const value = formString(form, key);
    if (value) params.set(key, value);
  }

  await fetch(`${API_URL}/files/upload?${params.toString()}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: upload,
  });

  return new Response(null, { status: 303, headers: { Location: '/arquivos' } });
}

