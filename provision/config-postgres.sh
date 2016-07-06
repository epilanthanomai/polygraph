#!/bin/bash

# Create database user
sudo -u postgres psql template1 -c "create user vagrant superuser password 'vagrant'" || true

# configure pg_hba.conf for local vagrant access
hba=/etc/postgresql/9.3/main/pg_hba.conf
sed -i '/host\s\+all.*127\.0\.0\.1/s/^#//' /etc/postgresql/9.3/main/pg_hba.conf
sed -i '/host\s\+all.*::1/s/^#//' /etc/postgresql/9.3/main/pg_hba.conf
service postgresql restart
