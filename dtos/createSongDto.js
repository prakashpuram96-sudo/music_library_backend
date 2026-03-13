const createSongDto = ({
  title,
  singer,
  musicDirector,
  album,
  releaseDate,
  url,
  coverImage,
}) => {
  const errors = [];

  if (!title || !title.trim()) errors.push("Title is required");
  if (!singer || !singer.trim()) errors.push("Singer is required");
  if (!musicDirector || !musicDirector.trim())
    errors.push("Music director is required");
  if (!url || !url.trim()) errors.push("Audio URL is required");
  if (url && !/^https?:\/\/.+/.test(url))
    errors.push("Audio URL must be a valid URL");
  if (coverImage && !/^https?:\/\/.+/.test(coverImage))
    errors.push("Cover image must be a valid URL");

  return {
    errors,
    data: { title, singer, musicDirector, album, releaseDate, url, coverImage },
  };
};

module.exports = createSongDto;
