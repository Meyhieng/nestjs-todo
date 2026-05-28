<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const todoStore = useTodoStore()
const title = ref('')
const filter = ref<'all' | 'active' | 'done'>('all')
let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  if (!title.value.trim()) return
  todoStore.addTodo(title.value)
  title.value = ''
}

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todoStore.todos.filter(t => !t.is_done)
  if (filter.value === 'done') return todoStore.todos.filter(t => t.is_done)
  return todoStore.todos
})
</script>

<template>
  <div class="todo-container">
    <h1>Todo List</h1>

    <!-- Add Todo Form -->
    <div class="add-form">
      <input
        v-model="title"
        type="text"
        placeholder="Enter todo title..."
        @keyup.enter="onAdd"
      />
      <button @click="onAdd">Add</button>
    </div>

    <!-- Filter Tabs -->
    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
      <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Done</button>
    </div>

    <!-- Loading / Error -->
    <p v-if="todoStore.loading">Loading...</p>
    <p v-if="todoStore.error" style="color: red">{{ todoStore.error }}</p>

    <!-- Todo List -->
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.is_done"
          @change="todoStore.toggleTodo(todo)"
        />
        <span :style="{ textDecoration: todo.is_done ? 'line-through' : 'none' }">
          {{ todo.title }}
        </span>
        <button @click="todoStore.deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <!-- Summary -->
    <p class="summary">
      {{ todoStore.todos.filter(t => !t.is_done).length }} items left
    </p>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
}
.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.add-form input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.add-form button {
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.filters button {
  padding: 6px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}
.filters button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
li button {
  margin-left: auto;
  padding: 4px 10px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.summary {
  margin-top: 12px;
  color: #888;
  font-size: 14px;
}
</style>