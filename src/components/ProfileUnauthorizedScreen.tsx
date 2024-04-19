import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PAGE_URL } from '@/constants/pageUrl';

export function ProfileUnauthorizedScreen() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-3xl font-bold tracking-tight">401 Unauthorized</h3>
        <p className="text-muted-foreground">Please login to continue</p>
        <Link href={PAGE_URL.LOGIN}>
          <Button className="mt-4">Login</Button>
        </Link>
      </div>
    </div>
  );
}
