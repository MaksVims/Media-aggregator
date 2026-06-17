export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('Missing image URL');
    }

    try {

        const targetUrl = decodeURIComponent(url);

        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {

                'X-API-KEY': 'a1834cdf-a3c6-4f44-9466-bfef246217fc',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            },
        });

        if (!response.ok) {
            console.error(`Kinopoisk returned status: ${response.status} for URL: ${targetUrl}`);
            return res.status(response.status).send('Failed to fetch image from source');
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

        return res.send(buffer);
    } catch (error) {
        console.error('Proxy error details:', error);
        return res.status(500).send('Internal Server Error');
    }
}