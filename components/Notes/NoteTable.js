import React from 'react';
import PropTypes from 'prop-types';

const NoteTable = props => {
    const notes = props.notes;
    var i = 0;
    const noteRows = notes.map(note => {
        //     let classes = `small ${!!note.isNew ? 'table-success' : ''}`;
        i = i + 1;
        return (
            <div className="col-sm-4 col-md-3 col-xl-2 ml-auto" key={i}>
                <div className="movie-card card">
                    <div className="card-body">
                        <h4 className="card-title">{note.title}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{`${new Date(note.updatedDate).toISOString().slice(0, 10)} ${new Date(note.updatedDate).toISOString().slice(11, 16)}`}</h6>
                        <p className="text-justify" style={{ fontSize: '14px' }}>
                            {note.content}
                        </p>
                    </div>
                    <div className="card-footer">
                        <div className="clearfix">
                            <div className="float-left mt-1" />
                            <div className="d-flex flex-row">
                                <div className="mr-auto p-2">
                                    <a data-toggle="tooltip" data-placement="top" title="Edit Note" className="p-2" onClick={() => props.onOpenEditNoteModal(note.id)}>
                                        <i className="fa fa-pencil fa-lg text-primary" />
                                    </a>
                                </div>
                                <div className="p-2">
                                    <a data-toggle="tooltip" data-placement="top" title="Delete Note" className="p-2" onClick={() => props.onDeleteNote(note.id)}>
                                        <i className="fa fa-trash fa-lg text-danger" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    return <div className="row">{noteRows}</div>;
};

NoteTable.propTypes = {
    notes: PropTypes.array,
    onDeleteNote: PropTypes.func,
    onOpenEditNoteModal: PropTypes.func
};

export default NoteTable;
