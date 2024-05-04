'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import SnippetGridItems from './SnippetGrid';
import getUserSnippets from './actions';
import { Spinner } from '@/assets/icons';
import { useInView } from 'react-intersection-observer';

function useSnippets(username, offset, limit, initSnippets = []) {
  const [snippets, setSnippets] = useState(initSnippets.slice(0, offset));
  const startIndexRef = useRef(offset);

  const hasMoreSnippets = useRef(initSnippets.length === limit);

  const getNewSnippets = useCallback(async () => {
    const startIndex = startIndexRef.current;

    const newSnippets = await getUserSnippets(username, startIndex, limit);

    startIndexRef.current += limit;
    hasMoreSnippets.current = newSnippets.length === limit;

    setSnippets((prevSnippets) => [
      ...prevSnippets,
      ...newSnippets.slice(0, limit - 1)
    ]);
  }, [limit, username]);

  const removeSnippet = (id) =>
    setSnippets(snippets.filter(({ _id }) => _id !== id));

  return { snippets, getNewSnippets, hasMoreSnippets, removeSnippet };
}

export default function UserSnippets({
  username,
  offset,
  limit,
  snippets: initSnippets
}) {
  const { snippets, getNewSnippets, hasMoreSnippets, removeSnippet } =
    useSnippets(username, offset, limit, initSnippets);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      getNewSnippets();
    }
  }, [inView, getNewSnippets]);

  return (
    <>
      <SnippetGridItems snippets={snippets} removeSnippet={removeSnippet} />

      {hasMoreSnippets.current && (
        <div
          ref={ref}
          className="col-start-1 col-span-full justify-self-center h-full mb-4"
        >
          <Spinner
            height={50}
            width={50}
            innerColorClass="text-[rgb(var(--background-end-rgb))]"
          />
        </div>
      )}
    </>
  );
}
