# Niko Home Control - HomeKit Bridge

Exposes a Niko Home Control installation as a compatible HomeKit device.

## Requirements
* A Niko Home Control installation (tested with v1.10 and API v1.19)
* An always-on computer or server on the same network as your NHC installation
* An iOS device running iOS 10

## Installing
nhc-homekit is published through NPM and can be installed by executing the following in your shell:
```bash
npm install -g nhc-homekit
```

**Note:** If you're installing this on a Linux machine, you'll also need to install `avahi` and `libavahi-compat-libdnssd-dev`

You should now be able to run `nhc-homekit`. Nu further configuration is required!

### Run at boot
In order to have `nhc-homekit` startup automatically when your machine boots, you'll have to add a systemd configuration like the following:

```
[Unit]
Description=NHC HomeKit Server
After=syslog.target network-online.target

[Service]
Type=simple
User=niko
EnvironmentFile=/etc/default/nhc-homekit
ExecStart=/usr/local/bin/nhc-homekit $NHC_HOMEKIT_OPTS
Restart=on-failure
RestartSec=10
KillMode=process

[Install]
WantedBy=multi-user.target
```

## Adding to HomeKit
Open up the Home app on your iOS device as soon as `nhc-homekit` is running and go to the "Add Accessory" screen. If all goes well you should see a bridge accessory called "Niko Home Control". Add it and enter the pin `031-45-154`.

## Troubleshooting
If you're running into trouble adding the bridge, try deleting the `~/.nhc-homekit` directory.

If that doesn't solve the problem, try running `nhc-homekit` with increased verbosity to see `info` and `debug` messages. See `nhc-homekit --help` for details. By default only errors get logged to `stderr`.

## Limitations
The only NHC actions that are currently supported are those that control lights. I'm working on supporting others, like controlling outlets and motorized applications though!
