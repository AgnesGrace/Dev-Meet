'use client';

import { createTopic } from '@/actions';
import {
  Button,
  ErrorMessage,
  FieldError,
  Input,
  Label,
  Popover,
  Spinner,
  TextArea,
  TextField,
} from '@heroui/react';
import { FormEvent, startTransition, useActionState } from 'react';

export default function CreateTopicForm() {
  const [state, action, isPending] = useActionState(createTopic, {
    errors: {},
  });

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover>
      <Button>Add Topic</Button>
      <Popover.Content className="">
        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="w-96  rounded-2xl p-8 bg-white shadow-sm border border-zinc-200"
        >
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-900">
            Add a new Topic
          </h2>

          <div className="flex flex-col gap-6">
            <TextField isRequired name="name" isInvalid={!!state.errors.name}>
              <Label>Name</Label>
              <Input type="text" />
              <FieldError>{state.errors.name?.join(', ')}</FieldError>
            </TextField>

            <TextField
              isRequired
              name="description"
              isInvalid={!!state.errors.description}
            >
              <Label>Description</Label>
              <TextArea
                id="code"
                className="resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200"
              />
              <FieldError>{state.errors.description?.join(', ')}</FieldError>
            </TextField>
            {state.errors._form && state.errors._form?.length > 0 && (
              <ErrorMessage>{state.errors._form.join(',')}</ErrorMessage>
            )}
          </div>

          <Button
            type="submit"
            isPending={isPending}
            className="flex items-center gap-4 mt-8 w-full cursor-pointer rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
          >
            <span>Add</span>
            {isPending && <Spinner />}
          </Button>
        </form>
      </Popover.Content>
    </Popover>
  );
}
