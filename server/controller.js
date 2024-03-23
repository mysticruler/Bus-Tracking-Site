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


app.post('/tripsadding', (req, res) => {

    let tripData = {
        busid: req.body.busid,
        image: req.files.image.name,
        operatorname: req.body.operatorname,
        contactnumber: req.body.contactnumber,
        source: req.body.source,
        destination: req.body.destination,
        departuretime: req.body.departuretime,
        arrivaltime: req.body.arrivaltime,
        stops: [],
        status: 1,
        oppid: req.body.oppid

    };


    Object.keys(req.body).forEach(key => {
        if (key.startsWith('stop')) {
            tripData.stops.push(req.body[key]);
        }
    });


    database.then((db) => {
        db.collection('Trips').insertOne(tripData).then((result) => {

            const fileUpload = req.files.image;
            fileUpload.mv('public/images/' + tripData.image).then(() => {
                res.json('success');
            }).catch((err) => {
                res.status(500).json({ error: err.message });
            });
        }).catch((err) => {
            res.status(500).json({ error: err.message });
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});

app.post('/tripstatus', (req, res) => {
    const tripId = req.body.id;
    const newStatus = req.body.status;
    database.then((db) => {
        db.collection('Trips').updateOne({ _id: new mongodb.ObjectId(tripId) },
            { $set: { status: newStatus } }
        ).then((result) => {
            // console.log(result);
            res.json(result)
        }).catch((err) => {
            res.status(500).json({ error: err.message });
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


app.get('/tripview', (req, res) => {
    database.then((data) => {
        data.collection('Trips').find({}).toArray().then((result) => {
            res.json(result)
            // console.log(result);

        })
    })
})



app.get('/tripsearch', (req, res) => {
    const { pickupCity, dropCity } = req.query;

    if (!pickupCity || !dropCity) {
        return res.status(400).json({ error: "Please provide both pickupCity and dropCity in the query parameters." });
    }

    database.then((db) => {
        db.collection('Trips').find({}).toArray().then((trips) => {
            const results = trips.filter(trip => {
                const stopsLower = trip.stops.map(stop => stop.toLowerCase());
                const pickupCityLower = pickupCity.toLowerCase();
                const dropCityLower = dropCity.toLowerCase();
                const indexOfPickup = stopsLower.indexOf(pickupCityLower);
                const indexOfDrop = stopsLower.indexOf(dropCityLower);
                return indexOfPickup !== -1 && indexOfDrop !== -1 && indexOfPickup < indexOfDrop;
            });
            res.json(results);
        }).catch((err) => {
            console.error("Error fetching trips:", err);
            res.status(500).json({ error: "An error occurred while fetching trips." });
        });
    }).catch((err) => {
        console.error("Database connection error:", err);
        res.status(500).json({ error: "An error occurred while connecting to the database." });
    });
});



app.post('/tripdelete', (req, res) => {
    let tripdel = req.body.id;
    database.then((db) => {
        db.collection('Trips').deleteOne({ _id: new mongodb.ObjectId(tripdel) })
            .then((result) =>
                res.json("result"))
    })
})

app.post('/tripedit', (req, res) => {
    let tripid = req.body.id;
    database.then((dbdb) => {
        dbdb.collection('Trips').findOne({ _id: new mongodb.ObjectId(tripid) }).then((tripsss) => {
            res.json(tripsss);
        });
    });
});


app.post('/tripupdate', (req, res) => {
    let tripdata = {
        busid: req.body.busid,
        operatorname: req.body.operatorname,
        image: req.files?.image.name,
        contactnumber: req.body.contactnumber,
        source: req.body.source,
        destination: req.body.destination,
        departuretime: req.body.departuretime,
        arrivaltime: req.body.arrivaltime,
        stops: [],
        userid: req.body.userid
    };


    Object.keys(req.body).forEach(key => {
        if (key.startsWith('stop')) {
            tripdata.stops.push(req.body[key]);
        }
    });

    let tripvalue = req.body.id;
    let newvalue = '';

    if (req.files?.image) {
        newvalue = {
            busid: tripdata.busid,
            operatorname: tripdata.operatorname,
            contactnumber: tripdata.contactnumber,
            source: tripdata.source,
            destination: tripdata.destination,
            departuretime: tripdata.departuretime,
            arrivaltime: tripdata.arrivaltime,
            image: tripdata.image,
            stops: tripdata.stops
        };
        let fileUpdate = req.files.image;

        fileUpdate.mv('public/images/' + tripdata.image)
    } else {
        newvalue = {
            busid: tripdata.busid,
            operatorname: tripdata.operatorname,
            contactnumber: tripdata.contactnumber,
            source: tripdata.source,
            destination: tripdata.destination,
            departuretime: tripdata.departuretime,
            arrivaltime: tripdata.arrivaltime,
            stops: tripdata.stops
        };
    }

    database.then((db) => {
        db.collection('Trips').updateOne({ _id: new mongodb.ObjectId(tripvalue) },
            { $set: newvalue }).then((result) => {
                // console.log(result);
                res.json({ success: true });
            });
    });
});


app.get('/tripcount', (req, res) => {
    database.then((total) => {
        total.collection('Trips').distinct("_id").then((uniqueIds) => {
            const totalCount = uniqueIds.length;
            res.json({ totalCount });

        });
    });
});

app.get('/userscount', (req, res) => {
    database.then((total) => {
        total.collection('Users').distinct("_id").then((users) => {
            const totalusersCount = users.length;
            res.json({ totalusersCount });

        });
    });
});

app.get('/operatorscount', (req, res) => {
    database.then((total) => {
        total.collection('Operators').distinct("_id").then((opp) => {
            const totaloperatorsCount = opp.length;
            res.json({ totaloperatorsCount });


        });
    });
});



app.get('/tripactive', (req, res) => {
    database.then((data) => {
        data.collection('Trips').find({}).toArray().then((result) => {
            res.json(result)

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
    })
    // .catch(err => { console.log(err) })
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
                        res.json({ status: 'success', userType: 99 });
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
            // console.log(result);

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
                // console.log(res);

            })
    })
})






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
    })
    // .catch(err => { console.log(err) })
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
                        res.json({ status: 'success', userType: 99 });
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
    })
    // .catch(err => { console.log(err) })
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
                        res.json({ status: 'success', userType: 3, _id: ress._id }); // Include uid in the response
                    } else {
                        res.json({ status: 'success', userType: 4 }); // Include uid in the response
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
            // console.log(result);

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
                // console.log(res);

            })
    })
})

































































































































































app.listen(2222, () => {
    console.log('Backend is Running')
})