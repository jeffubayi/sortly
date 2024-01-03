import React, { useEffect } from 'react';
import { Grid, Container, Button, Card, ListItem, List, CardContent, useMediaQuery, CardMedia, Chip, Divider, Stack, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/TextFields';
import { createProduct } from '../../redux/features/product/productSlice';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    quantity: Yup.number().required('Required'),
    price: Yup.number().required('Required'),
    description: Yup.string().required('Required'),
    image: Yup.string().required('Required'),
});

export default function Items() {
    useRedirectLoggedOutUser('/auth/login')
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    // const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [open, setOpen] = React.useState(false);
    const [openNew, setOpenNew] = React.useState(false);
    const [item, setItem] = React.useState<any>({});
    const { products, isLoading, isError, message } = useSelector((state: RootState) => state.product);

    const generateSKU = (category: any) => {
        const letter = category.slice(0, 3).toUpperCase();
        const number = Date.now();

        const sku = letter + "-" + number
        return sku;
    }

    const handleClickOpenNew = () => {
        setOpenNew(true);
    };

    const handleCloseNew = () => {
        setOpenNew(false);
    };

    const handleClickOpen = (item:any) => {
        setItem(item)
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

    // const top100Films = [
    //     { title: 'Electronics', year: 1994 },
    //     { title: 'Clothing', year: 1972 },
    //     { title: 'Repair', year: 1974 },
    //     { title: 'Cosmetics', year: 2008 },
    //     { title: 'Food', year: 1957 },
    //     { title: "Furniture", year: 1993 }]

    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
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
                    fullScreen={isSmallScreen}
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
                            name: "",
                            category: "",
                            quantity: 0,
                            price: 0,
                            description: "",
                            image: ""
                        }}
                        onSubmit={async (
                            values: any,
                            { setSubmitting }: FormikHelpers<any>
                        ) => {
                            try {
                                const productData = {
                                    ...values,
                                    sku: generateSKU(values.category)
                                }
                                await dispatch(createProduct(productData))
                                setSubmitting(false);
                                handleCloseNew()
                            } catch (error: any) {
                                toast.error(error.message)
                            }
                        }}
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
                                                type='website'
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
                                            <InputField
                                                type='text'
                                                name="category"
                                                placeholder='Category'
                                                label="Item Category"
                                            />
                                            {/* <Autocomplete
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
                                            /> */}
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
                                                label="Item Quantity"
                                                placeholder='Weight of item'
                                                type="number"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <InputField
                                                name="description"
                                                label="Item Description"
                                                rows={2}
                                                placeholder='About the product'
                                                type="text"
                                            />
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions sx={{ py: 1, px: 3 }}>
                                    <Button fullWidth variant="outlined" onClick={handleCloseNew}>Cancel</Button>
                                    <Button fullWidth disabled={isSubmitting} variant="contained" type="submit" startIcon={<FilterListIcon />}>
                                        Create Item
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </Dialog>
            )
            }
            {
                open && (
                    <Dialog
                        fullScreen={isSmallScreen}
                        open={open}
                        fullWidth
                        maxWidth="sm"
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            {item?.name}
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
                        <DialogContent>
                            <Grid container spacing={2} >
                                <Grid item md={7} sm={12}>
                                    <img
                                        height="200"
                                        width="100%"
                                        src={item?.image}
                                        alt="item"
                                    />
                                </Grid>
                                <Grid item md={5} sm={12}>
                                    <Typography variant="caption" color="secondary" component='div'>
                                        Units
                                    </Typography>
                                    <Typography variant="h6" color="secondary" component='div'>
                                        {item?.quantity} Units
                                    </Typography>
                                    <Typography variant="caption" color="secondary" component='div'>
                                        Price
                                    </Typography>
                                    <Typography variant="h6" color="secondary" component='div'>
                                        Ksh {item?.price}
                                    </Typography>
                                    <Typography variant="caption" color="secondary" component='div'>
                                        Tags
                                    </Typography>
                                    <Stack
                                        direction="row" spacing={1}
                                        mt={1}
                                    >
                                        <Chip icon={<LocalOfferIcon sx={{ fontSize: 5 }} />} label={item?.category} size="small" sx={{ fontSize: "0.6rem" }} />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <DialogContentText>
                                {item?.description}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ py: 1, px: 3 }}>
                            <Button fullWidth variant="outlined" onClick={handleClose}>Delete Item</Button>
                            <Button fullWidth variant="contained" type="submit"  startIcon={<SendIcon />}>
                                Request Order
                            </Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            <Grid container spacing={3} sx={{ mb: 6, p: 1 }}>
                {products.map((item: any, index) => (
                    <Grid key={item._id} item md={3} sm={12}>
                        <Card
                            sx={{ minWidth: isSmallScreen ? 320 : 270, borderRadius: "1rem", cursor: "pointer", boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }} onClick={() => handleClickOpen(item)} >
                            <CardMedia
                                component="img"
                                height="100%"
                                width="100%"
                                image={item.image}
                                // image="https://media.direct.playstation.com/is/image/psdglobal/PS5-console-front"
                                alt="item"
                            />
                            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", mb: -1 }} >
                                <Typography sx={{ fontSize: "0.5rem", color: "grey" }} component='div'>
                                    {item.sku}
                                </Typography>
                                <Typography variant="h6" color="primary" component='div'>
                                    {item.name}
                                </Typography>

                                <Stack
                                    direction="row" spacing={1}
                                    divider={<Divider orientation="vertical" flexItem />}
                                >
                                    <Typography variant="body2" color="secondary" component='div'>
                                        {item.quantity} Units
                                    </Typography>
                                    <Typography variant="body2" color="secondary" component='div'>
                                        Ksh {item.price}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row" spacing={1}
                                    mt={1}
                                >
                                    <Chip icon={<LocalOfferIcon sx={{ fontSize: 5 }} />} label={item.category} size="small" sx={{ fontSize: "0.6rem" }} />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container >
    );
}