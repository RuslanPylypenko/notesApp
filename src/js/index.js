import '../css/style.css'

import NotesComponents from "./components/notes.component";
import NotesRepository from "./repositories/notes.repository";

NotesRepository.syncDefaultData();

const notesComponents = new NotesComponents('notes')

console.log(notesComponents)