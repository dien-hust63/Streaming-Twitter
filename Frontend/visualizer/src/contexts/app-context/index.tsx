import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  Theme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  getThemeConfig,
  getThemedComponent,
  THEME_MODE,
} from "src/contexts/app-context/theme";

export interface AppContextProps {
  toggleThemeMode: () => void;
  mode?: string;
}

const AppContext = createContext<AppContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleThemeMode: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<THEME_MODE>((): THEME_MODE => {
    let initialMode = localStorage.getItem("theme") as THEME_MODE;
    if (!initialMode) {
      initialMode = prefersDarkMode ? "dark" : "light";
      localStorage.setItem("theme", initialMode);
    }
    return initialMode;
  });

  const toggleThemeMode = useCallback(() => {
    setMode((prevMode: THEME_MODE) => {
      const newMode: THEME_MODE = prevMode === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  }, []);

  const theme = useMemo<Theme>(() => {
    const _t = createTheme(getThemeConfig(mode));
    return responsiveFontSizes(deepmerge(_t, getThemedComponent(_t)));
  }, [mode]);

  return (
    <AppContext.Provider value={{ toggleThemeMode, mode }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
