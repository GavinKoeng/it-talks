#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <unistd.h>
#include <jni.h>

static JavaVM *jvm = NULL;
static jobject callback_obj = NULL;
static jmethodID callback_method = NULL;
static pthread_t background_thread = 0;
static volatile int thread_running = 0;

static void* background_worker(void* arg)
{
	int i = 0;
	int count = (int)(long)arg;
	int attached = 0;
	JNIEnv *env;
	char message[256];
	int result = (*jvm)->GetEnv(jvm, (void**)&env, JNI_VERSION_1_8);

	if (result == JNI_EDETACHED) {
		result = (*jvm)->AttachCurrentThread(jvm, (void**)&env, NULL);
		if (result != JNI_OK) {
			fprintf(stderr, "Failed to attach thread to JVM");
			return NULL;
		}
		attached = 1;
	}
	
	while (thread_running && i < count) {
		snprintf(message, sizeof(message), "Event %d from C thread %lu", i+1, pthread_self());
		jstring jmessage = (*env)->NewStringUTF(env, message);
		jint java_result = (*env)->CallIntMethod(env, callback_obj, callback_method, jmessage);
		(*env)->DeleteLocalRef(env, jmessage);
		i++;
		sleep(1);
	}
	
	if (attached)
		(*jvm)->DetachCurrentThread(jvm);
	return NULL;
}

JNIEXPORT void JNICALL Java_NativeExample_startBackgroundThread(JNIEnv *env, jobject obj,
								jobject callback, jint count)
{
	(*env)->GetJavaVM(env, &jvm);
	callback_obj = (*env)->NewGlobalRef(env, callback);
	jclass callback_class = (*env)->GetObjectClass(env, callback);
	callback_method = (*env)->GetMethodID(env, callback_class, "onEvent", "(Ljava/lang/String;)I");
	thread_running = 1;
	if (pthread_create(&background_thread, NULL, background_worker, (void*)(long)count)) {
		fprintf(stderr, "Failed to create thread");
		thread_running = 0;
	}
}

JNIEXPORT void JNICALL Java_NativeExample_stopBackgroundThread(JNIEnv *env, jobject obj)
{
	thread_running = 0;
	if (background_thread) {
		pthread_join(background_thread, NULL);
		background_thread = 0;
	}
	if (callback_obj) {
		(*env)->DeleteGlobalRef(env, callback_obj);
		callback_obj = NULL;
	}
}
