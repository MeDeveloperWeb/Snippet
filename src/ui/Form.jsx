import Link from 'next/link';

export function Input({ type, label, placeholder, name, id = name }) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        className="h-8 shadow-lg px-2 rounded"
        placeholder={placeholder}
        autoComplete="on"
      />
    </div>
  );
}

export function PasswordInput({
  label = 'Password',
  name = 'password',
  id = name,
  resetLink = '/forgot-password',
  resetTitle = 'Forgot Password?'
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between">
        <label htmlFor="password">{label}</label>
        <Link href={resetLink} className="text-blue-500">
          {resetTitle}
        </Link>
      </div>
      <input
        type="password"
        name={name}
        id={id}
        className="h-8 shadow-lg px-2 rounded"
        autoComplete="on"
      />
    </div>
  );
}
