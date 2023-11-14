import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Footer from "../../components/footer";
import { MainButton } from "../../components/Buttons";
import { InputField } from "../../components/TextFields";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    name: Yup.string().required('Your name is required'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    feedback: Yup.string().required('required'),
});

export default function Contact() {

    const handleFeedback = async () => {
        toast.error("still in progress")
    };

    return (
        <Box sx={{ flexGrow: 1, py: 6, px: 10 }}>
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
                <Grid item sm={12} md={7}>
                    <img
                        src="https://media.sortly.com/wp-content/uploads/2022/09/14025105/hero_phone_1.png"
                        // style={{ height: "500", width: "750" }}
                        alt="sortly"
                    />
                </Grid>
            </Grid>

            <Footer />
        </Box>
    );
}