export class Router {
  routes = {};

  add(routname, page) {
    this.routes[routname] = page;
  }

  route(ev) {
    ev = ev || window.event;
    ev.preventDefault();

    window.history.pushState({}, "", ev.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector("main").innerHTML = html;
      });
  }
}
