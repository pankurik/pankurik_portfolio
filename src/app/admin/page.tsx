import { AdminDashboard, type QuestionRow } from "@/components/AdminDashboard";
import { getSupabase } from "@/lib/supabase";

function toInt(v: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(v) ? v[0] : v;
  const n = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function sanitizeQuery(q: string) {
  // Avoid breaking PostgREST `or()` syntax with commas/parentheses.
  return q.replace(/[(),]/g, " ").trim();
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const key = (Array.isArray(sp.key) ? sp.key[0] : sp.key) ?? "";
  const secret = process.env.ADMIN_SECRET ?? "";

  if (!secret || key !== secret) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <p className="text-zinc-500">Access denied</p>
      </main>
    );
  }

  const pageSize = 20;
  const page = toInt(sp.page, 1);
  const q = sanitizeQuery(((Array.isArray(sp.q) ? sp.q[0] : sp.q) ?? "").toString());

  const supabase = getSupabase();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("questions")
    .select("id, question, answer, created_at", { count: "exact" })
    .order("created_at", { ascending: false });

  if (q) {
    const pattern = `%${q}%`;
    query = query.or(`question.ilike.${pattern},answer.ilike.${pattern}`);
  }

  const [{ data, error, count }, last7] = await Promise.all([
    query.range(from, to),
    supabase
      .from("questions")
      .select("id", { count: "exact", head: true })
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  if (error) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <p className="text-zinc-500">Failed to load question log.</p>
      </main>
    );
  }

  const items = (data ?? []) as QuestionRow[];
  const totalQuestions = count ?? 0;
  const questionsLast7Days = last7.count ?? 0;

  return (
    <AdminDashboard
      items={items}
      totalQuestions={totalQuestions}
      questionsLast7Days={questionsLast7Days}
      page={page}
      pageSize={pageSize}
      query={q}
      adminKey={key}
    />
  );
}

