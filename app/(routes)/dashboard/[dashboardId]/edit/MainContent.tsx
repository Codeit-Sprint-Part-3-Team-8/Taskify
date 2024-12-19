import React, { ReactNode } from 'react';

interface MaincontentType {
  children: ReactNode;
}

const MainContent = ({ children }: MaincontentType) => {
  return (
    <div className={`ml-16 mt-[3.6rem] tablet:ml-40 pc:ml-[18rem]`}>
      {children}
    </div>
  );
};

export default MainContent;
