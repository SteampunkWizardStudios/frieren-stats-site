"use server"

import fs from 'fs';
import path from 'path';

const charactersDir = path.join(process.cwd(), 'public', 'characters');
const characterFilePaths = fs.readdirSync(charactersDir);

const characterMap = characterFilePaths.reduce((acc, filePath) => {
  const key = path.parse(filePath).name;
  const value = key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return { ...acc, [key]: value };
}, {} as Record<string, string>); 

export async function getCharacterFilePaths() {
	return characterFilePaths;
}

export async function getCharacterMap() {
  return characterMap;
}