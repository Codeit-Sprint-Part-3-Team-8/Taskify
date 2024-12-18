'use client';

import AuthFooter from '@/_components/Auth/AuthFooter';
import AuthHeader from '@/_components/Auth/AuthHeader';
import InputField from '@/_components/Auth/InputField';

export default function LoginPage() {
  return (
    <>
      <div className="fixed left-1/2 right-1/2 top-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 tablet:max-w-lg">
        <AuthHeader text="오늘도 만나서 반가워요!" />
        <form className="mb-6 flex flex-col gap-6">
          <InputField
            name="email"
            value=""
            validation={{ isValid: false, message: '' }}
            onChange={() => {}}
          />
          <InputField
            name="password"
            value=""
            validation={{ isValid: false, message: '' }}
            onChange={() => {}}
          />
          <button
            className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
            type="submit"
            // disabled={!isFormValid || loading}
          >
            로그인
          </button>
        </form>
        <AuthFooter to="signup" />
      </div>
    </>
  );
}
