import Profile from '@/components /profile';
import CreateTopicForm from '@/components /topics/create-topic-form';
import { TopTopic } from '@/components /topics/top-topic';
import { TopicList } from '@/components /topics/topic-list';

export default async function Home() {
  return (
    <div className="grid md:grid-cols-4 gap-4 p-4">
      <div className="col-span-3 order-2">
        <h1 className="text-xl">Today&apos;s Top Posts</h1>
      </div>
      <div className="flex flex-col gap-4 ">
        <CreateTopicForm />
        <TopicList />
        <TopTopic />
      </div>
    </div>
  );
}
