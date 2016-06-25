#!/bin/bash

createdb polygraph -O vagrant || true

cd /vagrant
sequelize db:migrate
