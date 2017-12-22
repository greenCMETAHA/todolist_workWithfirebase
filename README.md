# todolist_workWithfirebase
apiWrapper для проекта по react/redux

Содержит:
1. Файл с бинами Record и Importance

2. Файл с функциями для работы с учебной базой под firebase.

В начале определена переменная db = defaultApp.database();	



saveImportance() - сохранить важность

getImportances() - получить список важностей

getImportanceById() - получить важность по id



getTasks() - получить список задач

getTaskById() - получить задачу по id

getCompletedTasks() - получить задачи, где реквизит done = true

getUncompletedTasks() - получить задачи, где реквизит done = false

saveTask() - записать/перезаписать задачу

deleteTaskById() - удалить задачу по id



addImportances() - заполнить список важностей.

Первый вариант написан отлажен просто под js, без использования react.

Во время написания своего todo-листа я подкорректирую второй файл, т.к. не уверен, что он точно будет работать (названия функций поменяться не должны)
