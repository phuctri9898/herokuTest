/**
 * Created by navnahn on 11/25/17.
 */
"use strict";

const express = require('express');
const app = express();

var Web3 = require('web3');
var Wallet = require('ethereumjs-wallet');

var web3 = new Web3(new Web3.providers.HttpProvider('http://www.blockathon.asia:8545'));
var codeABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addressRetailer",
                "type": "address"
            }
        ],
        "name": "getScoreCustomerFromCustomer",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addressUser",
                "type": "address"
            }
        ],
        "name": "getPublicKeyUser",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addressCustomer",
                "type": "address"
            }
        ],
        "name": "getScoreCustomerFromRetailer",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_testbool",
                "type": "bool"
            },
            {
                "name": "_pubkey",
                "type": "bytes32"
            }
        ],
        "name": "getDemo",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_pubKey",
                "type": "bytes32"
            },
            {
                "name": "_isCustomer",
                "type": "bool"
            }
        ],
        "name": "createUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_addressCustomer",
                "type": "address"
            },
            {
                "name": "_totalScoreEncryptCusPubKey",
                "type": "bytes32"
            },
            {
                "name": "_totalScoreEncryptRetPubKey",
                "type": "bytes32"
            },
            {
                "name": "_scoreChangeEncCusPubkey",
                "type": "bytes32"
            },
            {
                "name": "_scoreChangeEncRetPubkey",
                "type": "bytes32"
            },
            {
                "name": "_hashPoint",
                "type": "bytes32"
            }
        ],
        "name": "updateScoreToCustomer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];
var address = "0x80DED4cec3E4C01891C66584eF1Cbf5Bc8dcC458";

app.get('/', function (req, res) {
    res.send('Hello World!')
});


app.get('/getDemo', function (req, res) {

    var contract = new web3.eth.Contract(codeABI, address);

    contract.methods.getDemo(true, "0x4c426d76385ac0d4d22faae7e6a6010dc4c83901").call({from: '0x1ABbFe3E2F17E9b8eF5B63383CdAef963b7c4dcF'},
        function (error, result) {
            if (!error) {
                console.log(result);
                res.send({ok: true});
            }
            else
                console.error(error);
        });
});

app.get('/getPublicKeyUser/:from/:address', function (req, res) {
    var fromAdd = req.params.from;
    var addressNeed = req.params.address;
    var contract = new web3.eth.Contract(codeABI, address);
    contract.methods.getPublicKeyUser(addressNeed).call({from: fromAdd},
        function (error, result) {
            if (!error) {
                console.log(result);
                res.send(result);
            }
            else
                console.error(error);
        });
});

app.get('/createUser/:from/:publicKey/:isCustomer', function (req, res) {

    var fromAddress = req.params.from;
    var publicKey = req.params.publicKey;
    var isCustomer = req.params.isCustomer;


    var contract = new web3.eth.Contract(codeABI, address);
    contract.methods.createUser(publicKey, isCustomer).send({from: fromAddress, gas: 500000},
        function (error, result) {
            if (!error) {
                console.log(result);
                res.send({ok: true});
            }
            else
                console.error(error);
        });
});


app.get('/updateScoreToCustomer/:fromAdd/:addressCus/:totalScoreCusEnc/:totalScoreRetEnc/:changeScorecusEn/' +
    ':changeScoreRetEn/:hasPoint', function (req, res) {
    var fromAdd = req.params.fromAdd;
    var addressCus = req.params.addressCus;
    var totalScoreCusEnc = req.params.totalScoreCusEnc;
    var totalScoreRetEnc = req.params.totalScoreRetEnc;
    var changeScorecusEn = req.params.changeScorecusEn;
    var changeScoreRetEn = req.params.changeScoreRetEn;
    var hasPoint = req.params.hasPoint;

    var contract = new web3.eth.Contract(codeABI, address);
    contract.methods.updateScoreToCustomer(addressCus, totalScoreCusEnc, totalScoreRetEnc,
        changeScorecusEn, changeScoreRetEn, hasPoint).send({from: fromAdd, gas: 500000},
        function (error, result) {
            if (!error) {
                console.log(result);
                res.send({ok: true});
            }
            else
                console.error(error);
        });
});


app.get('/getScoreCustomerFromRetailer/:fromAdd/:addressCus/', function (req, res) {
    var fromAdd = req.params.fromAdd;
    var addressCus = req.params.addressCus;

    var contract = new web3.eth.Contract(codeABI, address);
    contract.methods.getScoreCustomerFromRetailer(addressCus).call({from: fromAdd},
        function (error, result) {
            if (!error) {
                console.log("response getScoreCustomerFromRetailer : " + result);
                res.send(result);
            }
            else
                console.error(error);
        });
});


app.get('/getScoreCustomerFromCustomer/:fromAdd/:addressRetail', function (req, res) {
    var fromAdd = req.params.fromAdd;
    var addressRetail = req.params.addressRetail;

    var contract = new web3.eth.Contract(codeABI, address);
    contract.methods.getScoreCustomerFromCustomer(addressRetail).call({from: fromAdd},
        function (error, result) {
            if (!error) {
                console.log("response getScoreCustomerFromCustomer : " + result);
                res.send(result);
            }
            else
                console.error(error);
        });
});

app.listen(5041, function () {
    console.log('Example app listening on port 5043!');


    web3.eth.personal.unlockAccount("0x1ABbFe3E2F17E9b8eF5B63383CdAef963b7c4dcF","!@superpassword");
    web3.eth.personal.unlockAccount("0x2EA1C8AF1E7aa5c8Fc572eB4125d72Ab9486E586","!@superpassword");
});

