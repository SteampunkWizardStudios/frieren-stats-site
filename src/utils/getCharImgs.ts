import fs from 'fs';
import path from 'path';

const charactersDir = path.join(process.cwd(), 'public', 'characters');
export const characterImages = fs.readdirSync(charactersDir);