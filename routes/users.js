var express = require('express');
var crypto = require('crypto');
var db = require('../models');
var router = express.Router();

router.get('/', (req, res) => {
    db.User.findAll()
        .then(polls => {
            res.send(polls);
        })
});

router.post('/', (req, res) => {
    db.User.create({
        username: req.body.username,
        bio: req.body.bio,
        email: req.body.email,
        image: req.body.image,
        bgImage: req.body.bgImage,
    }).then(function (user) {
        db.Auth.create({
            token: crypto.createHash('md5').update(req.body.password).digest("hex"),
            userId: user.id
        });
    }).then(() => {
        res.json({
            status: "success"
        });
    }).catch(err =>
        next(err)
    )
});

router.get('/:userId', (req, res) => {
    console.log(req.user)
    db.User.findOne({
            where: {
                id: req.params.userId
            }
        })
        .then(poll => {
            res.send(poll);
        })
});

const pollsQuery = {
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
    group: ['Choices.id']
}

router.get('/:userId/polls', (req, res) => {
    db.Poll.findAll({
            pollsQuery,
            where: {
                UserId: req.params.userId
            }
        })
        .then(polls => {
            res.send(polls);
        })
});

router.post('/:userId/polls', (req, res) => {
    db.Poll.create({
        text: req.body.text,
        UserId: req.params.userId
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

router.get('/:userId/polls/:pollId', (req, res) => {
    db.Poll.findOne({
            pollsQuery,
            where: {
                UserId: req.params.userId,
                id: req.params.pollId
            }
        })
        .then(poll => {
            res.send(poll);
        })
});

router.get('/:userId/activity', (req, res) => {
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
            }]
        })
        .then(polls => {
            res.send(polls);
        })
});

module.exports = router;