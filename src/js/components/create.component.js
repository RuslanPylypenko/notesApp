import Component from "../core/component";
import Form from "../core/form";
import Validators from "../core/validators";
import {CATEGORIES} from "../data/constants";

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

    if(this.form.isValid()){
        console.log(this.form.value())
    }



}