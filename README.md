# Ættoria — Multi-Game Analytics Hub

A comprehensive web platform combining analytics and market tools for **Clash of Clans** and **Albion Online**. Built with Node.js/Express backend and vanilla JavaScript frontend.

---

##  Features Overview

###  Clash of Clans Analytics Module
Complete suite of tools for clan analysis and player tracking:

- **Clan Search & Analysis**
  - Detailed clan information with member lists
  - War log history and war statistics
  - Clan capital raid performance tracking
  - Real-time member role and TH level display

- **Player Profiles**
  - Comprehensive player statistics
  - Achievement and spell tracking
  - Troop and hero information
  - Donation history

- **Legend League Rankings**
  - Global and location-based leaderboards
  - Real-time trophy counts
  - Country/region filtering

- **User Management**
  - Secure authentication (JWT tokens)
  - Session management with localStorage
  - User profiles and saved preferences

### ⚔️ Albion Online Tools
Market intelligence and crafting calculators:

- **Market Price Tracker**
  - Item search with natural language processing
  - Multi-city price comparison (Caerleon, Bridgewatch, Fort Sterling, Lymhurst, Martlock, Thetford)
  - Real-time buy/sell order data
  - Enchantment and quality level tracking
  - Comprehensive item mapping (1200+ items)

- **Refining Calculator**
  - Calculate refining profits and losses
  - Multi-tier resource calculations
  - City bonus adjustments
  - Batch scaling and reinvestment analysis
  - Cost breakdown and efficiency metrics

---

## 🏗️ Project Structure

```
attoria/
├── public/                    # Frontend static files
│   ├── index.html            # Main home page
│   ├── welcome.html          # Welcome/landing page
│   ├── albion/
│   │   ├── index.html        # Market tracker page
│   │   └── refining.html     # Refining calculator page
│   ├── coc/
│   │   ├── clan.html         # Clan analytics
│   │   ├── profile.html      # Player profiles
│   │   ├── war.html          # War log analysis
│   │   └── events.html       # Event tracking
│   └── assets/
│       ├── css/              # All stylesheets (organized by feature)
│       ├── js/               # Client-side JavaScript
│       │   ├── itemMappings.js    # 1200+ Albion item mappings
│       │   ├── app.js
│       │   ├── components.js
│       │   └── [feature-specific]
│       ├── images/           # Project images and icons
│       └── config/           # API configurations
│
├── routes/                    # Express route handlers
│   ├── albionProxy.js        # Albion API proxy (prices, search, items)
│   ├── cocProxy.js           # Clash of Clans API proxy
│   ├── auth.js               # Authentication routes
│   ├── profile.js            # User profile routes
│   └── refine.js             # Refining calculator routes
│
├── controllers/               # Business logic controllers
│   ├── authController.js     # Auth logic
│   └── profileController.js  # Profile management
│
├── middleware/                # Express middleware
│   └── auth.js               # JWT authentication
│
├── models/                    # Database models
│   └── userModel.js          # User schema
│
├── package.json              # Dependencies and scripts
├── server.js                 # Main Express server
└── README.md                 # This file
```

