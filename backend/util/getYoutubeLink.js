
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function getYoutubeLink (keywords) {
    const query = keywords.toLowerCase().trim();

    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=5&key=${YOUTUBE_API_KEY}`;

    try {
        const res = await fetch(endpoint);
        const data = await res.json();
        const selection = data.items?.[0];
        const videoId = selection?.id.videoId || null;
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        if (!url) {
            throw new Error("No video Found.");
        }
        return url;
    } catch (error) {
        console.error("Image loading failed: ", query, error.message);
        return null
    }
}