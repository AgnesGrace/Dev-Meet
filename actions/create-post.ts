'use server';

import { auth } from '@/auth/auth';
import db from '@/db';
import { Post } from '@/generated/prisma/client';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import z from 'zod';

interface ICreatePostState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least five character long',
  }),
  content: z.string().min(15, {
    message: 'The characters are too short',
  }),
});
export async function createPost(
  nameSlug: string,
  formState: ICreatePostState,
  formData: FormData,
): Promise<ICreatePostState> {
  const session = await auth();
  const title = formData.get('title');
  const content = formData.get('content');

  if (!session?.user) {
    return { errors: { _form: ['Kindly login to perform this action'] } };
  }
  if (!title || !content) {
    return { errors: { _form: ['The fields cannot be empty'] } };
  }

  const formattedData = createPostSchema.safeParse({
    title,
    content,
  });
  if (!formattedData.success) {
    return { errors: formattedData.error.flatten().fieldErrors };
  }

  const topic = await db.topic.findUnique({ where: { slug: nameSlug } });
  if (!topic || !session.user.id)
    return { errors: { _form: ['Something went wrong'] } };
  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: formattedData.data.title,
        content: formattedData.data.content,
        userId: session.user.id,
        topicId: topic?.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    } else {
      return { errors: { _form: ['Something went wrong'] } };
    }
  }
  revalidatePath(paths.showTopic(nameSlug));
  redirect(paths.showPost(nameSlug, post.id));
}
