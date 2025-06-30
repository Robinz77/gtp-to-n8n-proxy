import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const N8N_WEBHOOK_URL = 'https://pvtnederland.app.n8n.cloud/webhook/654a9d26-43ed-4375-a6ac-a57e33cb083e';

app.post('/api/send', async (req, res) => {
  try {
    const payload = req.body;

    const forward = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await forward.text();
    res.status(200).send(`✅ Doorsturen gelukt:\n${result}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Fout bij doorsturen naar n8n');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy draait op poort ${port}`);
});
