'use client';

import { AuthContext } from '@/app/AuthContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { sendInput, socket } from './data/socket';

export let runCode = async () => {};

export let addDataInTerminal = () => {};

export function useTerminal(username) {
  const initSpan = (
    <>
      <span className="pr-2 break-none">
        <span className="text-green-500">{username || 'cooluser'}@snippet</span>
        <span>:</span>
        <span className="text-green-500">~</span>
        <span>$</span>
      </span>
    </>
  );
  const [terminalData, setTerminalData] = useState(initSpan);
  const addTerminalData = (data, newLine = false, isError = false) => {
    setTerminalData(
      <>
        {terminalData}
        {isError ? (
          <span
            style={{
              color: 'red'
            }}
          >
            {data}
          </span>
        ) : (
          <span>{data}</span>
        )}
        {newLine && (
          <>
            {'\n'}
            {initSpan}
          </>
        )}
      </>
    );
  };
  const clearTerminalData = () => setTerminalData(initSpan);

  return { terminalData, addTerminalData, clearTerminalData };
}

export default function Terminal({
  visibilityClass,
  executing,
  setExecStatus
}) {
  const [{ username }, _] = useContext(AuthContext);
  const tARef = useRef(null);

  const [data, setData] = useState('');

  const { terminalData, addTerminalData, clearTerminalData } =
    useTerminal(username);

  addDataInTerminal = addTerminalData;

  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      console.log('User Connected');
      setIsSocketConnected(true);
    };

    const onDisconnect = (reason) => {
      console.log('Disconnected due to ' + reason);
      setIsSocketConnected(false);
      setExecStatus(false);

      socket.connect();
    };

    const onError = ({ error, executionStatus }) => {
      addTerminalData(error + '\n', false, true);
      tARef.current?.scrollIntoView(true);
    };

    const onOutput = ({ output, executionStatus }) => {
      addTerminalData(output, !executionStatus);
      tARef.current?.scrollIntoView(true);
    };

    const onExit = () => {
      addTerminalData('', true);
      console.log('process over');
      setExecStatus(false);
    };

    if (!isSocketConnected) socket.connect();

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('error', onError);

    socket.on('output', onOutput);

    socket.on('exit', onExit);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

      socket.off('error', onError);

      socket.off('output', onOutput);

      socket.off('exit', onExit);
    };
  }, [addTerminalData, isSocketConnected, setExecStatus]);

  runCode = async (code, language) => {
    if (!code) return;
    socket.emit('code', {
      code,
      language
    });
    setExecStatus(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTerminalData(data + '\n');
      if (executing && data) {
        sendInput(data.trim());
      }
      setData('');
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();

      addTerminalData(data + '^C\n', true);
      setExecStatus(false);
      setData('');
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();

      if (executing) return;

      clearTerminalData();
      setData('');
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft')
      // Don't allow user to move cursor position
      e.preventDefault();
  };
  return (
    <div
      className={`terminal-scroll h-[80vh] card min-w-screen bg-[#4d103a] dark:bg-[#300a24] lg:ml-2 text-white break-words whitespace-pre-wrap p-2 overflow-y-scroll font-mono ${visibilityClass} border-none border-0 border-transparent`}
      onClick={() => tARef.current?.focus()}
    >
      <span>{terminalData}</span>
      <span className="break-words whitespace-pre-wrap">{data}</span>
      <span>
        <textarea
          ref={tARef}
          className="w-[0.8ch] h-[2ch] resize-none focus:bg-white focus:animate-blink opacity-0 overflow-hidden border-0 rounded-none relative scale-125 translate-y-[2px] outline-none"
          value={data || ''}
          onKeyDown={handleKeyDown}
          onChange={(e) => setData(e.target.value)}
        ></textarea>
      </span>
    </div>
  );
}
