import { CircleUser } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Profile } from '@/types/profile';

export function ProfileScreen({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarFallback>
                <CircleUser className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {profile?.user?.first_name} {profile?.user?.last_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {profile?.user?.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Legal Name:</div>
            <div className="text-sm">{profile?.company?.legal_name || '-'}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Business Type:</div>
            <div className="text-sm">
              {profile?.company?.business_type || '-'}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Industry:</div>
            <div className="text-sm">{profile?.company?.industry || '-'}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Website:</div>
            <div className="text-sm">{profile?.company?.website || '-'}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Business Registration:</div>
            <div className="text-sm">
              {profile?.company?.business_registration || '-'}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Phone:</div>
            <div className="text-sm">{profile?.company?.phone || '-'}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Business Number:</div>
            <div className="text-sm">
              {profile?.company?.business_number || '-'}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500 ">Expected Activity:</div>
            <div className="text-sm">
              {profile?.company?.expected_activity || '-'}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500 ">Early Pay Intent:</div>
            <div className="text-sm">
              {profile?.company?.early_pay_intent ? 'Yes' : 'No'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
