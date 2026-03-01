import { describe, it, expect } from "@jest/globals";
import { graph } from "../src/agent/graph.js";

describe("Graph", () => {
  it("should initialize interview and ask first question", async () => {
    const result = await graph.invoke(
      { messages: [] },
      {
        configurable: {
          interviewConfig: {
            interview_type: "screener",
            llm_fallback: true,
            questions: [
              {
                type: "short_answer",
                text: "Tell us about yourself",
                max_followups: 0,
              },
            ],
          },
        },
      }
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(result.messages).toBeDefined();
    expect(Array.isArray(result.messages)).toBe(true);
    // welcome + first question
    expect(result.messages.length).toBeGreaterThanOrEqual(2);

    const lastMessage = result.messages[result.messages.length - 1];
    expect(lastMessage.content.toString()).toContain("Tell us about yourself");
    expect(result.interviewType).toBe("screener");
    expect(result.currentQuestionIndex).toBe(0);
    expect(result.isComplete).toBe(false);
  }, 30000);
});
