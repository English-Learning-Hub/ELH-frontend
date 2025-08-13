import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import { useForm } from 'react-hook-form';
import { RegisterFormData } from '@/types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser, isLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    defaultValues: {
      role: 'student',
    },
  });

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  const onSubmit = (data: RegisterFormData) => {
    registerUser.mutate(data);
  };

  const password = watch('password');

  return (
    <LoadingWrapper
      loading={registerUser.isPending}
      loadingText="Registering..."
      variant="inline"
      color="primary"
    >
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl text-blue-700 font-bold text-center mb-6">
            Đăng ký
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Tên
              </label>
              <input
                type="text"
                {...register('username', { required: 'Tên là bắt buộc' })}
                className={`w-full px-3 py-2 border ${
                  errors.username ? 'border-red-500' : 'border-blue-300'
                } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Nhập tên"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
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
                Vai trò
              </label>
              <select
                {...register('role', { required: 'Vai trò là bắt buộc' })}
                className={`w-full px-3 py-2 border ${
                  errors.role ? 'border-red-500' : 'border-blue-300'
                } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="student">Học viên</option>
                <option value="teacher">Giáo viên</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Mật khẩu là bắt buộc',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự',
                  },
                })}
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
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Xác nhận mật khẩu là bắt buộc',
                  validate: (value) =>
                    value === password || 'Mật khẩu không khớp',
                })}
                className={`w-full px-3 py-2 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-blue-300'
                } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Nhập lại mật khẩu"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Đăng ký
            </Button>
          </form>
          <p className="text-center mt-4 text-sm text-blue-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </LoadingWrapper>
  );
}

