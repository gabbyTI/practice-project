const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'myapp',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  port: 5432,
});

app.use(express.json());

// Test database connection on startup
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database');
    client.release();
  } catch (err) {
    console.log('❌ Database connection failed:', err.message);
  }
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Simple Docker Compose API - LEGACY WATCH WORKS!',
    status: 'running',
    database: process.env.DB_HOST || 'localhost',
    timestamp: new Date().toISOString(),
    reloadTest: 'File changed and auto-reloaded!'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({
      message: 'Database query successful',
      time: result.rows[0].current_time
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  testConnection();
});