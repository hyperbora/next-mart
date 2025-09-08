import { createServerClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { checkAdmin } from "./utils/auth";

export async function middleware(request: NextRequest) {
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
          cookiesToSet.forEach(({ name, value }) =>
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

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (loginRequired(user, request)) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (await invalidAdminPageAccess(request, user)) {
    const url = request.nextUrl.clone();
    url.pathname = "/error";
    return NextResponse.redirect(url);
  }

  if (await invalidAdminApiAccess(request, user)) {
    throw new Error("권한이 없습니다.");
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

async function invalidAdminPageAccess(request: NextRequest, user: User | null) {
  return (
    request.nextUrl.pathname.startsWith("/admin") &&
    (user === null || !(await checkAdmin(user.id)))
  );
}

async function invalidAdminApiAccess(request: NextRequest, user: User | null) {
  return (
    request.nextUrl.pathname.startsWith("/api/admin") &&
    (user === null || !(await checkAdmin(user.id)))
  );
}

function loginRequired(user: User | null, request: NextRequest) {
  return (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/error") &&
    !request.nextUrl.pathname.startsWith("/product") &&
    !(request.nextUrl.pathname === "/")
  );
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
