import { Comment } from '@/generated/prisma/client';
import db from '.';
import { cache } from 'react';

export type commentByAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export const getCommentsByPostId = cache(
  (postId: string): Promise<commentByAuthor[]> => {
    return db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  },
);