---

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- API keys for:
  - **Clash of Clans**: [developer.clashofclans.com](https://developer.clashofclans.com/)
  - **Albion Online**: [albiondata.com](https://www.albion-online-data.com/) or [albiondb.com](https://data.albiondb.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd attoria
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root:
   ```env
   # Server
   PORT=3000
   NODE_ENV=development

   # Clash of Clans API
   COC_API_KEY=your_coc_api_key_here

   # Database (optional, if using persistent storage)
   DB_URL=your_database_url

   # JWT Secret
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   Server runs at: `http://localhost:3000`

---

## 🔌 API Endpoints

### Clash of Clans Routes (`/api/coc/...`)
- `GET /clans/search?name=` — Search clans by name
- `GET /clan/:tag` — Get clan information
- `GET /clan/:tag/members` — Get clan member list
- `GET /clan/:tag/warlog` — Get war history
- `GET /player/:tag` — Get player statistics
- `GET /gameinfo/...` — Official CoC game data

### Albion Online Routes (`/api/proxy/albion/...`)
- `GET /prices?item=T4_BAG&locations=Caerleon,Bridgewatch&qualities=1` — Get item prices across cities
- `GET /items/search?q=sword&limit=10` — Search for items by name
- `GET /[item-id]` — Get specific item details

### Authentication (`/auth/...`)
- `POST /register` — Create new account
- `POST /login` — Login with credentials
- `POST /logout` — End session
- `GET /verify` — Check session validity

### User Profile (`/profile/...`)
- `GET /` — Get user profile
- `PUT /` — Update profile
- `DELETE /` — Delete account

---

## 🛠️ Technology Stack

**Backend:**
- Node.js & Express.js — Server framework
- JWT — Authentication tokens
- ESLint — Code linting

**Frontend:**
- Vanilla JavaScript — No frameworks (lightweight)
- HTML5 & CSS3 — Semantic markup and modern styling
- LocalStorage — Client-side persistence
- Fetch API — HTTP requests

**External APIs:**
- Clash of Clans Official API
- Albion Online Data (albiondata.com)
- AlbionDB (data.albiondb.com)

---

## 📝 Key Features Explained

### Market Price Tracker
Search items using natural language (e.g., "T4 sword", "leather armor") with automatic conversion to API format. Real-time multi-city price comparison with buy/sell order data fetched directly from the Albion API.

**Supported Features:**
- Enchantment levels (0-4)
- Quality tiers (1-5)
- Multiple simultaneous searches
- Price history caching

### Refining Calculator
Input resource quantities and refining level to calculate theoretical profit/loss. Includes per-unit costs, batch scaling, and city bonus multipliers.

**Advanced Options:**
- Reinvestment scenarios
- Preset configurations
- Historical calculations
- Comparative analysis

### Clan Analytics
Browse clans with full member lists, roles, donation counts, and historical war performance. Filter by location, member count, and league status.

---

##  Security Features

- **JWT Authentication** — Stateless session management
- **Password Hashing** — Bcrypt for secure storage
- **CORS Protection** — Restricted cross-origin requests
- **Rate Limiting** — API endpoint throttling
- **Input Validation** — Server-side request sanitization
- **Environment Variables** — Sensitive configs not in code

---

##  Responsive Design

All pages optimized for:
- Desktop (1024px+) — Full-featured layout
- Tablet (768px–1023px) — Optimized sidebar
- Mobile (<768px) — Stack-based navigation

CSS Grid and Flexbox ensure consistent display across devices.

---

##  Troubleshooting

### Market Search Returns No Results
- Ensure item name is spelled correctly
- Try using the tier prefix: "T4 SWORD" instead of just "SWORD"
- Check if APIs are responding (network tab in DevTools)
- Example: "T4_BAG@1" for enchanted items

### Clan Search Fails
- Verify CoC API key is valid
- Check if clan tag format is correct (with or without #)
- Ensure API rate limits not exceeded

### Price Data Not Updating
- Clear browser cache or localStorage
- Check if external APIs are online
- Restart server

---

##  Contributing

To add features or fix issues:
1. Create a feature branch
2. Make changes with clear commit messages
3. Ensure code follows existing style (ESLint)
4. Test thoroughly before pushing
5. Submit pull request with description

---

##  License

This project is private. All rights reserved.

---

##  Support

For issues, questions, or feature requests, please contact me.

---

##  Development Roadmap

- [ ] Database persistence for cached price data
- [ ] User-saved item favorites
- [ ] Price alert notifications
- [ ] Extended clan comparison tools
- [ ] Mobile app version
- [ ] Dark theme toggle
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

**Last Updated:** March 4, 2026  
**Version:** 2.0  
**Status:** Active Development
