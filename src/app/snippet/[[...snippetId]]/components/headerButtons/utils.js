import { runCode } from '../Terminal';
import defaultProgram from '../data/defaultProgram';
import { injectJSInWebPreview } from '../WebView';
import languages from '../data/languageToExt';
import { getUserAuthDetails } from '@/app/Auth';
import saveSnippet from '../../actions';

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
  let res;

  try {
    res = await saveSnippet(snippet, user.access);
    return res;
  } catch (err) {
    if (err.code === 401) {
      const reValidatedUser = await getUserAuthDetails();
      if (!reValidatedUser.access) throw Error('Unauthorized');
      setUser(await getUserAuthDetails());

      res = await saveSnippet(snippet, reValidatedUser.access);
      return res;
    } else throw err;
  }
}
