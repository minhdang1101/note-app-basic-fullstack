import React, { useState ,useEffect } from 'react'; 
import Navbar from '../../components/Navbar/Navbar'
import dashboardImage from '../../assets/img/dashboard-image.jpg'
import TimeLineSideBar from '../../components/Bar/TimeLineSideBar'
import NoteCard from '../../components/Card/Note'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast';
import { FaSpinner } from 'react-icons/fa6';

const Home = () => {

  const [notes ,setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const [showToastMsg, setShowToastMessage] = useState({
    isShow: false,
    message: "",
    type: "add",
  });
  
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
  }

  const handleCloseToase= ()=>{
    setShowToastMessage ({
      isShow: false,
      message: "",
    });
  };

  

  const showToastMessage= (message, type)=>{
    setShowToastMessage ({
      isShow: true,
      message,
      type,
    });
  };

  const fetchNotes = async (query) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/notes',
        {params: {query: query}}
      );
      
      if (response.data && !response.data.error) {
        setNotes(response.data.notes);
            if (query !== undefined) {
                showToastMessage("Search successfully", "add");
            }
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (query) => {
    fetchNotes(query);
  };

  const addNote = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/add-note', {
        title: 'Ghi chú mới',
        content: '',
      });

      if (response.data && !response.data.error) {
        showToastMessage("Note add successfully", "add")
        const newNote = response.data.note;
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setSelectedNote(newNote);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }finally{
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
        fetchNotes("");
    };


  const updateNote = async (updatedNote) => {
    setIsLoading(true);
    try {
        const response = await axiosInstance.patch(`/edit-note/${updatedNote._id}`, {
            title: updatedNote.title,
            content: updatedNote.content
        });
        
        if (response.data && !response.data.error) {
            const noteFromServer = response.data.note;
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === noteFromServer._id ? noteFromServer : note
                )
            );
        }
    } catch (error) {
        console.error('Error updating note:', error);
    }finally{
      setIsLoading(false);
    }
  };

  const deleteNote = async (deleteNote) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(`/delete-note/${deleteNote._id}`);

      if (response.data && !response.data.error) {
        showToastMessage("Note delete successfully", "delete")
        setNotes(prevNotes => prevNotes.filter(note => note._id !== deleteNote._id));
        setSelectedNote(null);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }finally{
      setIsLoading(false);
    }
  };
  return <>
    <Navbar handleSearch={handleSearch} handleClearSearch={handleClearSearch} />

    <div className="relative w-full h-screen bg-gray-400">
    <img
        src={dashboardImage}
        alt="Dashboard background"
        className="absolute inset-0 object-cover w-full h-full z-0"
    />
    <div
        className="absolute inset-0 bg-black/50 z-10"
    ></div>
    <div className="absolute inset-0 z-20 grid overflow-hidden md:grid-cols-4 place-items-center text-center text-white px-4">
        <div className='md:col-span-1 h-full w-full border-r border-white/20'>
            <TimeLineSideBar
              notes={notes}
              onSelectNote={handleSelectNote}
              selectedNoteId={selectedNote ? selectedNote.id : null}
              onAddNote={addNote}
            />
        </div>
        <div className='md:col-span-3 w-full h-full'>
          {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <FaSpinner className="animate-spin text-4xl text-yellow-300" /> 
                </div>
            ) : (
                <NoteCard
                    note={selectedNote}
                    onUpdate={updateNote}
                    onDelete={deleteNote}
                />
            )}
        </div>
    </div>
    <Toast
      isShown={showToastMsg.isShow}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleCloseToase}
    />
    </div>
    
  </>
}

export default Home