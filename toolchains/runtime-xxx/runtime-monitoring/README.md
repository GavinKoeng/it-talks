# 运行时监控：

## 功能视角：
1. 定位：搜集运行时的各类环境信息(不局限于计算机)，为后继分析提供支撑；运行时调试和运行时分析单独说明
2. 类别：桌面(Linux/Windows/Mac)，手机(安卓/苹果)，服务器(Linux/Unix)，扩展/专用平台(虚拟机/云/嵌入式)
3. 学习：实践Linux(开源/范围广/复杂度低)/理论科普(全面/成体系/开拓视野)/辅助AI(deepseek/豆包)

## 使用视角：
1. 普通使用：环境(设备/配置/资源)/存储(文件系统/硬盘/内存)/网络(本机/拓扑/外部)/处理(CPU/进线程/扩展平台)
2. 系统管理：权限高(安全)/全面(journalctl/procfs/varlog/home)/细致(nethogs/tcpdump/tshark/iotop/slabtop)
3. 开发调试：普通用户+系统管理的互补，精细跟踪分析(strace/perf/BPFtrace/调试器/heaptrack/valgrind/虚拟机)

## 实现视角：
1. 基本原理：基于平台实现本身，提供相关的服务；内核，各类虚拟机，网络基础设施服务
2. 交互集成：命令行界面，图形界面，编程接口
3. 专用定制：扩展工具(交互集成)，针对自己程序(日志/统计/断点)，全新开发(基本原理)

## 综合示例：
1. 处理：
	top, ps(含线程), /proc/pid/, systemctl, journalctl 结合watch和tail
	strace, perf top
	xinput test id, xwininfo -root -tree, intel_gpu_top/nvtop/radeontop, docker(exec/cp), adb，
2. 存储：
	top, iostat, iotop, lsof, 
	df, du, find,
	vmstat, free, /proc/meminfo, slabtop, heaptrack(-gui), 
	lsblk, lsusb
3. 网络： 
	ping, nethogs, ss/netstat, tcpdump, tshark, mtr, nmap, curl -4 icanhazip.com, curl -6 icanhazip.com

4. 环境：
	设备：lsusb/lsblk/ttyserial/ifconfig/route/ip/(iptables -L -v/ufw/firewalld/nftables)
	配置：sysctl -a/gsettings
	资源：ipcs/lsfd/lslocks/lsof(-i)，perf lock record -a/perf lock report/interrupts/zoneinfo/dma(vmstat/bufinfo/slabtop/lsof),

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
