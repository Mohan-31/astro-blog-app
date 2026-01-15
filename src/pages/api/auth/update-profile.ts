import type { APIRoute } from "astro";
import { createSupabaseClient } from "../../../lib/supabase";

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseClient(context);
  const formData = await context.request.formData();
  const username = formData.get("username")?.toString();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    username: username,
    updated_at: new Date(),
  });

  if (error) return new Response(error.message, { status: 500 });

  return context.redirect("/profile?success=true");
};