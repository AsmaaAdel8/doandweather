import { Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";
import Header from "./Header";


export default function MasterLayout() {

  const [theme, colorMode] = useMode();
  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
      <div className="w-100 m-auto mt-80">
        <Outlet></Outlet>
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </div>
  );
}
