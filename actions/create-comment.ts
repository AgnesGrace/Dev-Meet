'use server';

import { auth } from '@/auth/auth';
import db from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import z from 'zod';

interface ICreateComment {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

const createCommentSchema = z.object({
  content: z.string().min(3, {
    message: 'Comment field must have at lease three characters',
  }),
});
export async function createComment(
  {
    postId,
    parentPostId,
  }: {
    postId: string;
    parentPostId: string;
  },
  formState: ICreateComment,
  formData: FormData,
): Promise<ICreateComment> {
  console.log('clicked comment', formData);
  const formattedComment = createCommentSchema.safeParse({
    content: formData.get('content'),
  });

  if (!formattedComment.success) {
    return {
      errors: formattedComment.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must sign in to add comment'],
      },
    };
  }

  try {
    await db.comment.create({
      data: {
        content: formattedComment.data.content,
        postId,
        parentId: parentPostId,
        userId: session.user.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    } else {
      return { errors: { _form: ['Something went wrong'] } };
    }
  }

  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return {
      errors: {
        _form: ['Something went wrong!'],
      },
    };
  }
  revalidatePath(paths.showPost(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
}
