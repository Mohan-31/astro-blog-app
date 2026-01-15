import { createServerClient } from '@supabase/ssr'

export const createSupabaseClient = (context: any) => {
  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = context.cookies;
          if (typeof cookies.all === 'function') return cookies.all().map((c: any) => ({ name: c.name, value: c.value }));
          
          const rawHeader = context.request.headers.get('cookie') ?? '';
          return rawHeader.split(';').map((v: string) => {
            const [name, value] = v.split('=');
            return { name: name?.trim(), value: value?.trim() };
          }).filter((item: { name: string; value: string }) => item.name && item.value);
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            context.cookies.set(name, value, options)
          );
        },
      },
    }
  )
}