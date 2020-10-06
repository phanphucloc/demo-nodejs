
var {configSystem} = require('../config/config');
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json()

module.exports = function (app , mongoose) {

    // connect mongoDB(use https://cloud.mongodb.com)
    // https://www.youtube.com/watch?v=JKBurpy_hfs&list=PLqnlyu33Xy-6g7IqU5-3BXOfewcJKoL08&index=78
    var Schema = mongoose.Schema;

    var personSchema = new Schema({
        firstName: String,
        lastName: String,
        address: String
    })

    var Person = mongoose.model('Person', personSchema);

    app.get(configSystem.baseURLApi + 'users', function (req, res) {
        Person.find(function (err, users) {
            if (err) throw error;
            else {
                res.json(users);
            }
        });
    })
    
    // Ex : /api/user/1?age=14
    app.get(configSystem.baseURLApi + 'user/:id', function (req, res) {
        res.cookie('username', req.params.id);
        Person.findOne({_id: req.params.id}, function (err, user) {
            if (err) throw error;
            else {
                res.json(user);
            }
        });
    })
    
    app.put(configSystem.baseURLApi + 'user', jsonParser , function (req, res) {
        var user = new Person(req.body);
        user.save(function (error) {
            if (error) throw error;
            else{
                res.json({
                    status: 'OK',
                    message: 'Create success'
                });
            }
        })
    })
    
    app.put(configSystem.baseURLApi + 'user/:id', jsonParser , function (req, res) {
        Person.update(
            {
                _id: req.params.id
            }, 
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address
            },
            function (err, users) {
                if (err) throw error;
                else {
                    res.json({
                        status: 'OK',
                        message: 'Create success'
                    });
                }
            }
        );
    })

    app.delete(configSystem.baseURLApi + 'user/:id', jsonParser , function (req, res) {
        Person.deleteOne({_id: req.params.id}, function (err, users) {
            if (err) throw error 
            else {
                res.json({
                    status: 'OK',
                    message: 'Create success'
                });
            }
        });
    })
    
}
