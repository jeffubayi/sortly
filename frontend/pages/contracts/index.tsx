import React, { useEffect, useState } from 'react';
import { Box, Grid, useMediaQuery, Container } from '@mui/material';
import Title from "../../components/addAction";
import DataGrid from "../../components/table";
import { supabase } from "../../utility/supabaseClient";
import PageTitle from '../../components/pageTitle';

export default function Contracts() {
    const [data, setData] = React.useState<any>()
    const [error, setError] = React.useState<any>()
    const [isLoading, setIsLoading] = React.useState(true)

    const fetch = async () => {
        const { data, error } = await supabase
            .from("jokes")
            .select('*')
            .order('likes', { ascending: false })

        setData(data);
        setError(error);
        setIsLoading(false)

    }

    React.useEffect(() => {
        fetch();
    }, [data]);

    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
             <PageTitle title='Contracts' />
             <Title collection="My Contracts" />
             <DataGrid
                rows={data ?? []}
                loading={isLoading}
                error={error}
            />
        </Container>
    );
}