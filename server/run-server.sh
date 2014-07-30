#!/bin/bash


# Add minecraft admins
cat > ./ops.txt <<EOL
greghuc
EOL

# Start minecraft server
java -Xmx1024M -jar ../lib/craftbukkit-1.6.4-R2.0.jar -o true
