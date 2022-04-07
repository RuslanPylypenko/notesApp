import '../css/style.css'
import "toastify-js/src/toastify.css"

import NotesComponent from "./components/notes.component";
import NotesRepository from "./repositories/notes.repository";
import NotesFormComponent from "./components/notes.form.component";
import SummaryComponent from "./components/summary.component";

document.addEventListener('DOMContentLoaded', function () {
    NotesRepository.syncDefaultData();

    const formComponent = new NotesFormComponent('note-form')
    const summaryComponent = new SummaryComponent('summary');
    const notesComponent = new NotesComponent('notes', formComponent);

    notesComponent.events.subscribe('update', summaryComponent)

    formComponent.events.subscribe('update', notesComponent)
    formComponent.events.subscribe('update', summaryComponent)

    notesComponent.render();
    summaryComponent.render();

})