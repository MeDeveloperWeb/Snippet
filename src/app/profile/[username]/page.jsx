'use server';

import Image from 'next/image';
import coverImage from '@/assets/cover.jpeg';
import languageIcons from '@/assets/languageIcons';
import getUserSnippets from './actions';
import UserSnippets from './UserSnippets';
import SnippetGridItems from './SnippetGrid';

export default async function Profile({ params }) {
  const { username } = params;

  const limit = 15;

  const snippets = await getUserSnippets(username, 0, 15);

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-rows-4 h-[30vh] lg:h-[40vh]">
        <div
          className="row-start-1 row-span-3 col-start-1 col-span-full border-solid border-0 border-current border-b-2"
          style={{
            backgroundImage: `url(${coverImage.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPositionX: 'center'
          }}
        ></div>
        <Image
          src={`https://api.multiavatar.com/${username}.svg`}
          alt={`${username}'s profile`}
          width={140}
          height={140}
          className="border-solid border-2 rounded-full mx-4 md:ml-12 row-start-3 row-span-2 col-start-1 self-center justify-self-end"
        />
        <h1 className="row-start-3 col-start-2 col-span-full self-end text-white text-4xl font-outline font-black">
          {username}
        </h1>
        <h3 className="row-start-4 col-start-2 col-span-full">User Email</h3>
      </div>

      <section>
        <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 max-w-[1280px] gap-4 md:gap-8 xl:gap-8 p-4 my-0 mx-auto">
          {snippets.length === limit && (
            <UserSnippets
              offset={limit - 1}
              username={username}
              limit={limit}
              snippets={snippets}
            />
          )}
        </div>
      </section>
    </section>
  );
}
