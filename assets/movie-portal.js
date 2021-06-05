'use strict';



;define("movie-portal/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("movie-portal/app", ["exports", "movie-portal/resolver", "ember-load-initializers", "movie-portal/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends Ember.Application {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _resolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("movie-portal/components/add-movie", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({});

  _exports.default = _default;
});
;define("movie-portal/components/input-field", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['input']
  });

  _exports.default = _default;
});
;define("movie-portal/components/login-form", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    authenticated: Ember.inject.service(),
    actions: {
      validateLogin() {
        if (this.username === "admin" && this.password === "secret") {
          window.localStorage.setItem('loggedIn', true);
          this.toggleProperty('authenticated.refresh');
          this.logIn && this.logIn();
        }
      }

    }
  });

  _exports.default = _default;
});
;define("movie-portal/components/movie-details", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    authenticated: Ember.inject.service(),
    loggedIn: Ember.computed.reads('authenticated.successful'),
    classNames: ['movie-card'],
    yearString: Ember.computed('movie.year', function () {
      let {
        year
      } = this.movie;

      if (year) {
        let [start, end] = year.split('-');

        if (end === '') {
          return `${start} - Present`;
        } else if (end) {
          return `${start} - ${end}`;
        } else {
          return year;
        }
      }

      return '-';
    }),
    bgClass: Ember.computed('movie.type', function () {
      if (this.movie.type === 'movie') {
        return 'bg-blue';
      }

      return 'bg-red';
    })
  });

  _exports.default = _default;
});
;define("movie-portal/components/movie", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    search: Ember.inject.service(),
    editMovie: Ember.computed.equal('action', 'edit')
  });

  _exports.default = _default;
});
;define("movie-portal/components/movies-wrapper", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    search: Ember.inject.service(),
    searchQuery: Ember.computed.reads('search.searchQuery'),
    allGenre: Ember.computed.equal('search.selectedGenre', 'All'),
    lowerCaseSearchQuery: Ember.computed('searchQuery', function () {
      return this.searchQuery.toLowerCase();
    }),
    searchedMovies: Ember.computed('filteredMovies.@each.{title,director}', 'searchQuery', function () {
      let {
        lowerCaseSearchQuery
      } = this;
      let movies = this.filteredMovies || [];

      if (lowerCaseSearchQuery) {
        return movies.filter(movie => {
          let {
            title,
            director
          } = movie;
          title = title.toLowerCase();
          director = director.toLowerCase();
          return title.includes(this.lowerCaseSearchQuery) || director.includes(lowerCaseSearchQuery);
        });
      }

      return movies;
    }),
    filteredMovies: Ember.computed('allGenre', 'search.selectedGenres', 'movies.@each.genre', function () {
      if (this.allGenre) return this.movies;
      return this.movies.filter(({
        genre
      }) => {
        return genre.includes(this.search.selectedGenre);
      });
    })
  });

  _exports.default = _default;
});
;define("movie-portal/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("movie-portal/controllers/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    authenticated: Ember.inject.service(),
    search: Ember.inject.service(),
    classNames: ['application'],

    init() {
      this._super(...arguments);

      fetch('/imdb.json').then(data => {
        return data.json();
      }).then(data => {
        this.set('model', data);
        this.buildGenres(data);
      });
    },

    buildGenres(data) {
      let object = [];
      data.forEach(({
        genre
      }) => {
        let genres = genre.split(',');
        genres.forEach(genre => {
          genre = genre.trim();
        });
        object = [...object, ...genres];
      });
      this.set('search.genres', object.uniq());
    },

    searchQuery: Ember.computed.alias('search.searchQuery'),
    loggedIn: Ember.computed.reads('authenticated.successful'),
    showLogInButton: Ember.computed('currentRouteName', function () {
      return this.currentRouteName !== 'login';
    }),
    showAddMovieButton: Ember.computed('currentRouteName', function () {
      return this.currentRouteName !== 'add';
    }),
    showInputField: Ember.computed('currentRouteName', function () {
      return this.currentRouteName === 'movies';
    }),
    showMoviesButton: Ember.computed('currentRouteName', function () {
      return this.currentRouteName !== 'movies';
    }),
    actions: {
      logOut() {
        window.localStorage.setItem('loggedIn', false);
        this.toggleProperty('authenticated.refresh');
      }

    }
  });

  _exports.default = _default;
});
;define("movie-portal/controllers/login", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    actions: {
      transitionToMovies() {
        this.transitionToRoute('movies');
      }

    }
  });

  _exports.default = _default;
});
;define("movie-portal/helpers/app-version", ["exports", "movie-portal/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("movie-portal/helpers/eq", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Helper.helper(function eq([param1, param2]) {
    return param1 === param2;
  });

  _exports.default = _default;
});
;define("movie-portal/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("movie-portal/helpers/plus-one", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Helper.helper(function plusOne([item]) {
    return item + 1;
  });

  _exports.default = _default;
});
;define("movie-portal/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("movie-portal/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "movie-portal/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("movie-portal/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("movie-portal/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This code initializes EmberData in an Ember application.
  
    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("movie-portal/initializers/export-application-global", ["exports", "movie-portal/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("movie-portal/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("movie-portal/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("movie-portal/router", ["exports", "movie-portal/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends Ember.Router {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    this.route('login');
    this.route('add');
    this.route('movie', {
      path: '/:id'
    }, function () {
      this.route('edit');
    });
    this.route('movies');
  });
});
;define("movie-portal/routes/add", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model() {
      return {
        title: "",
        year: "",
        rated: "",
        released: "",
        runtime: "",
        genre: "",
        director: "",
        writer: "",
        actors: "",
        plot: "",
        language: "",
        country: "",
        awards: "",
        poster: "",
        metascore: "",
        imdbRating: "",
        imdbVotes: "",
        id: "",
        type: "",
        response: ""
      };
    }

  });

  _exports.default = _default;
});
;define("movie-portal/routes/login", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({});

  _exports.default = _default;
});
;define("movie-portal/routes/movie", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({});

  _exports.default = _default;
});
;define("movie-portal/routes/movie/edit", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model() {
      let {
        id
      } = this.paramsFor('movie');
      return fetch('/imdb.json').then(data => {
        return data.json();
      }).then(data => {
        return data.findBy('id', id);
      });
    }

  });

  _exports.default = _default;
});
;define("movie-portal/routes/movies", ["exports", "fetch"], function (_exports, _fetch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model() {
      return (0, _fetch.default)('/imdb.json').then(data => {
        return data.json();
      });
    }

  });

  _exports.default = _default;
});
;define("movie-portal/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("movie-portal/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("movie-portal/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("movie-portal/services/authenticated", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    refresh: true,
    successful: Ember.computed('refresh', function () {
      return window.localStorage.getItem('loggedIn') === 'true';
    })
  });

  _exports.default = _default;
});
;define("movie-portal/services/search", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    searchQuery: '',
    selectedGenre: 'All'
  });

  _exports.default = _default;
});
;define("movie-portal/templates/add", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "w5Ad0SK3",
    "block": "{\"symbols\":[],\"statements\":[[5,\"movie\",[[12,\"action\",\"add\"],[12,\"class\",\"add-movie-wrapper\"]],[[\"@movie\"],[[23,0,[\"model\"]]]]]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/add.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "8XprDuHN",
    "block": "{\"symbols\":[\"genre\"],\"statements\":[[7,\"nav\",true],[8],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"container\"],[8],[0,\"\\n\"],[4,\"if\",[[23,0,[\"showInputField\"]]],null,{\"statements\":[[0,\"      \"],[5,\"input-field\",[[12,\"class\",\"search-input\"]],[[\"@placeholder\",\"@value\"],[\"Search\",[23,0,[\"searchQuery\"]]]]],[0,\"\\n      \"],[7,\"select\",true],[11,\"onchange\",[28,\"action\",[[23,0,[]],[28,\"mut\",[[23,0,[\"search\",\"selectedGenre\"]]],null]],[[\"value\"],[\"target.value\"]]]],[10,\"name\",\"genre\"],[10,\"id\",\"genre\"],[8],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"All\"],[8],[0,\"All\"],[9],[0,\"\\n\"],[4,\"each\",[[24,[\"search\",\"genres\"]]],null,{\"statements\":[[0,\"          \"],[7,\"option\",true],[11,\"selected\",[28,\"eq\",[[23,1,[]],[23,0,[\"search\",\"selectedGenre\"]]],null]],[11,\"value\",[23,1,[]]],[8],[1,[23,1,[]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,0,[\"showMoviesButton\"]]],null,{\"statements\":[[0,\"      \"],[5,\"link-to\",[[12,\"class\",\"link\"]],[[\"@route\"],[\"movies\"]],{\"statements\":[[0,\"Movies\"]],\"parameters\":[]}],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,0,[\"loggedIn\"]]],null,{\"statements\":[[4,\"if\",[[24,[\"showAddMovieButton\"]]],null,{\"statements\":[[0,\"        \"],[5,\"link-to\",[[12,\"class\",\"link\"]],[[\"@route\"],[\"add\"]],{\"statements\":[[0,\"Add Movie\"]],\"parameters\":[]}],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[7,\"div\",true],[8],[0,\"\\n        \"],[7,\"button\",false],[12,\"class\",\"btn\"],[3,\"action\",[[23,0,[]],\"logOut\"]],[8],[0,\"Logout\"],[9],[0,\"\\n        \"],[7,\"span\",true],[10,\"class\",\"avatar\"],[8],[0,\"\\n          \"],[7,\"span\",true],[8],[0,\"A\"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[23,0,[\"showLogInButton\"]]],null,{\"statements\":[[0,\"        \"],[5,\"link-to\",[[12,\"class\",\"btn\"]],[[\"@route\"],[\"login\"]],{\"statements\":[[0,\"Login\"]],\"parameters\":[]}],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[7,\"div\",true],[10,\"class\",\"main container\"],[8],[0,\"\\n  \"],[1,[22,\"outlet\"],false],[0,\"\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/components/add-movie", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ZV2ODspd",
    "block": "{\"symbols\":[],\"statements\":[[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"Title\",[23,0,[\"movie\",\"title\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"year\",[23,0,[\"movie\",\"year\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"rated\",[23,0,[\"movie\",\"rated\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"released\",[23,0,[\"movie\",\"released\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"runtime\",[23,0,[\"movie\",\"runtime\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"genre\",[23,0,[\"movie\",\"genre\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"director\",[23,0,[\"movie\",\"director\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"writer\",[23,0,[\"movie\",\"writer\"]]]]],[0,\"\\n\"],[7,\"label\",true],[10,\"class\",\"input-label\"],[8],[0,\"Plot\"],[9],[0,\"\\n\"],[5,\"textarea\",[[12,\"rows\",\"5\"]],[[\"@value\"],[[23,0,[\"movie\",\"plot\"]]]]],[0,\"\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"Genres\",[23,0,[\"movie\",\"genre\"]]]]],[0,\"\\n\"],[7,\"button\",true],[10,\"class\",\"btn\"],[8],[0,\"Edit\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/components/add-movie.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/components/input-field", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "10mAFoJ3",
    "block": "{\"symbols\":[],\"statements\":[[7,\"label\",true],[10,\"class\",\"input-label\"],[8],[1,[23,0,[\"label\"]],false],[9],[0,\"\\n\"],[5,\"input\",[],[[\"@type\",\"@placeholder\",\"@value\",\"@disabled\"],[[23,0,[\"type\"]],[23,0,[\"placeholder\"]],[23,0,[\"value\"]],[23,0,[\"disabled\"]]]]]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/components/input-field.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/components/login-form", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "JDas1T4z",
    "block": "{\"symbols\":[],\"statements\":[[7,\"form\",true],[10,\"class\",\"login-form\"],[8],[0,\"\\n  \"],[5,\"input-field\",[],[[\"@type\",\"@label\",\"@value\"],[\"text\",\"Username\",[23,0,[\"username\"]]]]],[0,\"\\n  \"],[5,\"input-field\",[],[[\"@type\",\"@label\",\"@value\"],[\"password\",\"Password\",[23,0,[\"password\"]]]]],[0,\"\\n  \"],[7,\"button\",false],[12,\"class\",\"btn\"],[3,\"action\",[[23,0,[]],\"validateLogin\"]],[8],[0,\"Login\"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/components/login-form.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/components/movie-details", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "su5uHCFG",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"class\",\"poster\"],[8],[0,\"\\n  \"],[7,\"img\",true],[11,\"src\",[23,0,[\"movie\",\"poster\"]]],[11,\"alt\",[29,[\"Poster for \",[23,0,[\"movie\",\"title\"]]]]],[10,\"z\",\"\"],[8],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[7,\"div\",true],[10,\"class\",\"details\"],[8],[0,\"\\n  \"],[7,\"div\",true],[8],[0,\"\\n    \"],[7,\"span\",true],[11,\"class\",[29,[\"badge \",[22,\"bgClass\"]]]],[8],[1,[23,0,[\"movie\",\"type\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[7,\"h3\",true],[10,\"class\",\"title\"],[8],[0,\"\\n    \"],[7,\"span\",true],[10,\"class\",\"position font-normal\"],[8],[1,[22,\"position\"],false],[0,\".\"],[9],[0,\" \"],[1,[23,0,[\"movie\",\"title\"]],false],[0,\"\\n    \"],[7,\"span\",true],[10,\"class\",\"text-muted font-normal\"],[8],[0,\"(\"],[1,[23,0,[\"yearString\"]],false],[0,\")\"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"censor-runtime-genre\"],[8],[0,\"\\n    \"],[1,[23,0,[\"movie\",\"rated\"]],false],[0,\" \"],[7,\"span\",true],[10,\"class\",\"ghost\"],[8],[0,\"|\"],[9],[0,\" \"],[1,[23,0,[\"movie\",\"runtime\"]],false],[0,\" \"],[7,\"span\",true],[10,\"class\",\"ghost\"],[8],[0,\"|\"],[9],[0,\"\\n    \"],[1,[23,0,[\"movie\",\"genre\"]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"small text-muted\"],[8],[0,\"\\n    Genres: \"],[1,[23,0,[\"movie\",\"genre\"]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"rating\"],[8],[0,\"\\n    \"],[7,\"i\",true],[10,\"class\",\"icon-yellow fa fa-star\"],[8],[9],[0,\" \"],[7,\"strong\",true],[8],[1,[23,0,[\"movie\",\"imdbRating\"]],false],[9],[0,\"\\n\"],[4,\"if\",[[23,0,[\"movie\",\"metascore\"]]],null,{\"statements\":[[0,\"      \"],[7,\"span\",true],[10,\"class\",\"mt-score\"],[8],[0,\"\\n        \"],[7,\"span\",true],[10,\"class\",\"badge bg-yellow\"],[8],[1,[23,0,[\"movie\",\"metascore\"]],false],[9],[0,\"\\n        \"],[7,\"span\",true],[10,\"class\",\"text-muted\"],[8],[0,\"Metascore\"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"plot text-muted\"],[8],[0,\"\\n    \"],[1,[23,0,[\"movie\",\"plot\"]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"small text-muted\"],[8],[0,\"\\n    Director: \"],[1,[23,0,[\"movie\",\"director\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"if\",[[23,0,[\"authenticated\",\"successful\"]]],null,{\"statements\":[[0,\"    \"],[7,\"div\",true],[10,\"class\",\"movie-actions\"],[8],[0,\"\\n      \"],[7,\"a\",false],[12,\"role\",\"button\"],[3,\"action\",[[23,0,[]],\"delete\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-trash-alt\"],[8],[9],[9],[0,\"\\n      \"],[5,\"link-to\",[],[[\"@route\",\"@model\"],[\"movie.edit\",[23,0,[\"movie\",\"id\"]]]],{\"statements\":[[7,\"i\",true],[10,\"class\",\"fa fa-edit\"],[8],[9]],\"parameters\":[]}],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/components/movie-details.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/components/movie", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "1vEynJk7",
    "block": "{\"symbols\":[],\"statements\":[[5,\"input-field\",[],[[\"@label\",\"@value\",\"@disabled\"],[\"Title\",[23,0,[\"movie\",\"title\"]],[23,0,[\"editMovie\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"year\",[23,0,[\"movie\",\"year\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"rated\",[23,0,[\"movie\",\"rated\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"released\",[23,0,[\"movie\",\"released\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"runtime\",[23,0,[\"movie\",\"runtime\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"genre\",[23,0,[\"movie\",\"genre\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"director\",[23,0,[\"movie\",\"director\"]]]]],[0,\"\\n\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"writer\",[23,0,[\"movie\",\"writer\"]]]]],[0,\"\\n\"],[7,\"label\",true],[10,\"class\",\"input-label\"],[8],[0,\"Plot\"],[9],[0,\"\\n\"],[5,\"textarea\",[[12,\"rows\",\"5\"]],[[\"@value\"],[[23,0,[\"movie\",\"plot\"]]]]],[0,\"\"],[5,\"input-field\",[],[[\"@label\",\"@value\"],[\"Genres\",[23,0,[\"movie\",\"genre\"]]]]],[0,\"\\n\"],[7,\"button\",true],[10,\"class\",\"btn\"],[8],[0,\"Edit\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/components/movie.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/components/movies-wrapper", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "1GfVxY5X",
    "block": "{\"symbols\":[\"movie\",\"index\"],\"statements\":[[4,\"if\",[[23,0,[\"searchedMovies\"]]],null,{\"statements\":[[0,\"  \"],[7,\"div\",true],[10,\"class\",\"movie-list\"],[8],[0,\"\\n\"],[4,\"each\",[[23,0,[\"searchedMovies\"]]],null,{\"statements\":[[0,\"      \"],[5,\"movie-details\",[],[[\"@loggedIn\",\"@position\",\"@movie\"],[[23,0,[\"loggedIn\"]],[28,\"plus-one\",[[23,2,[]]],null],[23,1,[]]]]],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[7,\"div\",true],[10,\"class\",\"no-movie\"],[8],[0,\"NO MOVIES TO SHOW\"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/components/movies-wrapper.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/login", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "sKE+d9CO",
    "block": "{\"symbols\":[],\"statements\":[[5,\"login-form\",[[12,\"class\",\"login-form\"]],[[\"@logIn\"],[[28,\"action\",[[23,0,[]],\"transitionToMovies\"],null]]]]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/login.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/movie", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "QIwuI/Zr",
    "block": "{\"symbols\":[],\"statements\":[[1,[22,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/movie.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/movie/edit", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "9ptvDHUL",
    "block": "{\"symbols\":[],\"statements\":[[5,\"movie\",[[12,\"class\",\"edit-movie-wrapper\"]],[[\"@action\",\"@movie\"],[\"edit\",[23,0,[\"model\"]]]]]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/movie/edit.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/templates/movies", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "b6eP/9Kj",
    "block": "{\"symbols\":[],\"statements\":[[5,\"movies-wrapper\",[],[[\"@movies\"],[[23,0,[\"model\"]]]]]],\"hasEval\":false}",
    "meta": {
      "moduleName": "movie-portal/templates/movies.hbs"
    }
  });

  _exports.default = _default;
});
;define("movie-portal/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("movie-portal/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("movie-portal/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("movie-portal/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;

;define('movie-portal/config/environment', [], function() {
  var prefix = 'movie-portal';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("movie-portal/app")["default"].create({"name":"movie-portal","version":"0.0.0+a9ce0f18"});
          }
        
//# sourceMappingURL=movie-portal.map
