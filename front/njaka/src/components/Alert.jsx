// src/components/Alert.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ character, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-gray-800 rounded-xl w-full max-w-md overflow-hidden"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <div className="bg-gradient-to-r from-red-700 to-red-900 p-4">
            <h2 className="text-xl font-bold text-white">Confirmation de suppression</h2>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
              <div>
                <h3 className="text-lg font-medium text-white">{character.name}</h3>
                <p className="text-gray-400">{character.team}</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer <span className="font-semibold text-white">{character.name}</span> ? Cette action est irréversible.
            </p>
            
            <div className="flex justify-end space-x-3">
              <motion.button
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg"
                onClick={onCancel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Annuler
              </motion.button>
              <motion.button
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                onClick={onConfirm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Supprimer
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;