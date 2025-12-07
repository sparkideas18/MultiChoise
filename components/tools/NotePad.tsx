import React, { useState, useEffect, useRef } from 'react';
import { Note } from '../../types';
import ReactMarkdown from 'react-markdown';

const NotePad: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('multiChoice_notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    } else {
        const initialNote: Note = {
            id: '1',
            title: 'Welcome Note',
            content: '# Welcome to Smart Notes\n\nThis is a simple markdown editor. You can:\n\n- **Bold** text\n- *Italicize* text\n- Create lists\n\nEnjoy!',
            updatedAt: Date.now()
        };
        setNotes([initialNote]);
        setActiveNoteId('1');
    }
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (notes.length > 0) {
        localStorage.setItem('multiChoice_notes', JSON.stringify(notes));
    }
  }, [notes]);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      updatedAt: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setEditMode(true);
  };

  const updateNote = (key: keyof Note, value: string) => {
    if (!activeNoteId) return;
    setNotes(prev => prev.map(note => 
      note.id === activeNoteId 
        ? { ...note, [key]: value, updatedAt: Date.now() } 
        : note
    ));
  };

  const deleteNote = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    if (activeNoteId === id) {
        setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null);
    }
    // Remove from storage if empty
    if (newNotes.length === 0) {
        localStorage.removeItem('multiChoice_notes');
    }
  };

  const insertFormat = (prefix: string, suffix: string = '') => {
    if (!activeNoteId || !textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = activeNote?.content || '';

    const newContent = 
        currentContent.substring(0, start) +
        prefix +
        currentContent.substring(start, end) +
        suffix +
        currentContent.substring(end);

    updateNote('content', newContent);

    // Restore focus and selection position
    setTimeout(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(start + prefix.length, end + prefix.length);
        }
    }, 0);
  };

  // Manual Controls
  const handleManualSave = () => {
      localStorage.setItem('multiChoice_notes', JSON.stringify(notes));
  };

  const handleManualLoad = () => {
      const saved = localStorage.getItem('multiChoice_notes');
      if (saved) {
          const parsedNotes = JSON.parse(saved);
          setNotes(parsedNotes);
          // If we loaded notes and have no active selection, select the first one
          if (parsedNotes.length > 0 && !activeNoteId) {
             setActiveNoteId(parsedNotes[0].id);
          }
      }
  };

  const handleClearAll = () => {
      if (window.confirm("Are you sure you want to delete all notes? This cannot be undone.")) {
          setNotes([]);
          setActiveNoteId(null);
          localStorage.removeItem('multiChoice_notes');
      }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-slate-700 flex flex-col bg-slate-800/50">
        <div className="p-4 border-b border-slate-700 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
                 <h2 className="font-bold text-white">My Notes</h2>
                 <button onClick={createNote} className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition text-white" title="New Note">
                    <span className="material-icons text-sm">add</span>
                </button>
            </div>
            {/* Action Buttons */}
            <div className="flex space-x-2">
                <button 
                    onClick={handleManualSave} 
                    className="flex-1 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-300 transition flex justify-center items-center"
                    title="Save to Local Storage"
                >
                    <span className="material-icons text-[16px] mr-1">save</span> Save
                </button>
                <button 
                    onClick={handleManualLoad} 
                    className="flex-1 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-300 transition flex justify-center items-center"
                     title="Load from Local Storage"
                >
                    <span className="material-icons text-[16px] mr-1">download</span> Load
                </button>
                 <button 
                    onClick={handleClearAll} 
                    className="py-1.5 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded text-xs text-red-400 transition flex justify-center items-center"
                     title="Clear All Notes"
                >
                    <span className="material-icons text-[16px]">delete_sweep</span>
                </button>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {notes.map(note => (
                <div 
                    key={note.id}
                    onClick={() => setActiveNoteId(note.id)}
                    className={`p-4 border-b border-slate-700/50 cursor-pointer transition hover:bg-slate-700/50 group relative ${activeNoteId === note.id ? 'bg-indigo-900/20 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'}`}
                >
                    <h3 className="font-semibold text-slate-200 truncate pr-6">{note.title || 'Untitled'}</h3>
                    <p className="text-xs text-slate-500 mt-1 truncate">{note.content || 'No content'}</p>
                    <p className="text-[10px] text-slate-600 mt-2">{new Date(note.updatedAt).toLocaleDateString()}</p>
                    
                    <button 
                        onClick={(e) => deleteNote(e, note.id)}
                        className="absolute top-4 right-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                    >
                        <span className="material-icons text-sm">delete</span>
                    </button>
                </div>
            ))}
            {notes.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-sm">
                    No notes found. Create one to get started.
                </div>
            )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-slate-900">
        {activeNote ? (
            <>
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <input 
                        type="text"
                        value={activeNote.title}
                        onChange={(e) => updateNote('title', e.target.value)}
                        className="bg-transparent text-xl font-bold text-white focus:outline-none w-full"
                        placeholder="Note Title"
                    />
                    <div className="flex space-x-2 bg-slate-800 rounded-lg p-1 border border-slate-700">
                        <button 
                            onClick={() => setEditMode(true)}
                            className={`px-3 py-1 text-xs rounded transition ${editMode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Write
                        </button>
                        <button 
                            onClick={() => setEditMode(false)}
                            className={`px-3 py-1 text-xs rounded transition ${!editMode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Preview
                        </button>
                    </div>
                </div>

                {/* Formatting Toolbar */}
                {editMode && (
                  <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2 overflow-x-auto">
                      <button onClick={() => insertFormat('**', '**')} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition" title="Bold">
                          <span className="material-icons text-[18px]">format_bold</span>
                      </button>
                      <button onClick={() => insertFormat('_', '_')} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition" title="Italic">
                          <span className="material-icons text-[18px]">format_italic</span>
                      </button>
                      <div className="w-px h-4 bg-slate-700 mx-1"></div>
                      <button onClick={() => insertFormat('# ')} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition" title="Heading 1">
                          <span className="material-icons text-[18px]">title</span>
                      </button>
                      <button onClick={() => insertFormat('## ')} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition flex items-center justify-center w-[26px]" title="Heading 2">
                          <span className="text-xs font-bold">H2</span>
                      </button>
                      <div className="w-px h-4 bg-slate-700 mx-1"></div>
                      <button onClick={() => insertFormat('- ')} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition" title="Bullet List">
                          <span className="material-icons text-[18px]">format_list_bulleted</span>
                      </button>
                      <button onClick={() => insertFormat('1. ')} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition" title="Numbered List">
                          <span className="material-icons text-[18px]">format_list_numbered</span>
                      </button>
                      <div className="w-px h-4 bg-slate-700 mx-1"></div>
                      <button onClick={() => insertFormat('`', '`')} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition" title="Inline Code">
                          <span className="material-icons text-[18px]">code</span>
                      </button>
                      <button onClick={() => insertFormat('```\n', '\n```')} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition" title="Code Block">
                          <span className="material-icons text-[18px]">terminal</span>
                      </button>
                      <button onClick={() => insertFormat('> ')} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition" title="Quote">
                          <span className="material-icons text-[18px]">format_quote</span>
                      </button>
                  </div>
                )}

                <div className="flex-1 overflow-hidden relative">
                    {editMode ? (
                        <textarea 
                            ref={textareaRef}
                            value={activeNote.content}
                            onChange={(e) => updateNote('content', e.target.value)}
                            className="w-full h-full bg-slate-900 text-slate-300 p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed"
                            placeholder="Start writing..."
                        />
                    ) : (
                        <div className="w-full h-full overflow-y-auto p-6 prose prose-invert max-w-none">
                            <ReactMarkdown>{activeNote.content}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                <span className="material-icons text-6xl mb-4 text-slate-700">description</span>
                <p>Select a note or create a new one</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default NotePad;