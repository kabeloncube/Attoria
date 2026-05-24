# Production-grade Dockerfile for Attoria
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files for dependency install
COPY backend/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application files
COPY backend/ ./backend/
COPY public/ ./public/
COPY scripts/ ./scripts/

# Create necessary directories
RUN mkdir -p /app/data /app/logs /app/backups

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Run server
CMD ["node", "backend/server.js"]
