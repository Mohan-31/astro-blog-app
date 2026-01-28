import { createServerClient } from '@supabase/ssr'

export const createSupabaseClient = (context: any) => {
  // --- Debugging Logs (Remove these after fixing the issue) ---
  console.log("Initializing Supabase Client...");
  console.log("Supabase URL:", process.env.SUPABASE_URL);
  // Do not log the full key for security, just check if it exists
  console.log("Supabase Key Exists:", !!process.env.SUPABASE_ANON_KEY);
  // ------------------------------------------------------------

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key must be defined in environment variables.')
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          const cookies = context.cookies

          // Handle Astro's cookie object structure
          if (typeof cookies.all === 'function') {
            return cookies.all().map((c: any) => ({
              name: c.name,
              value: c.value,
            }))
          }

          // Fallback for raw headers if needed
          const rawHeader = context.request.headers.get('cookie') ?? ''
          return rawHeader
            .split(';')
            .map((v: string) => {
              const [name, value] = v.split('=')
              return { name: name?.trim(), value: value?.trim() }
            })
            .filter(
              (item: { name: string; value: string }) =>
                item.name && item.value
            )
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            context.cookies.set(name, value, options)
          })
        },
      },
    }
  )
}
