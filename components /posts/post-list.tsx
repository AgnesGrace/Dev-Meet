import { PostDataType } from '@/db/posts';
import paths from '@/paths';
import Image from 'next/image';
import Link from 'next/link';

interface IPostListData {
  fetchPostsData: () => Promise<PostDataType[]>;
}
export default async function PostList({ fetchPostsData }: IPostListData) {
  const posts = await fetchPostsData();
  const postList = posts.map((post) => {
    const currentTopicSlug = post.topic.slug;
    if (!currentTopicSlug) {
      throw new Error('The topic slug must be provided');
    }
    if (!post.user || !post.user.name || !post.user.image) {
      throw new Error('User info is required');
    }

    return (
      <div className="p-2 rounded border" key={post.id}>
        <Link href={paths.showPost(currentTopicSlug, post.id)}>
          <div className="flex items-center gap-8">
            <Image
              src={post.user.image}
              alt={post.user.name}
              height={48}
              width={48}
              className="rounded-full"
            />
            <h2 className="text-2xl">{post.title}</h2>
          </div>
          <div className="pl-20">
            <p className="text-xs text-gray-600 dark:text-gray-200">
              Created By: {post.user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-200">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });
  return <div className="space-y-3">{postList}</div>;
}
