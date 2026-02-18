import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegStatic);

const inputPath = path.join(__dirname, 'public', 'background.mp4');
const outputPath = path.join(__dirname, 'public', 'background.mp3');

ffmpeg(inputPath)
  .output(outputPath)
  .on('error', (err) => {
    console.error('Error:', err);
  })
  .on('end', () => {
    console.log('✅ Audio extracted successfully! File saved to:', outputPath);
  })
  .run();
