import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import HeaderNavbar from '../header';
import FooterNavbar from "../bottomNav";

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    return (
        <div>
            <HeaderNavbar />
            <Box component="main" sx={{ bgcolor: 'background.paper',flexGrow: 1, p: 3  }}>
              {/* <DrawerHeader/> */}
                <Container disableGutters maxWidth="lg" component="main">
                    {children}
                </Container>
            </Box>
            {isSmallScreen && <FooterNavbar />}
        </div>
    );
}