import { auth } from '@/auth/auth';
import Profile from '@/components /profile';
import { Button } from '@heroui/react';
export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <Profile />
    </>
  );
}
