import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Loading } from '@/public';
import clsx from 'clsx';

interface ButtonProps {
  variant?: VariantBase;
  colorScheme?: ColorSchemeBase;
  image?: string | StaticImageData;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  width?: WidthVariantBase;
  height?: HeightVariantBase;
  typeContent?: 'between' | 'center';
  onClick?: () => void;
  className?: string;
  buttonType?: 'submit' | 'reset' | 'button';
}

type VariantBase = 'solid' | 'outline' | 'text';
type ColorSchemeBase = 'primary' | 'secondary' | 'neutral' | 'success' | 'danger' | 'warning' | 'black' | 'white';
type WidthVariantBase = 'full' | 'auto';
type HeightVariantBase = 'auto' | 'full';
const base = 'inline-flex items-center gap-2 px-[24px] py-[10px] rounded-lg transition-colors !cursor-pointer';

const variantBase: Record<VariantBase, string> = {
  solid: 'border border-transparent',
  outline: 'border-2 bg-transparent',
  text: 'border-0 bg-transparent',
};

const schemeByVariant: Record<ColorSchemeBase, Record<VariantBase, string>> = {
  primary: {
    solid: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'text-blue-600 border-blue-600 hover:bg-blue-50',
    text: 'text-blue-600 hover:underline',
  },
  secondary: {
    solid: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'text-purple-600 border-purple-600 hover:bg-purple-50',
    text: 'text-purple-600 hover:underline',
  },
  neutral: {
    solid: 'bg-zinc-700 text-white hover:bg-zinc-800',
    outline: 'text-zinc-700 border-zinc-700 hover:bg-zinc-50',
    text: 'text-zinc-700 hover:underline',
  },
  success: {
    solid: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'text-green-600 border-green-600 hover:bg-green-50',
    text: 'text-green-600 hover:underline',
  },
  danger: {
    solid: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'text-red-600 border-red-600 hover:bg-red-50',
    text: 'text-red-600 hover:underline',
  },
  warning: {
    solid: 'bg-[#F2C24B] text-white hover:bg-yellow-500',
    outline: 'text-[#F2C24B] border-[#F2C24B] hover:bg-yellow-50',
    text: 'text-[#F2C24B] hover:underline',
  },
  black: {
    solid: 'bg-[#000000CC] text-white hover:bg-gray-800',
    outline: 'text-black border-black hover:bg-gray-50',
    text: 'text-black hover:underline',
  },
  white: {
    solid: 'bg-white text-black hover:bg-gray-100',
    outline: 'text-white border-white hover:bg-gray-50',
    text: 'text-white hover:underline',
  },
};

const widthVariant: Record<'full' | 'auto', string> = {
  full: 'w-full',
  auto: 'w-auto',
};

const heightVariant: Record<'auto' | 'full', string> = {
  auto: 'h-auto',
  full: 'h-full',
};

export default function Button({
  variant = 'solid',
  colorScheme = 'primary',
  image,
  text,
  disabled,
  onClick,
  loading,
  width = 'auto',
  height = 'auto',
  typeContent = 'center',
  className,
  buttonType = 'button',
}: ButtonProps) {
  const btnClassName = clsx(
    base,
    variantBase[variant],
    schemeByVariant[colorScheme][variant],
    widthVariant[width],
    heightVariant[height],
    (disabled || loading) && 'opacity-60 !cursor-not-allowed',
    className,
  );
  const handleRenderContent = (type: ButtonProps['typeContent']) => {
    if (loading) {
      return <Image src={Loading} width={20} height={20} alt="btn-loading" />;
    }
    const typeContentClasses: Record<'between' | 'center', string> = {
      between: 'justify-between',
      center: 'justify-center',
    };
    return (
      <div className={clsx('w-full flex items-center max-xl:text-normal max-lg:text-[12px]', typeContentClasses[type ?? 'center'])}>
        {React.isValidElement(image) ? image : image ? <Image src={image as string | StaticImageData} width={20} height={20} alt="button-icon" /> : null}
        {text}
      </div>
    );
  };
  return (
    <button className={btnClassName} disabled={disabled} onClick={onClick} type={buttonType}>
      {handleRenderContent(typeContent)}
    </button>
  );
}
