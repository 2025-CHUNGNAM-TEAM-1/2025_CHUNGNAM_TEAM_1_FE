import api from "./api";

export const getProfile = async () => {
  try {
    const response = await api.get('/members/profile');
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfileName = async (name) => {
  try {
    const response = await api.patch('/members/profile/edits', { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const purchaseProfileImage = async (imageId) => {
  try {
    const response = await api.post('/members/profile/image', { imageId });
    return response.data;
  } catch (error) {
    throw error;
  }
};
