<template>
  <div class="default-layout">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="nav-brand">
          <h1>Task Manager</h1>
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/tasks" class="nav-link">Tasks</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2025 Task Manager. Built with Vue.js</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  background-color: #181d1b;
  color: white;
  padding: 1rem 0;
}
.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-link {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
}
.nav-link:hover {
  text-decoration: underline;
}
.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
}
.footer {
  background-color: #35495e;
  color: white;
  text-align: center;
  padding: 1rem 0;
}
.footer p {
  margin: 0;
}
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
.nav-brand h1 {
  margin: 0;
  font-size: 1.5rem;
}
.nav {
  display: flex;
  align-items: center;
}

/* Responsive Styles */

@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    align-items: start;
  }
  .nav {
    flex-direction: column;
    width: 100%;
  }
  .nav-link {
    padding: 0.5rem 1rem;
  }
}
@media (max-width: 480px) {
  .nav-brand h1 {
    font-size: 1.2rem;
  }
  .nav-link {
    margin-left: 0;
    padding: 0.5rem 0;
  }
}
</style>