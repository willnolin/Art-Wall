import api from './api-config';

export const getAllLocations = async () => {
  const resp = await api.get('/locations');
  return resp.data;
};

export const getOneLocation = async (id) => {
  const resp = await api.get(`/locations/${id}`);
  return resp.data;
};

export const postLocation = async (locationData) => {
  const resp = await api.post('/locations', { location: locationData });
  return resp.data;
};

export const putLocation = async (id, locationData) => {
  const resp = await api.put(`/locations/${id}`, { location: locationData });
  return resp.data;
};

export const deleteLocation = async (id) => {
  const resp = await api.delete(`/locations/${id}`);
  return resp;
};

