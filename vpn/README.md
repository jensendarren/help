## Server setup

This [article](https://www.cyberciti.biz/faq/ubuntu-20-04-lts-set-up-openvpn-server-in-5-minutes/) has details.

Install:

```
sudo apt update
sudo apt upgrade
wget https://git.io/vpn -O openvpn-ubuntu-install.sh
chmod -v +x openvpn-ubuntu-install.sh
sudo ./openvpn-ubuntu-install.sh
```

Follow the wizard and select:

1. Private IPv4 address
2. Public IPv4 address
3. Port 1194 <-- make sure this port is open on the server
4. DNS 1.1.1.1
5. Client: (choose a suitable name based on who will use the VPN)

**NOTE**: on server `.ovpn` files are stored in `/root`

**NOTE**: to install for more clients just run the script again giving a different client name!

Check logs using: `journalctl -u openvpn-server@server.service`

Check `status` (or start|stop|restart) usign: `sudo systemctl status openvpn-server@server.service`

## Client setup

Download the `.opvn` file: `ssh user@vpnserver "sudo -S cat /root/clientname.ovpn" > clientname.ovpn`

On mac [install Tunnleblick](https://tunnelblick.net/).

Drag and drop the `.opvn` file into Tunnleblick and connect!

## VPN (Tunnelblik)

1st turn off wifi manually then run:
`sudo route flush`

OR us the fl alias as setup above! :)
