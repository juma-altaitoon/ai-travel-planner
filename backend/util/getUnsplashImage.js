
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function getUnsplashImageUrl (keywords) {
    const query = keywords.toLowerCase().trim();

    const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
        const res = await fetch(endpoint);
        const data = await res.json();
        const selection = data.results?.[0];
        const image = selection?.urls?.regular || null;
        
        if (!image) {
            throw new Error("No Image Found.");
        }

        return {
            url: image,
            credit: {
                author: selection.user.name,
                profile: selection.user.links.html,
                source: selection.links.html,
            }
        };
    } catch (error) {
        console.error("Image loading failed: ", query, error.message);
        return {
            url: "images_placeholder.png",
            credit: null
        }
    }
}