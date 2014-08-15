# Coding in Minecraft - Day 1

Today we're going to start coding in Minecraft.

We're going to create buildings with code written in Javascript.


If you finished the KhanAcademy Javascript course we started last month, then you'll have an idea how to code in Javascript.

We're going to run through ten really short lessons. We'll start simple, and end up building a skyscraper. Awesomes.

## Setup

You'll need three things:
* A computer
* A copy of Minecraft
* A text editor. Try these:
  * Mac? Use [TextWrangler](http://www.barebones.com/products/textwrangler/download.html)
  * Windows? Use [Notepad++](http://notepad-plus-plus.org/download/v6.6.8.html)
 
Here's how things will work:
* You'll run Minecraft and connect to a Minecraft server we're running. It's special because it lets you create stuff using Javascript.
* You'll write small Javascript programs in a text-file called 'lessons.js'. This file will be saved to a special directory that lives on the Minecraft server too. This means the server can see your programs, and let you run them inside Minecraft.

### Connecting to the Minecraft server

Follow these instructions to connect to the Minecraft server
```
# Run Minecraft on your computer
# Create a new profile called 'CoderDojo'. Make sure it uses version 1.6.4
# Select the 'CoderDojo' profile, and hit 'Play'
# Then select 'Multiplayer', then 'Direct Connect'
# Enter the server address specified by a CoderDojo mentor. It should be something like '192.168.0.18'

# Check you can run Javascript inside Minecraft
# Once you've connected to the server, hit the / key
# And type..
# js 1 + 1
# then hit return
# if the answer is 2.0, then you're running Javascript :-)

# Now let's learn how to code in Minecraft..
```

### Coding in Minecraft - lessons.js

Follow these instructions to start coding Javascript programs in Minecraft.

```
# You'll need to connect to the special directory where your Minecraft programs will be stored (in a text-file called 'lessons.js')
# If your computer is a Mac:
#  open the Finder, open the 'Go' menu and select 'Connect to Server'
#  then enter the directory address specified by a CoderDojo mentor. It should be something like 'smb://192.168.0.18/players'
#  if asked for a username, select 'guest' (should be no password)
# If your computer is running Windows:
#  open Windows explorer, and type into the address bar the directory address specified by a CoderDojo mentor. It should be something like '\\192.168.0.18\players'
#  if asked for a username, select 'guest' (should be no password)

# Now look for a sub-directory with your Minecraft username.
# Click on it. This is the directory where your 'lessons.js' text-file will go.
# Let's set up lessons.js..

# Open your text-editor (TextWrangler on Mac, or Notepad++ on Windows)
# Start a new document.
# Type in the following Javascript program (exactly as it looks)

exports.lesson1 = function() {
	echo('This is my first Minecraft program :-)');
};

# Now save the document as 'lessons.js' somewhere you can find it (like the desktop)
# Close the text-editor.
# Now drag the 'lessons.js' file to the special directory we opened earlier: the one with your Minecraft username.
# Now open this file with your text-editor (just double-click on it)

# Now switch back to Minecraft.
# Open the prompt again my typing /
# Now type... 
js your-username.lesson();
# BUT USE YOUR REAL USERNAME!
# I'm greghuc, so I'd type: js greghuc.lesson1();
# Hit return
# If Minecraft said 'This is my first Minecraft program :-)', then it's all good.
# YOU'VE JUST RUN CODE IN MINECRAFT!!
# ROCK ON!
# Or if it's all gone horribly wrong, then ask a CoderDojo mentor for help.
```

## Lessons

Right, let's get on with learning how to build cool stuff in Minecraft.

You already did Lesson 1 - running your first Javascript program inside Minecraft.

### Lesson 2 - building a block

When you did the KhanAcademy Javascript course, you got to create 2d shapes like circles and squares. We're going to do something similar in Minecraft - except we'll be creating 3d shapes instead, like blocks and cylinders.

Before we start, you'll be using something called 'Drone'. A Drone is like a special person who knows how to create different 3d shapes. You create a new 'Drone', and then tell it what shapes you want to create.

Let's start by creating a single block.
In your lessons.js file, add this Javascript program to the bottom (exactly as it looks):
```
//Lesson: create box
exports.lesson2 = function() {
	var drone = new Drone(); 
	drone.box( blocks.iron );
};

# Now save lessons.js
# Switch back to Minecraft
# POINT THE CROSSHAIRS AT THE GROUND
# Open the prompt by typing /
# Type..
js your-username.lesson(); 
# Hit return
# You should have created an iron box in the ground (where your crosshairs is)
# Cool!
```

### Lesson 2 - challenge

You'll learn later about different shapes you can create, and out of different materials. For now, let's learn about some new materials:
* blocks.snow
* blocks.glass
* blocks.lava

Your challenge is...
Change the lesson2 function you just typed in to create a box out of lava.
And run it!