# Openharmony源码下载

## 先决条件
1. 在 Gitee 注册您的帐户。

2. 注册一个 SSH 公钥以访问 Gitee。

3. 安装 git 客户端和 git-lfs，并配置用户信息。

```shell
git config --global user.name "yourname"
git config --global user.email "your-email-address"
git config --global credential.helper store
```

4. 运行以下命令以安装存储库工具：

```shell
curl -s https://gitee.com/oschina/repo/raw/fork_flow/repo-py3 > /usr/local/bin/repo  # If you do not have the permission, download the tool to another directory and configure it as an environment variable by running the chmod a+x /usr/local/bin/repo command.
pip3 install -i https://repo.huaweicloud.com/repository/pypi/simple requests
chmod +x /usr/local/bin/repo # 确保repo有可执行权限
cd /usr/bin/            # 进入到/usr/bin目录去处理python
ln -s python3 python	# 确保python命令使用的是python3，而不是python2
```

## 安装源码

从版本分支获取源代码。您可以获取版本分支的最新源代码，其中包括在运行以下命令之前已合并到分支中的代码：

```shell
repo init -u https://gitee.com/openharmony/manifest -b OpenHarmony-5.0.0-Release --no-repo-verify
repo sync -c
repo forall -c 'git lfs pull'
```

拉取大文件过程中出错，可以重置Git LFS
```shell
# 重置所有仓库的 LFS 配置
repo forall -c 'git lfs uninstall'
repo forall -c 'git lfs install'

# 然后重新拉取
repo forall -c 'git lfs pull'
```

## 参考地址
https://gitee.com/openharmony/docs/blob/master/en/release-notes/OpenHarmony-v5.0.0-release.md
