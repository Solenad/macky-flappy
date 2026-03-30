## Context

The Macky Flappy game is a Next.js 16.2.1 + React 19 application that currently lacks containerization support. The project uses LocalStorage for high score persistence and has no external service dependencies. The goal is to enable Docker-based deployments while maintaining a small production image size and fast build times.

## Goals / Non-Goals

**Goals:**
- Create production-ready Dockerfile using multi-stage builds
- Create development Dockerfile with hot reload support
- Create docker-compose.yml for local development workflow
- Minimize production image size using Next.js standalone output
- Follow security best practices (non-root user, minimal attack surface)

**Non-Goals:**
- Multi-container orchestration (not needed for this simple app)
- Database or external service containerization (not used by app)
- GitHub Actions CI/CD pipeline (can be added separately)
- Docker Swarm or Kubernetes deployment configs

## Decisions

### Decision 1: Multi-stage Dockerfile over single-stage

**Choice:** Use multi-stage build with separate deps, builder, and runner stages

**Rationale:** Reduces final image from ~900MB (node:20) to ~150MB by excluding dev dependencies and build tools

**Alternatives Considered:**
- Single-stage: Simpler but larger image
- Alpine-based only: Smaller but may have compatibility issues with some packages

### Decision 2: Next.js standalone output enabled

**Choice:** Configure `output: 'standalone'` in next.config.ts

**Rationale:** Next.js automatically creates a minimal server that only includes necessary files, further reducing image size

**Alternatives Considered:**
- Full output: Includes all files, harder to optimize
- Export static: Not suitable as we use Next.js server features

### Decision 3: Non-root user in production container

**Choice:** Create and use `nextjs` user with UID 1001

**Rationale:** Security best practice - containers should not run as root

**Alternatives Considered:**
- Running as root: Security risk, not recommended
- Using node user: Less explicit, may conflict with file permissions

### Decision 4: Development uses volume mount over COPY

**Choice:** Docker Compose mounts source code as volume for hot reload

**Rationale:** Avoids rebuilding container on every code change during development

**Alternatives Considered:**
- COPY in Dockerfile: Requires rebuild on every change
- Named volumes: Good for data, not for code

## Risks / Trade-offs

**Risk:** Next.js standalone may miss some required files
→ **Mitigation:** Test thoroughly; may need to copy additional files via `experimental.outputFileTracingIncludes`

**Risk:** Docker build caching may not work optimally
→ **Mitigation:** Order Dockerfile layers optimally (deps first, then code); use .dockerignore

**Risk:** Development hot reload may not work with all file changes
→ **Mitigation:** Some changes (package.json, next.config.ts) still require rebuild

**Risk:** Image size on Apple Silicon may differ from x86
→ **Mitigation:** Build for target architecture explicitly if deploying to x86 servers
