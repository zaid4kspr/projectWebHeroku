const chercheur = require('../../models/chercheur')
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(userInfo){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  testAccount.user="chercheurfst@gmail.com"
  testAccount.pass="fst123456"
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', 
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    },  tls: {
      rejectUnauthorized: false
  }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: testAccount.user, // sender address
    to: userInfo.email , // list of receivers
    subject: "Votre candidature a été retenue " +userInfo.name+" ✔", // Subject line
    html: 'votre candidature a été retenue '+userInfo.name+' <br> <b> Vos informations :  </b><br> Nom de jeune fille  : '+userInfo.originalLastName +' <br> <br> Date de naissance : '+userInfo.birthdate +' <br> <br>  Lieu de naissance : '+userInfo.birthLocation +' <br> <br> Cin : '+userInfo.cin +' <br> <br> Passeport : '+userInfo.passeport +' <br> <br> Grade : '+userInfo.grade +' <br> <br> Etablissement : '+userInfo.etablissement +' <br> <br> Telephone : '+userInfo.tel +' <br><br> Dernier diplôme obtenu : '+userInfo.lastDiplome +' <br> <b>Note :</b>   </br>Votre signature de confirmation: <img src="cid:signatureImg"/>' ,
    attachments: [{
      filename: 'image.png',
      path:userInfo.signatureChercheur,
      cid: 'signatureImg' //same cid value as in the html img src
  }]
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



module.exports = function (router) {
// GET: List of chercheur
router.get('/chercheur', function (req, res) {
  chercheur.find()
    .sort({ 'name': 1 })
    .exec()
    .then(docs => res.status(200)
      .json(docs))
    .catch(err => res.status(500)
      .json({
        message: 'Error finding chercheur members',
        error: err
      }))
})

  // POST: Create new TeamMember...
  router.post('/chercheur', function (req, res) {
    let member = new chercheur()
    

    member.save(function (err, member) {
      if (err) {
        return res.status(400).json(err)
      }
      sendMail(req.body).catch(console.error);
      res.status(200).json(member)
    })
       

       
  })
}