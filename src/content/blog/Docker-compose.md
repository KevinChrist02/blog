---
title: "It's just Docker Compose"
description: 'Docker compose is such a cool tool and i always use it for my server'
pubDate: 2025-10-28 
---

Since starting my [self-hosting journey](https://github.com/KevinChrist02/homelab), 
I have always used Docker to host a service. Docker handles everything. 
You just copy-paste the Docker command the service provided, and that’s it.
Sure, sometimes you need to change things like the port or the location to
store persistent data (Volumes), but more or less, that's all.

## Why Docker Compose is a Game Changer

Then I stumbled upon Docker Compose – and this is pretty much a game changer.
I hated just blindly pasting the Docker command into my terminal and watching
it do "something."

With Docker Compose, I have a YAML file that contains all the instructions. 
I can view it, change it, and know exactly what the service does and what 
resources it needs every single time. 
It provides transparency and reproducibility, which is essential when your 
number of services grows.

## The Trick: Translating Docker Commands into Compose

However, sometimes the service I want to host does not come with a docker-compose.yml file.
There is just the simple docker run command to start the service.

Maybe it's just me and I was the last to find out, but: 
You are able to translate the docker run command directly into a Docker Compose file!

It's easier than you might think. Let’s take this command as an example:

```bash
docker run --rm -dit --name excalidraw -p 5000:80 excalidraw/excalidraw:latest
```

If we take the necessary parts and write a docker-compose.yml file with them, it would look like this:

```yml
services:
    excalidraw:
    container_name: excalidraw
    image: excalidraw/excalidraw:latest
    restart: unless-stopped
    ports:
        - 5000:80
```

### Translating the flags (arguments) is straightforward:

- The `--name` flag (excalidraw) becomes the container_name.

- The last part of the command (excalidraw/excalidraw:latest) is the image.

- The `-p` flag (5000:80) stands for the ports you want the service to bind to.

- The --rm flag (remove container on exit) can be omitted when using restart: unless-stopped,
as you typically don't want the container to stop.

- `-d` (Detached Mode) is covered when starting with docker compose up -d.

- `-it` (Interactive/TTY) is often unnecessary for web services.

**Addition**: The line `restart: unless-stopped` has been added, as it's a best practice
for self-hosting to ensure the service automatically restarts, e.g., after a server reboot.

You can translate any simple docker run command into a Compose file this way.
It makes your workflow so much cleaner!

Of course, this is an easy example. But once you know how to translate flags
like `-e` (Environment Variables), `-v` (Volumes), and `--network` (Network settings),
you're well-equipped for more complex setups.
