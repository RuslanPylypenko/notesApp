import '../css/style.css'

import NotesComponent from "./components/notes.component";
import NotesRepository from "./repositories/notes.repository";
import SummaryComponent from "./components/summary.component";
import CreateComponent from "./components/create.component";

document.addEventListener('DOMContentLoaded', function () {
    NotesRepository.syncDefaultData();
    new NotesComponent('notes')
    new SummaryComponent('summary')
    new CreateComponent('note-form')
})