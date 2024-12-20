<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <v-col cols="4">
        <BoardColumn name="Запланировано">
          <draggableComponent
            class="fill-height"
            :list="todoTasks"
            :animation="150"
            group="todo"
            item-key="id"
          >
            <template #item="{ element }">
              <div>
                <Task
                  :key="element.id"
                  :priority="element.priority"
                  :title="element.title"
                  :author="element.author"
                  :text="element.text"
                />
              </div>
            </template>
          </draggableComponent>
        </BoardColumn>
      </v-col>
      <v-col cols="4">
        <BoardColumn name="В работе">
          <draggableComponent
            class="fill-height"
            :list="inProgressTasks"
            :animation="150"
            group="todo"
            item-key="id"
          >
            <template #item="{ element }">
              <div>
                <Task
                  :key="element.id"
                  :priority="element.priority"
                  :title="element.title"
                  :author="element.author"
                  :text="element.text"
                />
              </div>
            </template>
          </draggableComponent>
        </BoardColumn>
      </v-col>
      <v-col cols="4">
        <BoardColumn name="Готово">
          <draggableComponent
            class="fill-height"
            :list="doneTasks"
            :animation="150"
            group="todo"
            item-key="id"
          >
            <template #item="{ element }">
              <div>
                <Task
                  :key="element.id"
                  :priority="element.priority"
                  :title="element.title"
                  :author="element.author"
                  :text="element.text"
                />
              </div>
            </template>
          </draggableComponent>
        </BoardColumn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import draggableComponent from "vuedraggable";

type TaskType = {
  id: number;
  priority: "low" | "medium" | "high";
  title: string;
  author: string;
  text: string;
};
const todoTasks = ref<TaskType[]>([
  {
    id: 1,
    priority: "low",
    title: "Проверить план проекта",
    author: "Алексей Иванов",
    text: "Необходимо просмотреть и утвердить план проекта на следующую неделю.",
  },
  {
    id: 2,
    priority: "high",
    title: "Исправить критическую ошибку",
    author: "Дмитрий Смирнов",
    text: "Обнаружена ошибка в процессе авторизации. Нужно исправить как можно быстрее.",
  },
  {
    id: 7,
    priority: "medium",
    title: "Провести интервью с клиентом",
    author: "Сергей Павлов",
    text: "Запланировать встречу с клиентом для обсуждения новых требований.",
  },
  {
    id: 8,
    priority: "low",
    title: "Обновить дизайн страницы",
    author: "Алина Королева",
    text: "Проанализировать последние изменения и внести коррективы в дизайн домашней страницы.",
  },
]);

const inProgressTasks = ref<TaskType[]>([
  {
    id: 3,
    priority: "medium",
    title: "Создание документации",
    author: "Мария Петрова",
    text: "Заполнить документацию по новому API, добавить примеры и описание методов.",
  },
  {
    id: 4,
    priority: "medium",
    title: "Планирование следующего спринта",
    author: "Артем Никифоров",
    text: "Организовать встречу команды для планирования задач следующего спринта.",
  },
]);

const doneTasks = ref<TaskType[]>([
  {
    id: 5,
    priority: "low",
    title: "Обновление библиотек",
    author: "Ирина Васильева",
    text: "Проверить совместимость и обновить устаревшие библиотеки в проекте.",
  },
  {
    id: 6,
    priority: "high",
    title: "Релиз новой версии",
    author: "Екатерина Соколова",
    text: "Подготовить все необходимые материалы и запустить релиз новой версии приложения.",
  },
]);
</script>
