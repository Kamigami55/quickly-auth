'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, getProfile, profile } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      getProfile();
    } else {
      router.push('/login');
    }
  }, [isLoggedIn, getProfile, router]);

  return (
    <div className="my-8 mx-10">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>User</CardTitle>
            <CardDescription>Your user information.</CardDescription>
          </CardHeader>
          <CardContent>{JSON.stringify(profile?.user)}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company</CardTitle>
            <CardDescription>Your company information.</CardDescription>
          </CardHeader>
          <CardContent>{JSON.stringify(profile?.company)}</CardContent>
        </Card>
      </div>
    </div>
  );
}
