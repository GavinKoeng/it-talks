crash /usr/lib/debug/lib/modules/$(uname -r)/vmlinux /var/crash/<timestamp>/vmcore

vm
ps
log
sys
uptime
kmem
vtop
pte
mount
files
inode
net
socket
irq
mod
search
rd
dis

kmem -i
kmem -s

ps
ps -a
ps -u
ps -k

task <address>
set <pid>
vm <pid>
vtop <address>

# 遍历内核链表
list <list_head_address> -s <struct_type> -o <offset>
list -h <list_head>      # 显示链表头信息

# 示例：遍历进程链表
list task_struct.tasks -s task_struct -o tasks

# 遍历内核哈希表
hlist <hlist_head_address> -s <struct_type> -o <offset>

# 显示堆栈帧信息
frame <frame_address>

# 显示当前任务的堆栈回溯
bt

# 显示指定任务的堆栈
bt <pid>
bt <task_address>

# 显示所有进程的堆栈
bt -a

# 显示带帧指针的详细堆栈
bt -f

# 显示特定CPU的堆栈
bt -c <cpu>

# 显示内核日志
log
log -m        # 显示消息缓冲区
log -T        # 带时间戳显示
log -f        # 跟踪模式显示

msgbuf
