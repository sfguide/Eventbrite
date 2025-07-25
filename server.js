const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Eventbrite proxy is running. Use /events');
});

app.get('/events', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.eventbriteapi.com/v3/events/search/?location.address=united+states&start_date.range_start=2025-08-01T00:00:00Z&start_date.range_end=2025-08-31T23:59:59Z',
      {
        headers: {
          Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}`,
        }
      }
    );
    res.json(response.data.events);
  } catch (error) {
    console.error('Failed to fetch events:', error.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
