<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <div class="dropdown">
        <router-link to="#" class="dropbtn">Comments</router-link>
        <div class="dropdown-content">
          <router-link to="/comments"> View all </router-link>
          <router-link to="/add-comment"> Add new </router-link>
          <router-link to="/modify-comment"> Modify </router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="footer">
      <a href="https://github.com/tengkumaryam" class="github"><svg xmlns="http://www.w3.org/2000/svg" width="23"
          height="23" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg> tengkumaryam</a>
    </footer>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body {
    height: 100%; /* Ensure full height for the body */
    margin: 0;    /* Remove default margin */
}

nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 15px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropbtn {
  cursor: pointer;
  margin: 0 15px;
}

.footer {
    background-color: lightgray;
    width: 100%;
    margin-top: 50px;
    padding: 10px;
    position: static;
}

.github {
    color: white;
    font-style: italic;
    text-decoration: none;

}

.github:hover {
    text-decoration: underline;
    color: hotpink;
}

</style>
