export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('Missing image URL');
    }

    try {

        const response = await fetch(decodeURIComponent(url), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        if (!response.ok) {
            return res.status(response.status).send('Failed to fetch image from source');
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');

        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200');

        return res.send(buffer);
    } catch (error) {
        console.error('Poster proxy error:', error);
        return res.status(500).send('Internal Server Error');
    }
}