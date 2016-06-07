const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

router.get('/', function(req,res){
  knex('pirates')
    .then(function(data){
      res.send(data);
  }).catch(function(err){
      res.send(err);
  });
});

router.post('/', function(req,res){
  knex('pirates').insert(req.body.pirate, '*')
    .then(function(data){
      res.send(data);
  }).catch(function(err){
      res.send(err);
  });
});

router.get('/:id', function(req,res){
  knex('pirates').where('id', req.params.id)
    .first()
    .then(function(data){
      res.send(data);
  }).catch(function(err){
      res.send(err);
  })
})

router.put('/:id', function(req,res){
  knex('pirates').update(req.body.pirate)
    .where('id', req.params.id)
    .then(function(data){
      res.sendStatus(200);
  }).catch(function(err){
      res.send(err);
  })
})

router.delete('/:id', function(req,res){
  knex('pirates').del()
    .where('id', req.params.id)
    .select('*')
    .then(function(data){
      res.sendStatus(200);
  }).catch(function(err){
      res.send(err);
  })
})

module.exports = router;