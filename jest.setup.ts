import '@testing-library/jest-dom';

import { useRouter } from 'next-router-mock';

jest.mock('next/navigation', () => {
  const usePathname = () => {
    const router = useRouter();
    return router.pathname;
  };
  return {
    useRouter,
    usePathname,
  };
});
