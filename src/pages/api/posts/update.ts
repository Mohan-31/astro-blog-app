import type { APIRoute } from "astro";
import { createSupabaseClient } from "../../../lib/supabase";

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseClient(context);
  const formData = await context.request.formData();
  
  const id = formData.get("id");
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  const { error } = await supabase
    .from("posts")
    .update({ title, content, updated_at: new Date() })
    .eq("id", id);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return context.redirect("/dashboard");
};