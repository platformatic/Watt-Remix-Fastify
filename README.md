# Remix Fastify E-commerce Demo

This is a simple e-commerce demo using Fastify, PostgreSQL, and Remix.

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run `npm run postgresql`
4. Create a `.env` file with the following content (replace `YOUR_IP` with your IP address):

```
DATABASE_URL=postgresql://postgres:password@YOUR_IP:5432/fastify_ecommerce
```

### How to get your ip address

Here's the platform-specific breakdown for getting your local IP address:

* **Linux/Unix**: Use `ip addr show` for a detailed view of all network interfaces, or for just the IPv4 address, run: `ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}'`. The simpler alternative `hostname -I` will also work on most distributions.
* **macOS**: Use `ifconfig | grep "inet " | grep -v 127.0.0.1` to see all active IPv4 addresses while excluding the loopback interface. For a cleaner output showing just the primary interface, you can use: `ipconfig getifaddr en0` (for Wi-Fi) or `ipconfig getifaddr en1` (for Ethernet).
* **Windows**: The command `ipconfig` shows all network interfaces and their configurations. For a filtered view showing only IPv4 addresses, use: `ipconfig | findstr /i "IPv4"`. Alternatively, use PowerShell with: `Get-NetIPAddress -AddressFamily IPv4 | Select-Object IPAddress`.

## Dev mode

Run `npm run dev` to start the development server.
It will start the Fastify server and the Remix development server and hot reload things as they are changed on disk

## Production mode

First run `npm run build` to build the Remix app.
Then run `npm start` to start the Fastify server and the Remix app in production mode.

## Deployment with ICC

Deploying this project in ICC requires setting `DATABASE_URL` to an IP address that is accessible from within
the kubernetes cluster. Loading the `.env` created above would do.
