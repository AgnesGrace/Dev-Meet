import { auth } from '@/auth/auth';
import Profile from '@/components /profile';

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <Profile />
    </>
  );
}
