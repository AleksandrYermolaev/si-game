import { createContext, useContext, ReactNode } from 'react';
import { Player } from '../types';

interface DataContextType {
  connectedPlayers: Player[];
  wrongPlayers: Player[];
  newPlayerError: string;
  respondent: Player | null;
  presenter: boolean;
}

const DataContext = createContext<DataContextType>({
  connectedPlayers: [],
  wrongPlayers: [],
  newPlayerError: '',
  respondent: null,
  presenter: false,
});

export const useData = () => useContext(DataContext);

export const DataProvider = ({
  context,
  children,
}: {
  context: DataContextType;
  children: ReactNode;
}) => <DataContext.Provider value={context}>{children}</DataContext.Provider>;
