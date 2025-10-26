# Volumes и Secrets в Kubernetes

Развертывание [RabbitMQ](https://hub.docker.com/_/rabbitmq) с persistence и Conv API для обработки изображений с использованием Kubernetes Volumes и Secrets для безопасного хранения данных.

- **RabbitMQ**: Message broker с persistence и management UI
- **Conv API**: Микросервис для обработки изображений
- **Persistent Volumes**: Хранение данных RabbitMQ и загруженных изображений
- **Secrets**: Безопасное хранение учетных данных и конфигурации

## Объекты

1. **RabbitMQ**
    - Image: rabbitmq:3.13-management
    - Ports: 5672 (AMQP), 15672 (Management), 25672 (Cluster)
    - Persistence: /var/lib/rabbitmq
    - Secrets: username, password, Erlang cookie

2. **Conv API**
    - Image: ghcr.io/reixxen/conv-api:latest
    - Port: 3000
    - Persistence: /opt/app/uploads (для хранения изображений)
    - Secrets: AMQP connection parameters

## Файлы конфигурации

### Secrets

- `rabbitmq-secret.yml` - Учетные данные RabbitMQ
- `conv-api-secret.yml` - Параметры подключения к RabbitMQ

### Persistent Volumes

- `rabbitmq-pv.yml` - PV для данных RabbitMQ
- `rabbitmq-pvc.yml` - PVC для RabbitMQ
- `conv-api-pv.yml` - PV для загруженных изображений
- `conv-api-pvc.yml` - PVC для Conv API

### Deployments & Services

- `rabbitmq-deployment.yml` - Deployment RabbitMQ

- `rabbitmq-service.yml` - Service RabbitMQ

- `conv-api-deployment.yml` - Deployment Conv API

- `conv-api-service.yml` - Service Conv API

## Развертывание

1. Создание Secrets

    ```bash
    # RabbitMQ credentials
    echo -n "SEED_USER_NAME" | base64
    echo -n "SEED_USER_PASSWORD" | base64
    # Erlang Cookie
    openssl rand -base64 24 | tr -d '\n' | base64

    # Conv API environment variables
    echo -n "conversion-exchange" | base64
    echo -n "rabbitmq-clusterip" | base64

    # Применить Secrets
    kubectl apply -f rabbitmq-secret.yml
    kubectl apply -f conv-api-secret.yml
    ```

2. Создание Persistent Volumes и Claims

    ```bash
    # RabbitMQ persistence
    kubectl apply -f rabbitmq-pv.yml
    kubectl apply -f rabbitmq-pvc.yml

    # Conv API persistence
    kubectl apply -f conv-api-pv.yml
    kubectl apply -f conv-api-pvc.yml
    ```

3. Развертывание RabbitMQ

    ```bash
    kubectl apply -f rabbitmq-deployment.yml
    kubectl apply -f rabbitmq-service.yml
    ```

4. Развертывание Conv API

    ```bash
    kubectl apply -f conv-api-deployment.yml
    kubectl apply -f conv-api-service.yml
    ```

### Проверка развертывания

#### Проверить статус всех компонентов

```bash
kubectl get pods,svc,pv,pvc,secret
```

#### Проверить конкретные компоненты

```bash
# Проверить статус подов
kubectl get pods -l component=rabbitmq
kubectl get pods -l component=conv-api

# Проверить логи
kubectl logs -l component=rabbitmq
kubectl logs -l component=conv-api

# Проверить PVC
kubectl get pvc

# Проверить сервисы
kubectl get svc rabbitmq-clusterip
kubectl get svc conv-api-clusterip
```

## Доступ к сервисам

### RabbitMQ Management UI

```bash
kubectl port-forward svc/rabbitmq-clusterip 15672:15672
```

Открыть в браузере: <http://localhost:15672>

### Conv API

```bash
kubectl port-forward svc/conv-api-clusterip 3000:3000
```

Доступно по: <http://localhost:3000>

## Переменные окружения

### RabbitMQ

- `RABBITMQ_DEFAULT_USER` - Из secret: rabbitmq-secret

- `RABBITMQ_DEFAULT_PASS` - Из secret: rabbitmq-secret

- `RABBITMQ_ERLANG_COOKIE` - Из secret: rabbitmq-secret

### Conv API

- `AMQP_EXCHANGE` - Название exchange для сообщений

- `AMQP_USER` - Username для подключения к RabbitMQ

- `AMQP_PASSWORD` - Password для подключения к RabbitMQ

- `AMQP_HOSTNAME` - Hostname сервиса RabbitMQ

## Мониторинг и отладка

### Проверить подключение Conv API к RabbitMQ

```bash
kubectl logs -l component=conv-api | grep -i "rabbitmq\|amqp"
```

### Проверить состояние очередей в RabbitMQ

```bash
# Через port-forward зайти в Management UI
# или использовать CLI
kubectl exec -it <rabbitmq-pod> -- rabbitmqctl list_queues
```

### Проверить использование volumes

```bash
kubectl describe pvc rabbitmq-pvc
kubectl describe pvc conv-api-pvc
```
