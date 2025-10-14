# Project 3: Simple Docker Compose

A straightforward demonstration of Docker Compose with Node.js, PostgreSQL, and pgAdmin. This project teaches the fundamentals of multi-container orchestration.

## What's Inside

- **API**: Node.js/Express server with live reloading via nodemon
- **Database**: PostgreSQL 15 database  
- **pgAdmin**: Web-based PostgreSQL administration tool

## Prerequisites

- Docker Desktop installed
- Basic understanding of Docker containers

## Quick Start

1. **Clone and navigate to project:**
   ```bash
   cd project-3-simple-compose
   ```

2. **Start all services:**
   ```bash
   docker compose up
   ```

3. **Run in background (detached mode):**
   ```bash
   docker compose up -d
   ```

4. **View logs:**
   ```bash
   docker compose logs -f
   ```

5. **Stop services:**
   ```bash
   docker compose down
   ```

## Access Points

- **API**: http://localhost:3050
- **pgAdmin**: http://localhost:8088
  - Email: `admin@admin.com`
  - Password: `admin`
- **PostgreSQL Database**: `localhost:5432`

## API Endpoints

- `GET /` - Basic API information
- `GET /health` - Health check endpoint
- `GET /users` - Test database connection (returns current database time)

## Connect to Database in pgAdmin

1. Open pgAdmin at http://localhost:8088
2. Login with credentials: `admin@admin.com` / `admin`
3. Right-click "Servers" → Register → Server
4. Configure connection:
   - **General Tab:**
     - Name: `Docker PostgreSQL`
   - **Connection Tab:**
     - Host: `db` (Docker service name)
     - Port: `5432`
     - Database: `myapp`
     - Username: `user`
     - Password: `password`

## Live Reloading

The API automatically reloads when you modify files thanks to:
- **nodemon** with `--legacy-watch` flag (polling for Docker compatibility)
- **Volume mounting** - entire project directory mounted to `/app`
- **Anonymous volume** - preserves `node_modules` inside container

Edit any file in `src/` and watch the API restart automatically!

## File Structure

```
project-3-simple-compose/
├── docker-compose.yml    # Multi-container orchestration
├── Dockerfile           # Node.js container definition
├── package.json         # Node.js dependencies
├── .gitignore          # Git ignore rules
├── src/
│   └── server.js       # Express application
└── README.md
```

## Key Learning Points

### 1. **Multi-Container Orchestration**
Define and run multiple containers that work together as one application.

### 2. **Service Communication**
Containers communicate using service names as hostnames (e.g., `db` instead of `localhost`).

### 3. **Volume Mounting**
Two types of volumes:
- **Bind mount**: `.:/app` - Syncs host files with container
- **Anonymous volume**: `/app/node_modules` - Preserves container's node_modules

### 4. **Environment Variables**
Configure services without changing code using environment variables in `docker-compose.yml`.

### 5. **Dependency Management**
Use `depends_on` to control service startup order.

### 6. **Default Networking**
Docker Compose automatically creates a network for all services.

## Adding Dependencies

When you need to add a new npm package:

```bash
# Option 1: Install on host, restart container
npm install <package-name>
docker compose restart api

# Option 2: Install inside container
docker compose exec api npm install <package-name>
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker compose logs api

# Rebuild from scratch
docker compose down
docker compose up --build
```

### Can't connect to database
```bash
# Verify database is running
docker compose ps

# Check database logs
docker compose logs db
```

### Port already in use
Edit `docker-compose.yml` and change the host port:
```yaml
ports:
  - "3051:3000"  # Change 3050 to any available port
```

## Advanced Commands

```bash
# Rebuild specific service
docker compose up --build api

# Execute command in running container
docker compose exec api bash

# View container resource usage
docker compose stats

# Remove volumes (WARNING: deletes database data)
docker compose down -v
```

## Project Purpose

This project demonstrates:
- ✅ Basic Docker Compose setup
- ✅ Multi-container applications
- ✅ Database integration
- ✅ Development workflow with live reloading
- ✅ Container networking basics
- ✅ Volume management for persistent data

Perfect for learning Docker Compose fundamentals before moving to more complex setups!