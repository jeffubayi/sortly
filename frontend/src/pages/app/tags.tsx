import React from 'react';
import { Container } from '@mui/material';

import TagsList from "../../components/itemList";

export default function Contracts() {
    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
            <TagsList />
        </Container>
    );
}