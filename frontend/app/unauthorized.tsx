import { useNavigate } from 'react-router-dom';

import { Button } from '@/app/components/ui/button';

export function Unauthorized() {
  const navigate = useNavigate();

  function onClickHome() {
    navigate('/');
  }

  return (
    <div
      className={'flex flex-col justify-center items-center h-screen gap-y-4'}
    >
      <h1 className={'text-2xl font-bold'}>Unauthorized Access</h1>
      <p className={'text-center w-96'}>
        Oops, it looks like you don't have permission to access this page.
        Please go back to home page and try again.
      </p>
      <Button className={'cursor-pointer'} onClick={onClickHome}>
        Go to home
      </Button>
    </div>
  );
}
