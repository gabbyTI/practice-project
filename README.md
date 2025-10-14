# Simple Docker Compose Demo

A basic demonstration of Docker Compose with Node.js, PostgreSQL, and pgAdmin.

## What's Inside

- **API**: Simple Node.js/Express server with live reloading
- **Database**: PostgreSQL database  
- **pgAdmin**: Web-based PostgreSQL administration tool

## How to Run

1. **Start all services:**
   ```bash
   docker compose up
   ```

2. **Run in background:**
   ```bash
   docker compose up -d
   ```

3. **Stop services:**
   ```bash
   docker compose down
   ```

## Access Points

- **API**: http://localhost:3000
- **pgAdmin**: http://localhost:8080
  - Email: admin@admin.com
  - Password: admin

## API Endpoints

- `GET /` - Basic info
- `GET /health` - Health check
- `GET /users` - Test database connection

## Connect to Database in pgAdmin

1. Open pgAdmin at http://localhost:8080
2. Login with admin@admin.com / admin
3. Add new server:
   - **Host**: `db` (service name)
   - **Port**: `5432`
   - **Database**: `myapp`
   - **Username**: `user`
   - **Password**: `password`

## Live Reloading

The API automatically reloads when you change files in the `src/` directory thanks to nodemon and volume mounting.

## File Structure

```
project-4-simple-compose/
├── docker-compose.yml
├── package.json
├── src/
│   └── server.js
└── README.md
```

## Key Learning Points

1. **Services**: Define multiple containers that work together
2. **Volumes**: Share files between host and containers for live reloading
3. **Networks**: Services can communicate using service names
4. **Environment Variables**: Configure services without changing code
5. **Dependencies**: Control startup order with `depends_on`