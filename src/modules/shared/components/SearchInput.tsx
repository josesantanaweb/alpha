"use client";

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
} from "react";
import { Search, X } from "@boxicons/react";
import { Input, type InputProps } from "@/modules/shared/components/ui";
import { cn } from "@/modules/shared/utils/cn";

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
  inputSize?: InputProps["inputSize"];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onSearch?: (value: string) => void;
}

export const SearchInput = ({
  value,
  defaultValue,
  placeholder = "Buscar",
  name,
  id,
  disabled,
  autoFocus,
  className,
  inputClassName,
  inputSize = "lg",
  onChange,
  onValueChange,
  onSubmit,
  onSearch,
}: SearchInputProps): ReactElement => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = useMemo(() => {
    return isControlled ? (value ?? "") : innerValue;
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
      setInnerValue("");
    }

    onValueChange?.("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit?.(event);
    const formData = new FormData(event.currentTarget);
    const nextValue = String(formData.get(name ?? "search") ?? "");
    onSearch?.(nextValue);
  };

  return (
    <form
      className={cn("relative w-full", className)}
      onSubmit={handleSubmit}
      role="search"
    >
      <Search
        size="sm"
        className="text-body pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
      />
      <Input
        ref={inputRef}
        id={id}
        name={name ?? "search"}
        type="search"
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        inputSize={inputSize}
        onChange={handleChange}
        className={cn(
          "rounded-md px-5 [&::-webkit-search-cancel-button]:appearance-none",
          inputClassName
        )}
      />
      {currentValue.length > 0 && (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          onClick={handleClear}
          className="text-body absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors hover:text-white disabled:opacity-60"
          disabled={disabled}
        >
          <X size="sm" />
        </button>
      )}
    </form>
  );
};
