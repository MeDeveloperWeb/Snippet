import { AuthContext } from '@/app/AuthContext';
import { useContext, useRef, useState } from 'react';
import runSnippet, { provideInput } from './data/runSnippet';
import { Spinner } from '@/assets/icons';

export let runCode = async () => {};

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
  const [prevData, setPrevData] = useState(
    <span className="text-green-600 pr-2 break-none">
      {username || 'cooluser'}@snippet:-$
    </span>
  );

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

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setPrevData(
        <>
          {prevData}{' '}
          <span>
            {data}
            {'\n'}
          </span>
        </>
      );
      console.log(jobID, 1);
      if (jobID) sendInput(data);
      setData('');
    } else if (e.ctrlKey && e.key === 'c') {
      setPrevData(
        <>
          {prevData}
          {data}^C{'\n'}
          <span className="text-green-600 pr-2 break-none">
            {username || 'cooluser'}@snippet:-$
          </span>
        </>
      );
      setData('');
    }
  };
  return (
    <div
      className={`h-[80vh] card min-w-screen bg-[#fffffe] dark:bg-[#1e1e1e] break-words whitespace-pre-wrap p-2 overflow-y-scroll font-mono ${visibilityClass}`}
      onClick={() => tARef.current?.focus()}
    >
      <span>{prevData}</span>
      <span className="break-words whitespace-pre-wrap">{data}</span>
      <span>
        {executing ? (
          <i>
            <Spinner className="inline animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          </i>
        ) : (
          <textarea
            ref={tARef}
            className="w-[0.8ch] h-[2ch] resize-none focus:bg-white focus:animate-blink opacity-0 overflow-hidden border-0 rounded-none relative scale-125 translate-y-[2px]"
            value={data || ''}
            onKeyUp={handleKeyUp}
            onChange={(e) => setData(e.target.value)}
          ></textarea>
        )}
      </span>
    </div>
  );
}
