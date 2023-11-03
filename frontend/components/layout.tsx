import { useRouter } from "next/router";
import { createTheme, ThemeProvider, useMediaQuery, } from "@mui/material";
import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import { useState, useMemo } from "react";
import { PaletteMode } from "@mui/material";
import { useSelector, } from "react-redux";

import HeaderNavbar from './header';
import FooterNavbar from "./footer";
import { getDesignTokens } from "../styles/theme";


interface Props {
    children: React.ReactNode;
}

interface RootState {
    theme: {
        darkMode: boolean
    };
}


export default function Layout({ children }: Props) {
    const [mode, setMode] = useState<PaletteMode>("light");
    const router = useRouter();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const currentRoute: string = router.pathname;
    const path = currentRoute.replace(/\//g, "");
    const authPage = path.startsWith("auth");
    // const colorMode: Boolean = useSelector((state: RootState) => state.theme.darkMode);
    // useMemo(() => {
    //     setMode((prevMode: PaletteMode) =>
    //         prevMode === "light" ? "dark" : "light"
    //     );
    // }, [colorMode]);
    // console.log(`auth`, authPage)
    // Update the theme only if the mode changes
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return (
        <ThemeProvider theme={theme}>
            {!authPage && <HeaderNavbar />}
            <Box component="main" sx={{ bgcolor: 'background.default' }}>
                <Container disableGutters maxWidth="xl" component="main">
                    {children}
                </Container>
            </Box>
            {!authPage && isSmallScreen && <FooterNavbar />}
        </ThemeProvider>
    );
}