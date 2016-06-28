#!/bin/bash

sudo -u postgres psql template1 -c "create user vagrant superuser password 'vagrant'"
