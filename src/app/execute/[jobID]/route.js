'use server';

export async function POST(req, { params: { jobID } }) {
  try {
    const body = await req.json();
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json'
    };

    const bodyContent = JSON.stringify({
      input: body.input
    });

    const response = await fetch(
      `${process.env.CODE_EXECUTION_URL}/${jobID}`,
      {
        method: 'POST',
        body: bodyContent,
        headers: headersList
      },
      1000
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({
      error: 'No Data Received',
      status: 500
    });
  }
}
