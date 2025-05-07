const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const corsOptions = {
    origin: 'https://visi0nz.github.io/imagesearch/', // Your GitHub Pages URL
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
};

module.exports = async (req, res) => {
    cors(corsOptions)(req, res, async () => {
        const { query, page = 1 } = req.query;
        const accessKey = process.env.UNSPLASH_ACCESS_KEY;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        try {
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}&per_page=12`;
            const response = await fetch(url);
            
            // Check if the Unsplash response is OK
            if (!response.ok) {
                throw new Error(`Unsplash API error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Unsplash API response:', data); // Log for debugging (visible in Vercel logs)
            res.json(data);
        } catch (error) {
            console.error('Error fetching from Unsplash:', error);
            res.status(500).json({ error: 'Failed to fetch images', details: error.message });
        }
    });
};