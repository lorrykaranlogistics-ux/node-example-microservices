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

## Additional Routes

### API Gateway (`:3000`)

- `GET /api/orders`
- `GET /api/orders/:id`
- `GET /api/orders/user/:userId`
- `POST /api/orders`
- `PATCH /api/orders/:id/status`
- `POST /api/orders/:id/cancel`
- `GET /api/users`
- `GET /api/users/:id`
- `GET /api/users/tier/:tier`
- `POST /api/users`
- `GET /api/payments`
- `GET /api/payments/:id`
- `GET /api/payments/status/:status`
- `POST /api/payments/:id/refund`
- `GET /api/notifications`
- `GET /api/notifications/:id`
- `GET /api/notifications/user/:userId`
- `GET /api/notifications/order/:orderId`

### Service-Native Endpoints

- `user-service :3001`
  - `GET /users`, `GET /users/:id`, `GET /users/tier/:tier`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`
- `order-service :3002`
  - `GET /orders`, `GET /orders/:id`, `GET /orders/user/:userId`, `POST /orders`, `PATCH /orders/:id/status`, `POST /orders/:id/cancel`
- `payment-service :3003`
  - `GET /payments`, `GET /payments/:id`, `GET /payments/status/:status`, `POST /payments/authorize`, `POST /payments/:id/refund`
- `notification-service :3004`
  - `GET /notifications`, `GET /notifications/:id`, `GET /notifications/user/:userId`, `GET /notifications/order/:orderId`, `POST /notifications/send`

## Notes

- Shared modules are mounted at `/shared` in service images.
- Service logs are JSON-formatted for easier parsing in centralized logging systems.

## Contract Strategy (Order <-> Payment)

- Versioned contracts are stored in `contracts/payment/v1/`.
- Provider validation: `payment-service` validates both request and response against contract schemas.
- Consumer validation: `order-service` validates `payment-service` response shape before creating orders.
- CI gate: `.github/workflows/contracts.yml` runs `npm run test:contracts` on PRs that touch order/payment/contracts.
- Breaking changes must introduce a new contract version (for example `contracts/payment/v2/`) and migration plan.
