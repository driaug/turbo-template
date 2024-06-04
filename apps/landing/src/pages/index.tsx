import {OTP} from '@ui/components';
import {Lato} from 'next/font/google';
import React from 'react';

const lato = Lato({subsets: ['latin'], weight: '400'});

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${lato.className}`}>
      <OTP onComplete={t => console.log(t)} />
    </main>
  );
}
