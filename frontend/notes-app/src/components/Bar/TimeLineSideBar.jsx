import React from 'react';
import { MdPostAdd } from "react-icons/md";
import YearSection from './YearSection';

const TimeLineSideBar = ({ notes, onSelectNote, selectedNoteId, onAddNote }) => {
    const groupedNotes = notes.reduce((acc, note) => {
        const year = new Date(note.createdOn).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(note);
        return acc;
    }, {});
    const sortedYears = Object.keys(groupedNotes).sort((a, b) => b - a);
    
    return (
        <div className="h-full w-full flex flex-col p-8 text-left">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-yellow-300">Dòng thời gian</h2>
                <button
                    onClick={onAddNote}
                    aria-label="Thêm ghi chú mới"
                >
                    <MdPostAdd size={28} className="text-yellow-300 cursor-pointer hover:text-yellow-500 transition-colors" />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto scrollbar-hide">
                {sortedYears.map(year => (
                    <YearSection
                        key={year}
                        year={year}
                        notes={groupedNotes[year]}
                        onSelectNote={onSelectNote}
                        selectedNoteId={selectedNoteId}
                    />
                ))}
            </div>
        </div>
    );
}

export default TimeLineSideBar;