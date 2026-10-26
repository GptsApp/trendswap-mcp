import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { z } from 'zod';

const API_BASE = process.env.TRENDSWAP_API_URL || 'https://trendswap.app';
const API_KEY = process.env.TRENDSWAP_API_KEY || '';

serveStdio(
  async () => {
    const server = new McpServer(
      {
        name: 'trendswap-mcp',
        title: 'Trendswap AI Video Generator',
        version: '1.0.0',
      },
      {
        instructions:
          'Connects to Trendswap AI Video & Motion Transfer platform. Provides tools to list trending templates, check user credits, and create video generation jobs.',
      }
    );

    // Proxy tool: list_templates
    server.registerTool(
      'list_templates',
      {
        description:
          'List all available viral video & motion transfer templates on Trendswap with their template IDs, descriptions, and preview URLs.',
        inputSchema: z.object({}).strict(),
      },
      async () => {
        try {
          const res = await fetch(`${API_BASE}/api/mcp`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json, text/event-stream',
              ...(API_KEY ? { authorization: `Bearer ${API_KEY}` } : {}),
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: Date.now(),
              method: 'tools/call',
              params: { name: 'list_templates', arguments: {} },
            }),
          });
          const text = await res.text();
          // Extract message data from SSE event
          const match = text.match(/data:\s*({.*})/);
          if (match) {
            const data = JSON.parse(match[1]);
            return data.result;
          }
          return { content: [{ type: 'text', text }] };
        } catch (e: any) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Failed: ${e?.message}` }],
          };
        }
      }
    );

    // Proxy tool: get_credits_balance
    server.registerTool(
      'get_credits_balance',
      {
        description:
          'Check current user credits balance. Requires TRENDSWAP_API_KEY environment variable.',
        inputSchema: z.object({}).strict(),
      },
      async () => {
        if (!API_KEY) {
          return {
            isError: true,
            content: [
              {
                type: 'text',
                text: 'Missing TRENDSWAP_API_KEY environment variable.',
              },
            ],
          };
        }
        try {
          const res = await fetch(`${API_BASE}/api/mcp`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json, text/event-stream',
              authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: Date.now(),
              method: 'tools/call',
              params: { name: 'get_credits_balance', arguments: {} },
            }),
          });
          const text = await res.text();
          const match = text.match(/data:\s*({.*})/);
          if (match) {
            const data = JSON.parse(match[1]);
            return data.result;
          }
          return { content: [{ type: 'text', text }] };
        } catch (e: any) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Failed: ${e?.message}` }],
          };
        }
      }
    );

    // Proxy tool: create_generation_job
    server.registerTool(
      'create_generation_job',
      {
        description:
          'Create an AI motion transfer or portrait video generation task. Provide an image URL and a template ID.',
        inputSchema: z.object({
          template: z
            .string()
            .describe(
              'Template ID (e.g. "burning-bridges", "bulin-47", "topo-gigio")'
            ),
          image_url: z
            .string()
            .url()
            .describe('Public URL of the photo to swap into the template'),
          resolution: z
            .enum(['480p', '720p', '1080p'])
            .optional()
            .default('480p'),
          format: z
            .enum(['vertical', 'horizontal'])
            .optional()
            .default('vertical'),
        }),
      },
      async (args) => {
        if (!API_KEY) {
          return {
            isError: true,
            content: [
              {
                type: 'text',
                text: 'Missing TRENDSWAP_API_KEY environment variable.',
              },
            ],
          };
        }
        try {
          const res = await fetch(`${API_BASE}/api/mcp`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json, text/event-stream',
              authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: Date.now(),
              method: 'tools/call',
              params: { name: 'create_generation_job', arguments: args },
            }),
          });
          const text = await res.text();
          const match = text.match(/data:\s*({.*})/);
          if (match) {
            const data = JSON.parse(match[1]);
            return data.result;
          }
          return { content: [{ type: 'text', text }] };
        } catch (e: any) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Failed: ${e?.message}` }],
          };
        }
      }
    );

    // Proxy tool: get_job_status
    server.registerTool(
      'get_job_status',
      {
        description:
          'Check the status and get the result video URL of a generation job.',
        inputSchema: z.object({
          job_id: z.string().describe('The generation job ID'),
        }),
      },
      async ({ job_id }) => {
        if (!API_KEY) {
          return {
            isError: true,
            content: [
              {
                type: 'text',
                text: 'Missing TRENDSWAP_API_KEY environment variable.',
              },
            ],
          };
        }
        try {
          const res = await fetch(`${API_BASE}/api/mcp`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json, text/event-stream',
              authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: Date.now(),
              method: 'tools/call',
              params: { name: 'get_job_status', arguments: { job_id } },
            }),
          });
          const text = await res.text();
          const match = text.match(/data:\s*({.*})/);
          if (match) {
            const data = JSON.parse(match[1]);
            return data.result;
          }
          return { content: [{ type: 'text', text }] };
        } catch (e: any) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Failed: ${e?.message}` }],
          };
        }
      }
    );

    return server;
  },
  {
    onerror: (e) => console.error('Trendswap MCP error:', e),
  }
);
