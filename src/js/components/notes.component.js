import Component from "../core/component";
import NotesRepository from "../repositories/notes.repository";
import {CATEGORY_ICONS, STATUS} from "../data/constants";

export default class NotesComponents extends Component {
    constructor(id) {
        super(id);
    }

    async init() {
        const notes = await NotesRepository.find({status: STATUS.ACTIVE})
        this.updateHtml(notes)

        const toggleStatusBtn = this.$el.querySelector('.js-toggle-status')
        toggleStatusBtn.addEventListener('click', toggleStatusHandler.bind(this))
    }

    updateHtml(notes) {
        const html = notes.map(note => renderNote(note));
        const container = this.$el.querySelector('tbody');
        container.innerHTML = '';
        container.insertAdjacentHTML('afterbegin', html.join(' '))
    }
}


function renderNote(note) {
    return `        
        <tr>
            <td><i class="fa fa-${getCategoryIcon(note.category)}"></i></td>
            <td>${note.name}</td>
            <td>${note.created_at}</td>
            <td>${note.category}</td>
            <td>${note.content}</td>
            <td>${getDates(note.dates)}</td>
            <td class="text-right actions">
                <a href="#" class="btn">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </a>

                <a href="#" class="btn">
                    <i class="fa fa-file-archive-o" aria-hidden="true"></i>
                </a>
                
                <a href="#" class="btn">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
    `
}

async function toggleStatusHandler(event) {
    event.preventDefault();

    const status = event.currentTarget.dataset.status === STATUS.ARCHIVED ? STATUS.ACTIVE : STATUS.ARCHIVED
    event.currentTarget.dataset.status = status;

    const notes = await NotesRepository.find({status})
    this.updateHtml(notes)
}

function getDates(dates) {
    return dates !== null ? dates.join(', ') : ''
}

function getCategoryIcon(category) {
    return CATEGORY_ICONS.find(i => i.name === category).icon
}