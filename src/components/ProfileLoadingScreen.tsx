import { Loader2 } from 'lucide-react';

export function ProfileLoadingScreen() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
}
