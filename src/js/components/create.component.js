import Component from "../core/component";
import Form from "../core/form";
import Validators from "../core/validators";
import {CATEGORIES, STATUS} from "../data/constants";
import moment from "moment";
import NotesComponents from "./notes.component";
import NotesRepository from "../repositories/notes.repository";

export default class CreateComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))

        this.form = new Form(this.$el, {
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

        NotesRepository.create(formData)

        new NotesComponents('notes')

        this.form.clear()
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
