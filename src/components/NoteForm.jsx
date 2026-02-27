export default function NoteForm({ editingNote, onSubmit, onCancelEdit }) {
    const noteData = editingNote ?? {
        title: "",
        content: "",
        category: "personal",
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        if (!formData.get("title").trim() || !formData.get("content").trim()) {
            alert('Fill in both title and content!');

            return;
        }

        const formValues = {
            title: formData.get("title").trim(),
            content: formData.get("content").trim(),
            category: formData.get("category"),
        };

        onSubmit(formValues);

        // reset form
        if (!editingNote) {
            event.target.reset();
        }
    };

    return (
        <form
            key={editingNote?.id ?? "new"}
            className="note-form"
            onSubmit={(event) => handleSubmit(event)}
        >
            <h2>{editingNote ? "Edit Note" : "Create New Note"}</h2>

            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" defaultValue={noteData.title} />
            </div>

            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    defaultValue={noteData.content}
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    defaultValue={noteData.category}
                >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="ideas">Ideas</option>
                    <option value="todo">Todo</option>
                </select>
            </div>

            <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                    {editingNote ? "Save Changes" : "Add Note"}
                </button>
                {editingNote && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancelEdit}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
