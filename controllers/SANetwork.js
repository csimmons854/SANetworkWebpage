const express = require('express');
const router = express.Router();
const db  = require('../db');
const bcrypt = require("bcrypt");


router.get('/:user',(req,res) => {
    console.log("Getting items for " + req.params.user);
    let items = [];
    query('SELECT * FROM SADatabase.SmartAppliances left join SADatabase.registeredDevices ' +
        'on SADatabase.SmartAppliances.ID = SADatabase.registeredDevices.key ' +
        'where user = \'' + req.params.user + '\'').then(rows => {
        rows.forEach(element => {
            items.push({
                id: element.ID,
                name: element.Name,
                powerState: element.powerState,
                fields: []
            })
        });
        let getFields = items.map(currentValue => {
            return query('SELECT * FROM Fields WHERE Fields.id = ' + '\"' + currentValue.id + '\"');
        });

        Promise.all(getFields).then(data => {
            data.forEach(element => {
                element.forEach(field => {
                    items.forEach(item => {
                        if (item.id === field.id) {
                            item.fields.push({
                                name: field.name,
                                hasOptions: field.hasOptions,
                                options: [],
                                value: field.value,
                                valueValidation: field.valueValidation
                            })
                        }
                    })
                })
            });
            let optionsQuery = [];
            items.forEach(item => {
                item.fields.forEach(field => {
                    if (field.hasOptions === 1) {
                        optionsQuery.push(query("SELECT * FROM Options WHERE fieldName = \"" + field.name + " \" and id = \"" + item.id + "\""))
                    }
                });
            });
            Promise.all(optionsQuery).then(data => {
                data.forEach(optionArray => {
                    optionArray.forEach(option => {
                        items.forEach(item => {
                            item.fields.forEach(field => {
                                if (field.hasOptions === 1 && field.name === option.fieldName && item.id === option.id) {
                                    field.options.push(option.optionName);
                                }
                            })
                        })
                    })
                });
                res.send(items);
            });
        });
    });
});

router.post('/', (req,res,next) => {
    res.send("POST");

});

router.put('/', (req,res) => {
    let updateQuery = [];
    updateQuery.push(query('UPDATE SmartAppliances SET Name = \"' + req.body.name + '\" where id = \"' + req.body.id + "\""));
    req.body.fields.forEach(field => {
        updateQuery.push(query('UPDATE Fields SET value = \"' + field.value + '\" where id = \"' + req.body.id + '\" and name = \"' + field.name +'\"'));
    });
    updateQuery.push(query('UPDATE SmartAppliances SET Updated = 1'))
    Promise.all(updateQuery).then(
        res.send({success: true}));
});

router.put('/signUp', function signUp (req,res) {
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err){
            res.send({success: false})
        }
        if(hash) {
            query('INSERT INTO `SADatabase`.`User` (`User`, `password`) VALUES (\'' + req.body.username +'\', \'' + hash +'\')').then(result => {
                console.log('Success');
                res.send({success: true})
            }).catch( err => {
                console.log(err)
                if(err.code === 'PROTOCOL_SEQUENCE_TIMEOUT'){
                    console.log('Trying Again');
                    signUp(req,res);
                }
                res.send({success: false});
            })
        }
    });

});

router.put('/login', function login (req,res,next,count = 0){
    console.log('Login');
    console.log(req.body);
    query('SELECT * FROM SADatabase.User WHERE USER = \"' + req.body.username + '\"').then(result => {
        let hash;
        if (Object.getOwnPropertyNames(result).length !== 1) {
            hash = result[0].password;
            console.log(result);
            bcrypt.compare(req.body.password, hash, function (err, passed) {
                if (passed) {
                    res.send({code: 0, error: 'None'})
                } else if (!err) {
                    res.send({code: 2, error: 'Invalid Password'})
                }
                if (err) {
                    console.log(err);
                    res.send(({code: 6, error: 'Unknown Error Occurred'}))
                }
            })
        } else {
            res.send({code: 1, error: 'User Not Found'});
        }
    }).catch(err => {
        if(err.code === 'PROTOCOL_SEQUENCE_TIMEOUT' && count !== 2){
            console.log('Trying Again, Attempt ' + count + 2);
            login(req,res,count++);
        }
        res.send(({code: 5, error: 'Unknown Error Occurred'}))
    })
});


router.put('/registerKey', (req,res) => {
    console.log(req.body)
    query('INSERT INTO `SADatabase`.`registeredDevices` (`key`, `user`) VALUES (\'' +
        req.body.key + '\', \'' +
        req.body.user + '\')').then(result => {
        res.send({success: true})

    }).catch(err => {
        console.log(err);
        res.send({success: false})

    })
});

router.put('/disable', (req,res) => {
    console.log(req.body);
    query('UPDATE SmartAppliances SET powerState = ' + !req.body.powerState + ' where id = \"' + req.body.id + "\"");
    res.send({success: true});
});

router.put('/delete', (req,res)=> {
    query('DELETE FROM `SADatabase`.`SmartAppliances` WHERE `ID`=\'' + req.body.id + '\'');
    query('DELETE FROM `SADatabase`.`Fields` WHERE `ID`=\'' + req.body.id + '\'');
    query('DELETE FROM `SADatabase`.`Options` WHERE `ID`=\'' + req.body.id + '\'');
    res.send({success: true});

});


function query(sql) {
    console.log(sql);
    return new Promise( ( resolve, reject ) => {
        db.get().query( sql, ( err, rows ) => {
            if ( err )
                return reject( err );
            resolve( rows );
        } );
    } );
}


module.exports = router;