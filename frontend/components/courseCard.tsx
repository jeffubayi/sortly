import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactPlayer from 'react-player'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Dialog, AppBar, DialogContent, DialogActions, Chip, Toolbar, List, Button, Box, Paper, Grid, Stack, DialogTitle, ListItemText, Tooltip, Divider, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/ArrowBackIos';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BackIcon from '@mui/icons-material/Close';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

import VideoPlayer from "./videoPlayer";
import Playlist from './playerList';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const videoUrls = [{
        url: 'https://www.youtube.com/watch?v=piYf4gDthjY', logo: "/intro.png", title: "Introduction", tag: "free", info: "1 this video teaches you how to handle ", time: 10,
    },
    {
        url: 'https://www.youtube.com/watch?v=FKElrfk1ZLY', logo: "/thumbnail.png", title: "Mentorship", tag: "paid", info: "2 this video teaches you how to handle ", time: 9,
    },
    {
        url: 'https://www.youtube.com/watch?v=2_gLD1jarfU', logo: "/behavior.png", title: "Behavior in the home", tag: "paid", info: "3 this video teaches you how to handle ", time: 10,
    },
    {
        url: 'https://www.youtube.com/watch?v=toBTPGfurLc&pp=ygUOa2VuZHJpY2sgbGFtYXI%3D', logo: "/communication.png", title: "Communication", tag: "paid", info: "4 this video teaches you how to handle ", time: 10,
    },
    {
        url: 'https://www.youtube.com/watch?v=FKElrfk1ZLY', logo: "/etiquette.png", title: "Etiquette", tag: "paid", info: "5 this video teaches you how to handle ", time: 12,
    },
    {
        url: 'https://www.youtube.com/watch?v=2_gLD1jarfU', logo: "/good.png", title: "Good grooming", tag: "paid", info: "6 this video teaches you how to handle ", time: 10,
    },
    {
        url: 'https://www.youtube.com/watch?v=FKElrfk1ZLY', logo: "/personal.png", title: "Personal hygiene", tag: "paid", info: "7 this video teaches you how to handle ", time: 8,
    },
    {
        url: 'https://www.youtube.com/watch?v=2_gLD1jarfU', logo: "/service.png", title: "Spiritual mentorship", tag: "paid", info: "8 this video teaches you how to handle ", time: 10,
    }
        // 'https://bit.ly/Introductionsclass',
        // 'https://bit.ly/MentorshipVideos',
        // 'https://bit.ly/Behaviourinthehome',
        // 'https://bit.ly/Class2Communication',
        // 'https://bit.ly/Class3Etiquette',
        // 'https://bit.ly/class4goodgrooming',
        // 'https://bit.ly/Class5PersonalHygiene',
        // 'https://bit.ly/Serviceisgreatness',
        // 'https://bit.ly/Faithfullnessclass',
    ];

    const playNextVideo = () => {
        if (currentVideoIndex < videoUrls.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    const playPreviousVideo = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(currentVideoIndex - 1);
        }
    };
    const [played, setPlayed] = React.useState(false)
    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
        router.push('/courses')
    };

    const handleAssessmentClose = () => {
        setPlayed(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (

        <Card sx={{ maxWidth: 340, borderRadius: "0.7rem", cursor: "pointer", boxShadow: '10px 10px 8px rgb(157 168 189 / 17%)' }} onClick={() => setOpen(true)}>
            <CardHeader
                avatar={
                    <Avatar src='logo.png' aria-label="moh" />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={ "N/A"}
                subheader={<Typography variant="caption" color="text.primary" >
                    by Evelyne Kihia
                </Typography>}
            />
            <CardMedia
                component="img"
                height="180"
                image="/thumbnail.png"
                alt="thumbnail"
            />
            <CardContent>
                <Typography variant="body2" color="text.primary">
                    {/* {course ? course.course.description : */}
                     "N/A"
                     {/* } */}
                </Typography>
            </CardContent>
            {open &&
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                >
                    <AppBar sx={{ position: 'relative' }} color="inherit" elevation={0}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }}>
                                Courses
                            </Typography>
                            <Button size="small" startIcon={<LocalLibraryIcon />} autoFocus color="primary" variant="contained" onClick={() => setPlayed(true)} sx={{ px: 2, borderRadius: "0.5rem" }}>
                                {isSmallScreen ? ` Assessment` : `View Assessment `}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Box component={Paper} sx={{ flexGrow: 1, py: isSmallScreen ? 0 : 1, px: 2 }}>
                        <Grid container spacing={3}>
                            <Grid item md={9} xs={12}>
                                <ReactPlayer
                                    url={videoUrls[currentVideoIndex].url}
                                    style={{ borderRadius: "10px" }}
                                    light={videoUrls[currentVideoIndex].logo}
                                    controls
                                    playing
                                    width="100%"
                                    height="90%"
                                    onEnded={playNextVideo}
                                />
                                <ListItem
                                    sx={{ p: 0.8, bgcolor: "background.default", borderRadius: "0.7rem" }}
                                    secondaryAction={
                                        <Stack
                                            direction="row" spacing={1}
                                            justifyContent="space-between"
                                            sx={{ p: 0.3 }}
                                        >
                                            <IconButton aria-label="previous" onClick={playPreviousVideo}>
                                                <SkipPreviousIcon fontSize="large" sx={{ color: "text.primary" }} />
                                            </IconButton>
                                            <IconButton aria-label="next" onClick={playNextVideo}>
                                                <SkipNextIcon fontSize="large" sx={{ color: "text.primary" }} />
                                            </IconButton>
                                        </Stack>
                                    }
                                >
                                    <ListItemAvatar >
                                        <Avatar sx={{ height: "3rem", width: "3rem", borderRadius: "0.3rem" }} src='/logo.png' />
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography variant="h6" component="div">
                                        { videoUrls[currentVideoIndex].title}
                                    </Typography>} secondary="By Evelyne Kihia" />
                                </ListItem >
                            </Grid>
                            <Grid item md={3} xs={12} mt={4.5} mb={2.5}>
                                <div>
                                    <List sx={{ p: 1, borderRadius: "0.7rem", bgcolor: "background.default" }}>
                                        <Stack
                                            direction="row" spacing={2}
                                            justifyContent="space-between"
                                        >
                                            <Typography variant="subtitle2" sx={{ mr: 2 }}>
                                                Courses Playlist
                                            </Typography>
                                            <ExpandMore
                                                expand={expanded}
                                                onClick={handleExpandClick}
                                                aria-expanded={expanded}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </ExpandMore>
                                        </Stack>
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            {videoUrls?.map((video, index) => (
                                                <>
                                                    <ListItem
                                                        key={index }
                                                        sx={{ cursor: "pointer" }}
                                                        onClick={() => setCurrentVideoIndex(index)}
                                                        secondaryAction={
                                                            <Chip size="small" color="secondary" variant="outlined" sx={{ fontSize: "0.7rem", borderRadius: "5px" }} label={video.tag} />
                                                        }
                                                    >
                                                        <ListItemAvatar >
                                                            <Avatar variant="square" sx={{ height: "3rem", width: "5rem", borderRadius: "0.3rem" }} src={video.logo} />
                                                        </ListItemAvatar>
                                                        <ListItemText sx={{ ml: 1 }} primary={
                                                            <Typography variant="subtitle2">{video.title}</Typography>
                                                        } secondary={
                                                            <Stack
                                                                direction="row" spacing={0.5}
                                                                justifyContent="flex-start"
                                                            >
                                                                <div>
                                                                    <Typography noWrap sx={{ textOverflow: "ellipsis" }}>{`${video.time} minutes`} </Typography>
                                                                </div>
                                                            </Stack>
                                                        } />
                                                    </ListItem >
                                                    <Divider variant="inset" component="li" />
                                                </>
                                            ))}
                                        </Collapse>
                                    </List>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Dialog>
            }
            {played &&
                <Dialog onClose={handleAssessmentClose} open={played} fullScreen>
                    <DialogTitle>Mentorship Assessment</DialogTitle>
                    <Typography variant="body2" sx={{pb:2,px:2}}>
                            This assessment is designed to evaluate the knowledge, skills, and abilities gained during the program and the participant's overall growth and development.
                        </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleAssessmentClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <BackIcon />
                    </IconButton>
                    < DialogContent sx={{ p: 2 }} dividers >
                       
                        <Box sx={{ width: '100%' }}>
                            <Stepper nonLinear activeStep={activeStep}>
                                {/* {steps.map((label, index) => (
                                    <Step key={label} completed={completed[index]}>
                                        <StepButton color="inherit" onClick={handleStep(index)}>
                                            {label}
                                        </StepButton>
                                    </Step>
                                ))} */}
                            </Stepper>
                            <div>
                                {allStepsCompleted() ? (
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>
                                            Your scored 100
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleReset}>Reset</Button>
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                            Step {activeStep + 1}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                                Next
                                            </Button>
                                            {activeStep !== steps.length &&
                                                (completed[activeStep] ? (
                                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                        Step {activeStep + 1} already completed
                                                    </Typography>
                                                ) : (
                                                    <Button onClick={handleComplete}>
                                                        {completedSteps() === totalSteps() - 1
                                                            ? 'Finish'
                                                            : 'Complete Step'}
                                                    </Button>
                                                ))}
                                        </Box>
                                    </React.Fragment>
                                )}
                            </div>
                        </Box>
                    </DialogContent>
                </Dialog>
            }
        </Card >
    );
}
