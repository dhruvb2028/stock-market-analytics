import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NSEIndex } from '../types';

interface IndexSelectorProps {
  indices: NSEIndex[];
  selectedIndex: NSEIndex;
  onSelectIndex: (index: NSEIndex) => void;
}

const IndexSelector: React.FC<IndexSelectorProps> = ({ 
  indices, 
  selectedIndex, 
  onSelectIndex 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleDropdown = () => setIsOpen(prev => !prev);
  
  const handleSelectIndex = (index: NSEIndex) => {
    onSelectIndex(index);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full md:w-64">
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900">{selectedIndex.name}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {indices.map(index => (
              <li key={index.id}>
                <button
                  type="button"
                  className={`block w-full px-4 py-2 text-left hover:bg-indigo-50 ${
                    selectedIndex.id === index.id ? 'bg-indigo-100 font-medium' : ''
                  }`}
                  onClick={() => handleSelectIndex(index)}
                >
                  {index.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IndexSelector;