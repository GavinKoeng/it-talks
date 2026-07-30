all:
	cc -g -o test main.c -ldl
	cc -g -shared -o libtest.so test.c

clean:
	rm -rf test libtest.so *.S
