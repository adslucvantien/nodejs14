const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: "ads.lucvantien@gmail.com",
      pass: "cybtdfmyhzvqswqh"
   }
});

const mailOptions = {
   from: "ads.lucvantien@gmail.com",
   to: "like.vespa.lx1@gmail.com",
   subject: "Nodemailer Test",
   html: "Test <button>sending</button> Gmail using Node JS"
};

transporter.sendMail(mailOptions, function(error, info){
   if(error){
      console.log(error);
   }else{
      console.log("Email sent: " + info.response);
   }
});