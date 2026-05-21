#!/bin/bash

# ============================================================================
# Attoria Production Setup Checker & Installer
# ============================================================================
# This script checks for missing dependencies and helps install them

echo "🔍 Attoria Production Setup Checker"
echo "===================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Initialize counters
MISSING=0
INSTALLED=0

# Function to check command
check_command() {
    if command -v $1 &> /dev/null; then
        VERSION=$($1 --version 2>&1 | head -n1)
        echo -e "${GREEN}✓${NC} $1 is installed: $VERSION"
        ((INSTALLED++))
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        ((MISSING++))
        return 1
    fi
}

# Function to check service
check_service() {
    if systemctl is-active --quiet $1; then
        echo -e "${GREEN}✓${NC} $1 service is running"
        ((INSTALLED++))
    else
        echo -e "${RED}✗${NC} $1 service is NOT running"
        ((MISSING++))
        return 1
    fi
}

echo "📦 Checking Development Tools..."
check_command "node"
check_command "npm"
check_command "git"

echo ""
echo "🐳 Checking Docker..."
check_command "docker" || echo "   Install: sudo apt install docker.io"
check_command "docker-compose" || echo "   Install: sudo apt install docker-compose"

echo ""
echo "🗄️  Checking Database & Cache..."
check_command "psql" || echo "   Install: sudo apt install postgresql postgresql-contrib"
check_command "redis-cli" || echo "   Install: sudo apt install redis-server"

echo ""
echo "🔧 Checking Web Server & Process Manager..."
check_command "nginx" || echo "   Install: sudo apt install nginx"
check_command "pm2" || echo "   Install: sudo npm install -g pm2"

echo ""
echo "📋 Checking Services..."
# Only check if commands exist first
if command -v systemctl &> /dev/null; then
    if command -v postgres &> /dev/null 2>/dev/null || [ -f /usr/bin/psql ]; then
        check_service "postgresql" || true
    fi
    if command -v redis-server &> /dev/null; then
        check_service "redis-server" || true
    fi
    if command -v nginx &> /dev/null; then
        check_service "nginx" || true
    fi
fi

echo ""
echo "═══════════════════════════════════════════════════"
echo -e "Summary: ${GREEN}$INSTALLED installed${NC}, ${RED}$MISSING missing${NC}"
echo "═══════════════════════════════════════════════════"
echo ""

if [ $MISSING -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Missing dependencies detected!${NC}"
    echo ""
    echo "For local development, you can use:"
    echo "  npm install  (for Node.js dependencies only)"
    echo ""
    echo "For Docker deployment, install:"
    echo "  sudo apt update"
    echo "  sudo apt install docker.io docker-compose"
    echo "  sudo usermod -aG docker $USER"
    echo ""
    echo "For PM2 + System services, install:"
    echo "  sudo apt update"
    echo "  sudo apt install postgresql redis-server nginx"
    echo "  sudo npm install -g pm2"
    echo ""
else
    echo -e "${GREEN}✅ All components installed!${NC}"
    echo "You can now deploy using Docker or PM2"
fi
