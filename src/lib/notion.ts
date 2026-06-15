type SubmissionPayload = {
  name: string;
  email: string;
  message: string;
  type: string;
};

export async function createSubmissionPage(payload: SubmissionPayload) {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    throw new Error("Notion is not configured.");
  }

  const today = new Date().toISOString().slice(0, 10);

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content: payload.name } }],
        },
        email: {
          email: payload.email,
        },
        message: {
          rich_text: [{ text: { content: payload.message } }],
        },
        type: {
          select: { name: payload.type },
        },
        created_at: {
          date: { start: today },
        },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion API error: ${res.status} ${body}`);
  }

  return res.json();
}
