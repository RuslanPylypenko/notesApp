import notes from '../data/notes'
import {Id} from "../core/helpers";
import moment from "moment";
import {STATUS} from "../data/constants";

export default class NotesRepository {
    static syncDefaultData() {
        localStorage.setItem('notes', JSON.stringify(notes))
    }

     fetchAll() {
        return JSON.parse(localStorage.getItem('notes'));
    }

    findById(id) {
        return this.fetchAll().find(note => note.id === id);
    }

     create(data) {
        const all = this.fetchAll();
        all.push({
            id: Id(),
            created_at: moment().format('MMMM DD, YYYY'),
            status: STATUS.ACTIVE,
            ...data
        })
        localStorage.setItem('notes', JSON.stringify(all));
    }

     update(id, data) {
        const all = this.fetchAll();
        const index = all.findIndex(note => note.id === id);

        if(!index) return

        for (const dataKey in data) {
            all[index][dataKey] = data[dataKey]
        }

        localStorage.setItem('notes', JSON.stringify(all));
    }

     find(filter) {
        return this.fetchAll()
            .filter(note => {
                for (const filterKey in filter) {
                    return note[filterKey] === filter[filterKey]
                }
            })
    }

     delete(id) {
        const all = this.fetchAll();
        localStorage.setItem('notes', JSON.stringify(all.filter(note => note.id !== id)));
    }
}