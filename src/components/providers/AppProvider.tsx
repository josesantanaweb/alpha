"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ReactElement,
} from "react";

interface AppContextValue {
  hideBottomNav: boolean;
  setHideBottomNav: (value: boolean) => void;
}

const AppContext = createContext<AppContextValue>({
  hideBottomNav: false,
  setHideBottomNav: () => {},
});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [hideBottomNav, setHideBottomNav] = useState(false);

  return (
    <AppContext.Provider value={{ hideBottomNav, setHideBottomNav }}>
      {children}
    </AppContext.Provider>
  );
};
