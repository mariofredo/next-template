import {LoginForm} from '@/components';
import '@/styles/auth.scss';
export default function LoginPage() {
  return (
    <div className='auth_ctr'>
      <div className='auth_form_box'>
        <h1 className='auth_title'>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
