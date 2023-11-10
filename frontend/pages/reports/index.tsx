import React, { useEffect, useState } from 'react';
import { Box, Grid, useMediaQuery, Container } from '@mui/material';
// import CourseCard from "../../components/courseCard";
import Title from "../../components/addAction";
import PageTitle from '../../components/pageTitle';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Courses() {
    const [courses, setCourses] = useState<any>([1])
    // useEffect(() => {
    //     async function logMovies() {
    //         const response = await fetch("http://localhost:4000/courses");
    //         const course = await response.json();
    //         console.log(`course1`, course?.data?.rows);
    //         setCourses(course?.data?.rows)
    //     }
    //     logMovies();
    // }, []);
    return (
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
            <PageTitle title="Reports" />
            <Title title="Filter" collection='Analytics' icon={<FilterListIcon />} />
            <Grid container spacing={3} sx={{ mb: 6, p: 1 }}>
                {courses?.map((course: any,index: React.Key | null | undefined) =>
                    <Grid key={index} item md={4} sm={12}>
                        {/* <CourseCard /> */}
                    </Grid>
                )
                }
            </Grid>
        </Container>
    );
}