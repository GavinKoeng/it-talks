#include <stdio.h>

extern int test(int c, char *p)
{
	if (!p) {
		fprintf(stderr, "invalid parameter.\n");
		return -1;
	}
	printf("current arg count: %d, the first arg: %s.\n", c, p);
	return 0;
}

int main(int argc, char *argv[])
{
	return test(argc, argc > 1 ? argv[1] : NULL);
}
