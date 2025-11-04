// src/components/Note/NoteDetail.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { BsJournalText } from "react-icons/bs";
import { formatDate } from '../../utils/helper';

const NoteDetail = ({ note, onDelete, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const debounceTimeout = useRef(null);
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [note]);

    useEffect(() => {
        if (!note) return;

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            if (note.title !== title || note.content !== content) {
                console.log("Đang tự động lưu...");
                onUpdate({ ...note, title, content });
            }
        }, 1000);
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [title, content, note, onUpdate]);
    if (!note) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8">
                <BsJournalText size={60} className="text-yellow-300 mb-4" />
                <p className="text-xl text-yellow-300">Chọn một ghi chú để xem và chỉnh sửa</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-8 text-left">
            <div className="flex justify-between items-start mb-4">
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Tiêu đề ghi chú"
                    className="flex-grow text-yellow-300 text-4xl font-bold bg-transparent border-b-2 border-transparent focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button 
                    onClick={() => onDelete(note)}
                    className="p-2 ml-4 text-yellow-300 hover:text-red-500 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Xóa ghi chú"
                >
                    <FiTrash2 size={20} />
                </button>
            </div>

            <p className="text-sm text-yellow-300 mb-6">{formatDate(note.createdOn)}</p>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nội dung ghi chú..."
                className="flex-grow text-yellow-300 bg-transparent rounded-lg p-2 focus:outline-none resize-none w-full text-lg leading-relaxed"
            ></textarea>
        </div>
    );
};

export default NoteDetail;