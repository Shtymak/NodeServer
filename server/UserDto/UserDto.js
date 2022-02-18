module.exports = class UserDto {
    constructor(model) {
        this.id = model.id
        this.email = model.email
    }
}
