let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const path = require("path");

// Authentication services
require("dotenv").config();
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://can-do-coop-default-rtdb.firebaseio.com", //Paste databaseURL from firebaseConfig here
});


const PORT = 4000;
const { response } = require('express');

const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.get('/', (req, res) => {
	return res.status(200).send("It's working");
}); app.listen(PORT, () => {
	console.log('Server Running sucessfully.');
});

app.use(express.static(path.join(__dirname, "client/build")));
app.use(
	fileUpload({
		useTempFiles: true,
		safeFileNames: true,
		preserveExtension: 4,
		tempFileDir: `${__dirname}/public/files/temp`
	})
);

app.post('/upload', (req, res, next) => {
	let connection = mysql.createConnection(config)
	console.log(req)
	let up = req.body;
	let uploadFile = req.files.file;
	const name = uploadFile.name;
	const md5File = req.files.file.md5;
	const saveAs = `${name}`;

	let sql = `INSERT INTO myFiles (doc_name, doc_type, tag, userID, data) 
	VALUES ('${name}', '${up.type}', '${up.tag}', '${1337}', '${uploadFile.data}')`;

	uploadFile.mv(`${__dirname}/public/files/${saveAs}`, function (err) {
		if (err) {
			return res.status(500).send(err);
		}
		return res.status(200).json({ status: 'uploaded', name, saveAs });
	});

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let success = JSON.stringify('Success')
		res.send({ express: success })
	});
	connection.end();
});

app.post('/api/getDocs', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT * FROM a6anjum.myFiles`;
	let data = [];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});




app.use(express.static(path.join(__dirname, "client/build")));

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });
  await jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    // if everything good, save to request for use in other routes
    req.userID = decoded.userID;
    next();
  });
};

app.post("/login", (req, res) => {
  const token = req.body.token;
  // idToken comes from the client app
  admin
    .auth()
    .verifyIdToken(token)
    .then(function (decodedToken) {
      let uid = decodedToken.uid;
      const token = jwt.sign({ userID: uid, sub: uid }, process.env.JWT_KEY, {
        expiresIn: 86400, // expires in 24 hours
      });
      //console.log(token);
      res.status(200).send({ auth: true, token: token });
    })
    .catch(function (error) {
      // error on verification
      console.log(error);
      res.status(404).send("No user found");
    });
});

app.post("/api/loadUserSettings", auth, (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;
  console.log(userID);

  let sql = `SELECT mode FROM user WHERE userID = 1`;
  console.log(sql);
  let data = [];
  //console.log(data);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
