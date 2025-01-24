'use client';

import Link from 'next/link';

type Props = {};

const page = (props: Props) => {
  return <Link href="/auth/login">Login</Link>;
};

export default page;
