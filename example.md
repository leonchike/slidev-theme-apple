---
theme: ./
title: Platform Engineering Workshop
highlighter: shiki
drawings:
  persist: false
transition: fade
---

<div class="cover-slide">
<div>

# Platform Engineering Workshop

<div class="subtitle">Internal developer productivity -- tools, patterns, and metrics that matter</div>

</div>
<div class="brand">Platform Engineering</div>
</div>

---

<div class="section-slide blue">
<div class="chapter-pill">Chapter 1</div>

# System Overview

</div>

---

<div class="body-header">
<div class="chapter-pill">Chapter 1</div>

# System Overview

</div>

<div class="two-col">
<div>

## Key metrics

<div class="highlight-card">

<div class="metric">99.97%<span class="label">Platform uptime (trailing 90 days)</span></div>

</div>

<div class="highlight-card" style="margin-top: 0.8rem;">

<div class="metric">2.4s<span class="label">Median deploy time to production</span></div>

</div>

<div class="highlight-card" style="margin-top: 0.8rem;">

<div class="metric">1,847<span class="label">Deployments per week across all teams</span></div>

</div>

</div>
<div>

## Platform health

The platform serves 34 product teams with a shared infrastructure layer. All services route through our internal gateway.

- **Build pipeline** -- Average CI time reduced to 3.1 minutes
- **Service mesh** -- 100% of traffic encrypted via mTLS
- **Observability** -- Unified tracing across all microservices

| Metric | Current | Target |
|---|---|---|
| **P50 latency** | 12ms | 15ms |
| **P99 latency** | 89ms | 100ms |
| **Error rate** | 0.02% | 0.05% |
| **Deploy frequency** | 264/day | 200/day |

</div>
</div>

---

<div class="section-slide purple">
<div class="chapter-pill">Chapter 2</div>

# Architecture Deep Dive

</div>

---

<div class="body-header">
<div class="chapter-pill">Chapter 2</div>

# Architecture Deep Dive

</div>

<div class="two-col">
<div>

## Service topology

```
  ┌──────────────────────────────┐
  │   API Gateway                │
  │   Rate limiting + auth       │
  └──────────────┬───────────────┘
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
  ┌──────────┐       ┌──────────┐
  │ Service  │       │ Service  │
  │ Mesh     │◄─────►│ Registry │
  └────┬─────┘       └──────────┘
       │
       ▼
  ┌──────────────────────────────┐
  │   Data Layer                 │
  │   PostgreSQL + Redis         │
  └──────────────────────────────┘
```

</div>
<div>

## Core components

Each service registers with the mesh on startup. The gateway handles auth, rate limiting, and request routing.

- **Gateway** -- Envoy-based, handles 45k req/s peak
- **Service mesh** -- Automatic sidecar injection via Kubernetes
- **Registry** -- Real-time service discovery with health checks

### Deployment model

All services deploy via the shared pipeline. Teams own their service configs but share infrastructure primitives.

Inline references like `platform-gateway` and `service-mesh-proxy` use the monospace style.

</div>
</div>

---

<div class="section-slide teal">
<div class="chapter-pill">Chapter 3</div>

# API Patterns

</div>

---

<div class="body-header">
<div class="chapter-pill">Chapter 3</div>

# API Patterns

</div>

<div class="two-col">
<div>

## Standard request flow

All internal APIs follow the same contract. Authentication is handled at the gateway layer -- services receive pre-validated tokens.

```
POST /api/v2/deployments
Authorization: Bearer <platform-token>
Content-Type: application/json

{
  "service": "checkout-api",
  "version": "2.14.0",
  "environment": "production",
  "strategy": "canary",
  "canary_percent": 5
}
```

### Response format

```
{
  "id": "deploy_8f3a2b1c",
  "status": "in_progress",
  "started_at": "2026-04-09T10:30:00Z",
  "estimated_duration_s": 120
}
```

</div>
<div>

## Event streaming

The platform emits events via SSE for real-time monitoring. All deployment state changes are broadcast.

```
event: deployment_started
data: { "id": "deploy_8f3a2b1c",
        "service": "checkout-api",
        "version": "2.14.0" }

event: canary_promoted
data: { "id": "deploy_8f3a2b1c",
        "percent": 25,
        "health": "passing" }

event: deployment_complete
data: { "id": "deploy_8f3a2b1c",
        "duration_s": 94,
        "status": "success" }
```

| Event | Frequency | Retention |
|---|---|---|
| **deployment_started** | ~264/day | 90 days |
| **canary_promoted** | ~800/day | 30 days |
| **deployment_complete** | ~264/day | 90 days |
| **rollback_triggered** | ~3/day | 1 year |

</div>
</div>

---

<div class="section-slide dark">
<div class="chapter-pill">Chapter 4</div>

# Developer Experience

</div>

---

<div class="body-header">
<div class="chapter-pill">Chapter 4</div>

# Developer Experience

</div>

<div class="two-col">
<div>

## CLI tooling

The `platform` CLI is the primary interface for developers. It wraps common operations into simple commands.

```
$ platform deploy checkout-api
  Deploying checkout-api@2.14.0
  Strategy: canary (5% → 25% → 100%)
  Pipeline: build → test → stage → prod
  Status: ██████████░░░░ 68%

$ platform status checkout-api
  Service: checkout-api
  Version: 2.14.0
  Uptime:  99.99%
  Pods:    12/12 healthy
```

### Adoption metrics

<div class="highlight-card">

<div class="metric">94%<span class="label">Teams using the platform CLI daily</span></div>

</div>

</div>
<div>

## What's next

The roadmap for Q3 focuses on three areas: reducing build times, improving the developer portal, and expanding self-service capabilities.

- **Build cache sharing** -- Cross-team layer caching to cut CI time by 40%
- **Portal v2** -- Service catalog with dependency graphs and runbooks
- **Self-service databases** -- One-click PostgreSQL provisioning with automatic backups

| Initiative | Status | ETA |
|---|---|---|
| **Build cache** | In progress | Q3 W4 |
| **Portal v2** | Design review | Q3 W8 |
| **Self-service DB** | RFC approved | Q4 W2 |
| **Trace sampling** | Exploration | Q4 W6 |

Links use Apple's system blue: [Platform docs](#) and [API reference](#).

</div>
</div>
