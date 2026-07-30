gcc -g -O2 -Wall -o dis dis.c

# strace /usr/bin/firefox 2>&1 | grep exec
# strace -e trace=file -ff -x -o /tmp/firefox/log /usr/bin/firefox
