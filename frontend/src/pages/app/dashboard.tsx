

import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Typography
} from "@mui/material";
import TagsList from "../../components/serviceList";
import useRedirectLoggedOutUser from "../../utility/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import ItemsList from "../../components/table";
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
// import PageTitle from "../components/pageTitle";
import SummaryCard from "../../components/summaryCard"
import { getProducts } from "../../redux/features/product/productSlice"
import { AppDispatch, RootState } from "../../redux/store"

export default function Dashboard() {
  useRedirectLoggedOutUser('/auth/login')
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts())
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);



  return (
    <React.Fragment>
      {/* <PageTitle title="Dashboard" /> */}
      <Container maxWidth="lg" component="main" sx={{ mb: 8, mt: 4 }}>
        <Typography sx={{ mb: 1.5, fontWeight: "bold" }}>
          Inventory Summary
        </Typography>
        <Grid container spacing={3}>
          <SummaryCard products={products} />
          <ItemsList rows={products ?? []} loading={isLoading} />
          <TagsList />
        </Grid>
      </Container>
    </React.Fragment>
  );
}