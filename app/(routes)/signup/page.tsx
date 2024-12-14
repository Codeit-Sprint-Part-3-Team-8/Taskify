import Image from "next/image";

export default function SignUp() {
  return (
    <div>
      <header>
        <Image width={200} height={280} src="/logo-main.svg" alt="Taskify" />
        <span>첫 방문을 확영합니다!</span>
      </header>
      <form>
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" required />
        </fieldset>
        <fieldset>
          <label htmlFor="nickname">닉네임</label>
          <input id="nickname" type="text" required />
        </fieldset>
        <fieldset>
          <label htmlFor="password"></label>
          <input id="password" type="password" required />
        </fieldset>
        <fieldset>
          <label htmlFor="repeat"></label>
          <input id="repeat" type="password" required />
        </fieldset>
        <fieldset>
          <input type="checkbox" id="terms-of-use" />
          <label htmlFor="terms-of-use">이용약관에 동의합니다.</label>
        </fieldset>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
