const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const dataRoutes = require('./routes/dataRoutes');
const cors = require('cors');
const path = require('path');

dbConnect();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: "https://alimentsglobal.netlify.app",
	})
);
app.use(express.urlencoded({ extended: true }));

__dirname = path.resolve();

app.use('/api/users',userRoutes);
app.use('/api/category',categoryRoutes);
app.use("/api/uploads",uploadRoutes)
app.use("/api/data",dataRoutes)
app.use("/uploads",express.static(path.join(__dirname + '/uploads')));

port = 4000||process.env.PORT;

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.listen(port,()=>{	
    console.log(`listening at port: ${port}`);
});

