import * as fs from 'fs';
import ytdl from 'ytdl-core';

export const youtubeConversion = async (req, res) => {
  try {
    const { url, folder } = req.body;

    if (!url || !folder) {
      throw new Error('URL de la vidéo et dossier de destination requis');
    }

    const videoInfo = await ytdl.getInfo(url);
    const videoTitle = videoInfo.videoDetails.title;
    const outputPath = `${folder}/${videoTitle}.mp4`;

    const videoStream = ytdl(url);

    videoStream.pipe(fs.createWriteStream(outputPath));

    videoStream.on('end', () => {
      res.json({
        message: 'Téléchargement terminé',
        filePath: outputPath,
      });
    });
    
    videoStream.on('error', (error) => {
      throw error;
    });
  } catch (error) {
    console.error('Erreur lors de la conversion :', error.message);

    if (error.message === 'Les paramètres "url" et "folder" sont requis.') {
      res.status(400).json({ error: error.message });
    } else if (error.message === 'Impossible d\'obtenir les informations de la vidéo.') {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erreur lors de la conversion de la vidéo' });
    }
  }
};
