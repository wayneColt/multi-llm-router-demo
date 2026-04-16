// Anthropic (Claude) service adapter
// Replace with your API key and preferred model.

export default async function queryAnthropic(query, context = {}) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: context.model || 'claude-sonnet-4-5-20250514',
      max_tokens: context.max_tokens || 1024,
      messages: [{ role: 'user', content: query }],
    }),
  });
  return response.json();
}
