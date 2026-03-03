# TEST Sample Node.js Microservices

## Run

```bash
# Preferred full-system run from repo root:
# docker compose up --build

# If running microservices-only:
cd sample-microservices-node
docker compose up --build
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
