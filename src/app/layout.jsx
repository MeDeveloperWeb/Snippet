import { Inconsolata } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import BaseLayout from './BaseLayout';
import { getUnverifiedUserDetails } from './actions';

const inter = Inconsolata({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: 'Snippett',
  description: 'Create, Execute and Share Code'
};

export default async function RootLayout({ children }) {
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
