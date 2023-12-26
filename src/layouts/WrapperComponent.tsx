import React, { ReactNode } from 'react';
import NavBar from '../components/common/NavBar';

interface WrapperProps {
    children: ReactNode;
  }

  const WrapperComponent: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default WrapperComponent;
