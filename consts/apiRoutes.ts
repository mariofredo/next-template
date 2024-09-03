const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_ROUTES = {
  login: BASE_URL + '/auth/login',
  register: BASE_URL + '/auth/register',
  logout: BASE_URL + '/auth/logout',
  listUser: BASE_URL + '/user/list',
};
