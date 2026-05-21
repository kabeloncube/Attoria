#!/bin/bash

# ============================================================================
# Attoria System Health Check
# ============================================================================
# Comprehensive health check for your Attoria deployment

echo "🏥 Attoria System Health Check"
echo "=============================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

HEALTHY=0
ISSUES=0

# Function to test endpoint
test_endpoint() {
    local url=$1
    local name=$2
    
    RESPONSE=$(curl -s -w "\n%{http_code}" "$url" 2>/dev/null)
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | head -n-1)
    
    if [ "$HTTP_CODE" -eq 200 ]; then
        echo -e "${GREEN}✓${NC} $name: HTTP $HTTP_CODE"
        ((HEALTHY++))
    else
        echo -e "${RED}✗${NC} $name: HTTP $HTTP_CODE (expected 200)"
        ((ISSUES++))
    fi
}

# Check if running locally
if [ -z "$1" ]; then
    BASE_URL="http://localhost:3000"
    echo "Testing local deployment at: $BASE_URL"
else
    BASE_URL=$1
    echo "Testing remote deployment at: $BASE_URL"
fi

echo ""
echo "📊 API Endpoints:"
test_endpoint "$BASE_URL/health" "Health Check"
test_endpoint "$BASE_URL/" "Home Page"
test_endpoint "$BASE_URL/api/coc-status" "CoC API Status"

echo ""
echo "🔐 Authentication:"
# Test rate limiting (should fail after multiple attempts)
echo -n "  Rate Limiting: "
COUNT=0
for i in {1..6}; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/login" -X POST -d '{}' -H "Content-Type: application/json" 2>/dev/null)
    COUNT=$((COUNT+1))
done
if [ "$STATUS" != "200" ]; then
    echo -e "${GREEN}✓${NC} Rate limiting active (got HTTP $STATUS after multiple requests)"
    ((HEALTHY++))
else
    echo -e "${YELLOW}⚠${NC} Rate limiting may not be working"
fi

echo ""
echo "📈 Performance Tests:"

# Test response time
echo -n "  Response Time: "
START=$(date +%s%N)
curl -s "$BASE_URL/health" > /dev/null 2>&1
END=$(date +%s%N)
TIME_MS=$(( (END - START) / 1000000 ))

if [ $TIME_MS -lt 500 ]; then
    echo -e "${GREEN}✓${NC} ${TIME_MS}ms (excellent)"
    ((HEALTHY++))
elif [ $TIME_MS -lt 1000 ]; then
    echo -e "${YELLOW}⚠${NC} ${TIME_MS}ms (acceptable)"
else
    echo -e "${RED}✗${NC} ${TIME_MS}ms (slow)"
    ((ISSUES++))
fi

echo ""
echo "🔍 Server Info:"

# Get server info from health endpoint
HEALTH_DATA=$(curl -s "$BASE_URL/health")
if echo "$HEALTH_DATA" | grep -q "status"; then
    UPTIME=$(echo "$HEALTH_DATA" | grep -o '"uptime":[0-9.]*' | cut -d':' -f2)
    ENV=$(echo "$HEALTH_DATA" | grep -o '"environment":"[^"]*' | cut -d'"' -f4)
    
    echo "  Environment: $ENV"
    if [ -n "$UPTIME" ]; then
        UPTIME_INT=${UPTIME%.*}
        echo "  Uptime: $UPTIME_INT seconds"
    fi
fi

echo ""
echo "═══════════════════════════════════════════════════"
echo -e "Status: ${GREEN}$HEALTHY Healthy${NC}, ${RED}$ISSUES Issues${NC}"
echo "═══════════════════════════════════════════════════"
echo ""

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✅ System is healthy!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  System has $ISSUES issue(s)${NC}"
    exit 1
fi
