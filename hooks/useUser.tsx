import {API_ROUTES} from '@/consts';
import {useFetch} from './useFetch';

export function useUser() {
  const getUser = async () => {
    try {
      const callUserList = await useFetch(API_ROUTES.listUser, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(callUserList, 'test');
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getUser,
  };
}
