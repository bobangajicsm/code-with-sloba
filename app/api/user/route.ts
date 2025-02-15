import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name, profileUrl } = await req.json();

  if (!name) {
    return new Response("Missing name", { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        profileUrl: profileUrl || null,
      },
    });

    return Response.json(updatedUser);
  } catch (error) {
    return new Response("Error updating profile", { status: 500 });
  }
}
