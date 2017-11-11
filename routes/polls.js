var express = require('express');
var moment = require('moment');
var db = require('../models');
var router = express.Router();

const pollsQuery = {
    include: [{
        model: db.Choice,
        attributes: ['id', 'text', [db.sequelize.fn('COUNT', db.Sequelize.col('Choices->Votes.id')), 'votes']],
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

router.get('/', (req, res) => {
    db.Poll.findAll(pollsQuery)
        .then(polls => {
            res.send(polls);
        })
});

router.get('/:pollId', (req, res) => {
    db.Poll.findAll({
            pollsQuery,
            where: {
                id: req.params.pollId
            }
        })
        .then(polls => {
            res.send(polls);
        })
});

router.get('/:pollId/activity', (req, res) => {
    var daysback = req.query.daysback || 7

    db.Choice.findAll({
            attributes: [
                [db.sequelize.fn('COUNT', db.Sequelize.col('Votes.id')), 'votes'],
                [db.sequelize.fn('strftime', '%d-%m-%Y', db.sequelize.col('Votes.date')), 'date']
            ],
            include: [{
                model: db.Vote,
                attributes: [],
                where: {
                    date: {
                        $gte: moment().subtract(daysback, 'days').toDate()
                    }
                }
            }],
            where: {
                PollId: req.params.pollId
            },
            group: [db.sequelize.fn('strftime', '%d-%m-%Y', db.sequelize.col('Votes.date'))]
        })
        .then(choices => {
            res.send(choices);
        })
});

router.post('/:pollId/choices/:choiceId/vote', (req, res) => {
    db.Vote.create({
        date: new Date().toLocaleString(),
        ChoiceId: req.params.choiceId,
        UserId: req.user.id
    }).then(() => {
        res.json({
            status: "success"
        });
    }).catch(err =>
        next(err)
    )
});

module.exports = router;