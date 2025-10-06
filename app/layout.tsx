import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'On the Daily',
  description: 'Daily Task Tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
