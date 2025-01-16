import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  switchForm: (form: 'login' | 'signup' | 'find') => void;
}

function LoginForm({ switchForm }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find(
      (user: any) => user.email === email && user.password === password
    );

    if (user) {
      alert('로그인 성공!');
      navigate('/todo');
    } else {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <h2>로그인</h2>
      <input
        type="text"
        name="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">로그인</button>
      <div className="links">
        <a href="#" onClick={() => switchForm('signup')}>
          회원가입
        </a>
        <a href="#" onClick={() => switchForm('find')} style={{ marginLeft: '10px' }}>
          비밀번호 찾기
        </a>
      </div>
    </form>
  );
}

export default LoginForm;
