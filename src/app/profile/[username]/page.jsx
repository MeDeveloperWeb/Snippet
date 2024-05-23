'use server';

import getUserSnippets from './actions';
import UserSnippets from './UserSnippets';

export default async function Profile({ params }) {
  const { username } = params;

  const limit = 15;

  const snippets = await getUserSnippets(username, 0, 15);

  return (
    <section>
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 max-w-[1280px] gap-4 md:gap-8 xl:gap-8 p-4 my-0 mx-auto">
        <UserSnippets
          offset={limit - 1}
          username={username}
          limit={limit}
          snippets={snippets}
        />
      </div>
    </section>
  );
}
