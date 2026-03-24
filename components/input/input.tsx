'use client';

import { InputHTMLAttributes, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string | null;
  variant?: 'solid-gray' | 'solid-white' | 'error';
  required?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassname?: string;
}
export default function Input({
  id,
  label,
  required,
  variant = 'solid-white',
  className,
  containerClassName,
  labelClassname,
  ...props
}: InputProps) {
  const isPassword = props.type === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : props.type;
  const baseInputContainerClasses = clsx('flex flex-col gap-[10px]', containerClassName);
  const baseInputClasses =
    'w-full min-h-[50px] px-[20px] py-[10px] rounded-[10px] font-albert-sans font-normal placeholder:text-[20px]';
  const variantsBase: Record<NonNullable<InputProps['variant']>, string> = {
    'solid-white': 'bg-white border border-[#e2e2e2] focus:outline-[#4039FA]',
    'solid-gray':
      'bg-[#F3F3F3] border border-[#F3F3F3] focus:border-[#F3F3F3] focus:ring-[#F3F3F3] placeholder:text-[#B1B1B1]',
    error: 'bg-red-50 border border-red-500 text-red-700 focus:border-red-500 focus:ring-red-500',
  };
  const inputClasses = clsx(
    variantsBase[variant],
    baseInputClasses,
    isPassword && 'pr-12',
    className,
  );
  return (
    <div className={baseInputContainerClasses}>
      {label && (
        <label htmlFor={id} className={labelClassname}>
          {label}
          {required && <span className={clsx('text-red-500')}>*</span>}
        </label>
      )}
      <div className="relative">
        <input {...props} type={inputType} className={inputClasses} />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className={clsx(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'text-gray-500 hover:text-gray-700 focus:outline-none',
            )}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
