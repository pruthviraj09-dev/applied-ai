import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import askAI from "./ai";

const terminal = createInterface(input, output);

let totalTokens = 0;

async function main() {
  console.log("JavaScript AI Tutor");
  console.log("Ask a coding question, or type /exit to quit.\n");
  try {
    while (true) {
      const question = await terminal.question("You: ");

      if (question.trim().toLowerCase() == "/exit") {
        break;
      }

      if (!question.trim()) {
        console.log("Please enter a question.\n");
        continue;
      }

      try {
        console.log("\nThinking...\n");

        const result = await askAI(question);

        console.log(`Tutor: ${result.answer}\n`);

        if (result.usage) {
          totalTokens += result.usage.total_tokens!;

          console.log(
            `Tokens — input: ${result.usage.input_tokens!}, ` +
              `output: ${result.usage.output_tokens!}, ` +
              `total this session: ${totalTokens}\n`,
          );
        }
      } catch (error: any) {
        console.error(`Request failed: ${error.message}\n`);
      }
    }
  } catch (error) {
  } finally {
    terminal.close();
  }

  console.log(`Session finished. Tokens reported: ${totalTokens}`);
}

main().catch((error) => {
  console.error("Application error:", error.message);
  process.exitCode = 1;
});
