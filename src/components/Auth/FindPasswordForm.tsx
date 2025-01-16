import React, { useState } from 'react';

interface Props {
  switchForm: (form: 'login' | 'signup' | 'find') => void;
}

function FindPasswordForm({ switchForm }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleFindPassword = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find(
      (user: any) =>
        user.name === formData.name &&
        user.phone === formData.phone &&
        user.email === formData.email
    );

    if (user) {
      alert(`비밀번호는 다음과 같습니다: ${user.password}`);
      switchForm('login');
    } else {
      alert('입력된 정보와 일치하는 사용자를 찾을 수 없습니다.');
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleFindPassword(); }}>
      <h2>비밀번호 찾기</h2>
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        name="phone"
        placeholder="전화번호"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <input
        type="text"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button type="submit">확인</button>
      <a href="#" onClick={() => switchForm('login')} className="back-link">
        로그인 화면으로 돌아가기
      </a>
    </form>
  );
}

export default FindPasswordForm;
