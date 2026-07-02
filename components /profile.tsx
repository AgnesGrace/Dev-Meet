'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();
  console.log('session from client', session);
  return <div></div>;
}
