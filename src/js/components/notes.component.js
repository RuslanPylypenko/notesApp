import Component from "../core/component";
import NotesRepository from "../repositories/notes.repository";

export default class NotesComponents extends Component {
    constructor(id) {
        super(id);
    }

    async init() {
        const notes = await NotesRepository.fetchAll()
        const html = notes.map(note => renderNote(note));

        console.log(notes)
        this.$el.querySelector('tbody').insertAdjacentHTML('afterbegin', html.join(' '))
    }
}


function renderNote(note) {
    return `        
        <tr>
            <td>${note.created_at}</td>
            <td>${note.category}</td>
            <td>${note.content}</td>
            <td>${note.dates !== null ? note.dates.join(', ') : ''}</td>
            <td class="text-right actions">
                <a href="#" class="btn">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </a>

                <a href="#" class="btn">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
    `
}