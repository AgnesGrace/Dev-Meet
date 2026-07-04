'use client';
import { Topic } from '@/generated/prisma/client';
import paths from '@/paths';
import {
  Avatar,
  Description,
  Label,
  ListBox,
  ListLayout,
  Virtualizer,
} from '@heroui/react';

import { useRouter } from 'next/navigation';

type TopicBoardProps = {
  topics: Topic[];
};

export default function TopicBoard({ topics }: TopicBoardProps) {
  const router = useRouter();
  return (
    <Virtualizer layout={ListLayout}>
      <ListBox
        items={topics}
        onAction={(key) => {
          const topic = topics.find((t) => t.id === key);
          if (topic) {
            router.push(paths.showTopic(topic.slug));
          }
        }}
        className="h-90 w-full overflow-y-auto"
      >
        {(topic) => (
          <ListBox.Item id={topic.id} textValue="Bob" key={topic.id}>
            <Avatar size="sm">
              <Avatar.Fallback className="bg-zinc-500 text-white">
                {topic.slug[0].toUpperCase()}
              </Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <Label>{topic.slug[0].toUpperCase() + topic.slug.slice(1)}</Label>
              <Description>{topic.description.slice(0, 20)}...</Description>
            </div>
          </ListBox.Item>
        )}
      </ListBox>
    </Virtualizer>
  );
}
