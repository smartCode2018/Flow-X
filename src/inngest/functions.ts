import prisma from "@/lib/db";
import {inngest} from "./client";
import * as Sentry from "@sentry/nextjs";
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
    Sentry.logger.info("User triggered test log", {log_source: "sentry_test"});
    console.warn("Somting is hapenning");
    const {steps: geministeps} = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        system:
          "You are a helpful assistant that helps users with their tasks.",
        prompt: "What is the capital of France?",
        model: google("gemini-2.5-flash"),
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const {steps: openaiSteps} = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        system:
          "You are a helpful assistant that helps users with their tasks.",
        prompt: "What is the capital of France?",
        model: openai("gpt-4o"),
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
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
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    return {
      geministeps,
      openaiSteps,
      anthropicSteps,
    };
  }
);
