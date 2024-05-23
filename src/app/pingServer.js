'use server';

import { apiPath } from './Auth';

export default async function pingServer() {
  timeoutPromise(100, fetch(apiPath()));
  timeoutPromise(100, fetch(process.env.CODE_EXECUTION_URL + '/list'));
}

// https://github.com/JakeChampion/fetch/issues/175#issuecomment-216791333
function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('promise timeout'));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}
