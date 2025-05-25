import { useNavigate } from 'react-router-dom';

import { Button } from '@/app/components/ui/button';

export function NotFound() {
  const navigate = useNavigate();

  function onClickHome() {
    navigate('/');
  }

  return (
    <div
      className={'flex flex-col justify-center items-center h-screen gap-y-4'}
    >
      <h1 className={'text-2xl font-bold'}>Not found</h1>
      <p className={'text-center w-96'}>
        Oops! The page you are looking for was not found. Please go back to the
        home page and try again.
      </p>
      <Button className={'cursor-pointer'} onClick={onClickHome}>
        Go to home
      </Button>
    </div>
  );
}
