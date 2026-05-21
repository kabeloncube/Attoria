#!/bin/bash

# ============================================================================
# Attoria Local Development Setup
# ============================================================================
# Sets up local development environment without Docker

echo "🛠️  Attoria Local Development Setup"
echo "===================================="
echo ""

# Check if running in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the attoria root directory"
    exit 1
fi

# Step 1: Install Node dependencies
echo "📦 Installing Node dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

# Step 2: Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs backups scripts/logs

# Step 3: Set up environment file
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.production .env
    echo "⚠️  Please update .env with your actual values:"
    echo "   - JWT_SECRET: run 'node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    echo "   - SESSION_SECRET: run 'node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    echo "   - COC_API_KEY: your actual API key"
else
    echo "✓ .env file already exists"
fi

# Step 4: Check Node version
NODE_VERSION=$(node --version)
echo ""
echo "✓ Node.js version: $NODE_VERSION"

echo ""
echo "═══════════════════════════════════════════════════"
echo "✅ Local Development Setup Complete!"
echo "═══════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo ""
echo "1. Update your .env file:"
echo "   nano .env"
echo ""
echo "2. For local testing (with SQLite):"
echo "   npm start"
echo ""
echo "3. For testing with live API:"
echo "   npm run dev"
echo ""
echo "Access the app at:"
echo "   http://localhost:3000"
echo ""
echo "To check health endpoint:"
echo "   curl http://localhost:3000/health"
echo ""
echo "For production setup, see PRODUCTION_DEPLOYMENT.md"
