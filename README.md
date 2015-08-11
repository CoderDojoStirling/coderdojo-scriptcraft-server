# README

[ScriptCraft](https://github.com/walterhiggins/ScriptCraft) is pretty awesome - it lets you write [Minecraft](https://minecraft.net) mods in Javascript (not Java). Great for teaching kids to code at [CoderDojo](http://coderdojo.com).


But setting up a ScriptCraft/Minecraft server can be painful. There's various pieces of software to download and configure.

This project aims for a '1-click' install of a ScriptCraft/Minecraft server: so everyone can start coding Minecraft mods much faster. It's early days - we're about to use this at [CoderDojo Stirling](http://coderdojoscotland.com/clubs/stirling) for our August 2014 session.

Server installation instructions follow, but we'll start with an overview of what we're aiming for.


## What we're aiming for

We want kids to be coding Minecraft mods within the first 5 minutes of a CoderDojo session. They'll need:

* A laptop
* A copy of Minecraft
* A text editor

They'll then:

* Use their text editor to write Minecraft mods in Javascript
* Copy their javascript mod into a shared directory on the ScriptCraft/Minecraft server running on the local network
* Connect to the server using their Minecraft client, and run their mod within the game.

We've essentially got this functioning, but there's room for improvement. It's not 1-click yet!

## Lessons

First (ever!) lesson on 16 August 2014:
* [Lesson](https://github.com/greghuc/coderdojo-scriptcraft-server/blob/master/docs/lesson1/lesson.md) [(as pdf)](https://github.com/greghuc/coderdojo-scriptcraft-server/blob/master/docs/lesson1/lesson1.pdf?raw=true) and [Code](https://github.com/greghuc/coderdojo-scriptcraft-server/blob/master/docs/lesson1/lessons.js)

## Setting up and running the ScriptCraft/Minecraft server

The Scriptcraft/Minecraft server is packaged up as a virtual machine. So you'll need to:

* Pick a machine on which the ScriptCraft server will run
* Install the vm management software
* Run commands to bootstrap the vm
* Run commands to start the Scriptcraft server

Instructions below are from a Mac OSX / Linux terminal. Not seeing anything stopping this being done under Windows.

```
# Install the vm management software: VirtualBox and Vagrant
# VirtualBox: https://www.virtualbox.org/wiki/Downloads
# Vagrant: http://www.vagrantup.com/downloads-archive.html
# VirtualBox 4.2.24 and Vagrant 1.6.3 work together

# Install git from: http://git-scm.com/downloads
#
# Grab this project
# git clone https://github.com/greghuc/coderdojo-scriptcraft-server.git
# cd coderdojo-scriptcraft-server
#
# Run commands to bootstrap the vm
# vagrant up
# When prompted, specify a 'bridged network interface': Wi-Fi or Ethernet
# Go with the option that the CoderDojo class uses to access the local network.
# The virtual machine will be visible on this local network for the class to connect to.
# Now wait some time whilst the vm bootstraps..

# Run commands to start the Scriptcraft server
# Start by logging into the vm
# vagrant ssh
# cd /vagrant/server
# And run the Scriptcraft server!
# ./run-server.sh
```

At this point, you've got a Scriptcraft/Minecraft server running. Awesome!

Before continuing, let's cover some admin:

```
# To stop the Scriptcraft server
# stop

# To shutdown the vm
# exit (assuming you're logged into the vm using vagrant ssh)
# vagrant halt (in the hosting box)

# To restart the vm
# vagrant up
# To log back in
# vagrant ssh
```

## Preparing for class

Before class, there's a few things to sort/check:

* Enable the classroom plugin on the server
* Check you can run Javascript on the server
* Check you can connect your Minecraft client to the server
* Check you can copy a Minecraft mod into the server-shared directory, and that it runs.

```
# NOTE: we will refer to your Minecraft username as $username
#
# Enable the Scriptcraft classroom plugin
# More info at: https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#classroom-plugin
# From the minecraft server console, run..
# jsp classroom on
#
# Check you can connect your Minecraft client to the server
#
# First, open a new terminal and grab the server ip address (i.e of the vm)
# vagrant ssh
# ifconfig
# and look for something like: inet addr:192.168.0.57, in the eth0 or eth1 sections
# Then load up the Minecraft client on your laptop
# Create a user profile, setting the Minecraft version to match that of server (can find version in server log). Currently 1.8.8
# Hit 'Play', 'Multiplayer' then 'Direct Connect' 
# Enter the server ip address (192.168.0.57 in our example case) and 'Join server'
# Hopefully you've connected to the server :-)

# Check you can run Javascript on the server
# From the minecraft client, load the console with '/' and run..
# js 1 + 1
# If the answer is 2.0, you're running Javascript with Scriptcraft

# Check you can copy a Minecraft mod into the server-shared directory, and that it runs.
# The following vm directory is network-shared: /vagrant/server/scriptcraft/players
# It should be accessible from mentors and kids' laptops as:
# //$server-ip-address/players (//192.168.0.57/players in our example case)
# or smb://$server-ip-address/players (depends on OS)
# Try connecting to this directory
# 
# Let's try copying a Minecraft mod into this directory
# First (from inside the vm), create a subdirectory in /vagrant/server/scriptcraft/players named after your Minecraft username
# So in our example, we'd create: /vagrant/server/plugins/scriptcraft/players/greghuc
# Note this directory will exist already if you connected your Minecraft client after switching classsroom mode on. 
# Now (on your laptop), create greet.js, with the contents:
#
exports.hi = function( player ){
  echo( player, 'Hi ' + player.name);
};

#
# Using the network-share, copy greet.js to ...players/$username (players/greghuc in our example)
#
# Wait a few seconds, then run from the Minecraft console
# js $username.hi(self);
# We'd run greghuc.hi(self) in our example
# If the result is 'Greetings $username, everything worked!
```

## Running the class
Run the class by getting kids to build a Minecraft plugin.
They'll follow a shorter version of what we just covered:

* Connect their Minecraft client to the server 
    * They'll need the server IP address
* Write the javascript plugin on their laptop, then copy it into the server using the network share
    * They'll need to know how to access/user the network share
    * Each kid copies their js code into player/$kid-username via the network share
    * They can then run their js functions from inside the Minecraft client as $kid-username.functionname()

Good luck!

This setup process should get easier as we iron out the kinks.

Greg & Dan at CoderDojo Stirling Scotland