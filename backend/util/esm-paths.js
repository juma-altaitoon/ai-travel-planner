import { fileURLToPath } from 'url';

export const getESMPaths = (metaUrl) => {
    const __filename = fileURLToPath(metaUrl);
    const __dirname = path.dirname(__filename);
};
