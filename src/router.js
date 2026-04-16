// multi-llm-router-demo / src/router.js
// Pattern: keyword classifier → routed service → graceful fallback.
// Demo with three example domains. Replace the keyword sets with your own.
//
// HISTORICAL NOTE: this routing pattern was first drafted 2024-07-23.
// Published here in sanitized, generalized form on 2026-04-16.

import queryAnthropic from './services/anthropic.js';
import { queryOpenAI } from './services/openai.js';
import { queryGemini } from './services/gemini.js';

function analyzeQuery(query) {
  const q = query.toLowerCase();

  // Long-context document analysis → Gemini
  if (q.includes('document') ||
      q.includes('summarize') ||
      q.includes('long-form') ||
      q.includes('transcript')) {
    return 'gemini';
  }

  // Structured reasoning + code → Claude
  if (q.includes('reason') ||
      q.includes('debug') ||
      q.includes('refactor') ||
      q.includes('explain why')) {
    return 'claude';
  }

  // Default: general-purpose → OpenAI
  return 'openai';
}

export async function route(query, context = {}) {
  const service = analyzeQuery(query);

  try {
    switch (service) {
      case 'gemini':
        return await queryGemini(query, context);
      case 'claude':
        return await queryAnthropic(query, context);
      case 'openai':
      default:
        return await queryOpenAI(query, context);
    }
  } catch (error) {
    console.error(`Service ${service} failed:`, error.message);

    // Graceful fallback: try OpenAI if it wasn't the original choice
    if (service !== 'openai') {
      console.log('Falling back to openai');
      try {
        return await queryOpenAI(query, context);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError.message);
      }
    }

    return {
      error: true,
      message: 'All providers failed. Check API keys and network.',
    };
  }
}
