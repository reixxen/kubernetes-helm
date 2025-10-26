# Volumes

Необходимо выложить RabbitMQ из [rabbitmq](https://hub.docker.com/_/rabbitmq) с management

## При этом нужно

Прокинуть ENV переменные:

- `SEEDUSERNAME`
- `SEEDUSER_PASSWORD`
- Сделать Volume для хранения данных и прокинуть /var/lib/rabbitmq

В итоге должен быть написан конфиг для его выкладки.

## Цели урока

1. Изучить применение Volumes на шине сообщений RabbitMQ.
2. Обеспечить минимальную персистентность для очередей RabbitMQ.
3. Подготовить RabbitMQ к использованию в кластере с персистентным хранением.

## Шаги развертывания

- Создание PVC:

```bash
kubectl apply -f rabbitmq-pvc.yml
```

- Развертывание RabbitMQ:

```bash
kubectl apply -f rabbitmq-deployment.yml
```

- Создание Service:

```bash
kubectl apply -f rabbitmq-service.yml
```

## Проверка развертывания

- Проверить статус пода

```bash
kubectl get pods -l app=rabbitmq
```

- Проверить логи

```bash
kubectl logs -l app=rabbitmq
```

- Проверить PVC

```bash
kubectl get pvc
```

- Проверить сервис

```bash
kubectl get svc rabbitmq-service
```

## Доступ к RabbitMQ Management

Для доступа к web-интерфейсу management:

```bash
kubectl port-forward svc/rabbitmq-service 15672:15672
```

После этого открыть в браузере: <http://localhost:15672>
