import type { APIRoute } from "astro";
import { createSupabaseClient } from "../../../lib/supabase";

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseClient(context);
  const formData = await context.request.formData();
  
  const postId = formData.get("post_id");
  const content = formData.get("content")?.toString();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response("You must be logged in to comment", { status: 401 });
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: content,
    user_id: user.id,      
    author_id: user.id,    
    user_email: user.email 
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return context.redirect(`/post/${postId}`);
};