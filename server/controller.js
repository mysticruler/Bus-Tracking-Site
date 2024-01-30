var express = require('express')
var app = express()

var database = require('./database')
var mongodb = require('mongodb')
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path');
var bcrypt = require('bcrypt')
var fileUp = require('express-fileupload')
let poppop = require('alert')

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use(fileUp())
app.use(express.static(path.join(__dirname, 'public/images')));


app.post('/tripsadding', (req, ress) => {
    var Trips = {

        busid: req.body.busid,
        operatorname: req.body.operatorname,
        contactnumber: req.body.contactnumber,
        source: req.body.source,
        destination: req.body.destination,
        nextstop: req.body.nextstop,
        departuretime: req.body.departuretime,
        arrivaltime: req.body.arrivaltime

    }

    database.then((data) => {
        data.collection('Trips').insertOne(Trips).then((res) => {
        })
    })
    ress.json('sucess')

})



app.get('/tripview', (req, res) => {
    database.then((data) => {
        data.collection('Trips').find({}).toArray().then((result) => {
            res.json(result)
            console.log(result);

        })
    })
})


app.get('/tripsearch', (req, res) => {
    database.then((search) => {
        search.collection('Trips').find({}).toArray().then((out) => {
            res.json(out)
            console.log(out);

        })
    })
})


app.post('/tripdelete', (req, res) => {
    let tripdel = req.body.id;
    database.then((db) => {
        db.collection('Trips').deleteOne({ _id: new mongodb.ObjectId(tripdel) })
            .then((result) =>
                res.json("result"))
    })
})



app.post('/tripedit', (req, res) => {
    let tripid = req.body.id
    database.then((dbdb) => {
        dbdb.collection('Trips').findOne({ _id: new mongodb.ObjectId(tripid) }).then((tripsss) => {
            res.json(tripsss)
        })
    })
})


app.post('/tripupdate', (req, res) => {
    let tripdata = {

        busid: req.body.busid,
        operatorname: req.body.operatorname,
        contactnumber: req.body.contactnumber,
        source: req.body.source,
        destination: req.body.destination,
        nextstop: req.body.nextstop,
        departuretime: req.body.departuretime,
        arrivaltime: req.body.arrivaltime

    }
    let tripvalue = req.body.id
    database.then((db) => {
        db.collection('Trips').updateOne({ _id: new mongodb.ObjectId(tripvalue) }
            , { $set: tripdata }).then((res) => {
                console.log(res);

            })
    })
})

















app.post('/userregister', (req, res) => {
    var newuser = {
        usermail: req.body.usermail,
        password: req.body.password,
        usertype: 1
    }

    database.then((dbb) => {
        dbb.collection('Users').insertOne(newuser, function (err, result) {
            res.json('success');
        });
    }).catch(err => { console.log(err) })
});


