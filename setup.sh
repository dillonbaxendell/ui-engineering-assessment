#!/bin/bash

cd ./fe && npm install &
cd ./be && bundle install
rake db:drop:all db:create:all db:schema:load db:migrate db:seed