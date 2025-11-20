# Workshop: Server setup and auto-deployment using Dokploy

## Server

### User

1. Login to server

```sh
ssh root@<server ip>
```

2. Create user

```sh
useradd <username> -m -U -G sudo -s /bin/bash
```

```
-m, --create-home
-U, --user-group
-s, --shell SHELL
-G, --groups GROUPS
```

3. Set password for user

```sh
passwd <username>
```

4. Enable SSH access to new user

```sh
mkdir /home/<username>/.ssh;
cp ~/.ssh/authorized_keys /home/<soheil>/.ssh/authorized_keys;
chown -R <username>:<username> /home/<username>;
```

5. Ensure SSH access with new user

```sh
logout;
ssh <username>@<server ip>;
```

### SSH Hardening

We want to secure server access by preventing SSH via username and password. And logging in as root user.

#### Prevent username and password login
