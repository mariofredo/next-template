import Image, { StaticImageData } from 'next/image';
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'solid' | 'outline' | 'text';
  colorScheme?: 'primary' | 'secondary' | 'neutral' | 'danger' | 'warning';
  image?: string | StaticImageData;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

type VariantBase = 'solid' | 'outline' | 'text';
type ColorSchemeBase = 'primary' | 'secondary' | 'neutral' | 'danger' | 'warning';

const base =
  'inline-flex items-center gap-2 !px-[24px] !py-[10px] rounded-lg transition-colors cursor-pointer';

const variantBase: Record<VariantBase, string> = {
  solid: 'border border-transparent',
  outline: 'border bg-transparent',
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
  danger: {
    solid: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'text-red-600 border-red-600 hover:bg-red-50',
    text: 'text-red-600 hover:underline',
  },
  warning: {
    solid: 'bg-yellow-600 text-white hover:bg-yellow-700',
    outline: 'text-yellow-600 border-yellow-600 hover:bg-yellow-50',
    text: 'text-yellow-600 hover:underline',
  },
};

export default function Button({
  variant = 'solid',
  colorScheme = 'primary',
  image,
  text,
  disabled,
  onClick,
  loading,
}: ButtonProps) {
  const className = clsx(
    base,
    variantBase[variant],
    schemeByVariant[colorScheme][variant],
    (disabled || loading) && 'opacity-60 cursor-not-allowed',
  );
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {image && <Image src={image} width={20} height={20} alt="button_image" />}
      {text}
    </button>
  );
}
