import { apiPath } from '@/app/Auth';
import supportedLanguages from './_components/data/languages';
import SnippetView from './_components/SnippetView';
import defaultProgram from './_components/data/defaultProgram';

export default async function Snippet({ params, searchParams }) {
  const { snippetId } = params || { snippetId: '' };
  const { language } = searchParams;

  let snippet;
  let snippetSet = false;

  if (snippetId) {
    try {
      const response = await fetch(apiPath(`/snippet/get/${snippetId}`));

      if (response.ok) {
        snippet = await response.json();
        snippetSet = true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!snippetSet) {
    if (language === 'web') {
      const content = defaultProgram.web();
      snippet = {
        title: 'Untitled',
        files: [
          {
            content: content.html,
            language: 'html'
          },
          {
            content: content.css,
            language: 'css'
          },
          {
            content: content.js,
            language: 'javascript'
          }
        ]
      };
    } else if (supportedLanguages.includes(language)) {
      snippet = {
        title: 'Untitled',
        files: [
          {
            content: defaultProgram[language](),
            language: language
          }
        ]
      };
    } else {
      snippet = {
        title: 'Untitled',
        files: [
          {
            content: defaultProgram[supportedLanguages[0]](),
            language: supportedLanguages[0]
          }
        ]
      };
    }
  }

  return (
    <section className="flex-1 flex flex-wrap gap-4 p-1 md:p-2 lg:p-4 space-x-4">
      <SnippetView snippet={snippet} />
    </section>
  );
}
