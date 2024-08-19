import Link from 'next/link';
import { ComponentProps } from 'react';

export default function CustomLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} prefetch={props.prefetch ?? false}>
    {props.children}
  </Link>
};