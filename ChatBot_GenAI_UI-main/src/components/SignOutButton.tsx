// components/SignInButton.tsx
'use client';

interface QueryFormProps {
  onSignOut: () => void;
}

export function SignOutButton({ onSignOut }: QueryFormProps) {
  const signoutHandler = () => {
    // Here you would typically call your sign-out logic, e.g., clearing session or token
    onSignOut();
  };
  return (
    <button
      onClick={signoutHandler}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
    >
      Sign-out
    </button>
  );
}
