# Helm Commands

## Installation

### Install ingress

Follow instructions: <https://yandex.cloud/ru/docs/managed-kubernetes/operations/applications/ingress-nginx?utm_referrer=https%3A%2F%2Fwww.google.ru%2F&utm_referrer=https%3A%2F%2Fyndx.auth.yandex.cloud%2F>

### Install helm-secrets plugin

```sh
helm plugin install https://github.com/jkroepke/helm-secrets
```

### Install GPG (Ubuntu)

```sh
sudo apt update && sudo apt install gnupg
```

### Install SOPS

Follow instructions: <https://github.com/getsops/sops#stable-release>

### GPG Key Management

Generate new key

```sh
gpg --gen-key
```

List keys

```sh
gpg --list-keys
```

Delete key

```sh
gpg --delete-secret-keys KEY_ID
gpg --delete-keys KEY_ID
```

### Secrets Management

Create secrets file

```sh
sops -p GPG_KEY_ID secrets.yaml
```

Edit secrets

```sh
helm secrets edit secrets.yaml
```

Decrypt secrets

```sh
helm secrets decrypt secrets.yaml
```

Decrypt in-place

```sh
helm secrets decrypt -i secrets.yaml
```

Encrypt in-place

```sh
helm secrets encrypt -i secrets.yaml
```

### Fix GPG issues

```sh
export GNUPGHOME=~/.gnupg
export GPG_TTY=$(tty)
gpgconf --kill gpg-agent
gpg-agent --daemon
```

## Application Deployment

Install release

```sh
helm secrets install conv-app-release ./conv-app/ -f secrets.yaml
```

Upgrade/install release

```sh
helm secrets upgrade --install conv-app-release ./conv-app/ -f ./conv-app/values.yaml -f secrets.yaml
```

Upgrade secrets only

```sh
helm secrets upgrade conv-app-release ./conv-app -f ./secrets.yaml
```

## Debugging

Dry-run installation

```sh
helm secrets install --debug --dry-run conv-app-release ./conv-app/ -f secrets.yaml
```

Render templates

```sh
helm secrets template ./conv-app/ -f secrets.yaml
```

View generated manifests

```sh
helm secrets template . -f values.yaml -f secrets.yaml
```

## Testing

Run tests

```sh
helm test conv-app-release
```

Check secrets in cluster

```sh
kubectl get secrets conv-api-secret --template={{.data.AMQP_PASSWORD}} | base64 -d
```
