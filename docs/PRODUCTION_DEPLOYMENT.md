# Production Deployment Guide for Attoria

## Overview
This guide covers deploying Attoria with Docker, Nginx, PM2, and PostgreSQL to handle 10,000+ concurrent users.

---

## Prerequisites

- **VPS/Server**: Ubuntu 20.04 LTS or later (min 4GB RAM, 2 CPU cores)
- **Domain**: Domain name pointing to your server
- **SSL Certificate**: Let's Encrypt (free)
- **Tools**: Docker, Docker Compose, Nginx, PM2

---

## Quick Start (Docker Compose - Recommended)

### 1. **Update Environment Variables**

```bash
cp .env.production .env
# Edit .env with your actual values
nano .env
```

Update these critical values:
```env
NODE_ENV=production
DB_PASSWORD=YOUR_SECURE_PASSWORD_CHANGE_THIS
JWT_SECRET=GENERATE_STRONG_RANDOM_KEY
SESSION_SECRET=ANOTHER_STRONG_RANDOM_KEY
COC_API_KEY=your_actual_api_key
```

### 2. **Generate Strong Secrets**

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. **Generate SSL Certificates**

```bash
# Create ssl directory
mkdir -p ssl

# Generate self-signed certificate (use Let's Encrypt for production)
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes
```

For production, use Let's Encrypt:
```bash
sudo apt-get install certbot nginx
sudo certbot certonly --standalone -d yourdomain.com
# Copy to ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
```

### 4. **Build and Start Containers**

```bash
# Install dependencies
npm install

# Build Docker image
docker-compose build

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f app-1
```

### 5. **Run Database Migrations**

```bash
# Connect to running container
docker-compose exec app-1 npm run migrate
```

### 6. **Test Health Check**

```bash
# Should return 200 OK
curl http://localhost/health

# Check database
curl http://localhost/api/coc-status
```

---

## Alternative: PM2 + Standalone Server

For non-Docker deployments:

### 1. **Install Dependencies**

```bash
npm install

# Install PM2 globally
npm install -g pm2
```

### 2. **Set Up PostgreSQL**

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb attoria_db
sudo -u postgres createuser attoria
sudo -u postgres psql -c "ALTER USER attoria WITH PASSWORD 'your_password';"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE attoria_db TO attoria;"
```

### 3. **Install Redis**

```bash
sudo apt-get install redis-server
sudo systemctl start redis-server
```

### 4. **Update Environment**

```bash
cp .env.production .env
nano .env  # Update with your values
```

### 5. **Run Migrations**

```bash
npm run migrate
```

### 6. **Start with PM2**

```bash
# Start application
npm run pm2-start

# View logs
npm run pm2-logs

# Restart
npm run pm2-restart

# Save PM2 config to auto-start on reboot
pm2 save
pm2 startup
```

### 7. **Configure Nginx Reverse Proxy**

```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/nginx.conf

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

---

## Monitoring & Maintenance

### View Logs
```bash
# Docker
docker-compose logs -f app-1 --tail=100

# PM2
pm2 logs attoria --lines=100
```

### Database Backup
```bash
# Automated backup (runs daily)
npm run backup

# Manual backup
pg_dump -U attoria -d attoria_db > backup-$(date +%Y%m%d).sql
```

### Health Status
```bash
# Check health endpoint
curl http://localhost:3000/health

# Check all services
docker-compose ps
```

---

## Performance Tuning

### Rate Limiting
In `nginx.conf`, adjust limits based on traffic:
```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=200r/m;  # Increase rate
limit_req_zone $binary_remote_addr zone=auth_limit:10m rate=60r/m;
```

### Database Optimization
```sql
-- Analyze query performance
ANALYZE;

-- Create additional indexes if needed
CREATE INDEX idx_events_start_date ON events(start_date);
```

### Cache Configuration
Adjust in `.env`:
```env
COC_CACHE_TTL=600           # Cache for 10 minutes
REDIS_MAX_MEMORY=2gb        # Adjust to your server RAM
```

---

## Scaling to 10,000+ Users

### Add More App Instances
```bash
# In docker-compose.yml, duplicate app-2 to app-3, app-4, etc.
# Nginx automatically load balances across instances
```

### Database Replication
```bash
# Setup read replicas in PostgreSQL
# See: https://wiki.postgresql.org/wiki/Replication,_Clustering,_and_Connection_Pooling
```

### CDN Integration
- Use Cloudflare or AWS CloudFront for static assets
- Configure in nginx.conf:
```nginx
add_header Cache-Control "public, max-age=31536000";
```

---

## Deployment Checklist

- [ ] Update all environment variables in `.env`
- [ ] Generate strong JWT_SECRET and SESSION_SECRET
- [ ] Set up SSL certificates
- [ ] Create PostgreSQL database and user
- [ ] Run database migrations: `npm run migrate`
- [ ] Configure Nginx and test: `sudo nginx -t`
- [ ] Set up Redis caching
- [ ] Test health endpoint: `curl /health`
- [ ] Set up automated backups
- [ ] Configure monitoring (optional: Sentry, Datadog)
- [ ] Test all API endpoints
- [ ] Set up log rotation
- [ ] Configure auto-restart on reboot
- [ ] Test failover scenarios
- [ ] Document any custom configurations

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Database Connection Failed
```bash
# Test PostgreSQL connection
psql -h localhost -U attoria -d attoria_db

# Check logs
docker-compose logs postgres
```

### Redis Connection Issues
```bash
# Test Redis
redis-cli ping  # Should return PONG

# Check Redis service
systemctl status redis-server
```

### Out of Memory
```bash
# Check memory usage
free -h
docker stats

# Increase swap if needed
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## Security Best Practices

1. **Always use HTTPS** - Let's Encrypt certificates
2. **Keep dependencies updated**: `npm audit fix`
3. **Use strong passwords** - 16+ characters, mixed case
4. **Enable firewall**: `sudo ufw enable`
5. **Restrict access**: Only open needed ports (80, 443)
6. **Regular backups** - Daily automated backups
7. **Monitor logs** - Watch for suspicious activity
8. **Use environment variables** - Never commit secrets
9. **Update OS regularly** - `sudo apt-get update && upgrade`
10. **Use fail2ban** - Prevent brute force attacks

---

## Next Steps

1. Deploy to staging environment first
2. Run load tests to verify capacity
3. Set up monitoring and alerting
4. Configure CI/CD pipeline
5. Document any custom configurations
6. Create runbook for operations team

---

## Support Resources

- **Node.js**: https://nodejs.org/
- **PostgreSQL**: https://www.postgresql.org/
- **Nginx**: https://nginx.org/
- **Docker**: https://www.docker.com/
- **PM2**: https://pm2.keymetrics.io/
- **Let's Encrypt**: https://letsencrypt.org/
