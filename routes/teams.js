var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/nfl-teams')
var proTeams = db.get('teams')

router.get('/', function (req, res, next) {
  proTeams.find({}, function (err, data){
    res.render('teams/index', { title: "NFL Teams",
                                allTeams: data
                              })
  })
})

router.get('/new', function (req, res, next) {
  res.render('teams/new', { title: "Add A Team" })
})

router.post('/new', function (req, res, next) {
  proTeams.insert({ name: req.body.teamname,
                    city: req.body.city,
                    wins: req.body.wins,
                    losses: req.body.losses,
                    yearest: req.body.yearEst 
                  })
  res.redirect('/teams');
})

router.get('/:id', function (req, res, next){
  proTeams.findOne({_id: req.params.id}, function (err,data){
    res.render('teams/show', {theTeam: data})
  }) 
})

router.get('/:id/edit', function (req, res, next){
  proTeams.findOne({_id: req.params.id}, function (err, data){
    res.render('teams/edit', {theTeam: data})
  })
})

router.post('/:id/edit', function (req, res, next){
  proTeams.updateById(req.params.id, {name: req.body.teamname,
                                      city: req.body.city,
                                      wins: req.body.wins,
                                      losses: req.body.losses,
                                      yearest: req.body.yearEst
                                      }, function (err, data){
  res.redirect('/teams/' + req.params.id);
  })
})

router.post('/:id/delete', function (req, res, next){
  proTeams.remove({_id: req.params.id}, function (err, data){
    res.redirect('/teams')
  })
})



module.exports = router;