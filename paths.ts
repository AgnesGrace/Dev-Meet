const paths = {
  home() {
    return '/';
  },
  showTopic(slug: string) {
    return `/topics/${slug}`;
  },
  createPost(postSlug: string) {
    return `/topics/${postSlug}/new`;
  },
  showPost(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
};

export default paths;
