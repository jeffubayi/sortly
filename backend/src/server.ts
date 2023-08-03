import app from "./app";
import mongoose from "mongoose";

const port = 4000;

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://codecarter17:LjuDXsIK6Nuc9ZGY@cluster3.albxpnb.mongodb.net/sava_byte?retryWrites=true&w=majority')
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch(console.error);