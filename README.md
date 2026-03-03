# Sample Node.js Microservices

## Run

```bash
# Preferred full-system run from repo root:
# docker compose up --build

# If running microservices-only:
cd microservices-project
docker compose up --build
```

## Quick Start

```bash
./bootstrap.sh
./healthcheck.sh
```

## Services

- `api-gateway` on 3000
- `user-service` on 3001
- `order-service` on 3002
- `payment-service` on 3003
- `notification-service` on 3004

## Demo API

```bash
curl -s -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":"u1","cardNumber":"411111111111","amount":120.55,"currency":"USD"}'
```

## Notes

- Shared modules are mounted at `/shared` in service images.
- Service logs are JSON-formatted for easier parsing in centralized logging systems.

## Contract Strategy (Order <-> Payment)

- Versioned contracts are stored in `contracts/payment/v1/`.
- Provider validation: `payment-service` validates both request and response against contract schemas.
- Consumer validation: `order-service` validates `payment-service` response shape before creating orders.
- CI gate: `.github/workflows/contracts.yml` runs `npm run test:contracts` on PRs that touch order/payment/contracts.
- Breaking changes must introduce a new contract version (for example `contracts/payment/v2/`) and migration plan.
