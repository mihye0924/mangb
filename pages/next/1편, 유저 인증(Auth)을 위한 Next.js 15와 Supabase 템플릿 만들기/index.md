---
author: 조미혜
title: 1편, 유저 인증(Auth)을 위한 Next.js 15와 Supabase 템플릿 만들기
thumbnail: thumbnail.png
refer: https://mycodings.fly.dev/blog/2024-12-29-nextjs-supabase-tutorial-1-making-template-and-omit-middleware
tags: [next, js]
layout: article
sidebar: false
created: 2025.03.12
avatar: true
---

### Next.js 템플릿 만들기

먼저, Next.js 앱을 아래와 같이 만듭니다.

```js{4}
  pnpx create-next-app@latest supabase-nextjs-test
  or
  npx create-next-app@latest supabase-nextjs-test
```

그러면 아래와 같이 여러 가지 세팅이 나오는데요.

App Router 그리고 Turbopack 이 보이네요.

```js{4}
➜ pnpx create-next-app@latest supabase-nextjs-test
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in ...
...
...
...
```

Success! Created supabase-nextjs-test at /.../...supabase-nextjs-test
React Router V7의 Vite 개발 서버와 비교해서 얼마나 느릴지 지금부터 걱정이 태산입니다.

최근 Next.js의 개발 서버가 너무 느리다는 불평으로 Next.js를 떠나는 개발자들이 많다는 게 많은 개발자 사이트에서 흘러나오고 있습니다.

저 또한 개발 서버가 너무 느려 Remix를 즐겨 쓴 큰 이유였는데요.

이번에는 Turbopack을 한번 믿어 보겠습니다.

### Supabase 관련 파일 작성하기

Next.js에서 Supabase를 Server-Side Auth 방식으로 구현하려면 [Supabase 공식 홈페이지](https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app) 를 참고하면 됩니다.

여기 가보면 두 개의 Supabase 관련 패키지를 설치하라고 합니다.

```js{4}
pnpm install @supabase/supabase-js @supabase/ssr
or
npm install @supabase/supabase-js @supabase/ssr
```

그리고 두 번째는 **`.env.local`** 파일에 Supabase 관련 URL과 ANON_KEY를 아래와 같이 넣으면 됩니다.

이건, 자신의 Supabase 대시보드에 가시면 현재 작업하고 있는 프로젝트에 잘 나와 있습니다.

```js{4}
NEXT_PUBLIC_SUPABASE_URL=https://lriwbmzw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci..........asddfsddffsdf0w
NEXT_PUBLIC 키워드가 궁금하시면 여기 블로그 가시면 쉽게 이해하실 수 있을 겁니다.
```

세 번째는 Supabase Client를 만들어야 하는데요.

Client는 서버 사이드 쪽 클라이언트와 클라이언트 사이드 쪽에 사용하는 클라이언트 두 개를 만들어야 합니다.

src 폴더 밑에 utils 폴더와 그 밑에 supabase 폴더를 만듭니다.

```js{4}
src/utils/supabase
```

이제 이곳에 아래와 같이 client.ts 파일과 server.ts 파일 두 개를 만듭니다.

```js{4}
// src/utils/supabase/client.ts 파일

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```js{4}
// src/utils/supabase/server.ts 파일

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
```

위 두 개의 파일까지 Supabase 공식 홈페이지에 있는 Next.js 관련 파일입니다.

마지막으로 미들웨어입니다.

서버 컴포넌트는 쿠키를 쓰지 못하므로, 미들웨어에서 Auth 토큰을 리프레시해줘야 합니다.

**supabase.auth.getUser** 함수를 호출하면 Supabase 서버에 실제로 fetch가 이루어지고 Auth 관련 토큰이 리프레시됩니다.

그러면 미들웨어에서 계속된 fetch가 이루어지면 DDos 공격이 이루어지게 되는 건데요.

이걸 방지하기 위해 request.cookies.set 명령어로 같은 토큰일 경우 리프레시가 이루어지지 않게 방지해주고 있습니다.

미들웨어 파일도 만들어주면 됩니다.

먼저, **`utils/supabase`** 폴더에 middleware.ts 파일을 만듭니다.

```js{4}
// src/utils/supabase/middleware.ts 파일

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
```

```js{4}
  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
