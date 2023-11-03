import React from "react";
import { useGetJokesQuery } from "../../redux/hooks";
import DataGrid from "../../components/table";
import { supabase } from "../../utility/supabaseClient";
import Title from "../../components/addAction";
import { Container } from '@mui/material';
import PageTitle from "../../components/pageTitle";

export default function Jokes() {
    // const { data, isLoading, error } = useGetJokesQuery();
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
         <PageTitle title="Jobs" />
            <Title collection="MY JOBS" />
            <DataGrid
                rows={data ?? []}
                loading={isLoading}
                error={error}
            />
        </Container>
    )
}