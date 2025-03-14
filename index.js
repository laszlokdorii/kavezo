import express from "express";
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kavezo'
});

app.get('/kavezo', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM koncertek');
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving koncertek: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/kavezo', async (req, res) => {
    try {
        const { felleponev, kezdesido, idotartam } = req.body;

        if (!felleponev || felleponev.length === 0) {
            return res.status(400).json({ error: "A fellépő nevét nem hagyhatja üresen!" });
        }

        const kezdesDatum = new Date(kezdesido);
        const jelenlegiDatum = new Date();
        if (isNaN(kezdesDatum.getTime()) || kezdesDatum <= jelenlegiDatum) {
            return res.status(400).json({ error: "A dátum csak jövő időben lehet!" });
        }

        if (!idotartam || idotartam < 30 || idotartam > 180) {
            return res.status(400).json({ error: "A koncert időtartam 30 és 180 perc között lehet." });
        }

        const query = 'INSERT INTO koncertek (felleponev, kezdesido, idotartam) VALUES (?, ?, ?)';
        const values = [felleponev, kezdesido, idotartam];
        await db.query(query, values);

        res.status(200).json({ message: "A koncert sikeresen mentve lett!" });
    } catch (error) {
        console.error(`Error inserting concert: ${error}`);
        res.status(500).json({ error: "Szerverhiba történt!" });
    }
});

app.patch('/kavezo/:id/elmarad', async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query('UPDATE koncertek SET elmarad = 1 WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "A megadott koncert nem található." });
        }

        res.status(200).json({ message: "A koncert sikeresen elmaradásként lett jelölve!" });
    } catch (error) {
        console.error(`Error updating concert status: ${error}`);
        res.status(500).json({ error: "Szerverhiba történt!" });
    }
});



app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
