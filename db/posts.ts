import { Post } from '@/generated/prisma/client';
import db from '@/db';

export type PostDataType = Post & {
  topic: { slug: string };
  user: { name: string | null; image: string | null };
  _count: { comments: number };
};

export async function fetchPostsByTopicSlugName(
  slugName: string,
): Promise<PostDataType[]> {
  return await db.post.findMany({
    where: { topic: { slug: slugName } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  });
}
