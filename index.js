const express = require("express");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SGMAIL);

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { name, email, phone, address, price, prods } = req.body;

  const msg = {
    to: "levinandi98@gmail.com",
    from: "botos.levente2007@gmail.com",
    subject: "Új megrendelés",
    text: "RR",
    html: `<div>${name} leadott egy rendelést.
        <br />
        Telefonszám: <a href="tel:${phone}">${phone}</a>,
        <br />
        Email:  <a href="mailto:${email}">${email}</a>
        <br />
        Választotta: ${prods}
        <br />
        Cím: ${address}
        <br />
        Ár: ${price}
        </div>`,
  };

  try {
    await sgMail.send(msg);
    console.log("SGmail");
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }

  console.log("Sent");
  return res.status(200).json({ message: "Email sent successfully!" });
});
const PORT = 3200;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
