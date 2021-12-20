export const logout = () => ({
  type: 'LOGOUT',
});

export const getAllAdverts = () => ({
  type: 'GET_ALL_ADVERTS',
});

export const getAllRental = () => ({
  type: 'GET_RENTAL'
});

export const toggleLoginModal = (data) => ({
  type: 'LOGIN_MODAL',
  payload: data,
});
