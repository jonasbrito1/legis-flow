import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  (await cookies()).delete('access_token');
  return new Response(null, { status: 303, headers: { Location: '/login' } });
}

