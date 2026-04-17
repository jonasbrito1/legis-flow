import { NextResponse } from 'next/server';
import { formString, publicApi } from '../../../../lib/server-api';

export async function POST(request: Request) {
  const form = await request.formData();
  const result = await publicApi<{ protocol: string }>('/esic/requests', {
    tenantSlug: formString(form, 'tenantSlug', 'camara-demo'),
    requesterName: formString(form, 'requesterName'),
    requesterEmail: formString(form, 'requesterEmail'),
    subject: formString(form, 'subject'),
    description: formString(form, 'description'),
  });
  return NextResponse.redirect(new URL(`/solicitacoes?protocolo=${result.protocol}`, request.url), { status: 303 });
}

