import type { NextRequest } from 'next/server'
import { NextFetchEvent, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

const SECRET = process.env.NEXTAUTH_SECRET;

const PATTERNS = [
  [
    new URLPattern({ pathname: '/:locale/:slug' }),
    ({ pathname }) => pathname.groups,
  ],
]

const params = (url: string): { locale?: string, slug?: string } => {
  const input = url.split('?')[0]
  let result = {}

  for (const [pattern, handler] of PATTERNS) {
    const patternResult = pattern.exec(input)
    if (patternResult !== null && 'pathname' in patternResult) {
      result = handler(patternResult)
      break
    }
  }
  return result
}

export default async (req: NextRequest | any, ev: NextFetchEvent) => {

  const token = await getToken({ req, secret: SECRET, raw: true })

  if (!token) {
    const { locale, slug } = params(req.url)

    const url = req.nextUrl;
    url.pathname = 'auth/login';
    url.searchParams.set('p', `${locale}/${slug}`);

    return NextResponse.rewrite(url)

  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/checkout/:path*',
}

