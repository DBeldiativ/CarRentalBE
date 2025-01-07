const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Hlavní stránka
app.get('/', (req, res) => {
  res.send('Backend běží! 🚀');
});

// Mock data - seznam aut
let cars = [
    { id: 1, name: "Lexus RX 500h", description: "Hybridní luxusní SUV", image: "lexus-rx-500h.jpg", reservations: [] },
    { id: 2, name: "Audi Q8", description: "Elegantní SUV s prémiovou výbavou", image: "audi-q8.jpg", reservations: [] },
    { id: 3, name: "Volvo XC90", description: "Bezpečné rodinné SUV", image: "volvo-xc90.jpg", reservations: [] },
];

// Endpoint pro získání seznamu aut
app.get("/cars", (req, res) => {
  res.json(cars);
});

// Endpoint pro přidání rezervace s validací
app.post("/cars/:id/reserve", (req, res) => {
  const carId = parseInt(req.params.id);
  const { fromDate, toDate } = req.body;

  const car = cars.find((c) => c.id === carId);
  if (!car) {
    return res.status(404).json({ message: "Auto nenalezeno" });
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);
  const today = new Date();

  // Validace: Datum musí být v budoucnosti
  if (from < today || to < today) {
    return res.status(400).json({ message: "Nelze rezervovat auto v minulosti" });
  }

  // Validace: Kontrola překrývajících se rezervací
  const overlapping = car.reservations.some(reservation => {
    const resFrom = new Date(reservation.fromDate);
    const resTo = new Date(reservation.toDate);
    return (from <= resTo && to >= resFrom);
  });

  if (overlapping) {
    return res.status(400).json({ message: "Termín je již rezervován" });
  }

  // Přidání rezervace
  car.reservations.push({ fromDate, toDate });
  res.json({ message: "Rezervace přidána", car });
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});

