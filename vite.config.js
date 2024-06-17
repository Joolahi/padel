import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Lataa ympäristömuuttujat .env-tiedostosta
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export default defineConfig({
  define: {
    base: "/PadelMarkkinat/",
    'process.env': process.env
  }
});
