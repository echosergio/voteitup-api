module.exports = function (db) {
    Promise.all([
        db.User.create({ // UserId: 1
            username: 'Carles',
            bio: 'Aficionado a la política',
            email: 'carles@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
            db.Poll.create({ // PollId: 1
                text: '#Referendum de independecia #Cataluña',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Barcelona',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: 'Sí', // ChoiceId: 1
                    PollId: poll.id
                }, {
                    text: 'No', // ChoiceId: 2
                    PollId: poll.id
                }]);
            });
        }),
        db.User.create({ // UserId: 2
            username: 'Alfonso',
            bio: null,
            email: 'alfonso@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
            db.Poll.create({ // PollId: 2
                text: '#HuelgaDocentes',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Madrid',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: 'Sí', // ChoiceId: 3
                    PollId: poll.id
                }, {
                    text: 'No', // ChoiceId: 4
                    PollId: poll.id
                }]);
            });
            db.Poll.create({ // PollId: 3
                text: '#Elecciones 21 Diciembre',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Barcelona',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: 'CiU', // ChoiceId: 5
                    PollId: poll.id
                }, {
                    text: 'Ciutadans', // ChoiceId: 6
                    PollId: poll.id
                }, {
                    text: 'CUP', // ChoiceId: 7
                    PollId: poll.id
                }, {
                    text: 'DemCat', // ChoiceId: 8
                    PollId: poll.id
                }]);
            });
        }),
        db.User.create({ // UserId: 3
            username: 'Luis',
            bio: null,
            email: 'luis@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
            db.Poll.create({ // PollId: 4
                text: 'Ciudades tendencia #Turismo',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Madrid',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: 'Madrid', // ChoiceId: 9
                    PollId: poll.id
                },  {
                    text: 'La Valeta', // ChoiceId: 10
                    PollId: poll.id
                }, {
                    text: 'Leeuwarden', // ChoiceId: 11
                    PollId: poll.id
                }, {
                    text: 'París', // ChoiceId: 12
                    PollId: poll.id
                }]);
            });
        }),
        db.User.create({ // UserId: 4
            username: 'María',
            bio: 'Delegada de MUII',
            email: 'maria@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
            db.Poll.create({ // PollId: 5
                text: 'Cambio de hora presentaciones #DAM #MUII',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Madrid',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: '16:00 - 19:00', // ChoiceId: 13
                    PollId: poll.id
                },  {
                    text: '17:00 - 20:00', // ChoiceId: 14
                    PollId: poll.id
                }, {
                    text: '18:00 - 21:00', // ChoiceId: 15
                    PollId: poll.id
                }]);
            });
            db.Poll.create({ // PollId: 6
                text: 'Modelo #Orlas master 2016/18 #MUII',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Madrid',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: 'Modelo 1', // ChoiceId: 16
                    PollId: poll.id
                },  {
                    text: 'Modelo 2', // ChoiceId: 17
                    PollId: poll.id
                }, {
                    text: 'Modelo 3', // ChoiceId: 18
                    PollId: poll.id
                }, {
                    text: 'Modelo 4', // ChoiceId: 19
                    PollId: poll.id
                }]);
            });
        }),
        db.User.create({ // UserId: 5
            username: 'Victor',
            bio: 'Drummer life',
            email: 'victor@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
            db.Poll.create({ // PollId: 7
                text: 'Mejor #baterista de todos los tiempos',
                UserId: user.id
            }).then(function (poll) {
                db.Area.create({
                    city: 'Madrid',
                    country: 'España',
                    PollId: poll.id
                });
                db.Choice.bulkCreate([{
                    text: 'John Bonham', // ChoiceId: 20
                    PollId: poll.id
                },  {
                    text: 'Keith Moon', // ChoiceId: 21
                    PollId: poll.id
                }, {
                    text: 'Ginger Baker', // ChoiceId: 22
                    PollId: poll.id
                }, {
                    text: 'Neil Pert', // ChoiceId: 23
                    PollId: poll.id
                }]);
            });
        }),
        db.User.create({ // UserId: 6
            username: 'Alex',
            bio: null,
            email: 'alex@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
        }),
        db.User.create({ // UserId: 7
            username: 'Sergio',
            bio: null,
            email: 'sergio@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
        }),
        db.User.create({ // UserId: 8
            username: 'Sandra',
            bio: null,
            email: 'sandra@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
        }),
        db.User.create({ // UserId: 9
            username: 'Miguel',
            bio: null,
            email: 'miguel@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
        }),
        db.User.create({ // UserId: 10
            username: 'Andy',
            bio: null,
            email: 'andy@mail.com',
            image: null,
            bgImage: null
        }).then(function (user) {
            db.Auth.create({
                token: '81dc9bdb52d04dc20036dbd8313ed055', // Password: 1234
                UserId: user.id
            });
        })
    ]).then(() => {
        // #Referendum de independecia #Cataluña
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 1, UserId: 1 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 1, UserId: 2 }); });
        db.Vote.create({createdAt: '2018-01-08'}).then(function (vote) { vote.update({ ChoiceId: 2, UserId: 3 }); });
        db.Vote.create({createdAt: '2018-01-10'}).then(function (vote) { vote.update({ ChoiceId: 2, UserId: 4 }); });
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 2, UserId: 5 }); });
        db.Vote.create({createdAt: '2018-01-08'}).then(function (vote) { vote.update({ ChoiceId: 2, UserId: 6 }); });
        db.Vote.create({createdAt: '2018-01-12'}).then(function (vote) { vote.update({ ChoiceId: 2, UserId: 7 }); });
        db.Vote.create({createdAt: '2018-01-10'}).then(function (vote) { vote.update({ ChoiceId: 1, UserId: 8 }); });

        // #HuelgaDocentes
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 3, UserId: 2 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 3, UserId: 4 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 4, UserId: 6 }); });

        // #Elecciones 21 Diciembre
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 5, UserId: 1 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 7, UserId: 2 }); });
        db.Vote.create({createdAt: '2018-01-12'}).then(function (vote) { vote.update({ ChoiceId: 6, UserId: 3 }); });
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 5, UserId: 4 }); });
        db.Vote.create({createdAt: '2018-01-08'}).then(function (vote) { vote.update({ ChoiceId: 8, UserId: 5 }); });
        db.Vote.create({createdAt: '2018-01-10'}).then(function (vote) { vote.update({ ChoiceId: 8, UserId: 6 }); });
        db.Vote.create({createdAt: '2018-01-12'}).then(function (vote) { vote.update({ ChoiceId: 6, UserId: 7 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 7, UserId: 8 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 5, UserId: 9 }); });

        // Ciudades tendencia #Turismo
        db.Vote.create({createdAt: '2018-01-08'}).then(function (vote) { vote.update({ ChoiceId: 9, UserId: 4 }); });
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 12, UserId: 6 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 11, UserId: 8 }); });

        // Cambio de hora presentaciones #DAM #MUII
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 13, UserId: 1 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 14, UserId: 2 }); });
        db.Vote.create({createdAt: '2018-01-12'}).then(function (vote) { vote.update({ ChoiceId: 15, UserId: 3 }); });
        db.Vote.create({createdAt: '2018-01-10'}).then(function (vote) { vote.update({ ChoiceId: 15, UserId: 4 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 15, UserId: 5 }); });
        db.Vote.create({createdAt: '2018-01-12'}).then(function (vote) { vote.update({ ChoiceId: 13, UserId: 6 }); });
        db.Vote.create({createdAt: '2018-01-08'}).then(function (vote) { vote.update({ ChoiceId: 15, UserId: 7 }); });
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 15, UserId: 8 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 14, UserId: 9 }); });

        // Modelo #Orlas master 2016/18 #MUII
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 16, UserId: 1 }); });
        db.Vote.create({createdAt: '2018-01-12'}).then(function (vote) { vote.update({ ChoiceId: 16, UserId: 2 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 17, UserId: 3 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 16, UserId: 4 }); });
        db.Vote.create({createdAt: '2018-01-08'}).then(function (vote) { vote.update({ ChoiceId: 18, UserId: 5 }); });
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 19, UserId: 6 }); });
        db.Vote.create({createdAt: '2018-01-12'}).then(function (vote) { vote.update({ ChoiceId: 16, UserId: 7 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 19, UserId: 8 }); });
        db.Vote.create({createdAt: '2018-01-12'}).then(function (vote) { vote.update({ ChoiceId: 19, UserId: 9 }); });

        // Mejor #baterista de todos los tiempos
        db.Vote.create({createdAt: '2018-01-09'}).then(function (vote) { vote.update({ ChoiceId: 20, UserId: 1 }); });
        db.Vote.create({createdAt: '2018-01-12'}).then(function (vote) { vote.update({ ChoiceId: 22, UserId: 2 }); });
        db.Vote.create({createdAt: '2018-01-10'}).then(function (vote) { vote.update({ ChoiceId: 23, UserId: 3 }); });
        db.Vote.create({createdAt: '2018-01-08'}).then(function (vote) { vote.update({ ChoiceId: 22, UserId: 4 }); });
        db.Vote.create({createdAt: '2018-01-10'}).then(function (vote) { vote.update({ ChoiceId: 21, UserId: 5 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 23, UserId: 6 }); });
        db.Vote.create({createdAt: '2018-01-11'}).then(function (vote) { vote.update({ ChoiceId: 22, UserId: 7 }); });
    });
};