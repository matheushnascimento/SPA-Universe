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

    this.handleStyle(pathname);
  }

  handleStyle(pathname) {
    document.documentElement.className = "";
    document.documentElement.classList.add(pathname);

    const links = document.querySelectorAll("a");

    links.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        links.forEach(link => {
          link.classList.remove("selected");
        });

        this.classList.add("selected");
      });
    });
  }
}
