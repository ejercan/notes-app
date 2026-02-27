import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem("notes");

        return !savedNotes ? [] : JSON.parse(savedNotes);
    });
    const [editingNote, setEditingNote] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const categories = [
        { value: "all", label: "All" },
        { value: "personal", label: "Personal" },
        { value: "work", label: "Work" },
        { value: "ideas", label: "Ideas" },
        { value: "todo", label: "Todo" },
    ];

    const handleSubmit = (noteData) => {
        if (editingNote) {
            // UPDATE existing note
            setNotes(
                notes.map((note) =>
                    note.id === editingNote.id
                        ? { ...note, ...noteData, date: Date.now() }
                        : note,
                ),
            );
            setEditingNote(null);
        } else {
            // CREATE new note
            const newNote = {
                id: window.crypto.randomUUID(),
                ...noteData,
                date: Date.now(),
            };
            setNotes([newNote, ...notes]);
        }
    };

    const handleEdit = (noteId) => {
        const note = notes.find((note) => {
            return note.id === noteId;
        });
        setEditingNote(note);
    };

    const handleCancelEdit = () => {
        setEditingNote(null);
    };

    const handleDelete = (noteId) => {
        if (confirm("Are you sure you want to delete this note?")) {
            setNotes(notes.filter((note) => note.id !== noteId));
        }
    };

    const filteredNotes =
        selectedCategory === "all"
            ? notes
            : notes.filter((note) => note.category === selectedCategory);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    return (
        <div className="app">
            <h1>Quick Notes</h1>

            <NoteForm
                onSubmit={handleSubmit}
                editingNote={editingNote}
                onCancelEdit={handleCancelEdit}
            />

            <div className="category-filter">
                {categories.map((category) => (
                    <button
                        key={category.value}
                        type="button"
                        className={`filter-btn ${selectedCategory === category.value ? "active" : ""}`}
                        onClick={() => setSelectedCategory(category.value)}
                        
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            <NoteList
                notes={filteredNotes}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;
