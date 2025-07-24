// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const TOKEN = process.env.TOKEN;

app.get('/events', async (req, res) => {
  const url = `https://www.eventbriteapi.com/v3/events/search/?start_date.range_start=2025-08-01T00:00:00Z&start_date.range_end=2025-08-31T23:59:59Z&expand=venue`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching from Eventbrite:", err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
