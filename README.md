# TrendSwap MCP Server

Official Model Context Protocol (MCP) server for [TrendSwap](https://trendswap.app/) — Turn 1 photo into viral TikTok and Reels AI video drops with synchronized master audio.

Official MCP Registry: `io.github.GptsApp/trendswap`

## Features

- **`list_templates`**: List viral video and motion transfer templates (`burning-bridges`, `bulin-47`, `topo-gigio`).
- **`get_credits_balance`**: Query remaining user balance and account info.
- **`create_generation_job`**: Create AI motion transfer video generation job with photo URL and template ID.
- **`get_job_status`**: Poll generation status and download finished HD video.

## Quick Start

### 1. Remote Server (Cursor / Windsurf / Remote MCP Client)

Connect directly to the live Streamable HTTP endpoint:

```json
{
  "mcpServers": {
    "trendswap": {
      "url": "https://trendswap.app/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TRENDSWAP_API_KEY"
      }
    }
  }
}
```

> Get your API Key at [https://trendswap.app/settings/apikeys](https://trendswap.app/settings/apikeys).

### 2. Local Stdio Server (Claude Desktop)

Clone this repository and run locally:

```json
{
  "mcpServers": {
    "trendswap": {
      "command": "npx",
      "args": ["-y", "tsx", "src/index.ts"],
      "env": {
        "TRENDSWAP_API_KEY": "YOUR_TRENDSWAP_API_KEY"
      }
    }
  }
}
```

## Tools API Specification

### `list_templates`
List all live templates on TrendSwap. No authentication required.

### `get_credits_balance`
Requires `Authorization: Bearer sk_...`.
Returns user ID and available credit balance.

### `create_generation_job`
Parameters:
- `template` (string, required): e.g. `burning-bridges`, `bulin-47`, `topo-gigio`
- `image_url` (string, required): Direct public URL of portrait face image
- `resolution` (string, optional): `480p` (default, 25 credits), `720p`, `1080p`
- `format` (string, optional): `vertical` (default) or `horizontal`

### `get_job_status`
Parameters:
- `job_id` (string, required): The ID of the queued or running generation job

## License

MIT © [TrendSwap](https://trendswap.app)
