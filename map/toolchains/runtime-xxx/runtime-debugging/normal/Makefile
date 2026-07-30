all:
	cc -g -O0 -Wall -D_GNU_SOURCE -o test main.c -ldl
	cc -g -O0 -Wall -D_GNU_SOURCE -shared -o libtest.so test.c

clean:
	rm -rf test libtest.so *.S
