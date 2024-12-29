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

// Endpoint pro přidání rezervace
app.post("/cars/:id/reserve", (req, res) => {
  const carId = parseInt(req.params.id);
  const { fromDate, toDate } = req.body;

  const car = cars.find((c) => c.id === carId);
  if (car) {
    car.reservations.push({ fromDate, toDate });
    res.json({ message: "Rezervace přidána", car });
  } else {
    res.status(404).json({ message: "Auto nenalezeno" });
  }
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
