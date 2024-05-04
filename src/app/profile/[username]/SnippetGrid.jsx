import languageIcons from '@/assets/languageIcons';
import Image from 'next/image';
import Link from 'next/link';
import DeleteSnippetBtn from './DeleteSnippet';

export default function SnippetGridItems({ snippets, ...otherProps }) {
  return (
    <>
      {snippets.map((snippet) => (
        <Link
          href={`/snippet/${snippet._id}`}
          key={snippet._id}
          className="card p-4 hover:shadow-none flex flex-col"
        >
          <div className="flex-1">
            <Image
              src={
                snippet.files.length === 3
                  ? languageIcons.web
                  : languageIcons[snippet.files[0].language]
              }
              height={400}
              width={400}
              alt={snippet.title}
            ></Image>
          </div>

          <div className="flex justify-between mt-2">
            <p className="text-center flex-1">{snippet.title}</p>
            <DeleteSnippetBtn
              title={snippet.title}
              id={snippet._id}
              userId={snippet.user}
              {...otherProps}
            />
          </div>
        </Link>
      ))}
    </>
  );
}
