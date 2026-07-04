'use client';

import { createPost } from '@/actions';
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Popover,
  TextArea,
  TextField,
} from '@heroui/react';
import { useActionState } from 'react';

export default function FormCreatePost() {
  const [formState, formAction, isPending] = useActionState(createPost, {
    errors: {},
  });
  return (
    <div>
      <Popover>
        <Button>Create Post</Button>
        <Popover.Content>
          <Form
            action={formAction}
            className="w-96 flex flex-col gap-4 p-8 bg-white shadow-sm border border-zinc-200 rounded-2xl "
          >
            <TextField isRequired name="title">
              <Label>Title</Label>
              <Input
                type="text"
                className=" rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200"
              />
              <FieldError></FieldError>
            </TextField>

            <TextField name="content" isRequired>
              <Label>Content</Label>
              <TextArea
                id="code"
                className="resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5  text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200"
              />
              <FieldError></FieldError>
            </TextField>
          </Form>
        </Popover.Content>
      </Popover>
    </div>
  );
}
