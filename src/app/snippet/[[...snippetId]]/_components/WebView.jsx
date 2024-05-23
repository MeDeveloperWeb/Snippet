'use client';
import { useEffect, useRef, useState } from 'react';
import { addDataInTerminal } from './Terminal';

export let injectJSInWebPreview = (code) => {};

export default function WebPreview({ viewClass, snippet }) {
  const { title, files } = snippet;
  const iRef = useRef();
  const [js, setJS] = useState('');

  injectJSInWebPreview = (code) => {
    const newCode = `try{${code}}catch(err){console.error(err)};`;
    const iframe = iRef.current;
    iframe.contentWindow.eval(newCode);
  };

  useEffect(() => {
    const iframe = iRef.current;
    function overrideConsoleMethods() {
      if (!iframe) return;

      ['log', 'warn', 'error', 'info', 'debug'].forEach((method) => {
        iframe.contentWindow.console[method] = function (...args) {
          // Convert arguments to array and join them into a string
          console[method].apply(console, args);

          let terminalData = '';

          if (method === 'error') {
            for (const error of args) {
              terminalData += error.toString() + '\n';
            }
          } else {
            for (const log of args) {
              terminalData += JSON.stringify(log) + '\n';
            }
          }
          // Get the line number dynamically
          const lineNumber = new Error().stack.split('\n')[2].split(':')[2];
          // Append log message with line number to logContainer
          addDataInTerminal(
            `${method.toUpperCase()} - Line ${lineNumber}: ${terminalData}\n`,
            true,
            method === 'error'
          );
        };
      });
    }
    overrideConsoleMethods();
  }, []);
  return (
    <div
      className={`h-[80vh] card min-w-screen bg-[#fffffe] dark:bg-[#1e1e1e] ${viewClass}`}
    >
      <iframe
        className="w-full h-full"
        ref={iRef}
        // src="https://tailwindcss.com/docs/grid-row"
        frameBorder="0"
        srcDoc={`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body><style>${files[1].content}</style>${files[0].content}</body></html>`}
      ></iframe>
    </div>
  );
}
