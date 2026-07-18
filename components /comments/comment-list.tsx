import { commentByAuthor, getCommentsByPostId } from '@/db/comments';
import ShowComment from './show-comment';

interface ICommentListProp {
  postId: string;
}

export default async function CommentList({ postId }: ICommentListProp) {
  const comments = await getCommentsByPostId(postId);

  const mainParentComments = comments.filter(
    (comment) => comment.parentId === null,
  );
  return (
    <div className="space-y-3">
      <h1>Comments</h1>
      {mainParentComments.map((comment) => {
        return (
          <ShowComment
            key={comment.id}
            commentId={comment.id}
            postId={postId}
          />
        );
      })}
    </div>
  );
}
