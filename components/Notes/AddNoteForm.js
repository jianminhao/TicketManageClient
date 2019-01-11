import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

class AddNoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            priority: '',
            tags: [],
            validationErrors: []
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onTitleChange(event) {
        const title = event.target.value.trim();

        this.validateTitle(title);

        this.setState({ title: title });
    }

    onContentChange(event) {
        const content = event.target.value.trim();

        this.validateContent(content);

        this.setState({ content: content });
    }

    onTagsChange(event) {
        const tags = event.target.value.trim();

        if (this.validateTags(tags)) {
            this.setState({ tags: tags.split(',') });
        }
    }

    onPriorityChange(event) {
        const priority = event.target.value.trim();

        this.validateContent(priority);

        this.setState({ priority: priority });
    }

    onSave(event) {
        event.preventDefault();

        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            const { title, content, priority } = this.state;

            if (this.validateTitle(title) && this.validateContent(content) && this.validateContent(priority)) {
                this.props.onSaveNote(this.state);
            }
        }
    }

    validateTitle(title) {
        const message = 'Title is required';

        if (title === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }

    validateContent(content) {
        const message = 'Content is required';

        if (content === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }

    validatePriority(priority) {
        const message = 'priority is required';

        if (priority === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }

    validateTags(tags) {
        const message = 'Tags must be a comma separated list';

        if (tags !== '') {
            var regex = new RegExp(/^([\w]+[\s]*[,]?[\s]*)+$/);

            if (!regex.test(tags)) {
                this.addValidationError(message);
                return false;
            } else {
                this.removeValidationError(message);
                return true;
            }
        } else {
            this.removeValidationError(message);
        }
    }

    addValidationError(message) {
        this.setState(previousState => {
            const validationErrors = [...previousState.validationErrors];
            validationErrors.push({ message });
            return {
                validationErrors: validationErrors
            };
        });
    }

    removeValidationError(message) {
        this.setState(previousState => {
            const validationErrors = previousState.validationErrors.filter(error => error.message !== message);

            return {
                validationErrors: validationErrors
            };
        });
    }

    render() {
        const validationErrorSummary = this.state.validationErrors.map(error => (
            <div key={uuidv1()} className="alert alert-danger alert-dismissible fade show">
                {error.message}
                <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        ));

        return (
            <div className="card card-body">
                <div className="mb-2">
                    <span className="h4 my-auto">
                        <i className="fa fa-file-text-o fa-lg" /> Report New Issue
                    </span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove fa-2x mr-2 text-danger" />
                    </a>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" autoFocus onChange={this.onTitleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" name="content" rows="3" onChange={this.onContentChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" className="form-control" name="tags" onChange={this.onTagsChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <input type="text" className="form-control" name="priority" onChange={this.onPriorityChange} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <button type="submit" className="btn btn-success btn-lg btn-block">
                                <i className="fa fa-save mr-2" />
								Save
                            </button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <button className="btn btn-danger btn-lg btn-block mt-2 mt-sm-0" onClick={this.props.onCloseModal} type="button">
                                <i className="fa fa-remove mr-2" />
								Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

AddNoteForm.propTypes = {
    onCloseModal: PropTypes.func,
    onSaveNote: PropTypes.func
};

export default AddNoteForm;
