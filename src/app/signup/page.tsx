'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PAGE_URL } from '@/constants/pageUrl';
import { useAuth } from '@/hooks/useAuth';

const signupFormSchema = z
  .object({
    // Personal information
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().min(1).trim().email(),
    confirmEmail: z.string().min(1).trim().email(),
    password: z.string().min(6).trim(),
    confirmPassword: z.string().min(6).trim(),
    // Company information
    earlyPayIntent: z.boolean().optional(),
    expectedActivity: z.string().optional(),
    industry: z.string().optional(),
    businessType: z.string().optional(),
    website: z.string().optional(),
    businessRegistration: z.string().optional(),
    phone: z.string().optional(),
    businessNumber: z.string().optional(),
    hasTradeName: z.boolean().optional(),
    legalName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'Emails do not match',
    path: ['confirmEmail'],
  });

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      earlyPayIntent: false,
      expectedActivity: '',
      industry: '',
      businessType: '',
      website: '',
      businessRegistration: '',
      phone: '',
      businessNumber: '',
      hasTradeName: false,
      legalName: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    setIsSubmitting(true);
    try {
      const success = await signup({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        earlyPayIntent: values.earlyPayIntent,
        expectedActivity: values.expectedActivity,
        industry: values.industry,
        businessType: values.businessType,
        website: values.website,
        businessRegistration: values.businessRegistration,
        phone: values.phone,
        businessNumber: values.businessNumber,
        hasTradeName: values.hasTradeName,
        legalName: values.legalName,
      });
      if (!success) {
        throw new Error('Signup failed');
      }
      router.push(PAGE_URL.PROFILE);
    } catch (error) {
      window.alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-6">
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* first name */}
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input
                              id="first-name"
                              placeholder="Eason"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* last name */}
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input
                              id="last-name"
                              placeholder="Chang"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* email */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* confirm email */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Confirm email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirm-email"
                            placeholder="Enter your email again"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* password */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Password <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Must be at least 6 characters"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* confirm password */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Confirm password{' '}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Enter your password again"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Company information
                    </span>
                  </div>
                </div>

                {/* early pay intent */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="earlyPayIntent"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Early pay intent</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="early-pay-intent"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <label
                              htmlFor="early-pay-intent"
                              className="text-sm leading-none"
                            >
                              Early pay intent
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* expected activity */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="expectedActivity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected activity</FormLabel>
                        <FormControl>
                          <Input
                            id="expected-activity"
                            placeholder="Get my invoices paid early"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* industry */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl id="industry">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Apps">Apps</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* business type */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl id="business-type">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Digital products">
                              Digital products
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* website */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            id="website"
                            placeholder="https://acme.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* business registration */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="businessRegistration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business registration</FormLabel>
                        <FormControl>
                          <Input
                            id="business-registration"
                            placeholder="corporation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* phone */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            id="phone"
                            placeholder="1234567890"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* business number */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="businessNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business number</FormLabel>
                        <FormControl>
                          <Input
                            id="business-number"
                            placeholder="123456789"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* has trade name */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="hasTradeName"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Has trade name</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="has-trade-name"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <label
                              htmlFor="has-trade-name"
                              className="text-sm leading-none"
                            >
                              Has trade name
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* legal name */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="legalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal name</FormLabel>
                        <FormControl>
                          <Input
                            id="legal-name"
                            placeholder="ACME Inc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <span>Create an account</span>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href={PAGE_URL.LOGIN} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
