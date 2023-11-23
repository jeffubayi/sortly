import React, { useMemo } from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem, GridColDef,  GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Grid, Chip, Typography, ListItem, Avatar, ListItemAvatar, ListItemText } from '@mui/material';
import { useLocalStorage } from 'react-use';
// import { renderViewsComponent } from "./viewsChip";
// import { timeConverter } from "../utility";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


interface Props {
    rows: any;
    loading: boolean;
    error?: any;
}

export default function Table(props: Props) {
    const { rows, loading } = props
    const [paginationModel, setPaginationModel] = useLocalStorage("pagination", {
        pageSize: 5,
        page: 0,
    });

    const columns = useMemo<GridColDef<any>[]>(
        () => [
            {
                field: "name",
                sortable: false,
                headerName: "Item",
                flex: 3,
                renderCell: (params: GridRenderCellParams<any>) => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar variant="square" src={params.row.image || "https://media.direct.playstation.com/is/image/psdglobal/PS5-console-front"} sx={{ borderRadius: "10px" }} />
                        </ListItemAvatar>
                        <ListItemText primary={params.row.name} secondary={<Typography variant="caption" sx={{fontSize:"0.6rem"}} color="text.secondary">{params.row.sku}</Typography>} />
                    </ListItem>
                ),
            },
            // { field: "sku", flex: 3, sortable: false },
            // { field: "quantity", flex: 1, sortable: false },
            { field: "price", flex: 1, sortable: false },


            // {
            //     field: "createdAt",
            //     sortable: false,
            //     headerName: "created at",
            //     flex: 2,
            //     valueGetter: (params: GridValueGetterParams) => {
            //         return timeConverter(params.row.created_at) || "N/A"
            //     },
            // },
            {
                field: "category",
                sortable: false,
                flex: 2,
                renderCell: (params: GridRenderCellParams<any>) => (
                    // <Rating size="small" name="read-only" value={params.row.likes} readOnly />
                    <Chip size="small" label={params.row.category} />

                ),
            },
            {
                field: 'actions',
                type: 'actions',
                width: 10,
                getActions: (params: any) => [

                    <GridActionsCellItem
                        icon={<SentimentVeryDissatisfiedIcon color="warning" />}
                        label="Delete"
                        showInMenu={true}
                    // onClick={deleteJoke(params.id)}
                    />
                ],
            },
        ], []);


    const filterProps = {
        toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
        }
    }


    //redirect to edit view
    const onRowClick = (
        params: any
    ) => {
        // setOpen(true);
        // setData(params.row)
    };

    // const addJoke = () => {
    //     setOpen(true);
    // };

    return (
        <Grid item xs={12} md={8}>
            <Typography sx={{ mb: 1.5, fontWeight: "bold" }}>
                Recent Items
            </Typography>
            <Box sx={{ borderRadius: "0.6rem", boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }}>
                {/* {open &&
                <ActionDialog
                    open={open}
                    handleClose={handleClose}
                    data={data}
                    method={method}
                />
            } */}
                {/* {error ? (
                <Paper>You have no bookings at the moment</Paper>
            ) : ( */}
                <DataGrid
                    disableColumnMenu
                    disableDensitySelector
                    disableColumnSelector
                    autoHeight
                    pagination
                    sortingOrder={['asc', 'desc']}
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    getRowId={(row) => row._id}
                    onRowClick={onRowClick}
                    pageSizeOptions={[5, 10]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={filterProps}
                    sx={{ borderRadius: "1rem", bgcolor: 'background.paper' }}
                />
            </Box>
        </Grid>
    );
}