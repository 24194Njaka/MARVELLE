
import "./style.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CharacterTable from "./components/CharacterTable";
import CharacterForm from "./components/CharacterForm";
import Alert from "./components/Alert";

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertCharacter, setAlertCharacter] = useState(null);

  useEffect(() => {
    const mockCharacters = [

      {
        id: 1,
        name: "Spider-Man",
        realName: "Peter Parker",
        universe: "Earth-616",
      },
      {
        id: 2,
        name: "Iron Man",
        realName: "Tony Stark",
        universe: "Earth-616",
      },
      {
        id: 3,
        name: "Captain America",
        realName: "Steve Rogers",
        universe: "Earth-616",
      },
      {
        id: 4,
        name: "Black Widow",
        realName: "Natasha Romanoff",
        universe: "Earth-616",
      },
      {
        id: 5,
        name: "Black Panther",
        realName: "T'Challa",
        universe: "Earth-616",
      },
      {
        id: 6,
        name: "Doctor Strange",
        realName: "Stephen Strange",
        universe: "Earth-616",
      },
      {
        id: 7,
        name: "Scarlet Witch",
        realName: "Wanda Maximoff",
        universe: "Earth-616",
      },
      {
        id: 8,
        name: "Hulk",
        realName: "Bruce Banner",
        universe: "Earth-616",
      },
    ];

    setCharacters(mockCharacters);
    setFilteredCharacters(mockCharacters);
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredCharacters(characters);
      return;
    }

    const filtered = characters.filter(
      (character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        character.team.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCharacters(filtered);
  };

  const handleAddCharacter = () => {
    setEditingCharacter(null);
    setShowForm(true);
  };

  const handleSaveCharacter = (character) => {
    if (character.id) {
      // Modification
      const updatedCharacters = characters.map((c) =>
        c.id === character.id ? character : c
      );
      setCharacters(updatedCharacters);
      setFilteredCharacters(updatedCharacters);
    } else {
      // Ajout
      const newCharacter = {
        ...character,
        id: Math.max(...characters.map((c) => c.id), 0) + 1,
      };
      const updatedCharacters = [...characters, newCharacter];
      setCharacters(updatedCharacters);
      setFilteredCharacters(updatedCharacters);
    }

    setShowForm(false);
  };

  const handleEditCharacter = (character) => {
    setEditingCharacter(character);
    setShowForm(true);
  };

  const handleDeleteCharacter = (character) => {
    setAlertCharacter(character);
    setShowAlert(true);
  };

  const confirmDelete = () => {
    const updatedCharacters = characters.filter(
      (c) => c.id !== alertCharacter.id
    );
    setCharacters(updatedCharacters);
    setFilteredCharacters(updatedCharacters);
    setShowAlert(false);
    setAlertCharacter(null);
  };

  const cancelDelete = () => {
    setShowAlert(false);
    setAlertCharacter(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
      <Navbar onSearch={handleSearch} onAddCharacter={handleAddCharacter} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center animate-pulse">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
            MARVELLE CHARACTERS
          </span>
        </h1>

        <CharacterTable
          characters={filteredCharacters}
          onEdit={handleEditCharacter}
          onDelete={handleDeleteCharacter}
        />
      </div>

      {showForm && (
        <CharacterForm
          character={editingCharacter}
          onSave={handleSaveCharacter}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showAlert && alertCharacter && (
        <Alert
          character={alertCharacter}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <footer className="py-6 text-center text-gray-400">
        <p>Projet Fullstack Marvel - React + Express.js</p>
        <p className="mt-2 text-sm">
          Technologies: React, Vite, Tailwind CSS, Express.js
        </p>
      </footer>
    </div>
  );
}

export default App;
