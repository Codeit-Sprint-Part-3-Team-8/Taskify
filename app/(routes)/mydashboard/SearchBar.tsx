import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = '검색',
}) => {
  const [keyword, setKeyword] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 300),
    [onSearch],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <Image
        width={24}
        height={24}
        src="/images/icon/ic-search.svg"
        alt="search"
        className="absolute left-2 top-2.5 cursor-pointer"
      />
      <input
        className="w-full rounded-md border border-gray-D9D9D9 py-2 pl-10 text-sm text-gray-787486 focus:outline-none focus:ring-2 focus:ring-violet-5534DA tablet:text-md"
        value={keyword}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
