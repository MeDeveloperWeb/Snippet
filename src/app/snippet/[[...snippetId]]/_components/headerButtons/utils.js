import { runCode } from '../Terminal';
import defaultProgram from '../data/defaultProgram';
import { injectJSInWebPreview } from '../WebView';
import languages from '../data/languageToExt';
import { isRevalidationRequired } from '@/app/Auth';
import saveSnippet from '../../actions';
import { getRevalidatedUser, revalidateAuthentication } from '@/app/actions';

export function runSnippet(content, language) {
  if (language === 'web') {
    injectJSInWebPreview(content);
    return;
  }
  runCode(content, languages[language]);
}

export function handleLanguageChange(value, setSnippet, setFileIndex) {
  setSnippet({
    title: 'Untitled',
    files:
      value === 'web'
        ? [
            {
              content: defaultProgram.web().html,
              language: 'html'
            },
            {
              content: defaultProgram.web().css,
              language: 'css'
            },
            {
              content: defaultProgram.web().js,
              language: 'javascript'
            }
          ]
        : [
            {
              content: defaultProgram[value](),
              language: value
            }
          ]
  });
  if (value !== 'web') setFileIndex(0);
}

export async function handleSaveSnippet(user, setUser, snippet) {
  if (!user.username || !user.id) {
    return {
      error: 'Unauthorized',
      errorCode: 401
    };
  }

  let userData = user;

  // If user doesn't have access or user access is expiring in less than 30 seconds
  if (isRevalidationRequired(user.access)) {
    userData = await getRevalidatedUser();

    setUser({
      access: userData?.access || undefined,
      username: userData?.username || undefined,
      id: userData?.id || undefined
    });

    if (!userData || userData.error) return { error: userData.error };
  }

  const res = await saveSnippet(snippet, userData.access);

  return res;
}
