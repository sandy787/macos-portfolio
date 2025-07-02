export default async function handler(req, res) {
  console.log('--- Gemini API Function Invoked ---');
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Env key exists:', !!process.env.GEMINI_API_KEY);

  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body || {};
  console.log('Message received:', message);

  if (!message) {
    console.log('No message provided');
    return res.status(400).json({ error: 'No message provided' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('API key not set');
    return res.status(500).json({ error: 'API key not set' });
  }

  try {
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    console.log('Sending request to Gemini endpoint:', endpoint);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      }),
    };
    console.log('Fetch options:', fetchOptions);
    const geminiRes = await fetch(endpoint, fetchOptions);
    console.log('Gemini API status:', geminiRes.status);
    const data = await geminiRes.json();
    console.log('Gemini API response:', JSON.stringify(data));
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Error contacting Gemini API:', err);
    res.status(500).json({ error: 'Error contacting Gemini API.' });
  }
}
  