import React, { useMemo } from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import { Box,  Grid,Chip, Typography } from '@mui/material';
import { useLocalStorage } from 'react-use';
// import { renderViewsComponent } from "./viewsChip";
import { timeConverter } from "../utility";
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
    // const [open, setOpen] = React.useState(false);
    // const [data, setData] = React.useState<any | undefined>();


    // const deleteUser = async (id: any) => {
    //     if (user?.id) {
    //         const { error } = await supabase
    //             .from('jokes')
    //             .delete()
    //             .eq('id', id)

    //         if (error) {
    //             toast.error(`Joke ${id} failed to delete`)
    //             console.log(error)
    //         } else {
    //             toast.success(`Joke ${id} successfully deleted`)
    //         }
    //     } else {
    //         toast.error(`Please login to delete`)
    //     }

    // };

    // const deleteJoke = React.useCallback(
    //     (id: GridRowId) => () => {
    //         deleteUser(id)
    //     },
    //     [],
    // );

    // const editLikes = React.useCallback(
    //     (params: any, type: string) => () => {
    //         upvoteJoke(params, type)
    //     },
    //     [],
    // );


    // const upvoteJoke = async (params: any, type: string) => {
    //     const { error } = await supabase
    //         .from('jokes')
    //         .update({ likes: type === "liked" ? params.row.likes + 1 : type === "disliked" && params.row.likes !== 0 || null ? params.row.likes - 1 : 0 })
    //         .eq('id', params.id)

    //     if (error) {
    //         toast.error(`Failed to ${type} ${params.row.Category}`)
    //         console.log(error)
    //     } else {
    //         toast.success(` You ${type} a ${params.row.Category} successfully`)
    //     }

    // };

    const columns = useMemo<GridColDef<any>[]>(
        () => [
            {
                field: "name",
                sortable: false,
                flex: 3
            },
            { field: "sku", flex: 3, sortable: false },
            { field: "quantity", flex: 1, sortable: false },
            { field: "price", flex: 1, sortable: false },


            {
                field: "createdAt",
                sortable: false,
                headerName: "Created At",
                flex: 2,
                valueGetter: (params: GridValueGetterParams) => {
                    return timeConverter(params.row.created_at) || "N/A"
                },
            },
            {
                field: "category",
                sortable: false,
                flex: 2,
                renderCell: (params: GridRenderCellParams<any>) => (
                    // <Rating size="small" name="read-only" value={params.row.likes} readOnly />
                    <Chip label={params.row.category}/>

                ),
            },
            {
                field: 'actions',
                type: 'actions',
                width: 10,
                getActions: (params: any) => [
        
                    <GridActionsCellItem
                        icon={<SentimentVeryDissatisfiedIcon  color="warning" />}
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
        <Grid item xs={12} md={12}>
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