export default class Validators {
    static required(value = '') {
        return value && value.trim()
    }

    static in(list) {
        const inArray = value => list.includes(value)
        return inArray
    }
}