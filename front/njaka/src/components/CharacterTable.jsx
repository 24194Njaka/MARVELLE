// src/components/CharacterTable.jsx
import React from "react";
import { motion } from "framer-motion";

const CharacterTable = ({ characters, onEdit, onDelete }) => {
  if (characters.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-gray-400 text-xl">Aucun personnage trouvé</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="overflow-x-auto rounded-xl border border-gray-700 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <table className="min-w-full divide-y divide-blue-300">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
              name
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
              realName
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
              universe
            </th>
          </tr>
        </thead>
        <tbody className="bg-blue-400 divide-y divide-gray-700">
          {characters.map((character, index) => (
            <motion.tr
              key={character.id}
              className="hover:bg-gray-700/50 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {character.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {character.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
                {character.realName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {character.universe}
              </td>

              <td className="px-6 py-4  whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <motion.button
                    className="text-blue-400 hover:text-blue-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(character)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </motion.button>
                  <motion.button
                    className="text-red-400 hover:text-red-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(character)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default CharacterTable;
