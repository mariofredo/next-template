import {ChangeEvent} from 'react';

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  type,
  placeholder,
  value,
  name,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
}
