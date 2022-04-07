import Component from "../core/component";
import NotesRepository from "../repositories/notes.repository";
import {CATEGORIES, CATEGORY_ICONS, STATUS} from "../data/constants";

export default class SummaryComponent extends Component {
    constructor(id) {
        super(id);
        this.repository = new NotesRepository()
    }

    render() {
        const notes = this.repository.fetchAll()

        const summary = CATEGORIES.map(category => ({
            category,
            active: notes.filter(note => note.category === category && note.status === STATUS.ACTIVE).length,
            archived: notes.filter(note => note.category === category && note.status === STATUS.ARCHIVED).length,
        }))

        const html = summary.map(item => renderSummaryRow(item))
        const container = this.$el.querySelector('tbody');
        container.innerHTML = '';
        container.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    async update() {
        await this.render()
    }
}

function renderSummaryRow(data) {
    return `        
        <tr>
            <td><i class="fa fa-${getCategoryIcon(data.category)}"></i></td>
            <td>${data.category}</td>
            <td>${data.active}</td>
            <td>${data.archived}</td>
        </tr>
    `
}

function getCategoryIcon(category) {
    return CATEGORY_ICONS.find(i => i.name === category).icon
}