// src/components/CharacterForm.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CharacterForm = ({ character, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    power: '',
    team: 'Avengers'
  });

  useEffect(() => {
    if (character) {
      setFormData({
        id: character.id,
        name: character.name,
        description: character.description,
        power: character.power,
        team: character.team || 'Avengers'
      });
    }
  }, [character]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-blue-400 rounded-xl w-full max-w-md overflow-hidden"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <div className="bg-black p-4">
            <h2 className="text-xl font-bold text-white">
              {character ? 'Modifier Personnage' : 'Ajouter un Nouveau Personnage'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2" htmlFor="name">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                rows="3"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2" htmlFor="power">
                Pouvoir principal
              </label>
              <input
                type="text"
                id="power"
                name="power"
                value={formData.power}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2" htmlFor="team">
                Équipe
              </label>
              <select
                id="team"
                name="team"
                value={formData.team}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              >
                <option value="Avengers">Avengers</option>
                <option value="X-Men">X-Men</option>
                <option value="Guardians">Guardians of the Galaxy</option>
                <option value="Fantastic Four">Fantastic Four</option>
                <option value="Inhumans">Inhumans</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <motion.button
                type="button"
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg"
                onClick={onCancel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Annuler
              </motion.button>
              <motion.button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {character ? 'Modifier' : 'Ajouter'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CharacterForm;