import { ChangeEvent, useState } from 'react';

export default function PasswordForm() {
  const [values, setValues] = useState({ current: '', new: '', repeat: '' });

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(values);

  return (
    <form>
      <h2>비밀번호 변경</h2>
      <fieldset>
        <label htmlFor="current-password">현재 비밀번호</label>
        <input
          name="current"
          id="current-paasword"
          type="text"
          onChange={handleChangeValue}
          placeholder="비밀번호 입력"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="new-password">새 비밀번호</label>
        <input
          name="new"
          id="new-paasword"
          type="text"
          onChange={handleChangeValue}
          placeholder="새 비밀번호 입력"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="new-repeat">새 비밀번호 확인</label>
        <input
          name="repeat"
          id="new-repeat"
          type="text"
          onChange={handleChangeValue}
          placeholder="새 비밀번호 입력"
        />
      </fieldset>
      <button type="submit">변경</button>
    </form>
  );
}
