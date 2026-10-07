import {
  closeSync,
  constants,
  existsSync,
  fstatSync,
  lstatSync,
  openSync,
  opendirSync,
  readSync,
} from "node:fs";
import { join } from "node:path";

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

function entries(directory, pattern) {
  const descriptor = opendirSync(directory);
  const names = [];
  let count = 0;
  try {
    for (
      let entry = descriptor.readSync();
      entry;
      entry = descriptor.readSync()
    ) {
      count += 1;
      if (count > 4096) {
        throw new Error("Antigravity evidence exceeds the directory budget");
      }
      if (pattern.test(entry.name)) {
        names.push(entry.name);
      }
    }
  } finally {
    descriptor.closeSync();
  }
  return names.sort();
}

function transcriptText(file, maximum) {
  let descriptor;
  try {
    if (!lstatSync(file).isFile()) {
      throw new Error(
        "Antigravity transcript must be a regular file without symbolic links",
      );
    }
    descriptor = openSync(
      file,
      constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK,
    );
    const state = fstatSync(descriptor);
    if (!state.isFile() || state.size > maximum) {
      throw new Error("Antigravity transcript exceeds the file budget");
    }
    const buffer = Buffer.alloc(maximum + 1);
    let size = 0;
    while (size < buffer.length) {
      const count = readSync(
        descriptor,
        buffer,
        size,
        buffer.length - size,
        null,
      );
      if (!count) {
        break;
      }
      size += count;
    }
    if (size > maximum) {
      throw new Error("Antigravity transcript exceeds the file budget");
    }
    return { text: buffer.subarray(0, size).toString("utf8"), bytes: size };
  } finally {
    if (descriptor !== undefined) {
      closeSync(descriptor);
    }
  }
}

export function antigravityToolEvents(
  home,
  {
    conversationIds,
    maxBytes = 8_388_608,
    maxFiles = 256,
    maxEvents = 4096,
  } = {},
) {
  if (
    ![maxBytes, maxFiles, maxEvents].every(
      (limit) => Number.isSafeInteger(limit) && limit > 0,
    )
  ) {
    throw new Error("Antigravity evidence budgets must be positive integers");
  }
  if (
    conversationIds &&
    (!Array.isArray(conversationIds) ||
      !conversationIds.every((id) => typeof id === "string" && UUID.test(id)))
  ) {
    throw new Error("Antigravity conversation selection is invalid");
  }
  let directory = home;
  if (!existsSync(home)) {
    return [];
  }
  if (!lstatSync(home).isDirectory()) {
    throw new Error(
      "Antigravity evidence directories must not be symbolic links",
    );
  }
  for (const component of [".gemini", "antigravity-cli", "brain"]) {
    directory = join(directory, component);
    if (!existsSync(directory)) {
      return [];
    }
    if (!lstatSync(directory).isDirectory()) {
      throw new Error(
        "Antigravity evidence directories must not be symbolic links",
      );
    }
  }
  const events = [];
  const seen = new Set();
  const conversations = conversationIds ?? entries(directory, UUID);
  if (conversations.length > 64) {
    throw new Error("Antigravity evidence exceeds the conversation budget");
  }
  let bytes = 0;
  let files = 0;
  for (const conversation of conversations) {
    let chunks = directory;
    let missing = false;
    for (const component of [
      conversation,
      ".system_generated",
      "logs",
      "chunks",
      "transcript",
    ]) {
      chunks = join(chunks, component);
      if (!existsSync(chunks)) {
        missing = true;
        break;
      }
      if (!lstatSync(chunks).isDirectory()) {
        throw new Error(
          "Antigravity evidence directories must not be symbolic links",
        );
      }
    }
    if (missing) {
      continue;
    }
    for (const file of entries(chunks, /^\d{8}\.jsonl$/)) {
      files += 1;
      if (files > maxFiles || bytes >= maxBytes) {
        throw new Error("Antigravity evidence exceeds the read budget");
      }
      const data = transcriptText(
        join(chunks, file),
        Math.min(2_097_152, maxBytes - bytes),
      );
      bytes += data.bytes;
      for (const line of data.text.split("\n")) {
        let step;
        try {
          step = JSON.parse(line);
        } catch {
          continue;
        }
        if (
          !step ||
          typeof step !== "object" ||
          step.type !== "PLANNER_RESPONSE" ||
          !Number.isSafeInteger(step.step_index) ||
          !Array.isArray(step.tool_calls)
        ) {
          continue;
        }
        for (const [index, call] of step.tool_calls.entries()) {
          const id = `${conversation}-${step.step_index}-${index}`;
          if (
            seen.has(id) ||
            typeof call?.name !== "string" ||
            !/^[a-zA-Z0-9_.:-]{1,256}$/.test(call.name) ||
            !call.args ||
            typeof call.args !== "object" ||
            Array.isArray(call.args)
          ) {
            continue;
          }
          if (events.length >= maxEvents) {
            throw new Error("Antigravity evidence exceeds the event budget");
          }
          seen.add(id);
          const args = Object.fromEntries(
            Object.entries(call.args).map(([key, value]) => {
              try {
                return [key, JSON.parse(value)];
              } catch {
                return [key, value];
              }
            }),
          );
          events.push({
            type: "tool_use",
            tool_name: call.name,
            parameters: {
              ...args,
              file_path: args.AbsolutePath ?? args.file_path ?? args.path,
            },
            tool_id: id,
            nativeConversationId: conversation,
            nativeStepIndex: step.step_index,
          });
        }
      }
    }
  }
  return events;
}
