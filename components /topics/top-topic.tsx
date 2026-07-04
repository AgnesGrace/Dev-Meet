import { Button, Card, CloseButton } from '@heroui/react';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';

export function TopTopic() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="relative h-36">
        <Image
          src="/pc.jpeg"
          alt="Coding"
          width={600}
          height={600}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs font-medium uppercase tracking-widest opacity-90">
            Featured
          </p>
          <h3 className="mt-1 text-lg font-bold">Join the Discussion</h3>
        </div>
      </div>

      <Card.Description className="space-y-3 p-4">
        Explore trending topics, ask questions, and share your knowledge with
        the community.
        <Button className="w-full">Explore Topics</Button>
      </Card.Description>
    </Card>
  );
}
