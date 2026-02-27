export default function NoteCard({ note, onEdit, onDelete }) {
    const formattedDate = new Date(note.date).toLocaleDateString();

    return (
        <div className="note-card">
            <div className="note-card-header">
                <h3>{note.title}</h3>
                <span className={`note-category category-${note.category}`}>
                    {note.category}
                </span>
            </div>

            <div className="note-content">
                <p>{note.content}</p>
            </div>

            <div className="note-footer">
                <span className="note-date">{formattedDate}</span>
                <div className="note-actions">
                    <button className="btn-small btn-edit" type="button" onClick={() => onEdit(note.id)}>
                        Edit
                    </button>
                    <button className="btn-small btn-delete" type="button" onClick={() => onDelete(note.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
