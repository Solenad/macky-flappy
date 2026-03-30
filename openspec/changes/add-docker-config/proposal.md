## Why

The Macky Flappy project needs Docker containerization to enable consistent deployments across environments (Vercel, Railway, Render, or self-hosted). Currently, the project lacks container configuration, making it harder to deploy to platforms that require Docker or to run in isolated environments. Adding Docker support will streamline the deployment workflow and enable local development with identical production conditions.

## What Changes

- Add multi-stage Dockerfile optimized for Next.js 16 production builds
- Add docker-compose.yml for local development with hot reload
- Configure Next.js standalone output for smaller container images
- Add non-root user security best practices

## Capabilities

### New Capabilities

- `docker-config`: Container configuration for production and development environments

### Modified Capabilities

- (none)

## Impact

- New files: `Dockerfile`, `Dockerfile.dev`, `docker-compose.yml`, `.dockerignore`
- Modified files: `next.config.ts` (standalone output configuration)
- Dependencies: No new npm dependencies required
