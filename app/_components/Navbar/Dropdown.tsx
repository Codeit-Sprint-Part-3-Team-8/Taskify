import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const DropdownMenu = ({ trigger, children }: DropdownMenuProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center rounded-full p-1 tablet:gap-3 ${
          isDropdownVisible ? 'bg-gray-9FA6B2' : ''
        }`}
        type="button"
      >
        {trigger}
      </button>
      {isDropdownVisible && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border border-gray-D9D9D9 bg-white shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
