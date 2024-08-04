import React from 'react';
import Bank from '@/layouts/bank/Bank';
import DeveloperDrawer from './layouts/dev/DeveloperDrawer';
import { isEnvBrowser } from './utils/misc';
import ModalsProvider from './components/ModalsProvider';

const App: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ModalsProvider>
        <Bank />
        {isEnvBrowser() && <DeveloperDrawer />}
      </ModalsProvider>
    </div>
  );
};

export default App;
