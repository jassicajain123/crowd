const express = require("express");
const otpGenerator = require("otp-generator");
const app = express();
app.use(express.json());
require("dotenv");
import { from } from "@tsed/schema";
import AWS from "aws-sdk"
import {Request} from "express"
import {Response} from "express"
AWS.config.update({})
AWS.config.update({ region: "ap-south-1" });
AWS.config.update({accessKeyId:"AKIA3M3HOBCK3ZEX5QMN"});
AWS.config.update({secretAccessKey:"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"});

app.post("/ses", (req:Request, res:Response) => {
  console.log("toEamil = " + req.body.toEamil);

  var params = {
    Destination: {
      CcAddresses: ["agamjot3@gmail.com"],
      ToAddresses: [req.body.toEamil],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test email",
      },
    },
    Source: "admin@qantily.com",
  };

  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  sendPromise
    .then(function (data) {
      res.status(200).json({
        success: true,
        data,
      });
    })
    .catch(function (err) {
      res.status(400).json({
        success: true,
        data: err,
      });
    });
});

app.listen(5000, () => console.log("SES Service Listening on PORT 5000"));
