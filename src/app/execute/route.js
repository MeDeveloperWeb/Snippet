'use server';

import languages from './languageToExt';

export async function POST(req) {
  try {
    const body = await req.json();
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json'
    };

    const bodyContent = JSON.stringify({
      code: body.code,
      language: languages[body.language]
    });

    const response = await fetch(process.env.CODE_EXECUTION_URL, {
      method: 'POST',
      body: bodyContent,
      headers: headersList
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({
      error: 'No Data Received',
      status: '500'
    });
  }
}
