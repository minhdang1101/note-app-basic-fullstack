
import React, { useState } from 'react';
import { formatDate } from '../../utils/helper';
import { MdChevronRight } from "react-icons/md";

const YearSection = ({ year, notes, onSelectNote, selectedNoteId }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-4">
            <div
                className="flex items-center cursor-pointer p-2 bg-yellow-300 rounded-lg hover:bg-yellow-200"
                onClick={toggleCollapse}
            >
                <MdChevronRight
                    size={24}
                    className={`text-black-300 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                />
                <h3 className="text-xl font-semibold text-black ml-2 underlines">{year}</h3>
            </div>
            {isOpen && (
                <div className="space-y-3 overflow-y-auto max-h-60 scrollbar-hide mt-3 pl-4 border-l-2 border-yellow-300 ml-4 sidebarHidden">
                    {notes.map(note => (
                        <div
                            key={note._id}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                        selectedNoteId === note._id
                                            ? 'bg-yellow-300 text-black'
                                            : 'bg-yellow-300 text-black hover:bg-yellow-200'
                                    }`}
                            onClick={() => onSelectNote(note)}
                        >
                            <h4 className="font-medium">{note.title}</h4>
                            <p className={`text-sm ${selectedNoteId === note._id ? 'text-gray-700' : 'text-gray-400'}`}>
                                {formatDate(note.createdOn)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YearSection;