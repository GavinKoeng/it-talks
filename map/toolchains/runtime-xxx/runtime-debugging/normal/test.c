#include <stdio.h>
#include <pthread.h>

static void (*g_fn)(const char *);
static const char *g_str;

static void *static_thread(void *param)
{
	g_fn(g_str);
	return NULL;
}

void myfn(const char *msg, void (*fn)(const char *))
{
#define MY_MAX_THRS 5
	pthread_t thrs[MY_MAX_THRS] = { -1 };

	g_fn = fn;
	g_str = msg;
	printf("%s, firstly.\n", msg);
	printf("%s, secondly.\n", msg);

	for (int i = 0; i < MY_MAX_THRS; i++) {
		if (pthread_create(thrs + i, NULL, static_thread, NULL))
			thrs[i] = -1;
	}
	for (int i = 0; i < MY_MAX_THRS; i++) {
		if (thrs[i] != -1)
			pthread_join(thrs[i], NULL);
	}
}
