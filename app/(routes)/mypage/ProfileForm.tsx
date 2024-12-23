import { ChangeEvent, useState } from 'react';

interface ProfileFormProps {
  email: string;
  nickname: string;
}

export default function ProfileForm({ email, nickname }: ProfileFormProps) {
  const [values, setValues] = useState({ email, nickname });

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form>
      <h2>프로필</h2>
      <fieldset>
        <input className="hidden" id="profile" type="file" />
        <label htmlFor="profile">+</label>
      </fieldset>
      <div>
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            value={values.email}
            onChange={handleChangeValue}
            placeholder={email}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            value={values.nickname}
            onChange={handleChangeValue}
            placeholder={nickname}
          />
        </fieldset>
        <button type="submit">저장</button>
      </div>
    </form>
  );
}
