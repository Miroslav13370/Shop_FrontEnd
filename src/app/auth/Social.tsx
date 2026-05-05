import { useRouter } from 'next/navigation';
import { FaYandex } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/src/components/ui/button';
import { SERVER_URL } from '@/src/config/api.config';

const Social = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant={'ghost'}
        type="button"
        className="border border-black/10"
        onClick={() => {
          router.push(`${SERVER_URL}/api/auth/google`);
        }}
      >
        <FcGoogle />
        Продолжить через Google
      </Button>
      <Button
        variant={'ghost'}
        type="button"
        className="border border-black/10"
        onClick={() => {
          router.push(`${SERVER_URL}/api/auth/yandex`);
        }}
      >
        <FaYandex color="#FC3F1D" />
        Продолжить через Яндекс
      </Button>
    </>
  );
};

export default Social;
