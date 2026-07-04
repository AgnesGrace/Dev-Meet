import db from '@/db';
import { Topic } from '@/generated/prisma/client';
import { Surface } from '@heroui/react';
import TopicBoard from './topic-board';

export async function TopicList() {
  const topics: Topic[] = await db.topic.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    topics.length > 0 && (
      <Surface className="w-full rounded-3xl shadow-surface bg-zinc-100">
        <TopicBoard topics={topics} />
      </Surface>
    )
  );
}
