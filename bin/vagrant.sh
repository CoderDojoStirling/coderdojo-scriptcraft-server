#!/usr/bin/env bash

# Used as shell prompt
PROJECT=vagrant-coderdojo
# Shared players directory
PLAYERS_DIR=/vagrant/server/scriptcraft/players

apt-get update -y
apt-get install -y openjdk-7-jdk
apt-get install -y samba

# Set command line prompt
echo "PS1='$PROJECT:\W\$ '" >> /home/vagrant/.bash_profile

# Ensure players directory exists, and ensure everyone can read + write to it
mkdir -p ${PLAYERS_DIR}
chmod -R a+rwx ${PLAYERS_DIR}

# Make sure vagrant user exists, with no password
sudo smbpasswd -a vagrant -n

# Setup samba share of players directory
# Thanks: http://goinggnu.wordpress.com/2010/06/29/public-writable-share-in-samba/
cat > /etc/samba/smb.conf <<EOL
[global]
   workgroup = WORKGROUP
   server string = %h server (Samba, Ubuntu)
   dns proxy = no
   log file = /var/log/samba/log.%m
   max log size = 1000
   syslog = 0
   panic action = /usr/share/samba/panic-action %d
   security = share
   encrypt passwords = true
   passdb backend = tdbsam
   obey pam restrictions = yes
   unix password sync = yes
   passwd program = /usr/bin/passwd %u
   passwd chat = *Enter\snew\s*\spassword:* %n\n *Retype\snew\s*\spassword:* %n\\
n *password\supdated\ssuccessfully* .
   pam password change = yes
   map to guest = bad user
   guest account = nobody
   load printers = yes
   printing = cups
   printcap name = cups
   usershare allow guests = yes
   null passwords = yes

[players]
comment = Players dir
path = ${PLAYERS_DIR}
guest ok = yes
writeable = yes
browsable = yes
force create mode = 0755
force directory mode = 0755
create mask = 0755
force user = vagrant
force group = vagrant
EOL

restart smbd

echo ""
echo "=========="
echo "== Java =="
echo "=========="
echo "$(java -version)"