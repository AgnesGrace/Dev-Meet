'use server';

import * as auth from '@/auth/auth';

export async function signInWithGithub() {
  return await auth.signIn('github');
}

export async function signInWithGoogle() {
  return await auth.signIn('google');
}
