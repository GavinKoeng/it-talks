# opnehamrony适配vim
## 鸿蒙源码中的源头库位置
$(pwd)/openharmony-v5.0.2/OpenHarmony/prebuilts/gcc/linux-x86/aarch64/gcc-linaro-7.5.0-2019.12-x86_64_aarch64-linux-gnu/aarch64-linux-gnu/libc

## 1. 设置环境变量（重要！）
```shell
export CC=aarch64-none-linux-gnu-gcc
export CXX=aarch64-none-linux-gnu-g++
export LD=aarch64-none-linux-gnu-ld
export AR=aarch64-none-linux-gnu-ar
export RANLIB=aarch64-none-linux-gnu-ranlib
export STRIP=aarch64-none-linux-gnu-strip
export LDFLAGS="-L/system/lib -lncursesw -static"
export CPPFLAGS="-I/system/include/ncursesw"
```

## 2. 编译 ncurses（修正配置）

```shell
cd ncurses-6.5-20250809
make distclean

./configure \
    --prefix=/system/ \
    --host=aarch64-linux-gnu \
    --with-shared \
    --enable-widec \
    --without-cxx \
    --without-cxx-binding \
    --without-ada \
    --without-manpages \
    --without-progs \
    --without-tests \
    --disable-database \
    --with-fallbacks=vt100
    
make -j$(nproc)
make install
```

### 3. 编译 Vim（修正配置）

```shell
cd ../vim-9.1.1629
make distclean

./configure \
    --prefix=/system/ \
    --host=aarch64-linux-gnu \
    --with-features=huge \
    --disable-gui \
    --without-x \
    --without-wayland \
    --disable-selinux \
    --disable-acl \
    --disable-gpm \
    --with-tlib=ncursesw \
    LDFLAGS="-L/system/lib -lncursesw -static"
    CPPFLAGS="-I/system/include/ncursesw"
    vim_cv_getcwd_broken=no \
    vim_cv_memmove_handles_overlap=yes \
    vim_cv_stat_ignores_slash=yes \
    vim_cv_tgetent=zero \
    vim_cv_terminfo=yes \
    vim_cv_toupper_broken=no \
    vim_cv_tty_group=root \
    vim_cv_tty_mode=0620

make -j$(nproc)
make install
```

## 问题一
### 描述
```shell
$ ./vim
./vim: /data/VIM/libc/lib/libm.so.6: version `GLIBC_2.38' not found (required by ./vim)
./vim: /data/VIM/libc/lib/libm.so.6: version `GLIBC_2.29' not found (required by ./vim)
./vim: /data/VIM/libc/lib/libc.so.6: version `GLIBC_2.33' not found (required by ./vim)
./vim: /data/VIM/libc/lib/libc.so.6: version `GLIBC_2.34' not found (required by ./vim)
./vim: /data/VIM/libc/lib/libc.so.6: version `GLIBC_2.33' not found (required by /data/VIM/system/lib/libncursesw.so.6)
```

### 检查
```shell
$ strings /data/VIM/libc/lib/libc.so.6 | grep GLIBC_
GLIBC_2.17                                           
GLIBC_2.18                                        
GLIBC_2.22                                           
GLIBC_2.23                                           
GLIBC_2.24                                           
GLIBC_2.25                   
GLIBC_PRIVATE
```

### 总结
目标机器上的 GLIBC 版本最高只有 2.25，但您编译时使用的工具链需要 GLIBC_2.29、2.33、2.34、2.38 等更新版本。

2.29是x86平台的，2.25是arm64结构的，所以不适配




## 问题二
### 描述
E557: Cannot open termcap file
'linux' not known. Available builtin terminals are:
    builtin_ansi
    builtin_vt320
    builtin_vt52
    builtin_xterm
    builtin_iris-ansi
    builtin_pcansi
    builtin_win32
    builtin_amiga
    builtin_dumb
    builtin_debug
defaulting to 'ansi'
E1187: Failed to source defaults.vim
Press ENTER or type command to continue

### 原因
ES57 错误：无法打开 terracap 文件（可能是终端能力描述文件）
'linux' 终端类型未知：系统无法识别 linux 终端类型
E1187 错误：无法加载 defaults.vim 配置文件
### 解决
#### 方法1
export TERM=xterm
#### 方法2
echo "export TERM=xterm" >> ~/.bashrc
source ~/.bashrc

## 问题三
### 描述
```shell
$ vim test.md
E1187: Failed to source defaults.vim
Press ENTER or type command to continue
```

### 总结
这个错误表明 Vim 无法加载其默认配置文件 defaults.vim。这是在嵌入式系统或定制 Linux 环境中常见的问题。

### 方法
在家目录手动建一个.vimrc 文件

## 问题四
### 描述
移植后的vim中文出现乱码的情况

### 分析
是.vimrc需要设置中文支持,是需要一个支持中文的bash

### 解决
```shell
" 设置中文编码支持
set encoding=utf-8
set fileencodings=utf-8,gbk,gb2312,big5

" 设置终端编码
set termencoding=utf-8

" 设置语言菜单为中文（可选）
set langmenu=zh_CN.UTF-8
set helplang=cn

" 解决中文显示问题
set ambiwidth=double

" 设置中文输入法（如果需要）
set iminsert=0
set imsearch=0
```
