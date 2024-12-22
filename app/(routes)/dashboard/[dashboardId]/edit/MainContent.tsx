import React, { ReactNode } from 'react';

const MainContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`ml-16 mt-[3.6rem] tablet:ml-40 pc:ml-[18rem]`}>
      {children}
    </div>
  );
};

export default MainContent;
