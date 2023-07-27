const express = require("express");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");
require("dotenv").config();

sgMail.setApiKey(process.env.SGMAIL);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { name, email, phone, address, price, prods, shipping } = req.body;

  const msg = {
    to: "rolling.royals.kft@gmail.com",
    from: "kovdanak@gmail.com",
    subject: "Új rendelés",
    text: "Rendelést visszaigazoló email",
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
        <br />
        Szállítási mód: ${shipping}
        </div>`,
  };
  const msg2 = {
    to: email,
    from: "kovdanak@gmail.com",
    subject: "Rendelést visszaigazoló email - Rolling Royals Kft.",
    text: "Rendelést visszaigazoló email",
    html: `<div class=" text-white p-8">
    <img src="https://rolling-royals.vercel.app/logo.png" alt="logo"
  <p class="text-2xl font-bold mb-4">RENDELÉSÉT FELDOLGOZTUK!</p>
  <p class="mb-4">Örömmel köszöntjük Vásárlóink között!</p>
  <p class="mb-4">Adminisztrációs kollégánk a megrendelést igazoló számlát 24 órán belül elkészíti és emailen megküldi.</p>

  <ul class="list-disc list-inside mb-4">
    <li>az alvázszámot</li>
    <li>a megrendelés időpontjában feltüntetett árat</li>
    <li>az esetleges szállítási költséget</li>
    <li>az átvételtől számított egy hetes garanciát</li>
  </ul>

  <p class="mb-4">Házhozszállítás esetén a rendelés összegét online bankkártyás fizetéssel fogja tudni kiegyenlíteni. A teljesítéshez szükséges linket a számlához csatolva küldjük emailen. A link a számla kiállítását követő naptári nap, 23:59-ig érvényes.</p>

  <p class="font-bold mb-2">FONTOS: Kizárólag a sikeres tranzakciót követően bízzuk meg futár partnerünk a kerékpár kiszállításával.</p>

  <p class="mb-2">6724 Szeged, Pulz utca 2/A</p>
  <p>+36 30 898 6139</p>
</div>
`,
  };

  try {
    await sgMail.send(msg);
    await sgMail.send(msg2);
    console.log(msg);
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

module.exports = app;
