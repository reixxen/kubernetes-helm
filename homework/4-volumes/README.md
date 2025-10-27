# Conv App — Kubernetes Deployment

Этот проект включает три сервиса:

| Сервис | Назначение |
|--------|------------|
| conv-app | UI фронтенд (Vite SPA) |
| conv-api | Backend API |
| conv-service | Сервис для обработки сообщений из очереди |
| RabbitMQ | Брокер сообщений |

Фронт доступен по домену, API проксируется через `/api` внутри Ingress.

---

## Состав разворачиваемой инфраструктуры

- Kubernetes Deployments для всех сервисов
- ClusterIP Service к каждому компоненту
- Ingress для публичного доступа
- PVC для хранения данных:
  - uploads для API
  - данные RabbitMQ
- Secrets:
  - AMQP конфигурация
  - SEED пользователь (username/password)
- ConfigMap для `VITE_DOMAIN`

---

## Требования

Перед запуском убедитесь, что установлены:

- kubectl
- minikube или Kubernetes cluster
- ingress controller (например nginx)

Для Minikube:

```sh
minikube start
minikube addons enable ingress
```

## Проверка

```sh
kubectl get pods -n ingress-nginx
```

Должны появиться pods контроллера.

## 🚀 Установка

Примените манифесты:

```sh
kubectl apply -f .
```

Дождитесь готовности pod’ов:

```sh
kubectl get pods
```

## 🌍 Доступ к сервисам

Для Minikube получаем IP:

```sh
minikube ip
```

Потом добавляем запись в /etc/hosts

```sh
sudo nano /etc/hosts
```

Добавляем:

```sh
<MINIKUBE-IP> conv.test
```

Открываем приложение:

- <http://conv.test>
- <http://conv.test/api>

## 🐰 Доступ к RabbitMQ Management

```sh
kubectl port-forward svc/rabbitmq-clusterip 15672:15672
```

После этого открыть:

- <http://localhost:15672>

Логин и пароль берём из rabbitmq-secret

## Хранение данных

| Сервис | Путь | PVC |
|--------|------------| ----- |
| conv-api uploads | `/opt/app/uploads` | conv-api-pvc |
| RabbitMQ data | `/var/lib/rabbitmq` | rabbitmq-pvc |

Данные сохраняются при перезапуске pod.

## 🔁 Перезапуск сервиса

Например для conv-api:

```sh
kubectl rollout restart deployment/conv-api-deployment
```

Проверка логов:

```sh
kubectl logs -f deployment/conv-api-deployment
```

## 🧹 Удаление всех ресурсов

```sh
kubectl delete -f .
```
