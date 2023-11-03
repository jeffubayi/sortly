import * as React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Box,
    TextField,
    Button,
    Typography,
    Avatar,
    Grid,
    Paper,
    Container,
    Divider,
    ListItemText,
    ListItem,
    ListItemAvatar,
    List,
    Dialog,
    IconButton,
    Toolbar,
    AppBar,
    DialogActions
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSession, useUser } from '@supabase/auth-helpers-react'
import CloseIcon from '@mui/icons-material/ArrowBackIos';
import MoreIcon from '@mui/icons-material/More';
import PageTitle from "../../components/pageTitle";

const messages = [
    { id: 1, text: "Hi there!", sender: "bot" },
    { id: 2, text: "Hello!", sender: "user" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
];

const ChatUI = () => {
    const [input, setInput] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const user = useUser();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    const handleSend = () => {
        if (input.trim() !== "") {
            console.log(input);
            setInput("");
        }
    };

    const handleInputChange = (event: any) => {
        setInput(event.target.value);
    };

    const handleOpenMessage = () => {
        setOpen(true);
    };

    const handleShowMessage = () => {
        setShow(true);
    };

    return (
        <Container maxWidth="md" component="main" sx={{ p: 3 }} >
            <PageTitle title="Messages" />
            <Grid container component="main"  >
                <Grid item xs={12} md={4} component={Paper} elevation={0}>
                    <Typography sx={{ p: 2, fontWeight: "bold" }} variant="body1">All messages</Typography>
                    <List sx={{ p: 1, height: isSmallScreen ? "100vh" : "" }}>
                        {[1, 2].map((index) => (
                            <>
                                <ListItem key={index} onClick={isSmallScreen ? handleOpenMessage : handleShowMessage}>
                                    <ListItemAvatar>
                                        <Avatar alt="Profile Picture" src={user?.user_metadata?.avatar_url} />
                                    </ListItemAvatar>
                                    <ListItemText primary="Jeff Ubayi" secondary='How can I assist you today?' />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        ))}
                    </List>
                </Grid>

                {isSmallScreen && open ?
                    (
                        <Dialog
                            maxWidth="xl"
                            open={open}
                            fullScreen
                        >
                            <AppBar sx={{ position: 'relative' }} color="inherit" elevation={0}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() => setOpen(false)}
                                        aria-label="close"

                                    >
                                        <CloseIcon />
                                    </IconButton>

                                    <ListItem sx={{ ml: 2, flex: 1 }} onClick={isSmallScreen ? handleOpenMessage : handleShowMessage}>
                
                                        <ListItemText primary={<Typography variant="h6" component="div">
                                            John Doe
                                        </Typography>} secondary='last seen' />

                                    </ListItem>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() => setOpen(false)}
                                        aria-label="close"

                                    >
                                        <MoreIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                            <Box
                                sx={{
                                    height: "85vh",
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: "grey.200",
                                }}
                            >
                                <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                                    {messages.map((message) => (
                                        <Message key={message.id} message={message} />
                                    ))}
                                </Box>

                            </Box>
                            <DialogActions >
                                <TextField
                                    size="small"
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }}
                                    fullWidth
                                    placeholder="Type a message"
                                    variant="outlined"
                                    value={input}
                                    onChange={handleInputChange}
                                />
                                <IconButton
                                    onClick={handleSend}
                                    sx={{ bgcolor: "primary.main", color: "grey.200", ml: 1 }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </DialogActions>
                        </Dialog>
                    ) : (
                        <Grid item xs={0} sm={0} md={8} >
                            <Box
                                sx={{
                                    height: "85vh",
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: "grey.200",
                                }}
                            >
                                <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                                    {messages.map((message) => (
                                        <Message key={message.id} message={message} />
                                    ))}
                                </Box>
                                <Box sx={{ p: 2, backgroundColor: "background.paper" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={10}>
                                            <TextField
                                                size="small"
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "10px",
                                                    }
                                                }}
                                                fullWidth
                                                placeholder="Type a message"
                                                variant="outlined"
                                                value={input}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                fullWidth
                                                color="primary"
                                                variant="contained"
                                                endIcon={<SendIcon />}
                                                onClick={handleSend}
                                            >
                                                Send
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    )}
            </Grid>
        </Container>

    );
};

const Message = ({ message }: { message: any }) => {
    const isBot = message.sender === "bot";
    const user = useUser();

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: isBot ? "flex-start" : "flex-end",
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isBot ? "row" : "row-reverse",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }} src={isBot ? "" : user?.user_metadata?.avatar_url} />

                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        ml: isBot ? 1 : 0,
                        mr: isBot ? 0 : 1,
                        // backgroundColor: isBot ? "primary.light" : "secondary.light",
                        borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                    }}
                >
                    <Typography variant="body1">{message.text}</Typography>
                </Paper>
            </Box>
        </Box>

    );
};

export default ChatUI;