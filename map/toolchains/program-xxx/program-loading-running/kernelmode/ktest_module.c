/*
 * 最简单的 proc 文件系统示例
 * ktest_module.c
 */

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/uaccess.h>
#include <linux/version.h>

#define PROC_FILE_NAME "ktest"

// 缓冲区大小
#define MAX_BUF_SIZE 1024

// 全局变量
static struct proc_dir_entry *proc_entry;
static char proc_buffer[MAX_BUF_SIZE];
static size_t proc_buffer_size = 0;

// proc文件读操作
static ssize_t proc_read(struct file *file, char __user *user_buf,
						size_t count, loff_t *ppos)
{
	if (*ppos > 0)
		return 0;  // 表示已经读取完毕
	
	// 将内核缓冲区内容复制到用户空间
	if (copy_to_user(user_buf, proc_buffer, proc_buffer_size)) {
		return -EFAULT;
	}
	
	*ppos = proc_buffer_size;
	return proc_buffer_size;
}

// proc文件写操作
static ssize_t proc_write(struct file *file, const char __user *user_buf,
						 size_t count, loff_t *ppos)
{
	// 确保不超过缓冲区大小
	if (count >= MAX_BUF_SIZE) {
		count = MAX_BUF_SIZE - 1;
	}
	
	// 清空缓冲区
	memset(proc_buffer, 0, MAX_BUF_SIZE);
	
	// 从用户空间复制数据到内核缓冲区
	if (copy_from_user(proc_buffer, user_buf, count)) {
		return -EFAULT;
	}
	
	proc_buffer_size = count;
	proc_buffer[count] = '\0';  // 确保字符串结束
	
	printk(KERN_INFO "ktest: 接收到 %zu 字节数据: %s\n", count, proc_buffer);
	
	return count;
}

// 文件操作结构体
#if LINUX_VERSION_CODE >= KERNEL_VERSION(5,6,0)
static const struct proc_ops proc_fops = {
	.proc_read = proc_read,
	.proc_write = proc_write,
};
#else
static const struct file_operations proc_fops = {
	.read = proc_read,
	.write = proc_write,
};
#endif

// 模块初始化函数
static int __init ktest_init(void)
{
	// 初始化缓冲区
	strcpy(proc_buffer, "Hello from kernel module!\n");
	proc_buffer_size = strlen(proc_buffer);
	
	// 创建proc文件
#if LINUX_VERSION_CODE >= KERNEL_VERSION(5,6,0)
	proc_entry = proc_create(PROC_FILE_NAME, 0666, NULL, &proc_fops);
#else
	proc_entry = proc_create(PROC_FILE_NAME, 0666, NULL, &proc_fops);
#endif
	
	if (!proc_entry) {
		printk(KERN_ERR "ktest: 无法创建 /proc/%s\n", PROC_FILE_NAME);
		return -ENOMEM;
	}
	
	printk(KERN_INFO "ktest: 模块加载成功，/proc/%s 已创建\n", PROC_FILE_NAME);
	return 0;
}

// 模块退出函数
static void __exit ktest_exit(void)
{
	if (proc_entry) {
		proc_remove(proc_entry);
	}
	
	printk(KERN_INFO "ktest: 模块卸载成功\n");
}

// 模块信息
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Your Name");
MODULE_DESCRIPTION("最简单的/proc文件系统示例");
MODULE_VERSION("1.0");

module_init(ktest_init);
module_exit(ktest_exit);
