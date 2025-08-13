import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import { useForm } from 'react-hook-form';
import { LoginFormData } from '@/types';
import { useEffect } from 'react';

export function LoginPage() {
  const navigate = useNavigate();
  const { loginUser, isLogin, } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    loginUser.mutate(data);
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <LoadingWrapper
      loading={loginUser.isPending}
      loadingText="Logging in..."
      variant="inline"
      color="primary"
    >
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl text-blue-700 font-bold text-center mb-6">Đăng nhập</h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email là bắt buộc',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email không hợp lệ',
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-blue-300'
                } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Nhập email của bạn"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                {...register('password', { required: 'Mật khẩu là bắt buộc' })}
                className={`w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-blue-300'
                } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Đăng nhập
            </Button>
          </form>
          <p className="text-center mt-4 text-sm text-blue-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </LoadingWrapper>
  );
}

