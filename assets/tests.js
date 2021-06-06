'use strict';

define("movie-portal/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/input-field.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/input-field.js should pass ESLint\n\n');
  });
  QUnit.test('components/login-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/login-form.js should pass ESLint\n\n');
  });
  QUnit.test('components/movie-action.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/movie-action.js should pass ESLint\n\n');
  });
  QUnit.test('components/movie-details.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/movie-details.js should pass ESLint\n\n');
  });
  QUnit.test('components/movies-wrapper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/movies-wrapper.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/add.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/add.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/movie/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/movie/edit.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/eq.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/eq.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/plus-one.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/plus-one.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/add.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/add.js should pass ESLint\n\n');
  });
  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass ESLint\n\n');
  });
  QUnit.test('routes/movie.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/movie.js should pass ESLint\n\n');
  });
  QUnit.test('routes/movie/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/movie/edit.js should pass ESLint\n\n');
  });
  QUnit.test('routes/movies.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/movies.js should pass ESLint\n\n');
  });
  QUnit.test('services/authenticated.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/authenticated.js should pass ESLint\n\n');
  });
  QUnit.test('services/search.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/search.js should pass ESLint\n\n20:22 - \'genre\' is assigned a value but never used. (no-unused-vars)');
  });
});
define("movie-portal/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('movie-portal/templates/add.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/add.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/components/input-field.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/components/input-field.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/components/login-form.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/components/login-form.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/components/movie-action.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/components/movie-action.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/components/movie-details.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/components/movie-details.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/components/movies-wrapper.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/components/movies-wrapper.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/login.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/login.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/movie.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/movie.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/movie/edit.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/movie/edit.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('movie-portal/templates/movies.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'movie-portal/templates/movies.hbs should pass TemplateLint.\n\n');
  });
});
define("movie-portal/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/movie/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/movie/edit-test.js should pass ESLint\n\n');
  });
});
define("movie-portal/tests/test-helper", ["movie-portal/app", "movie-portal/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("movie-portal/tests/unit/controllers/movie/edit-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | movie/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:movie/edit');
      assert.ok(controller);
    });
  });
});
define('movie-portal/config/environment', [], function() {
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

require('movie-portal/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
