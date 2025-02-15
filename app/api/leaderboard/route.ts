// pages/api/leaderboard.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const filter = searchParams.get("filter") || "all-time";
    const usersPerPage = 10;
    const offset = (page - 1) * usersPerPage;

    // Create filter condition based on 'filter' parameter
    const filterCondition =
      filter === "last-month"
        ? {
            createdAt: {
              gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
          }
        : {}; // If 'all-time', no filter on date

    const users = await prisma.user.findMany({
      where: filterCondition,
      orderBy: {
        points: "desc", // Sort by points
      },
      skip: offset,
      take: usersPerPage,
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
