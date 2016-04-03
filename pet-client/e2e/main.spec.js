'use strict';

describe('The main view', function () {
  var navBar;
  var page;
  var addPage;
  var searchPage;
  var deleteModal;

  beforeEach(function () {
    navBar = require('./nav.po');
    page = require('./main.po');
    addPage = require('./petadd.po');
    searchPage = require('./petsearch.po');
    deleteModal = require('./deleteModal.po');
  });

  it('should login and forward to Add Pet page', function() {
    browser.get('/index.html');
    page.username.sendKeys('santo');
    page.password.sendKeys('baby');
    page.login.click();

    expect(addPage.pageHeading()).toBe('Add Pet');
  });

  it('should add pet', function() {
    addPage.enterName('Blackie');
    addPage.enterDescription('A german shepherd');
    addPage.clickAdd();

    expect(addPage.successMessage.getText()).toMatch(/Added pet with id: \d+/);
  });

  it('should search for pet', function() {
    var addedPetId = addPage.addedPetId();

    navBar.goToSearchPage();
    expect(searchPage.pageHeading()).toBe('Pet Search');

    searchPage.enterId(addedPetId);
    searchPage.search();

    expect(searchPage.searchResultId()).toBe(addedPetId);
    expect(searchPage.searchResultName()).toBe('Blackie');
  });

  it('should delete pet', function() {
    searchPage.delete();

    expect(deleteModal.title()).toBe('Are you sure you want to delete Blackie?');

    deleteModal.delete();

    expect(searchPage.deletePetAlert()).toBe('Pet has been deleted.');
  });

  //it('should include jumbotron with correct data', function() {
  //  expect(page.h1El.getText()).toBe('\'Allo, \'Allo!');
  //  expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
  //  expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  //});
  //
  //it('should list more than 5 awesome things', function () {
  //  expect(page.thumbnailEls.count()).toBeGreaterThan(5);
  //});

});
