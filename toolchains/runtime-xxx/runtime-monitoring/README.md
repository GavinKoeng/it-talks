# 运行时监控：

## 功能视角：
1. 定位：
2. 产品：
3. 学习：

## 使用视角：
1. 普通用户：
2. 超级用户：
3. 开发人员：

## 开发视角：
1. 基本原理：
2. 命令插件：
3. 图形集成：

## 综合示例：
1. 处理：
	top, ps(含线程), /proc/pid/, systemctl, journalctl 结合watch和tail
	strace, perf top
	xinput test id, xwininfo -root -tree, intel_gpu_top/nvtop/radeontop, docker(exec/cp), adb，
2. 存储：
	top, iotstat, iotop, lsof, 
	df, du, find,
	vmstat, free, /proc/meminfo, slabtop, heaptrack(-gui), 
	lsblk, lsusb
3. 网络： 
	ping, nethogs, ss/netstat, tcpdump, tshark, mtr, nmap, curl -4 icanhazip.com, curl -6 icanhazip.com
flatpak也可进入shell。
专用系统命令，k8s，数据库
docker exec/cp
调试器。
对用户态动态库金进行完整hook。
vmstat，dstat
opensnoop，execsnoop，trace
slabtop，free
/proc/pid/*
iostat
nstat
ss替代netstat。
perf lock，bpftrace deadlock/runqlat，perf和strace可跟踪信号量，
java，python，go，js客户端服务端，rust各自的监控
valgrind，heaptrack
hdc
adb。
java，python，go，js的监控
BPFtrace
vmstat
perf stat ls，perf top
ps，top，docker，strace，gdb，perf
xev，xinput。pulsaudio
inotify
录音，录像，截屏。
lsof，top，ps，iotop，netstat，nethogs，df，du，watch，tail，journalctl，systemctl，/proc，/dev，/sys
nmap
tshark
无线网，nmcli
nethogs，netstat，route，ip，ifconfig，ping，traceroute，wireshark，tcpdump。
