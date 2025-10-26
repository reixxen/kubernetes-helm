# Работа с объектами

- Перепишите ваш pod на deployment, чтобы иметь возможность использовать rollout и изменять параметры Pod.
- В результате вы должны получить написанный deployment.

## Запуск

```bash
kubectl apply -f app-deployment.yml
```

```bash
kubectl apply -f node-port.yml
```

Если используется виртуалка, можно применить:

```bash
kubectl port-forward service/conv-app-port 8080:80
```

Проверка запуска

```bash
kubectl get all

NAME                                      READY   STATUS    RESTARTS   AGE
pod/conv-app-deployment-cc557557f-vspzr   1/1     Running   0          19s

NAME                    TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
service/conv-app-port   NodePort    10.107.151.156   <none>        80:31200/TCP   6s
service/kubernetes      ClusterIP   10.96.0.1        <none>        443/TCP        6h42m

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/conv-app-deployment   1/1     1            1           19s

NAME                                            DESIRED   CURRENT   READY   AGE
replicaset.apps/conv-app-deployment-cc557557f   1         1         1       19s
```

## Цель задания

Переписать ваш Pod на Deployment для полноценного обновления и скейлинга приложения.

### Этапы выполнения

1. **Предварительные условия**: Должен быть завершен предыдущий код ревью, и ветка `1-start` смержена в `master`

2. **Создание новой ветки**: Из `master` создайте ветку `2-deployment`

3. **Основная задача**:
   - Переписать ваш Pod на Deployment
   - Проверить, что после изменений приложение работает корректно, сохраняется функционал конвертера

4. **Тестирование изменений**:
   - Выкатите изменения
   - Убедитесь, что ничего не сломалось и приложение работает как и прежде

5. **Commit изменений**: Отправьте изменения в ваш репозиторий

6. **Код ревью**: Подготовьте ветку `2-deployment` к код ревью, отправив ее через домашнее задание

### Важно

- При переписывании на Deployment, общая архитектура системы остается неизменной - сервис работает с Deployment, который теперь управляет вашим Pod и его скейлингом
- Сначала настройте Deployment на скейл 1
