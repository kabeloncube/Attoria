#!/bin/bash

# ============================================================================
# Attoria Production Setup - Quick Installation
# ============================================================================
# This script installs all required dependencies for production deployment

set -e

echo "🚀 Attoria Production Dependency Installer"
echo "=========================================="
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run with sudo"
   echo "Usage: sudo bash setup-install.sh"
   exit 1
fi

echo "📦 Updating system packages..."
apt update

echo ""
echo "🐳 Installing Docker & Docker Compose..."
apt install -y docker.io docker-compose
usermod -aG docker ${SUDO_USER}
systemctl start docker
systemctl enable docker

echo ""
echo "🗄️  Installing PostgreSQL..."
apt install -y postgresql postgresql-contrib

echo ""
echo "💾 Installing Redis..."
apt install -y redis-server
systemctl start redis-server
systemctl enable redis-server

echo ""
echo "🔧 Installing Nginx..."
apt install -y nginx
systemctl start nginx
systemctl enable nginx

echo ""
echo "📦 Installing Node.js (via npm)..."
npm install -g pm2

echo ""
echo "═══════════════════════════════════════════════════"
echo "✅ Installation Complete!"
echo "═══════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "1. Run: npm install"
echo "2. Copy: cp .env.production .env"
echo "3. Edit: nano .env (update credentials)"
echo ""
echo "Then deploy using one of:"
echo "  - Docker: docker-compose up -d"
echo "  - PM2:    npm run pm2-start"
echo ""
echo "Check services:"
echo "  - PostgreSQL: psql -U attoria -d attoria_db"
echo "  - Redis:      redis-cli ping"
echo "  - Nginx:      sudo systemctl status nginx"
