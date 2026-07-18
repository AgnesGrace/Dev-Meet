'use client';
import { createComment } from '@/actions';
import {
  Button,
  ErrorMessage,
  FieldError,
  Label,
  TextArea,
  TextField,
} from '@heroui/react';
import { useActionState, useEffect, useRef, useState } from 'react';

interface IFormCreateProps {
  postId: string;
  parentPostId: string;
}
export default function FormCreateComment({
  postId,
  parentPostId,
}: IFormCreateProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLFormElement | null>(null);

  const [formState, formAction, isPending] = useActionState(
    createComment.bind(null, { postId, parentPostId }),
    { errors: {} },
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
    }
  }, [formState]);

  const form = (
    <form
      action={formAction}
      ref={ref}
      className="w-[60%] flex flex-col gap-4 p-8 bg-white shadow-sm border border-zinc-200 rounded-2xl "
    >
      <div className="flex flex-col gap-6">
        <TextField isRequired isInvalid={!!formState.errors.content}>
          <Label className="dark:text-zinc-900">Content</Label>
          <TextArea
            id="content"
            name="content"
            className="resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200"
          />
          <FieldError>{formState.errors.content?.join(', ')}</FieldError>
        </TextField>
        {formState.errors._form && formState.errors._form?.length > 0 && (
          <ErrorMessage>{formState.errors._form.join(',')}</ErrorMessage>
        )}

        <Button type="submit" isPending={isPending}>
          Create
        </Button>
      </div>
    </form>
  );
  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4"
      >
        Reply now!
      </Button>
      {isOpen && form}
    </div>
  );
}
