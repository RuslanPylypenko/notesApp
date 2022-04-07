import Component from "../core/component";
import Form from "../core/form";
import Validators from "../core/validators";
import {CATEGORIES} from "../data/constants";
import moment from "moment";
import EventManager from "../core/eventManager";
import NotesRepository from "../repositories/notes.repository";

export default class NotesFormComponent extends Component {
    constructor(id) {
        super(id);
        this.events = new EventManager()
        this.repository = new NotesRepository()
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))

        this.form = new Form(this.$el, {
            id: [],
            name: [Validators.required],
            content: [Validators.required],
            category: [Validators.required, Validators.in(CATEGORIES)]
        })
    }
}

function submitHandler(event) {
    event.preventDefault()

    if (this.form.isValid()) {
        const formData = {
            dates: dateParser(this.$el.content.value),
            ...this.form.value()
        }

        const id = this.$el.id.value

        id ? this.repository.update(id, formData) : this.repository.create(formData)

        this.form.clear()

        this.events.notify('update', null)
    }
}

const dateParser = (text) => {
    const regexDate = new RegExp('\\d{0,2}\\/\\d{0,2}\\/\\d{4}', 'g');
    const results = [];

    [...text.matchAll(regexDate)].map(item => {
        results.push(moment(item.shift(), "DD/MM/YYYY").format('DD/MM/YYYY'))
    })

    return results;

}
