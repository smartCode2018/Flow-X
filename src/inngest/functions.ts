import prisma from "@/lib/db";
import {inngest} from "./client";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {generateText} from "ai";
import {createOpenAI} from "@ai-sdk/openai";
import {createAnthropic} from "@ai-sdk/anthropic";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  {id: "execute-ai"},
  {event: "execute/ai"},
  async ({event, step}) => {
    const {steps: geministeps} = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        system:
          "You are a helpful assistant that helps users with their tasks.",
        prompt: "What is the capital of France?",
        model: google("gemini-2.5-flash"),
      }
    );

    const {steps: openaiSteps} = await step.ai.wrap(
      "claudai-generate-text",
      generateText,
      {
        system:
          "You are a helpful assistant that helps users with their tasks.",
        prompt: "What is the capital of France?",
        model: openai("gpt-4o"),
      }
    );

    const {steps: anthropicSteps} = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        system:
          "You are a helpful assistant that helps users with their tasks.",
        prompt: "What is the capital of France?",
        model: anthropic("claude-3-100k"),
      }
    );

    return {
      geministeps,
      openaiSteps,
      anthropicSteps,
    };
  }
);
