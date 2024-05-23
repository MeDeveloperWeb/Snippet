'use client';

import { useState } from 'react';
import SnippetHeader from './SnippetHeader';
import CodeEditor from './CodeEditor';
import TabSwitcher from './TabSwitcher';
import Terminal from './Terminal';
import WebPreview from './WebView';

export default function SnippetView(props) {
  const [terminalView, setTerminalView] = useState(false);
  const [webView, setWebView] = useState(false);
  const [snippet, setSnippet] = useState(props.snippet);
  const [fileIndex, setFileIndex] = useState(0);
  const [fileRenameStatus, setFileRenameStatus] = useState(false);
  const [executing, setExecStatus] = useState(false);

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
      className={`bg-transparent px-2 max-w-[16ch]`}
      size={snippet.title.length - 5}
      autoFocus
      onBlur={() => setFileRenameStatus(false)}
    />
  );

  const fileNameSpan = <span className="w-fit">{snippet.title}</span>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
      <SnippetHeader
        snippet={snippet}
        setSnippet={setSnippet}
        fileIndex={fileIndex}
        setFileIndex={setFileIndex}
        fileName={fileRenameStatus ? fileNameInput : fileNameSpan}
        setFileRenameStatus={setFileRenameStatus}
        executing={executing}
        terminalView={terminalView}
        webView={webView}
        setTerminalView={setTerminalView}
        setWebView={setWebView}
      />
      <div className="card m-2 p-2 hidden lg:block">Terminal</div>
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
          executing={executing}
          setExecStatus={setExecStatus}
        />
        {snippet.files.length === 3 && (
          <WebPreview viewClass={webView ? '' : 'hidden'} snippet={snippet} />
        )}
      </div>
    </div>
  );
}
