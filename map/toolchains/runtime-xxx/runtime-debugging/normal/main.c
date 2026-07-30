#include <dlfcn.h>
#include <stdio.h>
#include <unistd.h>

static void print_work(const char *str)
{
	printf("%s by thread %d.\n", str, gettid());
}

int main(void)
{
	if (!fork()) {
		void (*f)(const char *, void (*)(const char *));
		void *h = dlopen("./libtest.so", RTLD_LAZY);
		f = (void (*)(const char *, void (*)(const char *))) dlsym(h, "myfn");
		f("Hello world", print_work);
		dlclose(h);
		printf("child process quit\n");
		return 0;
	}
	sleep(10);
	printf("main process quit\n");
	return 0;
}
