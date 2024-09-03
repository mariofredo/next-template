const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const apiRoutes = {
  login: BASE_URL + '/auth/login',
  register: BASE_URL + '/auth/register',
  logout: BASE_URL + '/auth/logout',
};
