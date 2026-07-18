import db from '@/db';
import { notFound } from 'next/navigation';

interface IshowPost {
  postId: string;
}

export default async function ShowPost({ postId }: IshowPost) {
  await new Promise((r) => setTimeout(r, 2000));
  const post = await db.post.findFirst({ where: { id: postId } });
  if (!post) {
    return notFound();
  }
  const { title, content } = post;
  return (
    <div className="m-4">
      <h3 className="font-bold my-2 text-2xl">{title}</h3>
      <p className="p-4 border rounded-2xl">{content}</p>
    </div>
  );
}
