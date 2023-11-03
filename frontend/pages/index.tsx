import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Head from 'next/head'
import { styled, alpha, useTheme } from '@mui/material/styles';
import { useRouter } from "next/router";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import VideoCallIcon from '@mui/icons-material/VideoCallOutlined';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Image from 'next/image';
import { Box, Paper, InputBase, Tooltip, TextField, Skeleton, useMediaQuery, ListSubheader, Badge, Avatar, Chip, Collapse, ListItemAvatar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ReactPlayer from 'react-player'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { ExpandMore } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

interface ChipData {
  key: number;
  label: string;
}

const ChipItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.1),
}));



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#F2F2F2",
  '&:hover': {
    backgroundColor: "#D9D9D9",
  },
  marginLeft: "0.5rem"
}));

export default function FullScreenDialog() {
  const [openDialog, setOpenDialog] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const loading = false
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: 'All' },
    { key: 2, label: 'Live' },
    { key: 3, label: 'Related' },
    { key: 4, label: 'Watched' },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const videoUrls = [
    {
      url: 'https://vimeo.com/875046449', logo: "https://res.cloudinary.com/de3eoq2qb/image/upload/v1674036258/shiko_thumbnail_txfd2s.png", title: "Introduction", tag: "Madam Shiko", info: "Mentorship", time: 2,
    },
    {
      url: 'https://vimeo.com/864774108', logo: "https://res.cloudinary.com/de3eoq2qb/image/upload/v1674036258/shiko_thumbnail_txfd2s.png", title: "Behavior in the house", tag: "Madam Shiko", info: "Mentorship", time: 10,
    },
    {
      url: 'https://vimeo.com/875050461', logo: "https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/05/08140736/Modes-of-Communication.png", title: "Communication", tag: "Madam Shiko", info: "Mentorship ", time: 12,
    },
    {
      url: 'https://www.youtube.com/watch?v=g6ftrGgSx7c', logo: "https://www.marketing91.com/wp-content/uploads/2020/07/What-is-Etiquette.jpg", title: "Etiquette", tag: "Madam Shiko", info: "Mentorship ", time: 7,
    },
    {
      url: 'https://www.youtube.com/watch?v=NOEXGoYyzwU', logo: "https://media.istockphoto.com/id/1214942513/video/housekeeper-washing-the-dishes-wearing-protective-mask.jpg?s=640x640&k=20&c=uxdsPFsxq-a5eACn7MKaw5TwsNbqHahFq_qG3uCh8mU=", title: "Good grooming", tag: "Madam Shiko", info: "Mentorship ", time: 10,
    },
    {
      url: 'https://www.youtube.com/watch?v=kvEBz1iLB_E', logo: "https://healthcompassng.com/wp-content/uploads/2023/05/personal_hygeine_hero.jpg", title: "Personal Hygiene", tag: "Madam Shiko", info: "Mentorship", time: 12,
    },
    {
      url: 'https://www.youtube.com/watch?v=Qj8Joqv1zuU', logo: "https://quotefancy.com/media/wallpaper/3840x2160/98090-Jim-Rohn-Quote-Service-to-others-leads-to-greatness.jpg", title: "Service is greatness", tag: "Anonymous", info: "Mentorship ", time: 8,
    },
    {
      url: 'https://www.youtube.com/watch?v=B9V4rjaUIkw', logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN8DQGXLtnOOLYAvn_ElssRhpmJHwfsbqM856Yi8fwly--_r3_I0ZiTx_anwuhERYYVjs&usqp=CAU", title: "Faithfulness", tag: "Madam Shiko", info: "Mentorship ", time: 10,
    },
    {
      url: 'https://www.youtube.com/watch?v=R7E-rcuMUkQ', logo: "https://us.123rf.com/450wm/rudzhan/rudzhan2012/rudzhan201200494/161195537-male-housekeeper-in-yellow-overall-vacuum-cleaning-sofa.jpg?ver=6", title: "Cleaning the living room", tag: "Madam Shiko", info: "HouseKeeping ", time: 12,
    },

    {
      url: 'https://www.youtube.com/watch?v=o_WSbKeKmKU', logo: "https://us.123rf.com/450wm/rudzhan/rudzhan2012/rudzhan201200494/161195537-male-housekeeper-in-yellow-overall-vacuum-cleaning-sofa.jpg?ver=6", title: "Cleaning the dining room", tag: "Madam Shiko", info: "HouseKeeping ", time: 12,
    },
    {
      url: 'https://www.youtube.com/watch?v=w2mLErtOD0U', logo: "https://us.123rf.com/450wm/rudzhan/rudzhan2012/rudzhan201200494/161195537-male-housekeeper-in-yellow-overall-vacuum-cleaning-sofa.jpg?ver=6", title: "Cleaning the kitchen ", tag: "Madam Shiko", info: "HouseKeeping ", time: 12,
    },


    //  {
    //   url: 'https://www.youtube.com/watch?v=F0dmzlSYMeY&pp=ygUQbGF1bmRyeSB0cmFpbmluZw%3D%3D', logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4wPu6HUKsDus5-7zXu2hq8SL1PzOMMNpnZQ&usqp=CAU", title: "Laundry basics", tag: "Anonymous", info: "HouseKeeping", time: 8,
    // }
  ];

  const data = [
    {
      src: 'https://i.ytimg.com/vi/sBws8MSXN7A/maxresdefault.jpg',
      title: 'React JS Crash Course',
      channel: 'Traversy Media',
      views: '3.2M views',
      createdAt: '2 years ago',
      subs: '2M',
      id: "w7ejDZ8SWv8&t=5111s",
      avatar: 'https://yt3.ggpht.com/ytc/APkrFKYcYswt_UhD7D0j6ddiQz6Gb8Q_vSJOjhYI0CoXSw=s88-c-k-c0x00ffffff-no-rj',
      desc: "Get started with React in this crash course. We will be building a task tracker app and look at components, props, state, hooks, working with an API and more. Code:https://github.com/bradtraversy/react..."
    },
    {
      src: 'https://i.ytimg.com/vi/tvTRZJ-4EyI/maxresdefault.jpg',
      title: 'Kendrick Lamar - HUMBLE (Official Video)',
      channel: 'Kendrick Lamar',
      views: '935M views',
      subs: '12.3M',
      createdAt: '6 years ago',
      id: "tvTRZJ-4EyI",
      avatar: "https://yt3.googleusercontent.com/V4FqOieQ9y9dnErXPUZNWl1hyLafxIK7F55n5M8LVhPBmEou8kAbNuMlUZx23DoJHvH1sWG56No=s176-c-k-c0x00ffffff-no-rj-mo",
      desc: "Kendrick Lamar DAMN. Available now http://smarturl.it/DAMN Prod: Anthony Top Dawg Tiffith, Dave Free Nathan K. Scherrer, Jason Baum, Jamie Rabineau"
    },
    {
      src: 'https://i.ytimg.com/vi/PtRf6VS15oM/maxresdefault.jpg',
      title: 'Race Highlights | 2023 Mexico City Grand Prix',
      channel: 'FORMULA 1',
      views: '855K views',
      createdAt: '10 hours ago',
      subs: '2M',
      id: "PtRf6VS15oM",
      avatar: "https://yt3.ggpht.com/tyLW5LsJGwr4ViM30OeYbuLcu_MXfpRzP8y-X9_aKfTNJeMFHmnNbPyxxhaFDA9NRgwEu9mT-g=s88-c-k-c0x00ffffff-no-rj",
      desc: "Catch up on all the key moments from our 71-lap race around Autodromo Hermanos Rodriguez.  For more F1® videos, visit https://www.Formula1.com"
    },

    {
      src: 'https://i.ytimg.com/vi/5MuIMqhT8DM/maxresdefault.jpg',
      title: 'Sleep is your superpower | Matt Walker',
      channel: 'TED',
      views: '11M views',
      createdAt: '10 months ago',
      subs: '23.5M',
      id: "5MuIMqhT8DM",
      avatar: "https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg",
      desc: "Sleep is your life-support system and Mother Nature's best effort yet at immortality, says sleep scientist Matt Walker. In this deep dive into the science of slumber, Walker shares the wonderfully good things that happen when you get sleep -- and the alarmingly bad things that happen when you don't, for both your brain and body. Learn more about sleep's impact on your learning, memory. "
    },
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const theme = useTheme();
  const menuId = 'primary-search-account-menu';
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMenuOpen = Boolean(anchorEl);
  const isLoggedIn = Boolean(true);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorNotificationEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
  const openNotification = Boolean(anchorNotificationEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const {
    title,
  } = router.query;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    router.back()
  };

  return (
    <Box sx={{ flexGrow: 1, py: isSmallScreen ? 0 : 1, px: isSmallScreen ? 2 : 5 }}>
      <Grid container spacing={3}>
        <Grid item md={9} xs={12} sx={{ maxHeight: isSmallScreen ? "90vh" : "90vh" }} mb={3} mt={3}>
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
            sx={{ p: 0.8, bgcolor: "background.paper", borderRadius: "0.7rem" }}
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
              {videoUrls[currentVideoIndex].title}
            </Typography>} secondary={`By ${videoUrls[currentVideoIndex].tag}`} />
          </ListItem >
        </Grid>
        <Grid item md={3} xs={12} mb={7}>
          <div>
            <List sx={{ p: 1, borderRadius: "0.7rem", bgcolor: "background.paper" }}>

              <Stack
                direction="row" spacing={2}
                justifyContent="space-between"
              >
                <Typography variant="subtitle2" sx={{ mr: 2, fontWeight: "bold" }}>
                  Courses Playlist
                </Typography>
                {/* <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore> */}
              </Stack>
              <div>
                {videoUrls?.map((video, index) => (
                  <>
                    <ListItem
                      key={index}
                      sx={{ cursor: "pointer" }}
                      onClick={() => setCurrentVideoIndex(index)}
                    >
                      <ListItemAvatar >
                        <Avatar variant="square" sx={{ height: "4rem", width: "4rem", borderRadius: "0.3rem" }} src={video.logo} />
                      </ListItemAvatar>
                      <ListItemText sx={{ ml: 1 }} primary={
                        <Typography variant="subtitle2">{video.title}</Typography>
                      } secondary={
                        <>
                          <Typography display="block" variant="caption" color="text.secondary">
                            {video.info}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {`${video.time} min`}
                          </Typography>
                        </>
                      } />
                    </ListItem >
                    <Divider variant="inset" component="li" />
                  </>
                ))}
              </div>
            </List>
          </div>
          <Button color="primary" variant="outlined" size="small" fullWidth sx={{ my: 1 }}>View Time Planner</Button>

        </Grid>
      </Grid>
    </Box>
  );
}

