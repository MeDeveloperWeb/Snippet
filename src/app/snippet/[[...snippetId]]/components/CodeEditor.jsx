import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import loading from '@/assets/loading.gif';
import Image from 'next/image';
import { useRef } from 'react';

export default function CodeEditor({
  snippet,
  setSnippet,
  fileIndex,
  isVisible
}) {
  const { theme } = useTheme();

  return (
    <div className={`w-full ${isVisible ? 'block' : 'hidden'} lg:block`}>
      <Editor
        height="80vh"
        language={snippet.files[fileIndex].language}
        value={snippet.files[fileIndex].content}
        onChange={(value) =>
          setSnippet({
            ...snippet,
            files: snippet.files.map((file, index) =>
              index === fileIndex ? { ...file, content: value } : { ...file }
            )
          })
        }
        theme={theme === 'light' ? 'light' : 'vs-dark'}
        loading={
          snippet.files[fileIndex].content ? (
            <pre>
              <code>{snippet.files[fileIndex].content}</code>
            </pre>
          ) : (
            <Image src={loading} alt="Loading" />
          )
        }
        path={fileIndex}
      />
    </div>
  );
}
