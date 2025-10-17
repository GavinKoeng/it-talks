#!/bin/bash
# compile.sh
JAVA_HOME="/usr/lib/jvm/default-java"

# 生成JNI头文件
echo "Generating JNI headers..."
javac -h . NativeExample.java

# 编译C动态库
echo "Compiling native library..."
gcc -g -O0 -I${JAVA_HOME}/include -I${JAVA_HOME}/include/linux \
    -shared -fPIC -o libnative.so native.c -lpthread

# 编译Java程序
echo "Compiling Java program..."
javac -g NativeExample.java

echo "Compilation complete"
