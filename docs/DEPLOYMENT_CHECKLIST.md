# Production Deployment Verification Checklist

## Pre-Deployment Checks ✓

### System Requirements
- [ ] Ubuntu 20.04 LTS or later
- [ ] 4GB RAM minimum (8GB+ recommended)
- [ ] 2 CPU cores minimum (4+ cores recommended)
- [ ] 50GB disk space minimum
- [ ] Sudo/root access for initial setup

### Development Tools
- [ ] Node.js v18+ installed
- [ ] npm 10+ installed
- [ ] Git installed
- [ ] All npm dependencies installed: `npm install`

### Infrastructure Stack Selection
Choose ONE deployment method:

#### Option 1: Docker (Recommended for Easy Scaling)
- [ ] Docker 24+ installed: `sudo apt install docker.io`
- [ ] Docker Compose v2+ installed: `sudo apt install docker-compose`
- [ ] User added to docker group: `sudo usermod -aG docker $USER`
- [ ] Docker daemon running: `sudo systemctl start docker`
- [ ] Dockerfile reviewed and building locally
- [ ] docker-compose.yml reviewed and tested locally
- [ ] All environment variables in `.env` are correct

#### Option 2: PM2 + System Services (Traditional)
- [ ] Node.js installed globally
- [ ] PM2 installed globally: `sudo npm install -g pm2`
- [ ] PostgreSQL 15+ installed: `sudo apt install postgresql`
- [ ] Redis 7+ installed: `sudo apt install redis-server`
- [ ] Nginx installed: `sudo apt install nginx`
- [ ] All services can start without errors

#### Option 3: Manual Cluster (Testing Only)
- [ ] Node.js installed
- [ ] Can run multiple instances on different ports
- [ ] Load testing tools available

---

## Configuration Verification

### Environment Variables
- [ ] `.env.production` copied to `.env`
- [ ] `NODE_ENV=production` set
- [ ] `JWT_SECRET` - Strong random key (32+ chars)
- [ ] `SESSION_SECRET` - Strong random key (32+ chars)
- [ ] `COC_API_KEY` - Valid Clash of Clans API key
- [ ] Database credentials secure and correct
- [ ] Redis connection string (if using)
- [ ] CORS settings configured correctly
- [ ] Rate limiting thresholds appropriate for expected traffic

