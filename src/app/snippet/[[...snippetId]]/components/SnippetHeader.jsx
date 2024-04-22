import { EditSvg, PlaySvg, SaveSvg } from '@/assets/icons';
import supportedLanguages from './data/languages';
import { runCode } from './Terminal';

export default function SnippetHeader({
  snippet,
  setSnippet,
  fileIndex,
  setFileIndex,
  fileName,
  setFileRenameStatus
}) {
  return (
    <div className="card my-2 p-2 flex gap-2">
      <div className="flex-1 space-x-4 max-w-full overflow-hidden overflow-ellipsis">
        <i>&lt;/&gt;</i>
        <span>{fileName}</span>
      </div>
      <button
        className="px-2 rounded-lg bg-green-500 text-white flex gap-2"
        onClick={() => setFileRenameStatus(true)}
      >
        <EditSvg className="h-4 w-4 self-center" />
        <span className="hidden md:inline lg:hidden xl:inline">Rename</span>
      </button>
      <button className="px-2 rounded-lg bg-green-500 text-white flex gap-2">
        <SaveSvg className="h-4 w-4 self-center" />
        <span className="hidden md:inline lg:hidden xl:inline">Save</span>
      </button>
      <button
        className="px-2 rounded-lg bg-blue-500 text-white flex gap-2"
        onClick={async () =>
          await runCode(snippet.files[0].content, snippet.files[0].language)
        }
      >
        <PlaySvg className="h-4 w-4 self-center" />
        <span className="hidden md:inline lg:hidden xl:inline">Run</span>
      </button>
      <select
        defaultValue={snippet.files[fileIndex].language}
        onChange={({ target }) => {
          setSnippet({
            ...snippet,
            files:
              target.value === 'web'
                ? [
                    {
                      content: '',
                      language: 'html'
                    },
                    {
                      content: '',
                      language: 'css'
                    },
                    {
                      content: snippet.files[0].content,
                      language: 'javascript'
                    }
                  ]
                : snippet.files.length === 3
                  ? [
                      {
                        content: snippet.files[2].content,
                        language: target.value
                      }
                    ]
                  : [
                      {
                        content: snippet.files[0].content,
                        language: target.value
                      }
                    ]
          });
          if (target.value !== 'web') setFileIndex(0);
        }}
        className="pl-1 w-[10ch]"
      >
        <option disabled defaultChecked>
          Select Language
        </option>
        {supportedLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
