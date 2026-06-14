# Ættoria — Multi-Game Analytics Hub

A comprehensive web platform combining analytics and market tools for **Clash of Clans** and **Albion Online**.

##  Quick Start

```bash
# Install backend dependencies
npm run install-backend

# Start development server
npm run dev

# Or start production server
npm start
```

## 📁 Project Structure

```
attoria/
├── 📁 backend/          # Server-side code
│   ├── server.js        # Main server
│   ├── controllers/     # Route handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── models/          # Database models
│   └── package.json     # Backend dependencies
├── 📁 public/           # Frontend static files
│   ├── index.html       # Landing page
│   ├── albion/          # Albion tools
│   └── coc/             # Clash of Clans tools
├── 📁 config/           # Configuration files
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── Dockerfile
├── 📁 docs/             # Documentation
├── 📁 scripts/          # Build scripts
└── 📁 tests/            # Test files
```

##  Development

### Prerequisites
- Node.js 18+
- PostgreSQL (for production)
- Redis (optional, for caching)

### Setup
```bash
# Clone repository
git clone <repository-url>
cd attoria

# Install dependencies
npm run install-backend

# Copy environment file
cp .env.production .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

##  Production Deployment

### Docker (Recommended)
```bash
# Build and start containers
npm run docker-up

# Run migrations
docker-compose -f config/docker-compose.yml exec app-1 npm run migrate
```

### PM2
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
npm run pm2-start

# View logs
npm run pm2-logs
```

##  Documentation

- [Production Deployment Guide](docs/PRODUCTION_DEPLOYMENT.md)
- [API Documentation](docs/API.md)
- [Development Guide](docs/guides/DEVELOPER_GUIDE.md)

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm run docker-up` - Start Docker containers
- `npm run pm2-start` - Start with PM2
- `npm run migrate` - Run database migrations
- `npm run backup` - Create database backup

##  Features

### Clash of Clans Analytics
- Clan search and analysis
- Player profiles and statistics
- War log history
- Legend league rankings
- Event tracking

### Albion Online Tools
- Market price tracker
- Refining calculator
- Item search with NLP
- Multi-city price comparison

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

##  License

ISC License - see LICENSE file for details

## 📞 Support

For support, please check the documentation or create an issue in the repository.
# Attoria
# Attoria
