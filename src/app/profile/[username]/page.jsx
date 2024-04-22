import { apiPath } from '@/app/Auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function Profile({ params }) {
  const { username } = params;
  const response = await fetch(apiPath(`/snippet/user/${username}`), {
    next: {
      tags: [`profile-${username}`]
    }
  });

  const snippets = await response.json();

  return (
    <section title="User Profile" className="m-4 mt-8">
      <div className="flex flex-wrap items-center justify-between gap-8 md:gap-16 w-max mx-auto my-0 p-4 pr-8 md:pr-16 card">
        <Image
          src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
          alt={`${username}'s profile`}
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="text-xl max-w-[400px]">{username}</h1>
      </div>

      <section>
        <h1 className="my-2 text-2xl">Snippets</h1>
        <hr />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
          {snippets.map((snippet) => (
            <Link
              href={`/snippet/${snippet._id}`}
              key={snippet._id}
              className="card p-4 hover:shadow-none"
            >
              <Image
                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                height={400}
                width={400}
                alt={snippet.title}
              ></Image>

              <p className="text-center mt-2 mx-2">{snippet.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
