export default async function runSnippet(code, language) {
  try {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json'
    };

    const bodyContent = JSON.stringify({
      code,
      language
    });

    const response = await fetch('/execute', {
      method: 'POST',
      body: bodyContent,
      headers: headersList
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function provideInput(input, jobID) {
  try {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json'
    };

    const bodyContent = JSON.stringify({
      input
    });

    const response = await fetch(`/execute/${jobID}`, {
      method: 'POST',
      body: bodyContent,
      headers: headersList
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
