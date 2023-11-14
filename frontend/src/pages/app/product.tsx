import React, { useEffect } from 'react';
import { Grid, Container, Button, Card, CardActions, ListItem, List, CardContent, useMediaQuery, CardMedia, Chip, Divider, Stack, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
// import Image from 'next/image'

// import Title from "../../components/addAction";
// import PageTitle from '../../components/pageTitle';
// import {  useNavigate } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import useRedirectLoggedOutUser from "../../utility/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from '../../redux/features/product/productSlice';
import { AppDispatch, RootState } from "../../redux/store";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/TextFields';

const validationSchema = Yup.object({
    Category: Yup.string().required('Required'),
    Body: Yup.string().required('Required'),
});

export default function Items() {
    useRedirectLoggedOutUser('/auth/login')
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    // const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [open, setOpen] = React.useState(false);
    const [openNew, setOpenNew] = React.useState(false);
    const { products, isLoading, isError, message } = useSelector((state: RootState) => state.product);
    console.log(`%%%products%%%`, products, isLoading, isError, message)
    const handleSubmit = async (
        values: any,
    ) => {

    };

    const handleClickOpenNew = () => {
        setOpenNew(true);
    };

    const handleCloseNew = () => {
        setOpenNew(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    console.log(`products`, products)
    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProducts());
        }

        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch])

    const top100Films = [
        { title: 'Electronics', year: 1994 },
        { title: 'Clothing', year: 1972 },
        { title: 'Repair', year: 1974 },
        { title: 'Cosmetics', year: 2008 },
        { title: 'Food', year: 1957 },
        { title: "Furniture", year: 1993 }]

    return (
        <Container maxWidth="lg" component="main" sx={{ p: 2 }} >
            {/* <PageTitle title='Items' /> */}
            {/* <Title title="New Item" collection="All Items" icon={<FilterListIcon />} /> */}
            <List sx={{ borderRadius: "0.5rem", mb: 1, bgcolor: 'background.paper', boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }}>
                <ListItem alignItems="flex-start" secondaryAction={
                    <>
                        <Button
                            variant="contained"
                            startIcon={<FilterListIcon />}
                            onClick={handleClickOpenNew}
                            size="small"
                            sx={{ borderRadius: "0.4rem" }}
                        >
                            New Item
                        </Button>
                    </>
                }>
                    <Typography color="text.primary" variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        All Items
                    </Typography>

                </ListItem>
            </List >
            {openNew && (
                <Dialog
                    open={openNew}
                    onClose={handleCloseNew}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        New Item
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseNew}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Formik
                        initialValues={{
                            name: "PS6 Digital",
                            sku: "FUG-1698244662451",
                            category: "gaming",
                            quantity: 46,
                            price: 590,
                            description: "PS5 Ultra",
                            image: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}>
                        {({
                            isSubmitting,
                        }) => (
                            <Form>
                                <DialogContent>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <Grid item xs={12}>
                                            <InputField
                                                type='text'
                                                name="image"
                                                placeholder='Add Image'
                                                label="Item Picture"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField
                                                type='text'
                                                name="name"
                                                placeholder='Name'
                                                label="Item Name"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            {/* <InputField
                                                name="category"
                                                label="Item Category"
                                                placeholder=''
                                                type="text"
                                            /> */}
                                            <Autocomplete
                                                multiple
                                                id="tags-filled"
                                                options={top100Films.map((option) => option.title)}
                                                freeSolo
                                                renderTags={(value: readonly string[], getTagProps) =>
                                                    value.map((option: string, index: number) => (
                                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                    ))
                                                }
                                                renderInput={(params: any) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="Item Category"
                                                        placeholder="Select tags"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField
                                                name="price"
                                                label="Item Price"
                                                placeholder='Cost of item'
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputField
                                                name="quantity"
                                                label="Item Price"
                                                placeholder='Weight of item'
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <InputField
                                                name="description"
                                                label="Item Description"
                                                placeholder='About the product'
                                                type="text"
                                            />
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions sx={{ py: 1, px: 3 }}>
                                    <Button fullWidth variant="outlined" onClick={handleCloseNew}>Cancel</Button>
                                    <Button fullWidth disabled={isSubmitting} variant="contained" type="submit" autoFocus startIcon={<FilterListIcon />}>
                                        Create Item
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </Dialog>
            )}
            {open && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        PS5 Digital
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Grid container spacing={3} >
                            <Grid item md={8} sm={12}>
                                <img
                                    height="250"
                                    width="300"
                                    src="https://media.direct.playstation.com/is/image/psdglobal/PS5-console-front"
                                    alt="item"
                                />
                            </Grid>
                            <Grid item md={4} sm={12}>
                                <Typography variant="caption" color="secondary" component='div'>
                                    Units
                                </Typography>
                                <Typography variant="h6" color="secondary" component='div'>
                                    3 Units
                                </Typography>
                                <Typography variant="caption" color="secondary" component='div'>
                                    Price
                                </Typography>
                                <Typography variant="h6" color="secondary" component='div'>
                                    Ksh 100
                                </Typography>
                                <Typography variant="caption" color="secondary" component='div'>
                                    Tags
                                </Typography>
                                <Stack
                                    direction="row" spacing={1}
                                    mt={1}
                                >
                                    <Chip icon={<LocalOfferIcon sx={{ fontSize: 5 }} />} label="Electronics" size="small" sx={{ fontSize: "0.6rem" }} />
                                    <Chip icon={<LocalOfferIcon />} label="White" size="small" sx={{ fontSize: "0.6rem" }} />
                                </Stack>
                            </Grid>
                        </Grid>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ py: 1, px: 3 }}>
                        <Button fullWidth variant="outlined" onClick={handleClose}>Edit Item</Button>
                        <Button fullWidth variant="contained" type="submit" autoFocus startIcon={<SendIcon />}>
                            Request Order
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Grid container spacing={3} sx={{ mb: 6, p: 1 }}>
                {[1, 2, 3, 4].map((listing: any, index) => (
                    <Grid key={index} item md={3} sm={12}>
                        <Card sx={{ minWidth: isSmallScreen ? 320 : 270, borderRadius: "1rem", cursor: "pointer", boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }} onClick={handleClickOpen}>
                            <CardMedia
                                component="img"
                                height="200"
                                image="https://media.direct.playstation.com/is/image/psdglobal/PS5-console-front"
                                alt="item"
                            />
                            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", mb: -1 }} >
                                <Typography variant="h6" color="primary" component='div'>
                                    PS5 Digital
                                </Typography>

                                <Stack
                                    direction="row" spacing={1}
                                    divider={<Divider orientation="vertical" flexItem />}
                                >
                                    <Typography variant="body2" color="secondary" component='div'>
                                        3 Units
                                    </Typography>
                                    <Typography variant="body2" color="secondary" component='div'>
                                        Ksh 100
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row" spacing={1}
                                    mt={1}
                                >
                                    <Chip icon={<LocalOfferIcon sx={{ fontSize: 5 }} />} label="Electronics" size="small" sx={{ fontSize: "0.6rem" }} />
                                    <Chip icon={<LocalOfferIcon />} label="White" size="small" sx={{ fontSize: "0.6rem" }} />
                                </Stack>
                            </CardContent>
                            <CardActions disableSpacing >
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    onClick={handleClickOpen}
                                >
                                    View Item
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}