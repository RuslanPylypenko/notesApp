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
        return this.fetchAll()[this.getIdxById(id)];
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
        const idx = this.getIdxById(id);

        for (const dataKey in data) {
            all[idx][dataKey] = data[dataKey]
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

    getIdxById(id) {
        const all = this.fetchAll();
        const index = all.findIndex(note => note.id === id);

        if (index === -1) throw new Error('Note not found');

        return index;
    }

}