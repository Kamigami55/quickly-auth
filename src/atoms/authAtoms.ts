import { atom } from 'jotai';

import { ProfileData } from '@/services/quicklyApi';
import { AuthState } from '@/types/auth';

export const accessTokenAtom = atom<string>('');

export const authStateAtom = atom<AuthState>(AuthState.LOADING);

export const profileAtom = atom<ProfileData | null>(null as ProfileData);
