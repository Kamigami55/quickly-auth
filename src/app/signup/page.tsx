'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUpPage() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-confirm">Confirm password</Label>
            <Input id="password-confirm" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="Acme Inc" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="4035550987" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="https://acme.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="business-type">Business type</Label>
            <Input id="business-type" placeholder="Digital products" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="business-registration">Business registration</Label>
            <Input id="business-registration" placeholder="corporation" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" placeholder="Apps" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expected-activity">Expected activity</Label>
            <Input
              id="expected-activity"
              placeholder="Get my invoices paid early"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="early-pay-intent">Early pay intent</Label>
            <Input id="early-pay-intent" placeholder="true" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="has-trade-name">Has trade name</Label>
            <Input id="has-trade-name" placeholder="false" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="legal-name">Legal name</Label>
            <Input id="legal-name" placeholder="Jan 26 Seller Co" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="business-number">Business number</Label>
            <Input id="business-number" placeholder="654987321" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="activity">Activity</Label>
            <Input id="activity" placeholder="Get my invoices paid early" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
