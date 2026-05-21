# Full Restructure Plan for Attoria

## 📊 BEFORE vs AFTER Structure

### ❌ CURRENT (Problematic)
```
attoria/
├── server.js                    # Mixed with frontend files
├── package.json
├── controllers/                 # Backend mixed with frontend
├── routes/
├── middleware/
├── models/
├── docs/                        # ❌ CONTAINS WEBSITE FILES!
│   ├── index.html              # Should be in public/
│   ├── albion/                 # Duplicate content
│   ├── coc/                    # Duplicate content
│   └── assets/                 # 267MB of duplication
├── public/                      # Frontend files
│   ├── index.html
│   ├── albion/
│   ├── coc/
│   └── assets/                 # 254MB of duplication
├── my guides/                   # Documentation scattered
├── tmp/                         # Temporary files at root
├── test_calculation.js          # Test file at root
└── [production files mixed in]
```

### ✅ AFTER (Clean & Organized)
```
attoria/
├── 📁 backend/                    # 🆕 All server code together
│   ├── server.js                  # Main server
│   ├── package.json               # Dependencies
│   ├── controllers/               # Route handlers
│   ├── middleware/                # Express middleware
│   ├── models/                    # Database models
│   ├── routes/                    # API routes
│   ├── migrations-pg.js           # DB migrations
│   ├── db.js                      # DB connection
│   ├── logger.js                  # Logging
│   └── scripts/                   # Utility scripts
│       └── backup.js
│
├── 📁 public/                     # Frontend only (cleaned up)
│   ├── index.html                 # Landing page
│   ├── albion/                    # Albion tools
│   │   ├── index.html
│   │   ├── refining.html
│   │   └── crafting.html
│   ├── coc/                       # CoC tools
│   │   ├── index.html
│   │   ├── clan.html
│   │   ├── profile.html
│   │   ├── war.html
│   │   └── events.html
│   ├── assets/                    # All static files (no duplication)
│   │   ├── css/                   # Stylesheets
│   │   ├── js/                    # JavaScript
│   │   ├── images/                # Images
│   │   └── config/                # Config files
│   └── favicon.png
│
├── 📁 docs/                       # 🆕 Documentation only
│   ├── README.md                  # Project overview
│   ├── API.md                     # API documentation
│   ├── guides/                    # User guides
│   │   ├── BEGINNER_GUIDE.md
│   │   ├── DEVELOPER_GUIDE.md
│   │   ├── QUICK_START_GUIDE.md
│   │   └── SECURITY_GUIDE.md
│   └── architecture/              # Technical docs
│
├── 📁 config/                     # 🆕 All config files
│   ├── docker-compose.yml
│   ├── nginx.conf
│   ├── ecosystem.config.js
│   └── Dockerfile
│
├── 📁 scripts/                    # 🆕 Build/deployment scripts
│   ├── setup-dev.sh
│   ├── setup-install.sh
│   ├── health-check.sh
│   └── setup-check.sh
│
├── 📁 tests/                      # 🆕 Test files organized
│   ├── test_calculation.js
│   └── integration/
│
├── 📁 tmp/                        # Temporary files (gitignored)
├── 📁 logs/                       # Log files (gitignored)
├── 📁 backups/                    # DB backups (gitignored)
│
├── 📄 .env                        # Environment vars (gitignored)
├── 📄 .env.production             # Production template
├── 📄 .gitignore                  # Git ignore rules
├── 📄 TODO.md                     # Project tasks
└── 📄 README.md                   # Project README
```

## 🔄 Migration Steps

### Phase 1: Create New Structure
```bash
# Create new directories
mkdir -p backend/ docs/guides/ docs/architecture/ config/ scripts/ tests/

# Move backend files to backend/
mv controllers/ backend/
mv middleware/ backend/
mv models/ backend/
mv routes/ backend/
mv server.js backend/
mv package.json backend/
mv db.js backend/
mv logger.js backend/
mv migrations-pg.js backend/
mkdir -p backend/scripts/
mv scripts/backup.js backend/scripts/

# Move config files to config/
mv docker-compose.yml config/
mv nginx.conf config/
mv ecosystem.config.js config/
mv Dockerfile config/

# Move scripts to scripts/
mv setup-*.sh scripts/
mv health-check.sh scripts/
mv setup-check.sh scripts/

# Move tests to tests/
mv test_calculation.js tests/

# Move documentation to docs/
mv "my guides"/* docs/guides/
mv PRODUCTION_*.md docs/
mv DEPLOYMENT_CHECKLIST.md docs/
```

### Phase 2: Clean Up Public Directory
```bash
# Remove docs/ website files (keep only real docs)
rm -rf docs/albion/ docs/coc/ docs/assets/ docs/index.html docs/favicon.png

# Merge any missing files from docs/ to public/ if needed
# (Check for differences first)

# Clean up public/ - remove any duplicates
# Ensure public/ has the complete website
```

### Phase 3: Update File Paths
```bash
# Update server.js paths
# Change: express.static(path.join(__dirname, 'public'))
# To: express.static(path.join(__dirname, '../public'))

# Update package.json scripts
# Change: "start": "node server.js"
# To: "start": "node backend/server.js"

# Update all relative imports in backend files
# Change: require('./routes/auth')
# To: require('../routes/auth') [if needed]
```

### Phase 4: Update Docker & Config Files
```bash
# Update Dockerfile
# Change: COPY server.js .
# To: COPY backend/ ./backend/

# Update docker-compose.yml
# Change volume mounts to new paths

# Update nginx.conf if needed
# Update ecosystem.config.js script path
```

### Phase 5: Test Everything
```bash
# Test backend starts
cd backend && npm install
npm start

# Test Docker build
docker-compose -f config/docker-compose.yml build

# Test all endpoints work
curl http://localhost:3000/health
curl http://localhost:3000/

# Test static files serve correctly
```

## 📋 Files That Need Path Updates

### server.js
- `express.static(path.join(__dirname, 'public'))` → `express.static(path.join(__dirname, '../public'))`
- `require('./middleware/auth')` → `require('./backend/middleware/auth')`

### package.json scripts
- `"start": "node server.js"` → `"start": "node backend/server.js"`
- `"dev": "node server.js"` → `"dev": "node backend/server.js"`

### Docker files
- `COPY server.js .` → `COPY backend/ ./backend/`
- Volume mounts need updating

### Import statements
- Check all `require('./routes/...')` paths
- Update relative imports in controllers, routes, etc.

## ✅ Benefits After Restructure

1. **Clear Separation**: Backend, frontend, docs completely separated
2. **No Duplication**: Single source of truth for all files
3. **Standard Structure**: Follows Node.js/Express conventions
4. **Scalable**: Easy to add new features in correct locations
5. **Maintainable**: Team members know where to put/find files
6. **Deployment Ready**: Clean structure for Docker/production
7. **Documentation**: Proper docs location (not mixed with code)

## ⚠️ Risks & Considerations

- **Path Updates**: Many files need import path changes
- **Testing Required**: Full testing after restructure
- **Git History**: Large restructuring may complicate git blame
- **Backup First**: Create backup before major changes

## 🚀 Ready to Proceed?

This restructure will take ~30-45 minutes and result in a much cleaner, maintainable codebase. The current structure with 500MB+ of duplication is unsustainable.

Would you like me to start the restructure, or would you prefer to do it manually?