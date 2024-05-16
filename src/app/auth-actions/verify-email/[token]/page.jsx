import { apiPath } from '@/app/Auth';
import { notFound } from 'next/navigation';

export default async function EmailVerificationPage({ params }) {
  const { token } = params;

  if (!token) return notFound();

  const response = await fetch(apiPath(`/users/verify-email/${token}`));

  const data = await response.json();

  return (
    <>
      <h1 className="text-center">
        {data.error || data.message} Please close this window.
      </h1>
    </>
  );
}
