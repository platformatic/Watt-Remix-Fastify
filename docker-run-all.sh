#!/bin/bash

npm run start &
npm run admin &

wait -n

exit $?
