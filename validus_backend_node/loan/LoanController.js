var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../auth/VerifyToken');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Loan = require('./Loan');

// CREATES A NEW Loan
router.post('/', VerifyToken, function(req, res, next) {
    Loan.create({
				product_type: req.body.product_type,
				loan_amount: req.body.loan_amount,
				terms: req.body.terms,
				documents: req.body.documents,
				applicant: req.body.applicant
			
        }, 
        function (err, loan) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(Loan);
        });
});

// RETURNS ALL THE LoanS IN THE DATABASE
router.get('/', VerifyToken, function(req, res, next) {
    Loan.find({}, function (err, loans) {
        if (err) return res.status(500).send("There was a problem finding the Loans.");
        res.status(200).send({
         // "number_cpu": osutils.cpuCount(),
        // "server_platform": osutils.platform(),
        // "server_uptime":osutils.sysUptime()
        });
    });
});

// GETS A SINGLE Loan FROM THE DATABASE
router.get('/:id', VerifyToken, function(req, res, next) {
    Loan.findById(req.params.id, function (err, loan) {
        if (err) return res.status(500).send("There was a problem finding the Loan.");
        if (!loan) return res.status(404).send("No Loan found.");
        res.status(200).send(Loan);
    });
});

// DELETES A Loan FROM THE DATABASE
router.delete('/:id', VerifyToken, function(req, res, next) {
    Loan.findByIdAndRemove(req.params.id, function (err, loan) {
        if (err) return res.status(500).send("There was a problem deleting the Loan.");
        res.status(200).send("Loan: "+ loan.name +" was deleted.");
    });
});

// UPDATES A SINGLE Loan IN THE DATABASE
router.put('/:id', VerifyToken, function(req, res, next) {
    Loan.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, loan) {
        if (err) return res.status(500).send("There was a problem updating the Loan.");
        res.status(200).send(loan);
    });
});

module.exports = router;