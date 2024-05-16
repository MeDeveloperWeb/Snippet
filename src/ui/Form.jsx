import Link from 'next/link';

export function Input({ type, label, placeholder, name, id = name, ...props }) {
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
        required
      />
    </div>
  );
}

export function PasswordInput({
  label = 'Password',
  name = 'password',
  id = name,
  resetRequired = false,
  resetLink = '/forgot-password',
  resetTitle = 'Forgot Password?'
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between">
        <label htmlFor="password">{label}</label>
        {resetRequired && (
          <Link href={resetLink} className="text-blue-500">
            {resetTitle}
          </Link>
        )}
      </div>
      <input
        type="password"
        name={name}
        id={id}
        className="h-8 shadow-lg px-2 rounded"
        autoComplete="on"
        required
      />
    </div>
  );
}
