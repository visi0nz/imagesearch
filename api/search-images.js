const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

// Configure CORS to allow requests from your frontend's origin
const corsOptions = {
    origin: 'https://visi0nz.github.io/imagesearch/', // Replace with your GitHub Pages URL
    methods: ['GET'], // Allow only GET requests
    allowedHeaders: ['Content-Type'],
};

module.exports = async (req, res) => {
    // Apply CORS middleware
    cors(corsOptions)(req, res, async () => {
        const { query, page = 1 } = req.query;
        const accessKey = process.env.UNSPLASH_ACCESS_KEY;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        try {
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}&per_page=12`;
            const response = await fetch(url);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch images' });
        }
    });
};