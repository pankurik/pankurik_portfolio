import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createSubmissionPage } from "@/lib/notion";

const CONTACT_TYPES = ["hiring", "collaboration", "other"] as const;
type ContactType = (typeof CONTACT_TYPES)[number];

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  type?: unknown;
  website?: unknown;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateBody(body: ContactBody) {
  if (typeof body.name !== "string" || !body.name.trim()) {
    return { error: "Invalid input" as const };
  }
  if (body.name.length > 100) {
    return { error: "Invalid input" as const };
  }

  if (typeof body.email !== "string" || !body.email.trim()) {
    return { error: "Invalid input" as const };
  }
  if (!isValidEmail(body.email)) {
    return { error: "Invalid input" as const };
  }

  if (typeof body.message !== "string" || !body.message.trim()) {
    return { error: "Invalid input" as const };
  }
  if (body.message.length > 1000) {
    return { error: "Invalid input" as const };
  }

  if (
    typeof body.type !== "string" ||
    !CONTACT_TYPES.includes(body.type as ContactType)
  ) {
    return { error: "Invalid input" as const };
  }

  return {
    data: {
      name: body.name.trim(),
      email: body.email.trim(),
      message: body.message.trim(),
      type: body.type as ContactType,
    },
  };
}

async function insertSubmission(data: {
  name: string;
  email: string;
  message: string;
  type: ContactType;
}) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("submissions").insert({
    name: data.name,
    email: data.email,
    message: data.message,
    type: data.type,
  });

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }
}

async function sendContactEmail(
  data: { name: string; email: string; message: string; type: ContactType },
  timestamp: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    throw new Error("Resend is not configured.");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: [to],
      reply_to: data.email,
      subject: `[Portfolio] New message from ${data.name} (${data.type})`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Type: ${data.type}`,
        `Timestamp: ${timestamp}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error: ${res.status} ${body}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    if (
      body.website != null &&
      String(body.website).trim() !== ""
    ) {
      return NextResponse.json({ success: true });
    }

    const validated = validateBody(body);
    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const { data } = validated;
    const timestamp = new Date().toISOString();

    await Promise.all([
      insertSubmission(data),
      sendContactEmail(data, timestamp),
      createSubmissionPage(data),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
