import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Seiska Article Fetcher",
  version: "1.0.0",
  description:
    "A tool to fetch and analyze trending articles from Seiska or Katso",
});

// Helper function to get the current week in YYYY_WW format
const getCurrentWeek = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(
    ((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7
  );
  return `${now.getFullYear()}_${week.toString().padStart(2, "0")}`;
};

// Tool to fetch articles for the current week
server.tool(
  "fetchArticles",
  {
    site: z.string().default("seiska"),
    week: z
      .string()
      .regex(/^\d{4}_\d{2}$/)
      .default(getCurrentWeek()),
  },
  async (args) => {
    try {
      const url = `https://bskajxdux0.execute-api.eu-west-1.amazonaws.com/prod/pageview?site=${args.site}&week=${args.week}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        content: [
          {
            type: "text",
            text: `Error fetching articles: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start the server with stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
