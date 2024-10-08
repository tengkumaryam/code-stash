var app = new Vue({ 
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

var app1 = new Vue({ 
    el: '#app-1',
    data: {
        message: 'Hello Vue!'
    }
});

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString()
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    todos: [
      { name: "Trois", count: 3 },
      { name: "Deux", count: 2 },
      { name: "Cinq", count: 5 }
    ]
  },
  computed: {
	totalCount() {
		return this.todos.reduce((total, todo) => total + todo.count, 0)
	}
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    message: 'Type anything here..'
  }
})

var app5 = new Vue({
	el: '#app-5',
	data: {
	  name: '@tengkumaryam'
	},
	computed: {
		copyright() {
			const year = new Date().getFullYear()
			return `Copyright ${this.name} ${year}`
		}
	}
  })
