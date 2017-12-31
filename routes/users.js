var express = require('express');
var crypto = require('crypto');
var auth = require('../passport-auth.js')();
var db = require('../models');
var router = express.Router();

router.get('/', auth.authenticate(), (req, res) => {
    db.User.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [
                    [db.sequelize.fn('strftime', '%d-%m-%Y', db.sequelize.col('User.createdAt')), 'registerDate'],
                    [db.sequelize.fn('COUNT', db.Sequelize.col('Polls.id')), 'polls']
                ]
            },
            include: [{
                model: db.Poll,
                attributes: []
            }],
            group: ['User.id']
        })
        .then(users => {
            res.send(users);
        })
});

router.post('/', (req, res, next) => {
    db.User.create({
        username: req.body.username,
        bio: req.body.bio,
        email: req.body.email,
        image: req.body.image,
        bgImage: req.body.bgImage,
    }).then(function (user) {
        db.Auth.create({
            token: crypto.createHash('md5').update(req.body.password).digest("hex"),
            UserId: user.id
        });
    }).then(() => {
        res.json({
            status: "success"
        });
    }).catch(err =>
        next(err)
    )
});

router.get('/:userId', auth.authenticate(), (req, res) => {
    db.User.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [
                    [db.sequelize.fn('strftime', '%d-%m-%Y', db.sequelize.col('User.createdAt')), 'registerDate'],
                    [db.sequelize.fn('COUNT', db.Sequelize.col('Polls.id')), 'polls']
                ]
            },
            include: [{
                model: db.Poll,
                attributes: []
            }],
            group: ['User.id'],
            where: {
                id: req.params.userId
            }
        })
        .then(user => {
            res.send(user);
        })
});

router.get('/:userId/polls', auth.authenticate(), (req, res) => {
    db.Poll.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [
                    [db.sequelize.fn('strftime', '%d-%m-%Y', db.sequelize.col('Poll.createdAt')), 'creationDate']
                ]
            },
            include: [{
                model: db.Choice,
                attributes: [
                    'id',
                    'text', [db.sequelize.fn('COUNT', db.Sequelize.col('Choices->Votes.id')), 'votes']
                ],
                include: [{
                    model: db.Vote,
                    attributes: []
                }]
            }, {
                model: db.Area,
                attributes: ['city', 'country']
            }],
            group: ['Choices.id'],
            where: {
                UserId: req.params.userId
            }
        })
        .then(polls => {
            res.send(polls);
        })
});

router.post('/:userId/polls', auth.authenticate(), (req, res, next) => {
    if (req.user.id != req.params.userId) {
        res.sendStatus(400);
    }

    db.Poll.create({
        text: req.body.text,
        UserId: req.user.id
    }).then(poll => {
        db.Area.create({
            city: req.body.area.city,
            country: req.body.area.country,
            PollId: poll.id
        });
        req.body.choices.forEach(choice => {
            db.Choice.create({
                text: choice,
                PollId: poll.id
            });
        });
    }).then(() => {
        res.json({
            status: "success"
        });
    }).catch(err =>
        next(err)
    )
});

router.get('/:userId/polls/:pollId', auth.authenticate(), (req, res) => {
    db.Poll.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
            include: [
                [db.sequelize.fn('strftime', '%d-%m-%Y', db.sequelize.col('Poll.createdAt')), 'creationDate']
            ]
        },
        include: [{
            model: db.Choice,
            attributes: [
                'id',
                'text', [db.sequelize.fn('COUNT', db.Sequelize.col('Choices->Votes.id')), 'votes']
            ],
            include: [{
                model: db.Vote,
                attributes: []
            }]
        }, {
            model: db.Area,
            attributes: ['city', 'country']
        }],
        group: ['Choices.id'],
        where: {
            UserId: req.params.userId,
            id: req.params.pollId
        }
    }).then(poll => {
        res.send(poll);
    })
});

router.delete('/:userId/polls/:pollId', auth.authenticate(), (req, res) => {
    if (req.user.id != req.params.userId) {
        res.sendStatus(400);
    }

    db.Poll.findOne({
        where: {
            UserId: req.params.userId,
            id: req.user.id
        }
    }).then(poll => {
        return poll.destroy();
    }).then(() => {
        res.json({
            status: "success"
        });
    }).catch(() =>
        res.sendStatus(400)
    )
});

router.get('/:userId/activity', auth.authenticate(), (req, res) => {
    db.Poll.findAll({
            attributes: ['id', 'text', [db.sequelize.col('Choices.text'), 'choice']],
            include: [{
                model: db.Choice,
                attributes: [],
                include: [{
                    model: db.Vote,
                    attributes: [],
                    where: {
                        UserId: req.params.userId
                    }
                }],
                required: true
            }],
            order: [
                [db.sequelize.col('Choices->Votes.createdAt'), 'DESC']
            ]
        })
        .then(polls => {
            res.send(polls);
        })
});

module.exports = router;