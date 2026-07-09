'use client';

import { createPost } from '@/actions';
import {
  Button,
  ErrorMessage,
  FieldError,
  Form,
  Input,
  Label,
  Popover,
  Spinner,
  TextArea,
  TextField,
} from '@heroui/react';
import { FormEvent, startTransition, useActionState } from 'react';

interface ICreateFPostProps {
  nameSlug: string;
}
export default function FormCreatePost({ nameSlug }: ICreateFPostProps) {
  const [formState, formAction, isPending] = useActionState(
    createPost.bind(null, nameSlug),
    {
      errors: {},
    },
  );

  function handleCreatePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => formAction(formData));
  }
  return (
    <div>
      <Popover>
        <Button>Create Post</Button>
        <Popover.Content>
          <form
            onSubmit={handleCreatePost}
            noValidate
            className="w-96 flex flex-col gap-4 p-8 bg-white shadow-sm border border-zinc-200 rounded-2xl "
          >
            <TextField isRequired name="title">
              <Label className="dark:text-zinc-900">Title</Label>
              <Input
                type="text"
                className=" rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200"
              />
              <FieldError></FieldError>
            </TextField>

            <TextField name="content" isRequired>
              <Label className="dark:text-zinc-900">Content</Label>
              <TextArea
                id="code"
                className="resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5  text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200"
              />
              <FieldError></FieldError>
            </TextField>
            {formState.errors._form && formState.errors._form.length > 0 && (
              <ErrorMessage>{formState.errors._form.join(',')}</ErrorMessage>
            )}
            <Button
              type="submit"
              isPending={isPending}
              className="flex items-center gap-4 mt-8 w-full cursor-pointer rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
            >
              <span>Submit</span>
              {isPending && <Spinner />}
            </Button>
          </form>
        </Popover.Content>
      </Popover>
    </div>
  );
}
