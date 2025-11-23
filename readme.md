# Workshop: Server setup & Auto-Deployment using Dokploy

## Server

### Update packages

1. Login to server

```sh
ssh root@<server ip>
```

2. Update package index and update packages

```sh
apt update
apt upgrade
```

### User

1. Create user

```sh
useradd <username> -m -U -G sudo -s /bin/bash
```

```
-m, --create-home
-U, --user-group
-s, --shell SHELL
-G, --groups GROUPS
```

2. Set password for user

```sh
passwd <username>
```

3. Enable SSH access to new user

```sh
mkdir /home/<username>/.ssh;
cp ~/.ssh/authorized_keys /home/<username>/.ssh/authorized_keys;
chown -R <username>:<username> /home/<username>;
```

4. Ensure SSH access with new user

```sh
logout;
ssh <username>@<server ip>;
```

### SSH Hardening

We want to secure server access by preventing SSH via username and password. And logging in as root user.

#### Prevent username and password login

Set `PasswordAuthentication` in `/etc/ssh/sshd_config` to `no`

using `vi`

```
%s/PasswordAuthentication yes/PasswordAuthentication no
```

using `sed`

```sh
sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
```

```
-i[SUFFIX], --in-place[=SUFFIX]
```

Restart `ssh.service`

```sh
sudo service ssh restart
```

#### Prevent connecting as root user

Set `PermitRootLogin` in `/etc/ssh/sshd_config` to `no`

```sh
sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
```

```sh
sudo service ssh restart
```

### Firewall with ufw

### Fail2Ban with CrowdSec
