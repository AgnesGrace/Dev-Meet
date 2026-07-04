'use server';

import { auth } from '@/auth/auth';
import db from '@/db';
import { Topic } from '@/generated/prisma/client';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';

import { z } from 'zod';
const createTopicSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Must be at least four characters',
    })
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters',
    }),
  description: z.string().min(10),
});

interface CreateTopicActionState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}
export async function createTopic(
  formActionState: CreateTopicActionState,
  formData: FormData,
): Promise<CreateTopicActionState> {
  const session = await auth();

  const name = formData.get('name');
  const description = formData.get('description');

  const formattedFormData = createTopicSchema.safeParse({
    name,
    description,
  });

  if (!session?.user) {
    return {
      errors: {
        _form: ['You must be logged in in order to add a topic'],
      },
    };
  }
  if (!formattedFormData.success) {
    return {
      errors: formattedFormData.error.flatten().fieldErrors,
    };
  }
  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: formattedFormData.data.name,
        description: formattedFormData.data.description,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    }
    return {
      errors: {
        _form: ['Something went wrong'],
      },
    };
  }
  revalidatePath('/');
  redirect(paths.showTopic(topic.slug));
}
