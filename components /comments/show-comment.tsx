import Image from 'next/image';
import FormCreateComment from './form-create-comment';
import { getCommentsByPostId } from '@/db/comments';

interface IShowCommentProp {
  commentId: string;
  postId: string;
  depth?: number;
}
export default async function ShowComment({
  commentId,
  postId,
  depth = 0,
}: IShowCommentProp) {
  const comments = await getCommentsByPostId(postId);
  const comment = comments.find((comment) => commentId === comment.id);
  if (!comment) return null;

  const commentChildren = comments.filter(
    (comment) => comment.parentId === commentId,
  );

  const childrenRendered = commentChildren.map((child) => {
    return (
      <ShowComment
        key={child.id}
        commentId={child.id}
        postId={postId}
        depth={depth + 1}
      />
    );
  });
  return (
    <div>
      <div className="flex gap-4 pt-4">
        <Image
          src={comment.user.image || ''}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <FormCreateComment
            postId={comment.postId}
            parentPostId={comment.id}
          />
        </div>
      </div>
      <div
        className={`${depth === 0 ? '' : 'border border-gray-200 pl-4 ml-10'}`}
      >
        {childrenRendered}
      </div>
    </div>
  );
}
