import React from 'react';
import { SearchBar } from '@features/shared/components';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = 'Search feature flags...', 
  className 
}: SearchInputProps) {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
}
