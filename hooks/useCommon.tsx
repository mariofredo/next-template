import {useRouter} from 'next/navigation';

export function useCommon() {
  const router = useRouter();
  const UnauthorizedHandler = () => {
    router.push('/login');
  };
  return {
    UnauthorizedHandler,
  };
}
