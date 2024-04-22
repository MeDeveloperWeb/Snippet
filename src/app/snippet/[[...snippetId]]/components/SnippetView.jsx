'use client';

import { useContext, useState } from 'react';
import SnippetHeader from './SnippetHeader';
import CodeEditor from './CodeEditor';
import TabSwitcher from './TabSwitcher';
import { AuthContext } from '@/app/AuthContext';
import Terminal from './Terminal';

export default function SnippetView(props) {
  const [terminalView, setTerminalView] = useState(false);
  const [webView, setWebView] = useState(false);
  const [snippet, setSnippet] = useState(props.snippet);
  const [fileIndex, setFileIndex] = useState(0);
  const [fileRenameStatus, setFileRenameStatus] = useState(false);

  const [terminalData, setTerminalData] = useState('');
  const [jobID, setJobID] = useState('');

  const fileNameInput = (
    <input
      type="text"
      name="Snippet Title"
      aria-label="Snippet Title"
      value={snippet.title}
      onInput={({ target }) =>
        setSnippet({
          ...snippet,
          title: target.value
        })
      }
      className={`bg-transparent px-2`}
      size={snippet.title.length - 5}
      autoFocus
      onBlur={() => setFileRenameStatus(false)}
    />
  );

  const fileNameSpan = <span className="w-fit">{snippet.title}</span>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4 w-full">
      <SnippetHeader
        snippet={snippet}
        setSnippet={setSnippet}
        fileIndex={fileIndex}
        setFileIndex={setFileIndex}
        fileName={fileRenameStatus ? fileNameInput : fileNameSpan}
        setFileRenameStatus={setFileRenameStatus}
      />
      <div className="card my-2 p-2 hidden lg:block">Terminal</div>
      <TabSwitcher
        terminalView={terminalView}
        setTerminalView={setTerminalView}
        webView={webView}
        setWebView={setWebView}
        fileIndex={fileIndex}
        setFileIndex={setFileIndex}
        files={snippet.files}
      />
      <CodeEditor
        snippet={snippet}
        setSnippet={setSnippet}
        fileIndex={fileIndex}
        isVisible={!(webView || terminalView)}
      />
      <div>
        <Terminal
          visibilityClass={`${terminalView ? '' : 'hidden'} ${!webView ? 'lg:block' : ''}`}
          data={terminalData}
          setData={setTerminalData}
          jobID={jobID}
          setJobID={setJobID}
        />
        {snippet.files.length === 3 && (
          <div
            className={`h-[80vh] card min-w-screen ${webView ? '' : 'hidden'} bg-[#fffffe] dark:bg-[#1e1e1e]`}
          >
            <iframe
              src="https://tailwindcss.com/docs/grid-row"
              frameBorder="0"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
