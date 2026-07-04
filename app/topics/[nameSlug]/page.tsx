import FormCreatePost from '@/components /posts/form-create-post';

interface TopicDetailsParams {
  params: Promise<{
    nameSlug: string;
  }>;
}
export default async function TopicDetailsPage({ params }: TopicDetailsParams) {
  const { nameSlug } = await params;
  console.log(nameSlug);
  return (
    <section className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1>{nameSlug}</h1>
      </div>
      <aside>
        <FormCreatePost />
      </aside>
    </section>
  );
}
