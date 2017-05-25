/**
 * Created by rachelg on 25/05/2017.
 */

const express = require('express');
const app = express();
const http = require('http');

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(jsonParser);

const ec2Domain = 'ec2-34-210-199-148.us-west-2.compute.amazonaws.com';
const port = 3000;
const getUserPathPrefix = '/getUser/';
const getAllUsersPath = '/getAllUsers';
const addUserPath = '/addUser';

app.get('/getUser/:username', function(req, res) {

    var reqOptions = {
        host: ec2Domain,
        port: port,
        path: getUserPathPrefix + req.params.username,
        method: 'GET'
    }

    var getUserRequest = http.request(reqOptions, function (resFromEc2) {
        resStatusCode = resFromEc2.statusCode;
        resFromEc2.on('data', function(resBody) {
            res.send(resBody.toString());
        })

    });

    getUserRequest.on('error', function(err) {
        console.log('Error occurred when sending a request to ec2: ' + JSON.stringify(err));
        res.status(500).send('Error :(')
    });

    getUserRequest.end();

});

app.get('/getAllUsers', function(req, res) {

    var reqOptions = {
        host: ec2Domain,
        port: port,
        path: getAllUsersPath,
        method: 'GET'
    }

    var getAllUsersRequest = http.request(reqOptions, function (resFromEc2) {
        resStatusCode = resFromEc2.statusCode;
        resFromEc2.on('data', function(resBody) {
            res.send(resBody.toString());
        })

    });

    getAllUsersRequest.on('error', function(err) {
        console.log('Error occurred when sending a request to ec2: ' + JSON.stringify(err));
        res.status(500).send('Error :(')
    });

    getAllUsersRequest.end();

});

app.post('/addUser', function(req, res) {

    var reqOptions = {
        host: ec2Domain,
        port: port,
        path: addUserPath,
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }



    var addUserRequest = http.request(reqOptions, function (resFromEc2) {
        resStatusCode = resFromEc2.statusCode;
        resFromEc2.on('data', function(resBody) {
            res.send(resBody.toString());
        })

    });

    addUserRequest.on('error', function(err) {
        console.log('Error occurred when sending a request to ec2: ' + JSON.stringify(err));
        res.status(500).send('Error :(')
    });


    console.log(JSON.stringify(req.body));
    addUserRequest.end(JSON.stringify(req.body));

});

app.listen(port, function () {
    console.log('Listening to port 3000...');
});