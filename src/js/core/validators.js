export default class Validators {
    static required(value = '') {
        return value && value.trim()
    }

    static in(list) {
        return value => {
            return list.includes(value)
        }
    }
}