```

그리고 이 파일을 실제 Next.js의 미들웨어 설정 파일인 middleware.ts 파일에서 사용하기만 하면 되는데요.

middleware.ts 파일의 위치는 app 폴더 밑이 아니라 app 폴더와 같은 위치 즉, 여기서는 src 폴더 밑에 middleware.ts 파일을 만들면 됩니다.

```js{4}
// src/middleware.ts 파일

import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
이제 모든 설정이 끝났습니다.
```

### 미들웨어는 나중에

그러면 여기까지의 상태에서 개발 서버를 돌려 봅시다.

```js{4}
npm run dev
```

그리고 브라우저에서 **`http://localhost:3000`**으로 가면 브라우저가 **`http://localhost:3000/login`**으로 강제로 redirect 되는 걸 볼 수 있는데요.

왜 그런 거냐면 바로 middleware.ts 파일 때문입니다.

이 파일을 자세히 보시면 아래 코드 때문인데요.

src 폴더 밑에 있는 middleware.ts 파일에서는 단순하게 supabase/middleware.ts 파일의 updateSession 함수를 호출하고 있습니다.

그러면 이 updateSession 함수를 살펴보아야 하는데요.

이 함수의 첫 번째는 supabase라는 리턴 값으로 createServerClient 함수를 실행하고 있습니다.

Supabase의 서버 사이드 쪽 클라이언트를 만들어주고 있죠.

여기서 궁금하신게 미들웨어에 있는 명령어는 매번 Request가 있을 때마다 실행되는 건데요.

그러면 createServerClient 함수가 매 Request 때마다 실행된다고 매우 무겁다고 느낄 수 있는데요.

Supabase 공식 문서를 잘 읽어 보시면 실제로는 createServerClient 함수가 매우 가볍다고 하니 걱정하지 않으셔도 된다고 합니다.

그러면 middleware.ts 파일을 계속 읽어 나가면 중간에 아래와 같은 코드가 나옵니다.

```js{4}
const {
    data: { user },
  } = await supabase.auth.getUser();
```

여기서 중요한 게 바로 auth.getUser 함수인데요.
Supabase 클라이언트를 만들고 getUser 함수를 호출하고 있네요.

이 getUser 함수와 얼핏 비슷한 게 현재 세션 정보를 얻는 getSession 함수가 있는데요.

Supabase 공식 문서에서는 getUser 함수를 사용하는 걸 권장하고 있습니다.

getUser 함수만이 실제적으로 Supabase 서버에 fetch 해서 유저 정보를 얻어오기 때문에 해킹의 염려가 없는 믿을만한 자료라는 겁니다.

getSession 함수는 로컬 상태 즉, 브라우저의 세션 정보를 가져오는 거라 누군가 해킹해서 잘못된 세션 정보를 가져올 수 있다고 경고하는데요.

그래서 미들웨어에서도 getUser로 실제 user 정보를 가져오고 있습니다.

그리고 그다음 코드가 아래와 같은데요.

```js{4}
if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
```

이 코드는 user 정보가 없거나 라우팅이 "/login", "/auth" 일 경우를 제외하고 강제로 현재 URL을 "/login"으로 NextResponse.redirect 해주고 있습니다.

그래서 개발 서버를 돌리면 무조건 "/login" 라우팅으로 이동하게 됩니다.

본인이 만들려고 하는 사이트가 이런 방식을 원하지 않으면 미들웨어 부분은 삭제하셔도 됩니다.

예를 들어 "/dashboard" 라우팅이라고 가정하면 여기서 직접 supabase.auth.getUser 함수를 이용해서 유저 로그인 정보를 가져오고 만약 유저가 로그인된 상태가 아니라고 프로그래머가 직접 원하는 작업을 하거나 원하는 곳으로 이동시킬 수 있기 때문입니다.

그래서 이번의 경우 middleware.ts 파일은 삭제하도록 하겠습니다.

이제 middleware 관련 파일을 삭제하면 개발서버는 "/login" 라우팅으로 이동하지 않고 "/" 라우팅을 잘 보여줄 겁니다.
