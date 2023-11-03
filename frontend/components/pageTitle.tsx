import React from 'react'
import Head from "next/head";

export default function PageTitle({ title }: { title: string }) {
    return (
        <Head>
            <title>{title} | Maids of honour </title>
        </Head>
    );
}