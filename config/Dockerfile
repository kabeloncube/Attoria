# Production-grade Dockerfile for Attoria
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application files
COPY backend/ ./backend/
COPY logger.js .
COPY db.js .
COPY backend/controllers/ ./backend/controllers/
COPY backend/middleware/ ./backend/middleware/
COPY backend/models/ ./backend/models/
COPY backend/routes/ ./backend/routes/
COPY public/ ./public/
COPY migrations-pg.js .
COPY scripts/ ./scripts/

# Create necessary directories
RUN mkdir -p /app/data /app/logs /app/backups

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Run server
CMD ["node", "server.js"]
