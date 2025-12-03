# Workshop: Server setup & Auto-Deployment using Dokploy

## Resources

- https://youtu.be/F-9KWQByeU0?si=O-q_604Nd3RgAHQt
- https://docs.dokploy.com/docs/core
- https://docs.docker.com/engine/swarm/key-concepts/
- https://youtu.be/ELkPcuO5ebo?si=N-shKOxHCwcGisRP
- https://wiki.debian.org/Uncomplicated%20Firewall%20%28ufw%29

## Server

### Update packages

1. Login to server

```sh
ssh root@<server ip>
```

2. Update package index and update packages

```sh
apt update;
apt upgrade;
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

> When exposing ports with docker always specify the loopback interfaces ip: `127.0.0.1:80:80` instead of `80:80`. Because docker overrides `ufw` by updating `iptables`.

## Install

```sh
sudo apt install ufw
```

## Apply default rules

```sh
sudo ufw default deny incoming;
sudo ufw default allow outgoing;
```

## Allow OpenSSH on port 22

```sh
sudo ufw allow OpenSSH;
sudo ufw show added;
```

## Allow ports 80 and 443

```sh
sudo ufw allow 80;
sudo ufw allow 443;
sudo ufw show added;
```

## Enable firewall

```sh
sudo ufw enable;
sudo ufw status;
```

### Malicious IP blocking with CrowdSec

[https://doc.crowdsec.net/u/getting_started/installation/linux](https://doc.crowdsec.net/u/getting_started/installation/linux)

### Install Dokploy

Continue on https://docs.dokploy.com/docs/core/installation

## Features

- Built-in Webserver (Traefik)
- Docker
- Auto deployments
- SSL mit Let’s Encrypt
- User management (2FA)
- Git integration (Github, Gitlab, Bitbucket etc.)
- Scheduled tasks
- Multi environment support (production, test etc.)
