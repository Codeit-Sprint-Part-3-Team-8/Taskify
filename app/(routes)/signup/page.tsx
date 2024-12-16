import Image from 'next/image';
import Link from 'next/link';

const FIELD_STYLE = 'w-full flex flex-col gap-2';
const FIEDL_LABEL_STYLE = 'text-black-333236 select-none';
const FIELD_INPUT_STYLE =
  'rounded-lg border border-gray-D9D9D9 px-4 py-3.5 placeholder:select-none placeholder:text-gray-9FA6B2';

export default function SignUp() {
  return (
    <div className="fixed left-1/2 right-1/2 top-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 tablet:max-w-lg">
      <header className="mb-7 flex select-none flex-col items-center justify-center">
        <Link href="/">
          <Image
            width={200}
            height={280}
            src="/images/logo-main.svg"
            alt="Taskify"
          />
        </Link>
        <span className="text-xl font-medium text-black-333236">
          첫 방문을 확영합니다!
        </span>
      </header>
      <form className="mb-6 flex flex-col gap-6">
        <fieldset className={FIELD_STYLE}>
          <label className={FIEDL_LABEL_STYLE} htmlFor="email">
            이메일
          </label>
          <input
            className={FIELD_INPUT_STYLE}
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            required
          />
        </fieldset>
        <fieldset className={FIELD_STYLE}>
          <label className={FIEDL_LABEL_STYLE} htmlFor="nickname">
            닉네임
          </label>
          <input
            className={FIELD_INPUT_STYLE}
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            required
          />
        </fieldset>
        <fieldset className={FIELD_STYLE}>
          <label className={FIEDL_LABEL_STYLE} htmlFor="password">
            비밀번호
          </label>
          <input
            className={FIELD_INPUT_STYLE}
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </fieldset>
        <fieldset className={FIELD_STYLE}>
          <label className={FIEDL_LABEL_STYLE} htmlFor="repeat">
            비밀번호 확인
          </label>
          <input
            className={FIELD_INPUT_STYLE}
            id="repeat"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            required
          />
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <input className="hidden" type="checkbox" id="terms-of-use" />
          <label
            className="relative h-5 w-5 cursor-pointer select-none"
            htmlFor="terms-of-use"
          >
            <Image
              fill
              src="/images/icon-checkbox-default.png"
              alt="이용약관"
            />
            <div className="absolute z-10 h-full w-full rounded bg-black-171717 opacity-0 hover:opacity-20 active:opacity-40" />
          </label>
          <label
            className={`${FIEDL_LABEL_STYLE} cursor-pointer`}
            htmlFor="terms-of-use"
          >
            이용약관에 동의합니다.
          </label>
        </fieldset>
        <button
          className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
          type="submit"
          disabled
        >
          가입하기
        </button>
      </form>
      <footer className="select-none text-center">
        <span>이미 회원이신가요?&nbsp;</span>
        <Link className="text-violet-5534DA underline" href="/login">
          로그인하기
        </Link>
      </footer>
    </div>
  );
}
