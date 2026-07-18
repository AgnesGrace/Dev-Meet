import FormCreatePost from '@/components /posts/form-create-post';
import PostList from '@/components /posts/post-list';
import { fetchPostsByTopicSlugName } from '@/db/posts';
import { Button } from '@heroui/react';
import Link from 'next/link';

interface TopicDetailsParams {
  params: Promise<{
    nameSlug: string;
  }>;
}
export default async function TopicDetailsPage({ params }: TopicDetailsParams) {
  const { nameSlug } = await params;

  return (
    <section className="flex flex-col gap-4 w-[80vw] mx-auto p-4">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline">← Back</Button>
          </Link>
          <h1>{nameSlug}</h1>
        </div>
        <FormCreatePost nameSlug={nameSlug} />
      </div>
      <PostList fetchPostsData={() => fetchPostsByTopicSlugName(nameSlug)} />
    </section>
  );
}
