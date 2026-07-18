'use client';

import { signInWithGithub, signInWithGoogle, signOutUser } from '@/actions';
import { signOut } from 'next-auth/react';
import {
  Avatar,
  Button,
  Description,
  Dropdown,
  Label,
  Link,
  SearchField,
  Separator,
} from '@heroui/react';
import { EllipsisVertical, LogOut, Pencil } from 'lucide-react';
import { useSession } from 'next-auth/react';
import AppThemeToggle from './themes/app-theme-toggle';

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  let userFallbackText;
  if (user && user.name) {
    userFallbackText = user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((name) => name[0])
      .join('')
      .toUpperCase();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-divider bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        <div className="flex w-1/4 items-center  gap-4">
          <Link
            href="/"
            className="text-xl font-bold text-foreground no-underline"
          >
            Dev Meet
          </Link>
          <AppThemeToggle />
        </div>

        <div className="hidden flex-1 justify-center px-8 md:flex">
          <SearchField className="w-full max-w-lg" name="search">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search topics..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>

        <div className="ml-auto flex w-1/4 justify-end">
          {session.status === 'loading' ? null : user?.email ? (
            <div className="flex items-center gap-8">
              <Avatar size="md">
                <Avatar.Image alt="John Doe" src={user.image || ''} />
                <Avatar.Fallback className="text-lg">
                  {userFallbackText}
                </Avatar.Fallback>
              </Avatar>
              <Dropdown>
                <Button isIconOnly aria-label="Menu" variant="secondary">
                  <EllipsisVertical className="outline-none bg-none" />
                </Button>

                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Section>
                      <Dropdown.Item id="edit-file" textValue="Edit file">
                        <div className="flex h-8 items-start justify-center pt-px">
                          <Pencil className="size-4 shrink-0 text-muted" />
                        </div>
                        <div className="flex flex-col">
                          <Label>Edit </Label>
                          <Description>Make changes</Description>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Section>
                    <Separator />
                    <Dropdown.Section>
                      <Dropdown.Item variant="danger">
                        <div className="flex h-8 items-start justify-center pt-px">
                          <LogOut className="size-4 shrink-0 text-danger" />
                        </div>
                        <div className="flex flex-col">
                          <Button onPress={() => signOut({ callbackUrl: '/' })}>
                            Logout
                          </Button>

                          <Description>Leave for now</Description>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Section>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          ) : (
            <div className="flex items-center gap-4 ">
              <form action={signInWithGithub}>
                <Button type="submit">Login with Github</Button>
              </form>

              <form action={signInWithGoogle}>
                <Button type="submit">Try Google</Button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-divider px-4 py-3 md:hidden">
        <SearchField name="search">
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search topics..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>
    </nav>
  );
}
