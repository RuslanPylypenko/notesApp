import Component from "../core/component";
import {CATEGORY_ICONS, STATUS} from "../data/constants";
import EventManager from "../core/eventManager";

export default class NotesComponents extends Component {
    constructor(id, formComponent, repository) {
        super(id);
        this.formComponent = formComponent;
        this.events = new EventManager()
        this.repository = repository
    }

    async init() {
        this.$el.addEventListener('click', toggleStatusHandler.bind(this))
        this.$el.addEventListener('click', removeNoteHandler.bind(this))
        this.$el.addEventListener('click', archiveNoteHandler.bind(this))
        this.$el.addEventListener('click', editNoteHandler.bind(this))
    }

    render() {
        const status = this.$el.querySelector('.js-toggle-status').dataset.status;
        const notes = this.repository.find({status})
        this.updateHtml(notes)
    }

    async update() {
        await this.render()
    }

    updateHtml(notes) {
        const html = notes.map(note => renderNote(note));
        const container = this.$el.querySelector('tbody');
        container.innerHTML = '';
        container.insertAdjacentHTML('afterbegin', html.join(' '))
    }
}

function editNoteHandler(event) {
    event.preventDefault();

    const $el = event.target.closest('.js-edit-note')
    if (!$el) return


    const id = $el.dataset.id
    const note = this.repository.findById(id)

    this.formComponent.form.setValues(note)
}

function removeNoteHandler(event) {
    event.preventDefault();

    const $el = event.target.closest('.js-remove-note')
    if (!$el) return

    const id = $el.dataset.id
    this.repository.delete(id)

    this.render()
    this.events.notify('update', null)
}

function archiveNoteHandler(event) {
    event.preventDefault();

    const $el = event.target.closest('.js-archive-note')
    if (!$el) return

    const id = $el.dataset.id
    const status = this.$el.querySelector('.js-toggle-status').dataset.status;

    this.repository.update(id, {status: status === STATUS.ACTIVE ? STATUS.ARCHIVED : STATUS.ACTIVE})

    this.render()
    this.events.notify('update', null)
}

function toggleStatusHandler(event) {
    event.preventDefault();

    const $el = event.target.closest('.js-toggle-status')
    if (!$el) return

    $el.dataset.status = $el.dataset.status === STATUS.ARCHIVED ? STATUS.ACTIVE : STATUS.ARCHIVED

    this.render();
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
                <a href="#" data-id="${note.id}" class="btn js-edit-note">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </a>

                <a href="#" data-id="${note.id}" data-status="${note.status}" class="btn js-archive-note">
                    <i class="fa fa-file-archive-o" aria-hidden="true"></i>
                </a>
                
                <a href="#" data-id="${note.id}" class="btn js-remove-note">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
    `
}

function getDates(dates) {
    return dates !== null ? dates.join(', ') : ''
}

function getCategoryIcon(category) {
    return CATEGORY_ICONS.find(i => i.name === category).icon
}