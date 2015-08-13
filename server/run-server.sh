#!/bin/bash

SERVER_DIR=`readlink -f "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"`

cd ${SERVER_DIR}
java -Xmx1024M -jar ../lib/CanaryMod-1.8.0-1.2.1-SNAPSHOT-shaded.jar -o true