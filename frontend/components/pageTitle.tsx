import React from 'react'
import Head from "next/head";

const PageTitle = ({ title }: { title: string }) => {
    return (
        <Head>
            <title>{title} | Sortly Inventory</title>
        </Head>
    );
}

export default PageTitle;