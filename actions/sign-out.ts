'use server';

import { signOut } from '@/auth/auth';

export async function signOutUser() {
  return await signOut();
}
