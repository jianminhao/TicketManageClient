import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ControlPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };

        this.onSearchTitleChanged = this.onSearchTitleChanged.bind(this);
    }

    onSearchTitleChanged(event) {
        const title = event.target.value;
        this.setState({ title });
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="mr-auto p-2">
                        <button data-toggle="tooltip" data-placement="top" title="Report New Issue" className="btn btn-primary" type="button" onClick={this.props.openAddNoteModal}>
                            <i className="fa  fa-pencil-square-o" />
                        </button>
                    </div>
                    <div className=" p-2">
                        <input type="text" className="form-control" placeholder="Search for issue ..." value={this.state.title} onChange={this.onSearchTitleChanged} />
                    </div>
                    <div className=" p-2">
                        <span className="input-group-btn">
                            <button data-toggle="tooltip" data-placement="top" title="Search Issue" className="btn btn-primary" type="button" onClick={() => this.props.onFindNotes(this.state.title)}>
                                <i className="fa fa-search" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

ControlPanel.propTypes = {
    openAddNoteModal: PropTypes.func,
    onFindNotes: PropTypes.func
};

export default ControlPanel;
