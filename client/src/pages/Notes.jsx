import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Edit2, Trash2, Save, X, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/notes');
      setNotes(data);
    } catch (error) {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
    setIsEditing(true);
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      if (selectedNote) {
        // Update
        const { data } = await api.put(`/notes/${selectedNote._id}`, { title, content });
        setNotes(notes.map(n => n._id === selectedNote._id ? data : n));
        setSelectedNote(data);
        toast.success('Note updated');
      } else {
        // Create
        const { data } = await api.post('/notes', { title, content: content || ' ' });
        setNotes([data, ...notes]);
        setSelectedNote(data);
        toast.success('Note created');
      }
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to save note');
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n._id !== id));
      if (selectedNote?._id === id) {
        setSelectedNote(null);
        setIsEditing(false);
      }
      toast.success('Note deleted');
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-full">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary-500" /> My Notes
          </h2>
          <button 
            onClick={handleCreateNew}
            className="p-1.5 bg-primary-100 text-primary-600 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-800/50 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : notes.length === 0 ? (
            <div className="p-8 text-center">
              <div className="bg-gray-50 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">No notes yet. Create your first note!</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {notes.map(note => (
                <li 
                  key={note._id}
                  onClick={() => handleSelectNote(note)}
                  className={`p-4 cursor-pointer transition-colors ${selectedNote?._id === note._id ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="truncate pr-4">
                      <h3 className={`text-sm font-medium truncate ${selectedNote?._id === note._id ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
                        {note.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                        {note.content.substring(0, 50) || 'No content...'}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => handleDelete(e, note._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Editor/View */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-full">
        {isEditing ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white w-full placeholder-gray-400"
              />
              <div className="flex space-x-2 ml-4">
                <button 
                  onClick={handleSave}
                  className="flex items-center px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Save className="w-4 h-4 mr-1.5" /> Save
                </button>
                {selectedNote && (
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    <X className="w-4 h-4 mr-1.5" /> Cancel
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your notes here..."
              className="flex-1 p-6 bg-transparent border-none focus:outline-none resize-none text-gray-700 dark:text-gray-300 custom-scrollbar leading-relaxed"
            />
          </div>
        ) : selectedNote ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{selectedNote.title}</h1>
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                <Edit2 className="w-4 h-4 mr-1.5" /> Edit
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">{selectedNote.content}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
            <FileText className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
            <p>Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
