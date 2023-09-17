import React, { useState, useContext } from "react";
import type { AppProps } from "next/app";
import {GeneratorState} from 'context/AppContext'
import AppContext from 'context/AppContext'
import "styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  
  const [generators, setGenerators] = useState<Record<string, GeneratorState>>({});
  
  return (
    <AppContext.Provider value={{ generators, setGenerators }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default App;
