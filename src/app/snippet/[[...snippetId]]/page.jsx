import { apiPath } from '@/app/Auth';
import supportedLanguages from './components/data/languages';
import SnippetView from './components/SnippetView';

export default async function Snippet({ params }) {
  const { snippetId } = params || { snippetId: '' };

  let snippet = {
    title: 'Untitled',
    files: [
      {
        content: '',
        language: supportedLanguages[0]
      }
    ]
  };

  if (params) {
    try {
      const response = await fetch(apiPath(`/snippet/get/${snippetId}`), {
        next: {
          tags: [`snippet-${snippetId}`]
        }
      });

      if (response.ok) snippet = await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="flex-1 flex flex-wrap gap-4 p-1 md:p-2 lg:p-4 space-x-4">
      <SnippetView snippet={snippet} />
    </section>
  );
}
