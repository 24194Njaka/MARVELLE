const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5173;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, "characters.json");





// Lire les données du fichier
const readData = async () => {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    return JSON.parse(data); // => { characters: [...] }
  } catch (error) {
    console.error("Erreur de lecture du fichier:", error);
    return { characters: [] }; // garder la même structure
  }
};





// Écrire dans le fichier
const writeData = async (data) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Erreur d'écriture dans le fichier:", error);
  }
};




// Obtenir tous les personnages
app.get("/api/characters", async (req, res) => {
  const data = await readData();
  res.json(data.characters);
});




// Ajouter un personnage
app.post("/api/characters", async (req, res) => {
  try {
    const data = await readData();
    const characters = data.characters;

    // Trouver le dernier id
    const lastId =
      characters.length > 0 ? Math.max(...characters.map((c) => c.id)) : 0;

    const newCharacter = {
      id: lastId + 1,
      ...req.body,
    };

    characters.push(newCharacter);

    await writeData({ characters });
    res.status(201).json(newCharacter);
  } catch (err) {
    console.error("Erreur lors de l'ajout :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});




// Mettre à jour un personnage
app.put("/api/characters/:id", async (req, res) => {
  const data = await readData();
  const characters = data.characters;

  const id = parseInt(req.params.id);
  const index = characters.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Personnage non trouvé" });
  }

  characters[index] = { ...characters[index], ...req.body };

  await writeData({ characters });
  res.json(characters[index]);
});




// Supprimer un personnage
app.delete("/api/characters/:id", async (req, res) => {
  const data = await readData();
  const characters = data.characters;

  const id = parseInt(req.params.id);
  const filteredCharacters = characters.filter((c) => c.id !== id);

  if (filteredCharacters.length === characters.length) {
    return res.status(404).json({ message: "Personnage non trouvé" });
  }

  await writeData({ characters: filteredCharacters });
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${port}`);
});
