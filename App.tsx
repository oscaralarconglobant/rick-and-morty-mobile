import React from 'react';

import {ThemeProvider} from 'styled-components';
import {Navigation} from './app/navigation/navigation';

const App: React.FC = () => {
  return (
    <ThemeProvider
      theme={{
        fontFamily: 'MontserratAlternates-Regular',
        backgroundColor: '#97ce4c',
      }}>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
