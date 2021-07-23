import api from './api-config';

export const getAllArtworks = async () => {
  const resp = await api.get('/artworks');
  return resp.data;
};

export const getOneArtwork = async (id) => {
  const resp = await api.get(`/artworks/${id}`);
  return resp.data;
};

export const postArtwork = async (artworkData) => {
  const resp = await api.post('/artworks', { artwork: artworkData });
  return resp.data;
};

export const putArtwork = async (id, artworkData) => {
  const resp = await api.put(`/artworks/${id}`, { artwork: artworkData });
  return resp.data;
};

export const deleteArtwork = async (id) => {
  const resp = await api.delete(`/artworks/${id}`);
  return resp;
};