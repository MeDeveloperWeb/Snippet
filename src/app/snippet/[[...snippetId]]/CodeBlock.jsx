// 'use client';

// import { useState } from 'react';
// import CodeEditor from './components/CodeEditor';
// import SnippetHeader from './components/SnippetHeader';
// import FileHeader from './components/FileHeader';

// export default function CodeBlock({
//   snippetObj,
//   terminalView,
//   setTerminalView,
//   webView,
//   setWebView
// }) {
//   const [snippet, setSnippet] = useState(snippetObj);
//   const [fileIndex, setFileIndex] = useState(0);
//   const [fileRenameStatus, setFileRenameStatus] = useState(false);

//   const fileNameInput = (
//     <input
//       type="text"
//       name="Snippet Title"
//       aria-label="Snippet Title"
//       value={snippet.title}
//       onInput={({ target }) =>
//         setSnippet({
//           ...snippet,
//           title: target.value
//         })
//       }
//       className={`bg-transparent px-2`}
//       size={snippet.title.length - 5}
//       autoFocus
//       onBlur={() => setFileRenameStatus(false)}
//     />
//   );

//   const fileNameSpan = <span className="w-fit">{snippet.title}</span>;

//   return (
//     <>
//       <SnippetHeader
//         snippet={snippet}
//         setSnippet={setSnippet}
//         fileIndex={fileIndex}
//         fileName={fileRenameStatus ? fileNameInput : fileNameSpan}
//         setFileRenameStatus={setFileRenameStatus}
//       />
//       <div
//         className={`space-x-1 ${snippet.files.length === 1 ? 'lg:hidden' : ''}`}
//       >
//         {snippet.files.map((file, index) => (
//           <FileHeader
//             key={file.language}
//             onClick={() => {
//               setFileIndex(index);
//               setWebView(false);
//               setTerminalView(false);
//             }}
//             disabled={fileIndex === index && !(webView || terminalView)}
//           >
//             {file.language}
//           </FileHeader>
//         ))}
//         {(snippet.files.length === 3
//           ? ['Console', 'Preview']
//           : ['Terminal']
//         ).map((value) => (
//           <FileHeader
//             key={value}
//             onClick={() =>
//               value === 'Preview' ? setWebView(true) : setTerminalView(true)
//             }
//             disabled={value === 'Preview' ? webView : terminalView}
//           >
//             {value}
//           </FileHeader>
//         ))}
//       </div>
//       <CodeEditor
//         snippet={snippet}
//         setSnippet={setSnippet}
//         fileIndex={fileIndex}
//         isVisible={!(webView || terminalView)}
//       />
//     </>
//   );
// }
