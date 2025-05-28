# Seiska MCP

A Model Context Protocol (MCP) server for fetching trending articles from Seiska and Katso websites.

## Overview

This MCP server provides tools for AI assistants to fetch and analyze trending articles from Finnish entertainment and media websites Seiska and Katso. It connects to an AWS Lambda API to retrieve pageview data for specific weeks and sites.

## Features

- 🔍 Fetch trending articles from Seiska or Katso
- 📅 Query articles for specific weeks (YYYY_WW format)
- 🤖 MCP-compatible for seamless integration with AI assistants
- ⚡ Built with TypeScript and modern ES modules

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd seiska-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Running the MCP Server

Start the server using:
```bash
npm start
```

The server runs on stdio transport and is designed to be used with MCP-compatible clients.

### Running the MCP Server with MCP Client

```json
  "MCP Seiska server": {
    "command": "node",
    "args": ["path/to/this/directory/dist/mcp/server.js"]
  }
```
### Available Tools

#### fetchArticles

Fetches trending articles for a specified site and week.

**Parameters:**
- `site` (optional): Target site - "seiska" (default) or "katso"
- `week` (optional): Week in YYYY_WW format (defaults to current week)

**Example:**
```json
{
  "site": "seiska",
  "week": "2024_15"
}
```

## API Integration

The server connects to an AWS Lambda endpoint:
```
https://bskajxdux0.execute-api.eu-west-1.amazonaws.com/prod/pageview
```

Query parameters:
- `site`: The target website (seiska/katso)
- `week`: Week identifier in YYYY_WW format

## Development

### Project Structure

```
seiska-mcp/
├── src/
│   └── mcp/
│       └── article-fetcher.ts    # Main MCP server implementation
├── dist/                         # Compiled JavaScript output
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled MCP server

### Dependencies

- **@modelcontextprotocol/sdk**: MCP SDK for server implementation
- **node-html-parser**: HTML parsing utilities
- **zod**: Schema validation and type safety
- **typescript**: TypeScript compiler

## Week Format

The server uses a specific week format: `YYYY_WW`

Examples:
- `2024_01` - First week of 2024
- `2024_52` - 52nd week of 2024

The current week is automatically calculated based on the current date.

## Error Handling

The server includes comprehensive error handling:
- HTTP error responses from the API
- Invalid week format validation
- Network connectivity issues
- JSON parsing errors

All errors are returned as structured responses with error flags.