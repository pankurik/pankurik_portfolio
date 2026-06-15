import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabase();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [total, week, recent] = await Promise.all([
      supabase.from("questions").select("id", { count: "exact", head: true }),
      supabase
        .from("questions")
        .select("id", { count: "exact", head: true })
        .gte("created_at", weekAgo),
      supabase
        .from("questions")
        .select("question")
        .order("created_at", { ascending: false })
        .limit(4),
    ]);

    if (total.error || week.error || recent.error) {
      console.error("Chat stats error:", total.error ?? week.error ?? recent.error);
      return NextResponse.json(
        { error: "Failed to fetch stats" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      totalQuestions: total.count ?? 0,
      questionsThisWeek: week.count ?? 0,
      recentQuestions: (recent.data ?? []).map((row) => row.question),
    });
  } catch (error) {
    console.error("Chat stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
