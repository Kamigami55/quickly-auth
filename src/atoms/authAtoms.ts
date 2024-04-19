import { atom } from 'jotai';

import { Profile } from '@/types/profile';

export const accessTokenAtom = atom<string>('');

export const isLoggedInAtom = atom((get) => {
  const accessToken = get(accessTokenAtom);
  return !!accessToken;
});

export const profileAtom = atom<Profile | null>(null);
