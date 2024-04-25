'use client';

import { AuthContext } from '@/app/AuthContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { sendInput, socket } from './data/socket';

export let runCode = async () => {};

function useTerminal(username) {
  const [prevData, setPrevData] = useState(
    <span className="text-green-600 pr-2 break-none">
      {username || 'cooluser'}@snippet:-$
    </span>
  );
  const insertDataInTerminal = (data, newLine = false, isError = false) => {
    setPrevData(
      <>
        {prevData}
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
          <span className="text-green-600 pr-2 break-none">
            {username || 'cooluser'}@snippet:-$
          </span>
        )}
      </>
    );
  };

  return [prevData, insertDataInTerminal];
}

export default function Terminal({
  data,
  setData,
  visibilityClass,
  jobID,
  setJobID
}) {
  const [{ username }, _] = useContext(AuthContext);
  const tARef = useRef(null);

  const [executing, setExecStatus] = useState(false);
  const [terminalData, addTerminalData] = useTerminal(username);

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
    };

    const onError = ({ error, executionStatus }) => {
      addTerminalData(error + '\n', executionStatus, true);
    };

    const onOutput = ({ output, executionStatus }) => {
      console.log(output);
      addTerminalData(output, !executionStatus);
    };

    const onExit = ({ output, error }) => {
      // addTerminalData(output + '\n', executionStatus);
      addTerminalData('', true);
      console.log('process over');
      setExecStatus(false);
    };

    if (socket.connected) {
      onConnect();
    }

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
  }, [addTerminalData]);

  const insertOutputInTerminal = () => {
    setPrevData((data) => (
      <>
        {prevData}
        <span>{data}</span>
      </>
    ));
  };

  runCode = async (code, language) => {
    socket.emit('code', {
      code,
      language
    });

    setExecStatus(true);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      addTerminalData(data + '\n');
      if (executing) {
        sendInput(data.trim());
      }
      setData('');
    } else if (e.ctrlKey && e.key === 'c') {
      addTerminalData(data + '^C\n', true);
      setData('');
    }
  };
  return (
    <div
      className={`h-[80vh] card min-w-screen bg-[#fffffe] dark:bg-[#1e1e1e] break-words whitespace-pre-wrap p-2 overflow-y-scroll font-mono ${visibilityClass}`}
      onClick={() => tARef.current?.focus()}
    >
      <span>{terminalData}</span>
      <span className="break-words whitespace-pre-wrap">{data}</span>
      <span>
        <textarea
          ref={tARef}
          className="w-[0.8ch] h-[2ch] resize-none focus:bg-white focus:animate-blink opacity-0 overflow-hidden border-0 rounded-none relative scale-125 translate-y-[2px]"
          value={data || ''}
          onKeyUp={handleKeyUp}
          onChange={(e) => setData(e.target.value)}
        ></textarea>
      </span>
    </div>
  );
}

/*********************************************************************************************
  runCode = async (code, language) => {
    const data = await runSnippet(code, language);
    console.log(data);
    if (data.status != 200) {
      setPrevData(
        <>
          {prevData}{' '}
          <span style={{ color: 'red' }}>
            {'Something Went Wrong. Please Try Again'}
            {'\n'}
          </span>
          <span className="text-green-600 pr-2 break-none">
            {username || 'cooluser'}@snippet:-$
          </span>
        </>
      );
      setData('');
      return;
    }

    if (data.error) {
      setPrevData(
        <>
          {prevData}{' '}
          <span style={{ color: 'red' }}>
            {data.error}
            {'\n'}
          </span>
          <span className="text-green-600 pr-2 break-none">
            {username || 'cooluser'}@snippet:-$
          </span>
        </>
      );
      return;
    }

    if (data.complete) {
      setPrevData(
        <>
          {prevData}{' '}
          <span>
            {data.output}
            {'\n'}
          </span>
          <span className="text-green-600 pr-2 break-none">
            {username || 'cooluser'}@snippet:-$
          </span>
        </>
      );
      return;
    }

    setJobID(data.jobID);

    if (data.output) {
      setPrevData(
        <>
          {prevData} <span>{data.output}</span>
        </>
      );
      return;
    }
  };

  const sendInput = async (input) => {
    if (!jobID || !input) return;
    const data = await provideInput(input.trim(), jobID);
    console.log(prevData + 'pp');
    if (data.status !== 200) {
      setPrevData(
        <>
          {prevData}
          {input}
          {'\n'}
          <span style={{ color: 'red' }}>
            Something Went Wrong. Please Try Again
          </span>
          {'\n'}
          <span className="text-green-600 pr-2 break-none">
            {username || 'cooluser'}@snippet:-$
          </span>
        </>
      );
      setJobID('');
      return;
    }
    console.log(data.complete);

    if (data.error) {
      setPrevData(
        <>
          {prevData} {input}
          {'\n'}
          <span style={{ color: 'red' }}>
            {data.error}
            {'\n'}
          </span>
          <span className="text-green-600 pr-2 break-none">
            {username || 'cooluser'}@snippet:-$
          </span>
        </>
      );
      setJobID('');
      return;
    }

    if (data.complete) {
      setPrevData(
        <>
          {prevData}
          {input}
          {'\n'}
          <span>
            {data.output}
            {'\n'}
          </span>
          <span className="text-green-600 pr-2 break-none">
            {username || 'cooluser'}@snippet:-$
          </span>
        </>
      );
      setJobID('');
      return;
    }

    if (data.output) {
      setPrevData(
        <>
          {prevData} {input}
          {'\n'} <span>{data.output}</span>
        </>
      );
      return;
    }
  }; 
 */
