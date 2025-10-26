# Работа с сетью

**Необходимо описать следующие объекты**:

- Ingress
- ClusterIP

## Установка ingress minikube

```bash
minikube addons enable ingress
```

```bash
kubectl get pods -n ingress-nginx
```

## Запуск

```bash
kubectl apply -f app-deployment.yml
```

```bash
kubectl apply -f app-service.yml
```

```bash
kubectl apply -f ingress.yml
```

```bash
kubectl get all
```

```bash
kubectl get ingress
```

## Для доступа нужно по домену нужно сделать

```bash
minikube ip
```

### Добавляем правило

```bash
192.168.49.2 conv.test
```
