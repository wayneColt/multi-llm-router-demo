import { route } from './src/router.js';

// Example queries showing how the router selects providers:
const queries = [
  'Summarize this long document for me',       // → gemini
  'Debug this Python function',                 // → claude
  'Write a haiku about programming',            // → openai (default)
  'Explain why this regex fails on edge cases', // → claude
  'Transcript of the meeting',                  // → gemini
];

for (const q of queries) {
  console.log(`\nQuery: "${q}"`);
  try {
    const result = await route(q);
    console.log('Result:', JSON.stringify(result, null, 2).slice(0, 200));
  } catch (e) {
    console.log('(Set API keys to run live)', e.message);
  }
}
