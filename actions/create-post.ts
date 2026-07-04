'use server';

import { auth } from '@/auth/auth';
import db from '@/db';
import { title } from 'process';
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
  content: z.string().min(15),
});
export async function createPost(
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

  return { errors: {} };
}
