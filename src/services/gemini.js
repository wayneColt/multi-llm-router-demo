// Google Gemini service adapter
// Replace with your API key and preferred model.

export async function queryGemini(query, context = {}) {
  const model = context.model || 'gemini-2.0-flash';
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: query }] }],
      }),
    }
  );
  return response.json();
}
