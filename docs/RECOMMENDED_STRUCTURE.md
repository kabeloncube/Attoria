# Recommended File Structure for Attoria

```
attoria/
├── 📁 backend/                    # Backend application
│   ├── server.js                  # Main server file
│   ├── package.json               # Dependencies & scripts
│   ├── controllers/               # Route controllers
│   ├── middleware/                # Express middleware
│   ├── models/                    # Database models
│   ├── routes/                    # API routes
│   ├── migrations-pg.js           # Database migrations
│   ├── db.js                      # Database connection
│   ├── logger.js                  # Logging configuration
│   └── scripts/                   # Utility scripts
│       └── backup.js
│
├── 📁 public/                     # Frontend static files (served by Express)
│   ├── index.html                 # Main landing page
│   ├── albion/
│   │   ├── index.html
│   │   ├── refining.html
│   │   └── crafting.html
│   ├── coc/
│   │   ├── index.html
│   │   ├── clan.html
│   │   ├── profile.html
│   │   ├── war.html
│   │   └── events.html
│   ├── assets/                    # Static assets (CSS, JS, images)
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   └── config/
│   └── favicon.png
│
├── 📁 docs/                       # Documentation (not website files!)
│   ├── README.md                  # Project overview
│   ├── API.md                     # API documentation
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── guides/                    # User guides
│   │   ├── BEGINNER_GUIDE.md
│   │   ├── DEVELOPER_GUIDE.md
│   │   ├── QUICK_START_GUIDE.md
│   │   └── SECURITY_GUIDE.md
│   └── architecture/              # Technical docs
│
├── 📁 config/                     # Configuration files
│   ├── docker-compose.yml
│   ├── nginx.conf
│   ├── ecosystem.config.js
│   └── Dockerfile
│
├── 📁 tests/                      # Test files
│   ├── test_calculation.js
│   └── integration/
│
├── 📁 scripts/                    # Build/deployment scripts
│   ├── setup-dev.sh
│   ├── setup-install.sh
│   ├── health-check.sh
│   └── setup-check.sh
│
├── 📁 tmp/                        # Temporary files (gitignored)
├── 📁 logs/                       # Log files (gitignored)
├── 📁 backups/                    # Database backups (gitignored)
│
├── 📄 .env                        # Environment variables (gitignored)
├── 📄 .env.production             # Production env template
├── 📄 .gitignore                  # Git ignore rules
├── 📄 TODO.md                     # Project tasks
└── 📄 README.md                   # Project README
```

## Why This Structure is Better

### ✅ Clear Separation of Concerns
- **Backend**: All server-side code in one place
- **Frontend**: All client-side code in `public/`
- **Documentation**: Only docs in `docs/`
- **Configuration**: All config files together

### ✅ Standard Node.js Conventions
- Follows Express.js best practices
- `public/` directory serves static files
- Clear MVC structure (models, views, controllers)

### ✅ Scalability
- Easy to add new features
- Clear where to put new files
- Separates concerns for team development

### ✅ Deployment Ready
- Docker configs in `config/`
- Scripts in `scripts/`
- Environment files properly ignored

## Migration Steps

1. **Move website files**: `docs/` → `public/` (merge carefully)
2. **Move backend files**: Root level → `backend/`
3. **Move configs**: Root level → `config/`
4. **Move scripts**: Root level → `scripts/`
5. **Update all paths** in code
6. **Update Docker configs** for new paths
7. **Test everything** works

Would you like me to help restructure this?