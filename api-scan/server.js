const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('promise-mysql');
const fileUpload = require('express-fileupload');
const cors = require('cors');
app.use(cors());

app.use(fileUpload({
	createParentPath: true
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')

mysql.createConnection({
	host: "localhost",
	database: "scannashi",
	user: "root",
	password: "",
	port: 3306
}).then((db) => {

    console.log('connecté bdd');
    setInterval(async function () {
        let res = await db.query('SELECT 1')
    }, 10000)

    app.get('/', async (req, res, next)=>{

        res.json({status: 200, msg: 'api ok'});

    })

    userRoutes(app, db);
    authRoutes(app, db);

})

const PORT = 9200;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})