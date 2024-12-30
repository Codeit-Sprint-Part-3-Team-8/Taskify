import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
}

const DropdownMenu = ({
  trigger,
  children,
  buttonClassName,
  menuClassName,
}: DropdownMenuProps) => {
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
      <div className="flex items-center">
        <button
          onClick={toggleDropdown}
          className={buttonClassName}
          type="button"
        >
          {trigger}
        </button>
      </div>
      {isDropdownVisible && (
        <div className={`${menuClassName} right-0 top-full mt-1`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
