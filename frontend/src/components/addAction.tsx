import React from 'react'
import { List, ListItem, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CardTitle({ title, icon, collection,path }: { title?: string, icon?: any, collection: string,path?:string }) {
  const navigate = useNavigate();
  const handleAddJoke = () => {
    navigate(`${path}`);
  };
  return (
    <List sx={{ borderRadius: "0.5rem", mb: 1, bgcolor: 'background.paper',boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }}>
      <ListItem alignItems="flex-start" secondaryAction={
        <>
          {icon &&
            <Button
              variant="contained"
              startIcon={icon}
              onClick={handleAddJoke}
              size="small"
              sx={{ borderRadius: "0.4rem" }}
            >
              {title}
            </Button>}
        </>
      }>
        <Typography color="text.primary" variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {collection}
        </Typography>

      </ListItem>
    </List >
  );
}