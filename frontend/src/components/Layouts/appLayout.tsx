import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import Container from '@mui/material/Container';

import HeaderNavbar from '../header';
import FooterNavbar from "../bottomNav";



interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    return (
        <div>
            <HeaderNavbar />
            <Box component="main" sx={{ bgcolor: 'background.default' }}>
                <Container disableGutters maxWidth="xl" component="main">
                    {children}
                </Container>
            </Box>
            {isSmallScreen && <FooterNavbar />}
        </div>
    );
}