import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import FindPasswordForm from './FindPasswordForm';
import './AuthForm.css';

function AuthForm() {
  const [currentForm, setCurrentForm] = useState<'login' | 'signup' | 'find'>('login');
  const [errors, setErrors] = useState<Partial<any>>({});  // 에러 상태 추가

  const switchForm = (form: 'login' | 'signup' | 'find') => {
    setCurrentForm(form);
  };

  return (
    <div className="AuthForm">
      {currentForm === 'login' && <LoginForm switchForm={switchForm} />}
      {currentForm === 'signup' && <SignupForm switchForm={switchForm} setErrors={setErrors} />}  {/* setErrors 전달 */}
      {currentForm === 'find' && <FindPasswordForm switchForm={switchForm} />}
    </div>
  );
}

export default AuthForm;

