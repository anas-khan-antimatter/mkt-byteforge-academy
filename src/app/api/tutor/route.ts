import { NextRequest, NextResponse } from "next/server";

// Static fallback responses when no API key is configured
const FALLBACK_RESPONSES: Record<string, string> = {
  explain:
    "**Code snippet insight:**\n\nThis looks like you're working with a function or a code block. Here's a general approach to understanding it:\n\n1. **Read the signature first** — what inputs does it take?\n2. **Trace the data flow** — how do values transform as they go through the code?\n3. **Identify side effects** — does it mutate anything outside its scope?\n4. **Consider edge cases** — what happens with empty input, null values, or unexpected types?\n\nWant a more specific explanation? Try pasting a complete function or a specific section you're stuck on.",
  debug:
    "**Debugging tips:**\n\n1. **Console.log is your friend** — log intermediate values at each step\n2. **Check types** — use `typeof` or TypeScript to verify what you're working with\n3. **Simplify** — extract the problematic logic into a minimal reproduction\n4. **Rubber duck** — explain the code line-by-line to someone (or something)\n\nIf you share the specific error message, I can give you a more targeted fix.",
  improve:
    "**Code improvement suggestions:**\n\nGeneral principles for cleaner code:\n\n- **Single responsibility** — each function should do one thing well\n- **Avoid mutation** — prefer `const` and immutable patterns\n- **Name things clearly** — variable names should explain intent, not type\n- **Keep functions small** — if a function does more than a screen can show, break it up\n\nShare your actual code and I'll review it with Byteforge-specific best practices!",
};

function getFallbackResponse(snippet: string): string {
  const lower = snippet.toLowerCase();

  if (lower.includes("explain") || lower.includes("what does") || lower.includes("how does")) {
    return FALLBACK_RESPONSES.explain;
  }
  if (lower.includes("debug") || lower.includes("error") || lower.includes("fix") || lower.includes("broken") || lower.includes("bug")) {
    return FALLBACK_RESPONSES.debug;
  }
  if (lower.includes("improve") || lower.includes("refactor") || lower.includes("clean") || lower.includes("better")) {
    return FALLBACK_RESPONSES.improve;
  }

  // Default: analyze the snippet
  const lineCount = snippet.split("\n").length;
  return `**Code analysis complete:**\n\nI received ${snippet.length} characters across ${lineCount} lines. Here's what I can tell you:\n\n- ${snippet.length > 100 ? "This is a substantial piece of code. Let me break it down for you." : "This is a short snippet. Let's look at what it's doing."}\n- ${snippet.includes("function") || snippet.includes("=>") ? "I can see function definitions here." : "I don't see a function definition — is this a complete piece of logic?"}\n- ${snippet.includes("async") ? "You're working with asynchronous code." : "This appears to be synchronous code."}\n\n**Pro tip:** For a more detailed explanation, ask a specific question like 'Explain this function' or 'Debug this error.'`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { snippet, question } = body;

    if (!snippet || typeof snippet !== "string") {
      return NextResponse.json(
        { error: "Please provide a code snippet." },
        { status: 400 }
      );
    }

    // Truncate to avoid abuse
    const truncatedSnippet = snippet.slice(0, 2000);

    // If an API key is configured, use the real model
    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;

    if (apiKey && process.env.OPENAI_API_KEY) {
      try {
        const prompt = question
          ? `The student wrote this code:\n\`\`\`\n${truncatedSnippet}\n\`\`\`\n\nThey ask: ${question}\n\nProvide a clear, helpful explanation. Keep it concise.`
          : `The student wrote this code:\n\`\`\`\n${truncatedSnippet}\n\`\`\`\n\nProvide a clear, helpful explanation of what this code does and any suggestions for improvement. Keep it concise.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a senior software engineer and tutor at Byteforge Academy, a coding bootcamp. Explain code clearly, point out improvements, and teach best practices. Be encouraging and precise.",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({
            explanation: data.choices?.[0]?.message?.content?.trim() || getFallbackResponse(truncatedSnippet),
            model: "gpt-4o-mini",
          });
        }
      } catch {
        // Fall through to fallback
      }
    }

    // Return deterministic fallback
    return NextResponse.json({
      explanation: getFallbackResponse(truncatedSnippet),
      model: "byteforge-tutor (fallback)",
      note: "For AI-powered explanations, configure OPENAI_API_KEY in your environment.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}