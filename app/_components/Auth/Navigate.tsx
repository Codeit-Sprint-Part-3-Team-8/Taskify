import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Navigate() {
  const router = useRouter();
  const goto = useSearchParams().get('goto') || 'mydashboard';

  useEffect(() => {
    if (typeof window !== undefined && goto && router) {
      router.push(goto);
    }
  }, [goto, router]);

  return null;
}
