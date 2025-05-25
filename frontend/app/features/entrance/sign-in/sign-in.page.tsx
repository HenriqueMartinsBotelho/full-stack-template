import { useConfig } from '@/app/hooks/use-config';
import { Divisor } from '@/app/features/entrance/sign-in/components/divisor';
import { CustomError } from '@/app/features/entrance/sign-in/components/error';
import { Footer } from '@/app/features/entrance/sign-in/components/footer';
import { Form } from '@/app/features/entrance/sign-in/components/form';
import { Header } from '@/app/features/entrance/sign-in/components/header';
import { useSignIn } from '@/app/features/entrance/sign-in/use-sign-in.hooks';

export function SignInPage() {
  const { viewState, register, errors, onSubmit } = useSignIn();
  const { config } = useConfig();

  return (
    <form onSubmit={onSubmit} className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <Header name={config.config.theme.name} />
        <Form register={register} errors={errors} viewState={viewState} />
        {viewState.type === 'error' && (
          <CustomError message={viewState.errorMessage ?? 'Unknown error'} />
        )}
        <Divisor />
        <Footer />
      </div>
    </form>
  );
}
