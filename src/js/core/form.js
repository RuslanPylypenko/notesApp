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

    clear() {
        Object.keys(this.controls).forEach(control => {
            if (this.form[control].tagName === "SELECT") {
                this.form[control].selectedIndex = 0
            } else {
                this.form[control].value = ''
            }


        })
    }

    setValues(values) {
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = values[control]
        })
    }
}

function setError($control, validator) {
    const inputWrapper = $control.closest('.input-container');
    if (inputWrapper) {
        clearError($control)
        const error = `<p class="validation-error">${getErrorByValidator(validator)}</p>`
        inputWrapper.classList.add('invalid')
        $control.insertAdjacentHTML('afterend', error)
    }
}

function clearError($control) {
    const inputWrapper = $control.closest('.input-container');
    if (inputWrapper) {
        inputWrapper.classList.remove('invalid')
        if ($control.nextSibling) {
            $control.closest('.input-container').removeChild($control.nextSibling)
        }
    }


}

function getErrorByValidator(validator) {
    switch (validator) {
        case 'required':
            return 'Field is required'
        case 'inArray':
            return 'Invalid value'
    }

}