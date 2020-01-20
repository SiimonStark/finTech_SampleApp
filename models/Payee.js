const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayeeSchema = new Schema({
  Payee: {
    type: {
      Name: String,
      Fax: String,
      Phone: String,
      Address: {
        Address1: String,
        Address2: String,
        City: String,
        StateOrProvince: String,
        Country: String,
        PostalCode: Number
      },
    required: true
    }
  },
  Payment: {
    type: {
      PAN: Number,
      CVV: Number,
      Exp: String
    },
    required: true
  },
  Remittance: {
    type: [{}],
    required: false
  }
});

module.exports = Payee = mongoose.model('payee', PayeeSchema);


/* 
Documentation: https://mongoosejs.com/docs/schematypes.html


SAMPLE FOR MODEL
{
    "Payee": {
      "Name": "BLEENDOT",
      "Fax": "(942) 424-2678",
      "Phone": "(980) 494-2960",
      "Address": {
        "Address1": "551 Hoyt Street",
        "Address2": "",
        "City": "Rivera",
        "StateOrProvince": "Ohio",
        "Country": "US",
        "PostalCode": 40529
      },
      "Attention": "Mcdaniel Blankenship",
      "SubmissionDate": "2017-02-06"
    },
    "Payment": {
      "PAN": 1313027774141142,
      "CVV": 723,
      "Exp": "11/2017"
    },
    "Remittance": [
      {
        "PayorName": "Cubix",
        "PayorId": 8314,
        "InvoiceNo": 16981,
        "Description": "Aliquip et aliqua nisi sit sit sint voluptate exercitation quis dolore aute tempor mollit fugiat.",
        "Amount": "$28,192.35"
      },
      {
        "PayorName": "Oceanica",
        "PayorId": 6013,
        "InvoiceNo": 930,
        "Description": "Cillum est est aute aliquip magna occaecat eiusmod labore velit consequat aute occaecat non eu.",
        "Amount": "$76,664.75"
      },
      {
        "PayorName": "Biotica",
        "PayorId": 18461,
        "InvoiceNo": 542,
        "Description": "Exercitation minim ex sint velit amet.",
        "Amount": "$30,718.78"
      }
    ]
  }
*/