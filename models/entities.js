class User {
    constructor(name, password, email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
}

class Session {
    constructor(id, date) {
        this.id = id;
        this.startDate = date;
    }
}

class Participant {
    constructor(sid, uid, date, score) {
        this.sessionId = sid;
        this.userId = uid;
        this.startDate = date;
        this.endDate = date;
        this.score = score;
    }
}

module.exports = {
    User,
    Session,
    Participant
}