#include <dlfcn.h>
#include <stdio.h>

static void test_load(void)
{
	void *h = dlopen("./libtest.so", RTLD_LAZY);
	void (*fn)(const char *) =
			(void (*)(const char *)) dlsym(h, "mytest");

	fn("Hello world internally");

	dlclose(h);
}

int main(int argc, char *argv[], char *envp[])
{
	int i;

	test_load();

	for (i = 0; i < argc; i++) 
		printf("arg[%d]: %s\n", i, argv[i]);
	for (i = 0; envp[i]; i++)
		printf("env[%d]: %s\n", i, envp[i]);
	return 0;
}
