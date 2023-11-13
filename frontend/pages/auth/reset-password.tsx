import Head from "next/head";
import React from "react";
import { Avatar, DialogContent, Dialog, TextField, Typography } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { InputField } from "../../components/TextFields";
import { MainButton } from "../../components/Buttons";

export default function Verify() {
    const router = useRouter();
    const supabase = useSupabaseClient()
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const initialValues: any = {
        email: "",
    }

    const handleForgot = async (values: any) => {
        const { email } = values
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: process.env.NEXT_PUBLIC_APP_URL + '/auth/set',
        });

        if (error) {
            // handle the error however you like
            return;
        }

        // show feedback that reset email has been sent
        if (data) toast.success('Password reset email sent');
    };
    return (
        <React.Fragment>
            <Head>
                <title>Reset Password </title>
            </Head>
            <Dialog
                maxWidth="xl"
                open={true}
            >
                <DialogContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", p: 2, alignItems: "center" }}>
                    <div>
                        <Avatar
                            sx={{ height: "4rem", width: "4rem" }}
                            src="logo.png"
                        />
                    </div>
                    <div>
                        <Typography variant="subtitle1" sx={{ m: 2 }}>
                            {"Reset your password"}
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleForgot}
                            validationSchema={validationSchema}>
                            {({
                                isSubmitting,
                            }) => (
                                <Form>
                                    <InputField
                                        name="email"
                                        label="Enter email"
                                        placeholder='Type your email address'
                                        type="email"
                                    />
                                    <MainButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        variant="contained"
                                        label="Reset Password"
                                        handleClick={handleForgot}
                                    />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </DialogContent>
            </Dialog>

        </React.Fragment>
    );
}