# 程序的环境转换

## 整体概述：

1. 定位：整体软件硬件运行环境的最复杂的点，支持高级语言运行和虚拟化/云的基础, LLVM/AI/WINE
2. 产品：Shell/Python/JVM/QemuLinuxUser/LATX/QemuSystem/QemuKVM
3. 学习：实践(Linux)/理论(科普)/AI(DeepSeek/豆包)

## 解释模拟：

1. 指令解释：指令转译/前端+中间+后端/AOT+JIT+二者结合/优化/LLVM/AOT依旧需要虚拟机
2. 环境模拟：线程模拟/内存对应/系统调用(普通+内核FS+内存Map)+信号处理/进线程关系/根FS/QemuSystem
3. 综合示例：qemu_static示例

## 硬虚拟化：

1. 初步介绍：同硬件架构，高性能，QemuKVM/VMWare/VirtualBox/ZArch, CPU/内存/显卡/网卡，基本原理
2. 硬件原理：参见PPT图进行详细说明
3. 软件原理：参见PPT图进行详细说明
