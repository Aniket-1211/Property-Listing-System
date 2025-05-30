import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "aniket66patel@gmail.com",
      pass: "ogrfgmqaylqeesns",
    },
  });


  const emailSender=async(email,subject,text)=>{
    await transporter.sendMail({
    from: 'aniket66patel@gmail.com',
    to: email,
    subject:subject,
    text: text, // plain‑text body
  });
}

  export default emailSender;