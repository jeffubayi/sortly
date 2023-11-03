import React, { useEffect, useState } from 'react';
import { Paper, Card, CardHeader, Container, Grid, Typography,Avatar  } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import router from 'next/router';
import Title from "../../components/addAction";
import Courses from "../../components/coursesList";
import Services from '../../components/serviceList';
import Calendar from '../../components/calender';
import useRedirectLoggedOutUser from '../../utility/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { selectName } from '../../redux/features/auth/authSlice';
import { CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, getProducts, selectCategory, selectOutOfStock, selectTotalStoreValue } from '../../redux/features/product/productSlice';
import DataGrid from "../../components/table";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { RootState } from "../../redux/store"

export default function Reports() {
  const userName = useSelector(selectName)
  // useRedirectLoggedOutUser('/auth/login')
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory)
  const { products, isLoading, isError, message } = useSelector((state: any) => state.product);

  useEffect(() => {
    if (isLoggedIn === true) {
      // dispatch(getProducts());

    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch])

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products))
    dispatch(CALC_OUTOFSTOCK(products))
    dispatch(CALC_CATEGORY(products))
  }, [dispatch, products])



  const summary = [
    {
      title: "Total Products",
      count: products.length,
      icon: <ShoppingCartIcon fontSize="small" sx={{
        color: "text.secondary"
      }} />
    },
    {
      title: "Total Store Value",
      count: totalStoreValue,
      icon: <InventoryRoundedIcon fontSize="small" sx={{
        color: "text.secondary"
      }} />
    },
    {
      title: "Out of Stock",
      count: outOfStock,
      icon: <Inventory2Icon fontSize="small" sx={{
        color: "text.secondary"
      }} />
    },
    {
      title: "All Categories",
      count: category | 0,
      icon: <LocalOfferIcon fontSize="small" sx={{
        color: "text.secondary"
      }} />
    },

  ];

  return (
    <React.Fragment>
      <Container maxWidth="md" component="main" sx={{ mb: 8, mt: 4 }}>
        <Title collection={`Hello,${userName}`} icon={<SchoolIcon />} title="Add product" path='courses' />
        <Grid container spacing={3} mt={0.3} alignItems="flex-end">
          {summary.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              md={3}
            >
              <Card sx={{ borderRadius: "0.6rem", bgcolor: 'background.paper', boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }} elevation={0}>
                <CardHeader
                  sx={{ fontWeight: "bold" }}
                  avatar={
                    <Avatar sx={{ bgcolor: "#fff7f5" }} aria-label="label">
                      {tier.icon}
                    </Avatar>
                  }
                  title={
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{tier.count}</Typography>
                  } subheader={tier.title}
                />
              </Card>
            </Grid>
          ))}

          <Grid
            item
            xs={12}
            md={12}
          >
            <Paper sx={{ borderRadius: "0.6rem", boxShadow: '10px 10px 8px rgb(157 168 189 / 17%) ' }} elevation={0}>
              {/* <Courses /> */}
              <DataGrid
                rows={products ?? []}
                loading={isLoading}
                error={isError}
              />
            </Paper>
          </Grid>

          {/* <Grid
            item
            xs={12}
            md={5}
          >
            <Paper sx={{ borderRadius: "0.6rem", boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }} elevation={0}>
              <Calendar />
            </Paper>
          </Grid> */}
          <Grid
            item
            xs={12}
            md={12}
          >
            <Paper sx={{ borderRadius: "0.6rem", boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }} elevation={0}>
              <Services />
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  );
}