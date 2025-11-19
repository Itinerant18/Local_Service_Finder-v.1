import React from "react";
import { QueryClientProvider } from '@tanstack/react-query';
import Routes from "./Routes";
import queryClient from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
