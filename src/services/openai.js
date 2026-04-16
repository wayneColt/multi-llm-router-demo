// OpenAI service adapter
// Replace with your API key and preferred model.

export async function queryOpenAI(query, context = {}) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: context.model || 'gpt-4o',
      messages: [{ role: 'user', content: query }],
      max_tokens: context.max_tokens || 1024,
    }),
  });
  return response.json();
}
