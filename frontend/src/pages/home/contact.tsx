import * as React from 'react';
import { Box, Typography,Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import Footer from "../../components/footer";
import { MainButton } from "../../components/Buttons";
import { InputField } from "../../components/TextFields";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    subject: Yup.string().required('A subject is required'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    feedback: Yup.string().required('Please add a description'),
});

export default function Contact() {

    const handleFeedback = async () => {
        toast.error("still in progress")
    };

    return (
        <Box sx={{ flexGrow: 1, py: 6, px: 15 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item sm={12} md={5} mt={2}>
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                        Submit a request
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ mb: 4, color: "grey" }}>
                        Please enter the details of your request. A member of our support staff will respond as soon as possible.
                    </Typography>
                    <Formik
                        initialValues={{
                            email: "",
                            feedback: "",
                            name: "",
                            password2: "",
                        }}
                        onSubmit={handleFeedback}
                        validationSchema={validationSchema}>
                        {({
                            isSubmitting,
                        }) => (
                            <Form>
                                <Box>

                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >

                                        <Grid item xs={12}>
                                            <InputField
                                                type='email'
                                                name="email"
                                                placeholder='Type your email address'
                                                label="Your email address"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                name="subject"
                                                placeholder='Type your name'
                                                label="Subject"
                                                type='text'
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <InputField
                                                name="feedback"
                                                label="Description"
                                                placeholder='Add feedback'
                                                type="text"
                                            // helpertext="Please enter the details of your request. A member of our support staff will respond as soon as possible."
                                            />
                                        </Grid>

                                        <Grid item xs={12} >
                                            <MainButton
                                                type="submit"
                                                disabled={isSubmitting}
                                                variant="contained"
                                                label="Submit"
                                            />
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Form>
                        )}
                    </Formik>

                </Grid>
                <Grid item sm={12} md={3} mt={2}>
                </Grid>
                <Grid item sm={12} md={4}>
                    <Avatar variant="square"
                        sx={{ height: "100%", width: "100%" }}
                        src="https://i.imgur.com/VwAMnJ4.png"
                        alt="sortly"
                    />
                </Grid>
            </Grid>

            <Footer />
        </Box>
    );
}