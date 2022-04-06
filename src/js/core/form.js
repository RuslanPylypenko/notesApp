export default class Form {
    constructor(form, controls) {
        this.form = form;
        this.controls = controls;
    }

    value() {
        const value = {}
        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value
        })
        return value;
    }

    isValid() {
        let isFormValid = true

        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control]

            let isValid = true
            let validatorName = ''
            validators.forEach(validator => {
                validatorName = validator.name
                isValid = validator(this.form[control].value) && isValid
            })

            isValid ? clearError(this.form[control]) : setError(this.form[control], validatorName)

            isFormValid = isFormValid && isValid
        })

        return isFormValid
    }

    clear(){
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = ''
        })
    }
}

function setError($control, validator) {
    clearError($control)
    const error = `<p class="validation-error">${getErrorByValidator(validator)}</p>`
    $control.closest('.input-container').classList.add('invalid')
    $control.insertAdjacentHTML('afterend', error)
}

function clearError($control) {
    $control.closest('.input-container').classList.remove('invalid')
    if($control.nextSibling){
        $control.closest('.input-container').removeChild($control.nextSibling)
    }

}

function getErrorByValidator(validator)
{
    switch (validator){
        case 'required':
            return 'Field is required'
        case 'inArray':
            return 'Invalid value'
    }

}