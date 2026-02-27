import NoteCard from "./NoteCard";

export default function NoteList({ notes, onEdit, onDelete }) {
    if (!notes || !notes.length) {
        return (
            <div className="empty-state">
                <h2>No notes yet</h2>
                <p>Create your first note above!</p>
            </div>
        );
    }

    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
