---
name: trendswap-studio
description: Create viral AI video drops from portrait photos using TrendSwap motion transfer and viral dance choreography.
---

# TrendSwap Video Studio Skill

This skill guides ChatGPT and Codex on interacting with TrendSwap's remote MCP tools to generate viral social video drops.

## Workflow

1. **Discover Templates**:
   Call \`list_templates\` to fetch currently live templates, durations, and soundtracks.
   Key templates:
   - \`burning-bridges\`: Drake Banquet flex scene with "Where she at?" master vocal.
   - \`smalltown-boy-ai\`: 80s synthwave double screaming dance meme.
   - \`topo-gigio\`: Stadium lights football ear-cup celebration.
   - \`bulin-47\`: Dominican street shoulder bounce dance.
   - \`hit-the-road-dude\`: Gritty red-flannel truck confrontation.

2. **Validate Photo Inputs**:
   - High-resolution, front-facing or slight 3/4 angle.
   - Clear lighting, no heavy obstruction.
   - 100% facial identity preservation guaranteed by TrendSwap's motion transfer architecture.

3. **Generate Video**:
   Call \`create_generation_job\` with:
   - \`template\`: template ID
   - \`image_url\`: direct public image URL
   - \`resolution\`: 480p (standard), 720p, or 1080p

4. **Poll & Deliver**:
   Call \`get_job_status\` using \`job_id\` to inspect rendering progress until completed, then return direct MP4 download link and web player URL (\`https://trendswap.app/videos/{job_id}\`).