app.post('/userlogin', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2222');
    res.setHeader('Access-Control-Allow-Credentials', 'true')


    let logg = {
        usermail: req.body.usermail,
        password: req.body.password
    }

    database.then((dd) => {
        dd.collection('Users').findOne({ usermail: logg.usermail }).then((ress) => {

            if (ress) {
                if (logg.password == ress.password) {
                    req.session = ress;
                    if (ress.usertype == 1) {
                        res.json({ status: 'success', userType: 1 });
                    } else {
                        res.json({ status: 'success', userType: 2 });
                    }
                } else {
                    res.status(401).json({ status: 'error', message: 'Wrong password' });

                }
            } else {
                res.status(404).json({ status: 'error', message: 'User not found' });
            }
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    });
});

app.get('/userview', (req, res) => {
    database.then((data) => {
        data.collection('Users').find({}).toArray().then((result) => {
            res.json(result)
            console.log(result);

        })
    })
})

app.post('/userdelete', (req, res) => {
    let userdel = req.body.id;
    database.then((db) => {
        db.collection('Users').deleteOne({ _id: new mongodb.ObjectId(userdel) })
            .then((result) =>
                res.json("result"))
    })
})


app.post('/useredit', (req, res) => {
    let userid = req.body.id
    database.then((dbdb) => {
        dbdb.collection('Users').findOne({ _id: new mongodb.ObjectId(userid) }).then((uusser) => {
            res.json(uusser)
        })
    })
})


app.post('/userupdate', (req, res) => {
    let userdata = {

        usermail: req.body.usermail,
        password: req.body.password,

    }
    let uservalue = req.body.id
    database.then((db) => {
        db.collection('Users').updateOne({ _id: new mongodb.ObjectId(uservalue) }
            , { $set: userdata }).then((res) => {
                console.log(res);

            })
    })
})


// app.post('/userlogout', (req, res) => {
//     req.session.destroy(err => {
//       if (err) {
//         res.status(500).json({ status: 'error', message: 'Failed to logout' });
//       } else {
//         res.json({ status: 'success', message: 'Logout successful' });
//       }
//     });
//   });




app.post('/adminregister', (req, res) => {
    var newadmin = {
        adminmail: req.body.adminmail,
        password: req.body.password,
        usertype: 2
    }

    database.then((dbb) => {
        dbb.collection('Admins').insertOne(newadmin, function (err, result) {
            res.json('success');
        });
    }).catch(err => { console.log(err) })
});


app.post('/adminlogin', (req, res) => {

    let adminlogg = {
        adminmail: req.body.adminmail,
        password: req.body.password
    }

    database.then((dd) => {
        dd.collection('Admins').findOne({ adminmail: adminlogg.adminmail }).then((ress) => {

            if (ress) {
                if (adminlogg.password == ress.password) {
                    req.session = ress;
                    if (ress.usertype == 2) {
                        res.json({ status: 'success', userType: 2 });
                    } else {
                        res.json({ status: 'success', userType: 3 });
                    }
                } else {
                    res.status(401).json({ status: 'error', message: 'Wrong password' });

                }
            } else {
                res.status(404).json({ status: 'error', message: 'User not found' });
            }
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    });
});





app.post('/operatorregister', (req, res) => {
    var newopp = {
        oppmail: req.body.oppmail,
        password: req.body.password,
        usertype: 3
    }

    database.then((dbb) => {
        dbb.collection('Operators').insertOne(newopp, function (err, result) {
            res.json('success');
        });
    }).catch(err => { console.log(err) })
});



app.post('/operatorlogin', (req, res) => {

    let opplogg = {
        oppmail: req.body.oppmail,
        password: req.body.password
    }

    database.then((dd) => {
        dd.collection('Operators').findOne({ oppmail: opplogg.oppmail }).then((ress) => {

            if (ress) {
                if (opplogg.password == ress.password) {
                    req.session = ress;
                    if (ress.usertype == 3) {
                        res.json({ status: 'success', userType: 3 });
                    } else {
                        res.json({ status: 'success', userType: 4 });
                    }
                } else {
                    res.status(401).json({ status: 'error', message: 'Wrong password' });

                }
            } else {
                res.status(404).json({ status: 'error', message: 'User not found' });
            }
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    });
});

app.get('/operatorview', (req, res) => {
    database.then((data) => {
        data.collection('Operators').find({}).toArray().then((result) => {
            res.json(result)
            console.log(result);

        })
    })
})

app.post('/operatordelete', (req, res) => {
    let oppdel = req.body.id;
    database.then((db) => {
        db.collection('Operators').deleteOne({ _id: new mongodb.ObjectId(oppdel) })
            .then((result) =>
                res.json("result"))
    })
})


app.post('/operatoredit', (req, res) => {
    let operatorid = req.body.id
    database.then((dbdb) => {
        dbdb.collection('Operators').findOne({ _id: new mongodb.ObjectId(operatorid) }).then((oppss) => {
            res.json(oppss)
        })
    })
})


app.post('/operatorupdate', (req, res) => {
    let oppdata = {

        oppmail: req.body.oppmail,
        password: req.body.password

    }
    let oppvalue = req.body.id
    database.then((db) => {
        db.collection('Operators').updateOne({ _id: new mongodb.ObjectId(oppvalue) }
            , { $set: oppdata }).then((res) => {
                console.log(res);

            })
    })
})

































































































































































app.listen(2222, () => {
    console.log('Backend is Running')
})