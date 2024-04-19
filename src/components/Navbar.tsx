'use client';

import { CircleUser, Menu, Package2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ActiveLink } from '@/components/ActiveLink';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PAGE_URL } from '@/constants/pageUrl';
import { useAuth } from '@/hooks/useAuth';
import { AuthState } from '@/types/auth';

const NavbarItems = [
  {
    name: 'Login',
    href: PAGE_URL.LOGIN,
  },
  {
    name: 'Signup',
    href: PAGE_URL.SIGNUP,
  },
  {
    name: 'Profile',
    href: PAGE_URL.PROFILE,
  },
];

export function Navbar() {
  const { authState, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(PAGE_URL.LOGIN);
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base shrink-0"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Quickly Auth</span>
        </Link>
        {NavbarItems.map((item) => (
          <ActiveLink
            key={item.name}
            href={item.href}
            className="transition-colors hover:text-foreground"
            activeClassName="text-primary font-semibold"
            inactiveClassName="text-muted-foreground"
          >
            {item.name}
          </ActiveLink>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Quickly Auth</span>
            </Link>

            {NavbarItems.map((item) => (
              <ActiveLink
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground"
                activeClassName="text-primary font-semibold"
                inactiveClassName="text-muted-foreground"
              >
                {item.name}
              </ActiveLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial" />

        {authState === AuthState.LOGGED_IN ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={PAGE_URL.PROFILE}>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={PAGE_URL.LOGIN}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
