import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(`${Date.now()}-${file.name}`, buffer, {
        contentType: file.type,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("blog-images").getPublicUrl(data.path);

    return Response.json({ url: publicUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Response("Error uploading file", { status: 500 });
  }
}
