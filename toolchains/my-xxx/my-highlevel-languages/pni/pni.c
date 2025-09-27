#include <Python.h>
#include <pthread.h>

struct thrparam {
	int (*cb)(const char *);
	char *str;
	int ret;
};

static void *worker(void *ctx)
{
	struct thrparam *param = (struct thrparam *)ctx;
	PyGILState_STATE gstate = PyGILState_Ensure();

	param->ret = param->cb(param->str);
	if (PyErr_Occurred()) {
		PyErr_Print();
		param->ret = -1;
	}

	PyGILState_Release(gstate);
	return NULL;
}

int pnic_reflect(int (*cb)(const char *), char *str)
{
	int ret;
	pthread_t thr;
	struct thrparam *param;

	if (!cb || !str || !*str)
		return -1;

	param = malloc(sizeof(*param));
	if (!param)
		return -1;
	*param = (struct thrparam){cb, str, 0};

	ret = pthread_create(&thr, NULL, worker, param);
	if (ret)
		goto tail;
	pthread_join(thr, NULL);
	ret = param->ret;

tail:
	free(param);
	return ret;
}