### SSL/TLS Certificates
- [ ] SSL certificate obtained (Let's Encrypt or commercial)
- [ ] Private key secured (600 permissions)
- [ ] Certificate chain complete
- [ ] Certificate valid for your domain
- [ ] Auto-renewal configured (if Let's Encrypt)

### Database
- [ ] PostgreSQL running and accessible
- [ ] Database created: `attoria_db`
- [ ] Database user created with correct permissions
- [ ] Migrations completed: `npm run migrate`
- [ ] All tables created successfully
- [ ] Backup script configured
- [ ] Automatic backups scheduled (cron or systemd timer)

### Cache (Redis)
- [ ] Redis running and accessible
- [ ] Redis persistence configured
- [ ] Memory limits set appropriately
- [ ] Authentication configured (if needed)
- [ ] Connection pooling working

### Web Server (Nginx)
- [ ] Nginx installed and configured
- [ ] nginx.conf updated with your domain
- [ ] SSL certificates linked in nginx config
- [ ] Rate limiting configured
- [ ] Security headers enabled
- [ ] Log rotation configured
- [ ] Gzip compression enabled

---

## Application Testing

### Local Testing (Before Deployment)
```bash
# 1. Install dependencies
npm install

# 2. Start in development mode
npm start

# 3. Test endpoints
curl http://localhost:3000/health
curl http://localhost:3000/

# 4. Check database connection
curl http://localhost:3000/api/coc-status

# 5. Stop server
Ctrl+C
```

### Pre-Production Testing
- [ ] All API endpoints respond correctly
- [ ] Health check endpoint working: `/health`
- [ ] Database operations successful
- [ ] Redis caching working
- [ ] Rate limiting engaged
- [ ] Security headers present
- [ ] HTTPS redirects working
- [ ] Error handling functional
- [ ] Logging working

### Load Testing (10K+ Users)
- [ ] Load test simulating 10,000 concurrent users
- [ ] Response times < 500ms under load
- [ ] Error rate < 0.1%
- [ ] Memory usage stable
- [ ] CPU usage < 80%
- [ ] Database connections healthy
- [ ] No memory leaks detected

### Failover Testing
- [ ] Kill one app instance, others continue
- [ ] Database connection pooling works
- [ ] Redis reconnects on failure
- [ ] Traffic properly rerouted
- [ ] Service recovers automatically

---

## Security Verification

### Application Security
- [ ] All secrets moved to environment variables
- [ ] No sensitive data in logs
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection enabled (helmet.js)
- [ ] CSRF protection configured
- [ ] Rate limiting prevents brute force
- [ ] Password hashing configured (bcrypt rounds=12)

### Network Security
- [ ] Firewall rules configured
  - [ ] Port 80 open (HTTP redirect)
  - [ ] Port 443 open (HTTPS)
  - [ ] Other ports closed to external traffic
- [ ] SSH key-based authentication (no passwords)
- [ ] fail2ban configured for brute force protection
- [ ] DDoS mitigation (Cloudflare or similar)

### Data Security
- [ ] Database backups encrypted
- [ ] Backup storage location secure
- [ ] Backup restoration tested
- [ ] Data retention policies defined
- [ ] User passwords properly hashed
- [ ] Session data secure (httpOnly cookies)

---

## Monitoring & Logging

### Logging Setup
- [ ] Winston logger configured
- [ ] Log files rotating automatically
- [ ] Log retention policies set
- [ ] Error logs monitored
- [ ] Application logs centralized (optional: ELK stack)

### Monitoring & Alerting
- [ ] Health endpoint monitored
- [ ] CPU/Memory usage monitored
- [ ] Database connection pool monitored
- [ ] Redis connection monitored
- [ ] Alerts configured for:
  - [ ] High CPU usage (>80%)
  - [ ] High memory usage (>80%)
  - [ ] Response time spikes
  - [ ] Error rate increases
  - [ ] Database connection issues
  - [ ] Disk space issues

### Performance Monitoring
- [ ] APM tool configured (optional: New Relic, Datadog)
- [ ] Slow query logging enabled
- [ ] Request tracing enabled
- [ ] Performance baselines established

---

## Deployment Procedures

### Docker Deployment
```bash
# 1. Build image
npm run docker-build

# 2. Start services
npm run docker-up

# 3. Run migrations
docker-compose exec app-1 npm run migrate

# 4. Verify health
curl http://localhost/health

# 5. Monitor logs
docker-compose logs -f app-1
```

### PM2 Deployment
```bash
# 1. Start application
npm run pm2-start

# 2. Run migrations (first time only)
npm run migrate

# 3. Configure auto-start on reboot
pm2 save
pm2 startup

# 4. Monitor
npm run pm2-logs
```

---

## Post-Deployment Verification

- [ ] Application accessible at your domain
- [ ] HTTPS/SSL working correctly
- [ ] Redirect from HTTP to HTTPS working
- [ ] Health check endpoint responding
- [ ] All API endpoints functional
- [ ] Database queries working
- [ ] Caching working
- [ ] Rate limiting active
- [ ] Logging active
- [ ] Monitoring alerts active
- [ ] Backups running on schedule
- [ ] SSL certificate auto-renewal configured
- [ ] Performance metrics within targets

---

## Maintenance & Operations

### Regular Tasks
- [ ] **Daily**: Check logs for errors
- [ ] **Daily**: Monitor health endpoints
- [ ] **Weekly**: Review performance metrics
- [ ] **Weekly**: Check disk space usage
- [ ] **Monthly**: Review security logs
- [ ] **Monthly**: Test backup restoration
- [ ] **Quarterly**: Update dependencies
- [ ] **Annually**: Renew SSL certificates

### Disaster Recovery
- [ ] Backup and restore procedures documented
- [ ] RTO (Recovery Time Objective) defined
- [ ] RPO (Recovery Point Objective) defined
- [ ] Disaster recovery drills scheduled
- [ ] Contact information up to date

### Scaling Plans
- [ ] Capacity planning completed
- [ ] Scaling procedures documented
- [ ] Load testing infrastructure available
- [ ] Scaling triggers defined
- [ ] Cost estimates for scaling

---

## Go/No-Go Decision

### Final Sign-off
- [ ] All checklist items completed
- [ ] Load tests passed
- [ ] Security review passed
- [ ] Performance targets met
- [ ] Stakeholder approval obtained
- [ ] Runbook ready
- [ ] On-call support scheduled

**Deployment Date**: _______________
**Deployed By**: _______________
**Approved By**: _______________

---

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Docker not found | `sudo apt install docker.io` |
| Permission denied | `sudo usermod -aG docker $USER` |
| Port 3000 in use | `lsof -i :3000` then `kill -9 <PID>` |
| PostgreSQL connection failed | `psql -h localhost -U attoria -d attoria_db` |
| Redis not responding | `redis-cli ping` |
| Nginx config error | `sudo nginx -t` |
| High memory usage | Check `pm2 monit` or `docker stats` |
| SSL certificate error | Verify certificate path and permissions |

---

## Additional Resources

- **Docker Docs**: https://docs.docker.com/
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Nginx Docs**: https://nginx.org/en/docs/
- **PM2 Docs**: https://pm2.keymetrics.io/docs/
- **Let's Encrypt**: https://letsencrypt.org/
- **Node.js Best Practices**: https://nodejs.org/en/docs/guides/nodejs-performance-tuning-on-linux/
