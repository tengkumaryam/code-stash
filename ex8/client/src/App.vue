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

</style>
