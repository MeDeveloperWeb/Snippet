import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import BaseLayout from './BaseLayout';
import { getUnverifiedUserDetails } from './actions';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snippett',
  description: 'Create, Execute and Share Code'
};

export default async function RootLayout({ children }) {
  // waking the server up
  fetch(process.env.CODE_EXECUTION_URL + '/list');

  const userData = await getUnverifiedUserDetails();

  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <BaseLayout userData={userData}>{children}</BaseLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
