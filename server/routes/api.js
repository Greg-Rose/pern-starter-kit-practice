const express = require('express');
const router = express.Router();
const Employee = require('../models').Employee;

router.route('/employees')
  .get((req, res) => {
    Employee.all().then(employees => {
      return res.send(employees);
    })
  })

  .post((req, res) => {
    Employee.create({ name: req.body.name }).then(employee => {
      return res.send(employee);
    })
  });

router.route('/employees/:id')
  .delete((req, res) => {
    Employee.findById(req.params.id).then(employee => {
      employee.destroy().then(() => res.send({
        message: 'Employee deleted',
      }));
    })
    .catch(() => res.send({ error: 'Employee not found' }))
  });

router.all('*', (req, res) => {
  res.end('Api not found.');
});

module.exports = router;
