import React, { useState } from 'react';

interface Props {
  switchForm: (form: 'login' | 'signup' | 'find') => void;
  setErrors: React.Dispatch<React.SetStateAction<Partial<any>>>;
}

function SignupForm({ switchForm, setErrors }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const validateInput = (name: keyof typeof formData, value: string) => {
    if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) return '유효한 이메일 형식이 아닙니다.';
    if (name === 'password' && value.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
    if (name === 'passwordConfirm' && value !== formData.password)
      return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const handleSignup = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.some((user: any) => user.email === formData.email);

    if (userExists) {
      alert('이미 사용 중인 이메일입니다.');
      return;
    }

    localStorage.setItem('users', JSON.stringify([...existingUsers, formData]));
    alert('회원가입이 완료되었습니다!');
    switchForm('login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateInput(name as keyof typeof formData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
      <h2>회원가입</h2>
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="전화번호"
        value={formData.phone}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleInputChange}
      />
      {formData.email && <span className="error">{validateInput('email', formData.email)}</span>}

      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleInputChange}
      />
      {formData.password && <span className="error">{validateInput('password', formData.password)}</span>}

      <input
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        value={formData.passwordConfirm}
        onChange={handleInputChange}
      />
      {formData.passwordConfirm && <span className="error">{validateInput('passwordConfirm', formData.passwordConfirm)}</span>}

      <button type="submit">회원가입</button>
      <a href="#" onClick={() => switchForm('login')} className="back-link">
        로그인 화면으로 돌아가기
      </a>
    </form>
  );
}

export default SignupForm;

