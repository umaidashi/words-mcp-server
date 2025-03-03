import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "words",
  version: "1.0.0",
});

server.tool(
    "search_words",
    "Search for words in the dictionary",
    {
        params: z.string().min(1, "Please provide a word to search for"),
    },
    async ({ params }) => {
        return {
            content: [
                {
                    type: "text",
                    text: `Hello, ${params}!`,
                },
            ],
        };

    }
)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Words MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});