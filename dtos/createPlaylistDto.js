const createPlaylistDto = ({ name }) => {
  const errors = [];

  if (!name || !name.trim()) errors.push("Playlist name is required");
  if (name && name.trim().length > 50)
    errors.push("Playlist name must be under 50 characters");

  return { errors, data: { name } };
};

module.exports = createPlaylistDto;
