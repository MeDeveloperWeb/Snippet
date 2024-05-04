'use client';
import { EditSvg, PlaySvg, SaveSvg, Spinner } from '@/assets/icons';
import supportedLanguages from './data/languages';
import { HeaderButton } from './headerButtons/button';
import {
  handleLanguageChange,
  handleSaveSnippet,
  runSnippet
} from './headerButtons/utils';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

export let handleSaveButton = () => {};

export default function SnippetHeader({
  snippet,
  setSnippet,
  fileIndex,
  setFileIndex,
  fileName,
  setFileRenameStatus,
  executing,
  terminalView,
  setTerminalView,
  webView,
  setWebView
}) {
  const [user, setUser] = useContext(AuthContext);
  const router = useRouter();

  handleSaveButton = async () => {
    let toastId = toast.loading('Saving...');
    let mySnippet = snippet;
    if (snippet._id && snippet.user && snippet.user !== user.id) {
      mySnippet._id = undefined;
      mySnippet.user = undefined;

      toast.info('Forking a copy of snippet into your Account.', {
        position: 'top-center',
        autoClose: 1500
      });
    }
    try {
      const res = await handleSaveSnippet(user, setUser, mySnippet);
      if (res.id) {
        setSnippet({
          ...mySnippet,
          _id: res.id,
          user: res.user
        });
        router.push(`/snippet/${res.id}`);
      }
      toast.update(toastId, {
        render: res.message,
        type: 'success',
        autoClose: 1500,
        isLoading: false
      });
    } catch (error) {
      let { message } = error;
      if (message.includes('Unauthorized')) {
        message = (
          <>
            Please{' '}
            <Link
              href={'/login'}
              target="_blank"
              className="text-blue-300 hover:underline"
            >
              Login
            </Link>{' '}
            to save your snippet!
          </>
        );
      }
      toast.update(toastId, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        position: 'top-center'
      });
    }
  };

  return (
    <div className="card my-2 p-2 flex gap-2 text-start">
      <div className="flex-1 space-x-4 max-w-full overflow-hidden overflow-ellipsis">
        <i>&lt;/&gt;</i>
        <span>{fileName}</span>
      </div>

      <HeaderButton
        colorClass="bg-green-500 text-white"
        text="Rename"
        Svg={EditSvg}
        onClick={() => setFileRenameStatus(true)}
      />

      <HeaderButton
        colorClass="bg-blue-500 text-white"
        text="Run"
        Svg={executing ? Spinner : PlaySvg}
        onClick={() => {
          if (snippet.files.length === 3)
            runSnippet(snippet.files[2].content, 'web');
          else runSnippet(snippet.files[0].content, snippet.files[0].language);

          if (snippet.files.length === 1) setTerminalView(true);
          else if (!terminalView) setWebView(true);
        }}
        disabled={executing}
      />

      <HeaderButton
        colorClass="bg-green-500 text-white"
        text="Save"
        Svg={SaveSvg}
        onClick={handleSaveButton}
      />

      <select
        defaultValue={snippet.files[fileIndex].language}
        onChange={({ target }) => {
          if (webView) setTerminalView(true);
          handleLanguageChange(target.value, setSnippet, setFileIndex);
          router.push(`/snippet?language=${target.value}`);
        }}
        className="pl-1 w-[10ch]"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
