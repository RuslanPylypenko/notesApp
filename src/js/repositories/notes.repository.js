import notes from '../data/notes'
import {STATUS} from "../data/constants";

export default class NotesRepository {
    static syncDefaultData() {
        localStorage.setItem('notes', JSON.stringify(notes))
    }

    static fetchAll() {
        return JSON.parse(localStorage.getItem('notes'));
    }

    static find(filter) {
        return this.fetchAll()
            .filter(note => {
                for (const filterKey in filter) {
                    return note[filterKey] === filter[filterKey]
                }
            })
    }

    static fetchActive() {

    }

    static fetchArchived() {
        return this.fetchAll().filter(note => note.status === STATUS.ARCHIVED)
    }
}