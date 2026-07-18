import CommentList from '@/components /comments/comment-list';
import FormCreateComment from '@/components /comments/form-create-comment';
import ShowPost from '@/components /posts/show-post';
import { getCommentsByPostId } from '@/db/comments';
import paths from '@/paths';
import { Button } from '@heroui/react';
import Link from 'next/link';

interface IPostDetailsProp {
  params: Promise<{
    postId: string;
    nameSlug: string;
  }>;
}
export default async function PostDetailsPage({ params }: IPostDetailsProp) {
  const { nameSlug, postId } = await params;
  return (
    <div className="w-[80vw] mx-auto p-4">
      <Link href={paths.showTopic(nameSlug)}>
        <Button>← Back</Button>
      </Link>
      <section className="border mt-4 p-4">
        <ShowPost postId={postId} />
        <FormCreateComment postId={postId} parentPostId={postId} />
        <CommentList postId={postId} />
      </section>
    </div>
  );
}
