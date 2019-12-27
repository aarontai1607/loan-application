var mongoose = require('mongoose');  

// Mongoose Schema
const LoanSchema = mongoose.Schema({
    product_type: String,
    loan_amount: Number,
    terms: Number,
	documents: String,
	applicant: String
});

const LoanModel = mongoose.model("Loan",LoanSchema);

module.exports = mongoose.model('Loan');