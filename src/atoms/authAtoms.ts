import { atom } from 'jotai';

import { AuthState } from '@/types/auth';
import { Profile } from '@/types/profile';

export const accessTokenAtom = atom<string>('');

export const authStateAtom = atom<AuthState>(AuthState.LOADING);

export const profileAtom = atom<Profile | null>(null as Profile);
