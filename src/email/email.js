const sgMail= require('@sendgrid/mail')
const sendGridAPIKEY='YOUR_API_KEY'
sgMail.setApiKey(sendGridAPIKEY)

const sendVerifyEmail=(email,link)=>{

    sgMail.send({
        to:email,
        from:'email address of sender',
        subject:'Please Verify your Email Address',
        text:`click the link to verify \n ${link}`

    })
}



module.exports=sendVerifyEmail