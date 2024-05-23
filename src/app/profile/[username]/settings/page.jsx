import Link from 'next/link';
import { getUser } from '../actions';
import InputField from './InputField';
import { changeEmail, reqPasswordChange, reqVerification } from './actions';
import Button from './Button';
import { cookies } from 'next/headers';
import { fetchUserFromRefresh } from '@/app/refreshUser';

export default async function Settings({ params }) {
  const { username } = params;

  const NotAuthorized = (
    <h1 className="flex justify-center">
      You are Unauthorized to view this page. Please
      <Link href="/login" className="text-blue-400 px-1">
        Login
      </Link>
      as {username} to proceed.
    </h1>
  );
  const currentUser = fetchUserFromRefresh(cookies().get('refresh'));

  if (currentUser.error) {
    cookies().delete('refresh');
  }

  if (!currentUser) {
    return <h1>Loading...</h1>;
  }

  // InCase the refresh token was faulty
  if (username !== currentUser.username) {
    return NotAuthorized;
  }

  const user = await getUser(username, currentUser.access);

  return (
    <div className="flex flex-col items-center max-w-[600px] mx-auto my-0">
      <div className="w-full flex flex-wrap justify-center items-center gap-1 py-12">
        {/* TODO - Editable Username */}
        <div className="flex-1">Username:</div>
        <div className={`flex-[3] p-2 rounded-xl bg-green-600`}>{username}</div>
        <div className="flex-[2]"></div>
      </div>

      <InputField
        type="email"
        value={user.email}
        name="email"
        inputColor={
          user['email verified'] ? 'bg-[#36ff0469]' : 'bg-[#ff040469]'
        }
        title={
          user['email verified'] ? 'Verified Email' : 'Please Verify your Email'
        }
        access={currentUser.access}
        submitFn={changeEmail}
      />

      <div className="py-12 space-x-8">
        {!user.email_verified && (
          <Button
            value="Verify Email"
            access={currentUser.access}
            clickFn={reqVerification}
          />
        )}
        <Button
          value="Change Password"
          access={currentUser.access}
          clickFn={reqPasswordChange}
          clickFnArgs={{ username }}
        />
      </div>
    </div>
  );
}
