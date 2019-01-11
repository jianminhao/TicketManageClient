import React, { Component } from 'react';
import Header from './Header';
import NoteManager from './Notes/NoteManager';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            title: 'Issue Tracker',
            description: 'A Tracking System'
        };
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid mt-5">
                    <NoteManager />
                </div>
            </div>
        );
    }
}
