module.exports = function (db) {
    Promise.all([
        db.User.create({
            username: 'Carles',
            bio: 'Aficionado a la política',
            email: 'carles@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', //1234
                UserId: user.id
            });
            db.Poll.create({
                text: '#Referendum de independecia #Cataluña',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Barcelona',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: 'Sí',
                    PollId: poll.id
                }, {
                    text: 'No',
                    PollId: poll.id
                }]);
            });
        }),
        db.User.create({
            username: 'Alfonso',
            bio: null,
            email: 'alfonso@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055',
                UserId: user.id
            });
            db.Poll.create({
                text: '#HuelgaDocentes',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Madrid',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: 'Sí',
                    PollId: poll.id
                }, {
                    text: 'No',
                    PollId: poll.id
                }]);
            });
            db.Poll.create({
                text: '#Elecciones 21 Diciembre',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Barcelona',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: 'CiU',
                    PollId: poll.id
                }, {
                    text: 'Ciutadans',
                    PollId: poll.id
                }, {
                    text: 'CUP',
                    PollId: poll.id
                }, {
                    text: 'DemCat',
                    PollId: poll.id
                }, {
                    text: 'PSC',
                    PollId: poll.id
                }, {
                    text: 'PP Català',
                    PollId: poll.id
                }]);
            });
        })
    ]).then(() => {
        db.Vote.create({
        }).then(function (vote) {
            vote.update({
                ChoiceId: 2,
                UserId: 1
            });
        });
        db.Vote.create({
        }).then(function (vote) {
            vote.update({
                ChoiceId: 2,
                UserId: 2
            });
        });
        db.Vote.create({
        }).then(function (vote) {
            vote.update({
                ChoiceId: 3,
                UserId: 2
            });
        });
    });
};