import React, { useEffect, useState } from "react";
import {
  Paper,
  Card,
  CardHeader,
  Container,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import router from "next/router";
import Title from "../../components/addAction";
import Courses from "../../components/coursesList";
import Tags from "../../components/serviceList";
import Calendar from "../../components/calender";
import useRedirectLoggedOutUser from "../../utility/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { selectName } from "../../redux/features/auth/authSlice";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  getProducts,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../redux/features/product/productSlice";
import ItemsGrid from "../../components/table";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { RootState } from "../../redux/store";
import PageTitle from "../../components/pageTitle";
import axios from "axios";
import { cookies } from "next/headers";

export default function Reports() {
  const userName = useSelector(selectName);
  // useRedirectLoggedOutUser('/auth/login')
  const hello = cookies().get('token')?.value;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);
  const { products, isLoading, isError, message } = useSelector(
    (state: any) => state.product
  );
  const [product, setProduct] = useState<any>()
  console.log(`COOK`,hello)

  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     dispatch(getProducts())
  //   }

  //   if (isError) {
  //     console.log(message);
  //   }
  // }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products))
    dispatch(CALC_OUTOFSTOCK(products))
    dispatch(CALC_CATEGORY(products))
  }, [dispatch, products])

  const summary = [
    {
      title: "Items",
      count: products?.length,
      icon: (
        <ShoppingCartIcon
          fontSize="small"
          sx={{
            color: "text.secondary",
          }}
        />
      ),
    },
    {
      title: "Folders",
      count: totalStoreValue,
      icon: (
        <InventoryRoundedIcon
          fontSize="small"
          sx={{
            color: "text.secondary",
          }}
        />
      ),
    },
    {
      title: "Out of Stock",
      count: outOfStock,
      icon: (
        <Inventory2Icon
          fontSize="small"
          sx={{
            color: "text.secondary",
          }}
        />
      ),
    },
    {
      title: "All Categories",
      count: category | 0,
      icon: (
        <LocalOfferIcon
          fontSize="small"
          sx={{
            color: "text.secondary",
          }}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <PageTitle title="Dashboard" />
      <Container maxWidth="lg" component="main" sx={{ mb: 8, mt: 4 }}>
        <Typography sx={{ mb: 1.5, fontWeight: "bold" }}>
          Inventory Summary
        </Typography>
        <Grid container spacing={3} alignItems="flex-end">
          {summary.map((tier) => (
            <Grid item key={tier.title} xs={12} md={3}>
              <Card
                sx={{
                  borderRadius: "0.6rem",
                  bgcolor: "background.paper",
                  boxShadow: "10px 10px 8px rgb(157 168 189 / 17%)",
                }}
                elevation={0}
              >
                <CardHeader
                  sx={{ fontWeight: "bold" }}
                  avatar={
                    <Avatar sx={{ bgcolor: "#fff7f5" }} aria-label="label">
                      {tier.icon}
                    </Avatar>
                  }
                  title={
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {tier.count}
                    </Typography>
                  }
                  subheader={tier.title}
                />
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} md={12}>
            <Typography sx={{ mb: 1.5, fontWeight: "bold" }}>
              Recent Items
            </Typography>
            <ItemsGrid
              rows={products ?? []}
              loading={isLoading}
              error={isError}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography sx={{ mb: 4, fontWeight: "bold" }}>
              Item Category
            </Typography>
            <Paper
              sx={{
                borderRadius: "0.6rem",
                boxShadow: "10px 10px 8px rgb(157 168 189 / 17%)",
              }}
              elevation={0}
            >
              <Tags />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

