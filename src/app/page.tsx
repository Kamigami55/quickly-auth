'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ProfileLoadingScreen } from '@/components/ProfileLoadingScreen';
import { ProfileScreen } from '@/components/ProfileScreen';
import { ProfileUnauthorizedScreen } from '@/components/ProfileUnauthorizedScreen';
import { useAuth } from '@/hooks/useAuth';
import { AuthState } from '@/types/auth';

export default function ProfilePage() {
  const router = useRouter();
  const { authState, fetchProfile: getProfile, profile } = useAuth();

  useEffect(() => {
    if (authState === AuthState.LOGGED_IN) {
      getProfile();
    }
  }, [authState, getProfile, router]);

  return (
    <div className="my-8 mx-10">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>
      {authState === AuthState.LOGGED_OUT ? (
        <ProfileUnauthorizedScreen />
      ) : authState === AuthState.LOGGED_IN ? (
        <ProfileScreen profile={profile} />
      ) : (
        <ProfileLoadingScreen />
      )}
    </div>
  );
}
