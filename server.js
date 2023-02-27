let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const port = process.env.PORT || 5000;

const PORT = 4000;
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/', (req, res) => {
	return res.status(200).send("It's working");
}); app.listen(PORT, () => {
	console.log('Server Running sucessfully.');
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
	fileUpload({
		useTempFiles: true,
		safeFileNames: true,
		preserveExtension: true,
		tempFileDir: `${__dirname}/public/files/temp`
	})
);

app.post('/upload', (req, res, next) => {
	let uploadFile = req.files.file;
	const name = uploadFile.name;
	const md5 = require('md5');
	const md5File = md5(uploadFile);
	const saveAs = `${md5File}_${name}`;
	uploadFile.mv(`${__dirname}/public/files/${saveAs}`, function(err) {
	  if (err) {
		return res.status(500).send(err);
	  }
	  return res.status(200).json({ status: 'uploaded', name, saveAs });
	});
  });
app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
