# multi-llm-router-demo

A minimal keyword-based router that sends queries to the right LLM provider. Three services, one fallback chain, zero frameworks.

## Pattern

```
Query → analyzeQuery() → "gemini" | "claude" | "openai"
                              ↓
                         route() → provider
                              ↓ (on failure)
                         fallback → openai
```

## Quick Start

```bash
export ANTHROPIC_API_KEY=sk-ant-...
export OPENAI_API_KEY=sk-...
export GEMINI_API_KEY=AI...

node demo.js
```

## How It Works

`src/router.js` classifies queries by keyword matching:

| Keywords | Provider |
|----------|----------|
| document, summarize, long-form, transcript | Gemini |
| reason, debug, refactor, explain why | Claude |
| everything else | OpenAI |

If the selected provider fails, OpenAI is tried as fallback. If both fail, an error object is returned.

## Extending

Replace the keyword sets in `analyzeQuery()` with your own domain logic. Add new service adapters in `src/services/`. The routing pattern scales to any number of providers.

## Historical Note

This routing pattern was first drafted on 2024-07-23. Published here in sanitized, generalized form.

## License

MIT
