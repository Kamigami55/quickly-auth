import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { QUICKLY_API_URL } from '@/constants/apiUrl';

export async function GET() {
  // get authorization token from request header
  const headersList = headers();
  const authorization = headersList.get('Authorization');

  // Proxy profile API from server
  const res = await fetch(QUICKLY_API_URL.USER, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  return NextResponse.json(json);
}
