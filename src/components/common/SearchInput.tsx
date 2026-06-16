'use client';
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactElement } from 'react';
import { Input, type InputProps } from '@/components/ui';
import { cn } from '@/lib';
import { Search, X } from '@boxicons/react';

interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  inputSize?: InputProps['inputSize'];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onSearch?: (value: string) => void;
}

export const SearchInput = ({
  value,
  defaultValue,
  placeholder = 'Buscar',
  name,
  id,
  disabled,
  autoFocus,
  className,
  inputClassName,
  inputSize = 'lg',
  onChange,
  onValueChange,
  onSubmit,
  onSearch,
}: SearchInputProps): ReactElement => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = useMemo(() => {
    return isControlled ? value ?? '' : innerValue;
  }, [isControlled, value, innerValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!isControlled) {
      setInnerValue(event.target.value);
    }

    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  const handleClear = (): void => {
    if (disabled) {
      return;
    }

    if (!isControlled) {
      setInnerValue('');
    }

    onValueChange?.('');
    onSearch?.('');
    inputRef.current?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit?.(event);
    const formData = new FormData(event.currentTarget);
    const nextValue = String(formData.get(name ?? 'search') ?? '');
    onSearch?.(nextValue);
  };

  return (
    <form className={cn('relative w-full', className)} onSubmit={handleSubmit} role="search">
      <Search
        size="sm"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stroke"
      />
      <Input
        ref={inputRef}
        id={id}
        name={name ?? 'search'}
        type="search"
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        inputSize={inputSize}
        onChange={handleChange}
        className={cn(
          'pl-10 pr-10 [&::-webkit-search-cancel-button]:appearance-none',
          inputClassName,
        )}
      />
      {currentValue.length > 0 && (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stroke cursor-pointer transition-colors hover:text-white disabled:opacity-60"
          disabled={disabled}
        >
          <X size="sm" />
        </button>
      )}
    </form>
  );
};
