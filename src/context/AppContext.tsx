import { createContext } from 'react'

export interface GeneratorState {
  progress: number;
  taskId: string;
  creation: any;
  generating: boolean;
}

interface AppContextType {
  generators: Record<string, GeneratorState>;
  setGenerators: (updater: (prevGenerators: Record<string, GeneratorState>) => Record<string, GeneratorState>) => void;
}

const AppContext = createContext<AppContextType>({
  generators: {},
  setGenerators: () => {},
});


export default AppContext;
