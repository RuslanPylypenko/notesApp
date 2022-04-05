import '../css/style.css'

import NotesComponent from "./components/notes.component";
import NotesRepository from "./repositories/notes.repository";
import SummaryComponent from "./components/summary.component";
import CreateComponent from "./components/create.component";

document.addEventListener('DOMContentLoaded', function () {
    NotesRepository.syncDefaultData();
    const notesComponents = new NotesComponent('notes')
    const summaryComponent = new SummaryComponent('summary')
    const createComponent = new CreateComponent('create-note')
})