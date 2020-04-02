function CrudService (model) {
    this.model = model;
}

CrudService.prototype.list = function () {
    return new Promise((resolve) => {
        this.model.find(null, (err, result) => {
            return resolve({data: result})
        })
    })
}

CrudService.prototype.add = function (data) {
    return new Promise(( resolve , reject ) => {
        this.model.create(data, (err, result) => {
            if (err) {
                return reject({err});
            }
            return resolve({data: result});
        })
    })
}

CrudService.prototype.listOne = function (id) {
    return new Promise(( resolve , reject ) => {
        this.model.findById(id, (err, result) => {
            if (err) {
                return reject({err});
            }
            return resolve({data: result});
        })
    })
}

CrudService.prototype.edit = function (id, data) {
    return new Promise(( resolve , reject ) => {
        this.model.findByIdAndUpdate(
                id,
                data,
                {new: true},
                (err, result) => {
            if (err) {
                return reject({err});
            }
            return resolve({result});
        })
    })
}

CrudService.prototype.delete = function (id) {
    return new Promise(( resolve , reject ) => {
        this.model.findByIdAndDelete(id, (err, result) => {
            if (err) {
                return reject({err});
            }
            return resolve({data: result});
        })
    })
}

module.exports = CrudService;