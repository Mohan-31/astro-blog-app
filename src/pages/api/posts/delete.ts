import type { APIRoute } from "astro";
import { createSupabaseClient } from "../../../lib/supabase";

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseClient(context);
  const formData = await context.request.formData();
  const id = formData.get("id");

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return context.redirect("/dashboard");
};