import notes from '../data/notes'

export default class NotesRepository {
    static syncDefaultData() {
        localStorage.setItem('notes', JSON.stringify(notes))
    }

    static fetchAll() {
        return JSON.parse(localStorage.getItem('notes'));
    }
}