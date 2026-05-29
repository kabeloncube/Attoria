#!/bin/bash
set -e

REGION="eu-north-1"
CLUSTER_NAME="attoria-cluster"
SERVICE_NAME="attoria-service"
TASK_DEFINITION="attoria-task"
TASK_JSON="ecs/task-definition.json"
TMP_TASK_JSON="/tmp/ecs-task-definition.$$"

if [ "$#" -lt 4 ]; then
  cat <<'EOF'
Usage: ./ecs/deploy-ecs.sh <SUBNET_IDS> <SECURITY_GROUP_ID> <DB_ENDPOINT> <REDIS_URL> [DB_USER] [DB_PASSWORD] [DB_NAME] [JWT_SECRET] [SESSION_SECRET] [COC_API_KEY]

Example:
  ./ecs/deploy-ecs.sh "subnet-abc,subnet-def" sg-0123456789abcdef0 mydb.example.eu-north-1.rds.amazonaws.com redis://myredis.example.eu-north-1.amazonaws.com:6379 attoria_admin mysecurepassword attoria_db myJwtSecret mySessionSecret ""

If DB_USER, DB_NAME, JWT_SECRET, or SESSION_SECRET are omitted, defaults are used or random secrets are generated.
EOF
  exit 1
fi

SUBNET_IDS="$1"
SECURITY_GROUP="$2"
DB_ENDPOINT="$3"
REDIS_URL="$4"
DB_USER="${5:-attoria_admin}"
DB_PASSWORD="${6:-$(python3 - <<'PY'
import secrets
print(secrets.token_urlsafe(24))
PY
)}"
DB_NAME="${7:-attoria_db}"
JWT_SECRET="${8:-$(python3 - <<'PY'
import secrets
print(secrets.token_hex(32))
PY
)}"
SESSION_SECRET="${9:-$(python3 - <<'PY'
import secrets
print(secrets.token_hex(32))
PY
)}"
COC_API_KEY="${10:-}"

# Convert comma-separated subnet list into quoted values for AWS CLI
IFS=',' read -ra SUBNET_ARR <<< "$SUBNET_IDS"
SUBNETS=""
for s in "${SUBNET_ARR[@]}"; do
  if [ -n "$SUBNETS" ]; then
    SUBNETS="${SUBNETS},\"$s\""
  else
    SUBNETS="\"$s\""
  fi
 done

export DB_ENDPOINT DB_USER DB_PASSWORD DB_NAME REDIS_URL JWT_SECRET SESSION_SECRET COC_API_KEY TMP_TASK_JSON

python3 - <<'PY'
import json, os
path = os.environ['TASK_JSON'] if 'TASK_JSON' in os.environ else 'ecs/task-definition.json'
with open(path, 'r') as f:
    task = json.load(f)
for env in task['containerDefinitions'][0]['environment']:
    if env['name'] == 'DB_HOST':
        env['value'] = os.environ['DB_ENDPOINT']
    elif env['name'] == 'DB_PORT':
        env['value'] = '5432'
    elif env['name'] == 'DB_USER':
        env['value'] = os.environ['DB_USER']
    elif env['name'] == 'DB_PASSWORD':
        env['value'] = os.environ['DB_PASSWORD']
    elif env['name'] == 'DB_NAME':
        env['value'] = os.environ['DB_NAME']
    elif env['name'] == 'REDIS_URL':
        env['value'] = os.environ['REDIS_URL']
    elif env['name'] == 'JWT_SECRET':
        env['value'] = os.environ['JWT_SECRET']
    elif env['name'] == 'SESSION_SECRET':
        env['value'] = os.environ['SESSION_SECRET']
    elif env['name'] == 'COC_API_KEY':
        env['value'] = os.environ['COC_API_KEY']
with open(os.environ['TMP_TASK_JSON'], 'w') as f:
    json.dump(task, f, indent=2)
PY

aws ecs create-cluster --cluster-name "$CLUSTER_NAME" --region "$REGION" || true

echo "Registering task definition..."
aws ecs register-task-definition --cli-input-json file://"$TMP_TASK_JSON" --region "$REGION"

TASK_ARN=$(aws ecs describe-task-definition --task-definition "$TASK_DEFINITION" --region "$REGION" --query 'taskDefinition.taskDefinitionArn' --output text)

echo "Creating service..."
aws ecs create-service \
  --cluster "$CLUSTER_NAME" \
  --service-name "$SERVICE_NAME" \
  --task-definition "$TASK_ARN" \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNETS],securityGroups=[\"$SECURITY_GROUP\"],assignPublicIp=ENABLED}" \
  --region "$REGION"

rm -f "$TMP_TASK_JSON"

echo "Service created in cluster $CLUSTER_NAME with task definition $TASK_ARN"

echo "DB_PASSWORD=$DB_PASSWORD"
echo "JWT_SECRET=$JWT_SECRET"
echo "SESSION_SECRET=$SESSION_SECRET"
