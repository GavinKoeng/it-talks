# linux适配hdc工具
## 安装工具
下载4.1的鸿蒙toolchain工具，5.0.0+版本的toolchain不稳定
地址：http://ci.openharmony.cn/workbench/cicd/dailybuild/dailylist
选择分支：OpenHarmony-4.1-Release 时间：2022-9～2025-10
或者根据源代码去编译也行

## 使用hdc
### 环境变量
Start the terminal tool and run the following command:
启动终端工具并运行以下命令：

```shell
echo $SHELL 
```

If the command output is /bin/bash, open the .bash_profile file.
如果命令输出为 /bin/bash，请打开 .bash_profile 文件。

```shell
vi ~/.bash_profile
```

If the command output is /bin/zsh, open the .zshrc file.
如果命令输出为 /bin/zsh，请打开 .zshrc 文件。

```shell
vi ~/.zshrc
```

Press i to enter Insert mode.
按 i 进入插入模式。

Enter the following content and add the SDK path to the PATH.
输入以下内容，并将 SDK 路径添加到 PATH.

In the following example, the toolchains path of the local SDK is /User/username/sdk/openharmony/10/toolchains.
在以下示例中，本地 SDK 的工具链路径为 /User/username/sdk/openharmony/10/toolchains。

```shell
HDC_SDK_PATH=/User/username/sdk/openharmony/10/toolchains
launchctl setenv HDC_SDK_PATH $HDC_SDK_PATH # This command needs to be executed only on macOS.
export PATH=$PATH:$HDC_SDK_PATH
```

Press Esc to exit Insert mode. Then enter :wq and press Enter to save the settings.
按 Esc 退出插入模式。然后输入 ：wq 并按 Enter 保存设置。

Run the following command for the environment variable to take effect.
运行以下命令，使环境变量生效。

If the .bash_profile file is opened in step 1, run the following command:
如果在步骤 1 中打开了 .bash_profile 文件，请运行以下命令：
  
```shell
source ~/.bash_profile
```

If the .zshrc file is opened in step 1, run the following command:
如果在步骤 1 中打开了 .zshrc 文件，请运行以下命令：

```shell
$ source ~/.zshrc
```

### 报错
```shell
$ ./hdc shell
[Fail]ExecuteCommand need connect-key? 
```
这种问题一般在usb的权限不够，所以要赋予权限，也许有其他问题，所以先用lsblk命令确认一下，然后给予权限：
#### 临时
```shell
$ sudo chmod -R 777 /dev/bus/usb/
```

#### 持久
To permanently change the operation permission on a USB device, do as follows:
要永久更改 USB 设备上的作权限，请执行以下作：

Run the lsusb command to obtain the vendorID and productID of the USB device.
执行 lsusb 命令，获取 USB 设备的 vendorID 和 productID。

Create an udev rule.
创建 udev 规则。

Edit the udev loading rule and replace the default idVendor and idProduct values of the device with the values obtained in the previous step.
编辑 udev 加载规则，并将设备的默认 idVendor 和 idProduct 值替换为在上一步中获取的值。

MODE="0666" indicates the permissions of GROUP (the user group) for the USB device. Ensure that the login user is in the user group.
MODE=“0666” 表示 GROUP（用户组）对 USB 设备的权限。确保登录用户在用户组中。

```shell
$ sudo vim /etc/udev/rules.d/90-myusb.rules
SUBSYSTEMS=="usb", ATTRS{idVendor}=="067b", ATTRS{idProduct}=="2303", GROUP="users", MODE="0666"
```

Restart the computer or reload the udev rule.
重新启动计算机或重新加载 udev 规则。

```shell
$ sudo udevadm control --reload
```


地址：https://gitee.com/wdh122119/docs/blob/master/en/application-dev/dfx/hdc.md
