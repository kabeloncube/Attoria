# ECS/Fargate Deployment for Attoria

This folder contains the ECS task definition and a helper deployment script for Attoria.

## What is included

- `task-definition.json` - ECS Fargate task definition for the `attoria` container
- `deploy-ecs.sh` - helper script to create an ECS cluster and service

## Important notes

1. This app requires PostgreSQL and Redis.
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `REDIS_URL`
2. The task definition uses placeholder values for secrets and database endpoints.
3. You must create or configure the IAM roles referenced in `task-definition.json`:
   - `ecsTaskExecutionRole`
   - `ecsTaskRole`

## Usage

Update `ecs/task-definition.json` with the correct values or use the script to inject the values at deploy time.

```bash
chmod +x ecs/deploy-ecs.sh
./ecs/deploy-ecs.sh \
  "subnet-abc123,subnet-def456" \
  sg-0123456789abcdef0 \
  mydb.example.eu-north-1.rds.amazonaws.com \
  redis://myredis.example.eu-north-1.amazonaws.com:6379 \
  attoria_admin \
  mysecurepassword \
  attoria_db \
  myJwtSecret \
  mySessionSecret \
  "your-coc-api-key"
```

The script can still generate random JWT and session secrets if those values are omitted.

## After deployment

- Check your service status:
  ```bash
  aws ecs describe-services --cluster attoria-cluster --services attoria-service --region eu-north-1
  ```
- Confirm the task is running and has a public IP assigned.

## If you want HTTPS or a load balancer

This script deploys the app directly with `assignPublicIp=ENABLED`. For production, use an Application Load Balancer and route traffic on port 80/443 to port 3000.
