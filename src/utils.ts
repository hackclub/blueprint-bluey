import type { MessageElement } from "@slack/web-api/dist/types/response/ConversationsRepliesResponse";

const isTextElement = (e: unknown): e is { text: string } =>
  typeof (e as any)?.text === "string";

export const extractPlaintextFromMessage = (message: MessageElement) => {
  // collect into a neutral typed array so the predicate can narrow correctly
  const elements = (message.blocks ?? [])
    .flatMap((b) => b.elements ?? [])
    .flatMap((s) => s.elements ?? []) as unknown[];

  return elements
    .filter(isTextElement)
    .map((e) => e.text)
    .join("");
};

export const formatThread = (thread: MessageElement[]) => {
  return thread
    .map((msg, i) => {
      const timestamp = msg.ts?.split(".")?.[0];
      if (!timestamp) return "";
      const date = new Date(Number(timestamp) * 1000);
      const text = extractPlaintextFromMessage(msg);

      return `
  [#${i + 1} ${msg.user} ${date.toLocaleString()}]
  ${text}
  `;
    })
    .join("\n---\n");
};
