import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../redux/features/product/productSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import Inventory2Icon from "@mui/icons-material/Inventory2";

export default function SummaryCard({products}:{products:any}) {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

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
      title: "Store Value",
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
          {summary.map((tier) => (
            <Grid item key={tier.title} xs={12} md={3}>
              <Card
                sx={{
                  borderRadius: "0.6rem",
                  bgcolor: "background.default",
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
    </React.Fragment>
  );
}