var ViewModel = function() {
     this.clickCount = ko.observable(0);
     this.name = ko.observable('Hooman');
     this.imgSrc = ko.observable('img/web.png');
     this.imgAttribution = ko.observable('https://www.flickr.com/photos/big/321571715/');
     this.nickNames = ko.observableArray(['Bruno', 'Frankie', 'Sultan', 'Snoupie']);

     this.title = ko.computed(function() {
         var title;
         var click = this.clickCount();
         if(click < 5) {
             title = 'Newborn';
         } else if(click < 10) {
             title = 'Infant';
         } else if(click < 15) {
             title = 'Child';
         } else if(click < 20) {
             title = 'Teenger';
         }
         return title;
     })
     this.increamentCounter = function() {
         this.clickCount(this.clickCount() + 1);
     };
}

ko.applyBindings(new ViewModel());
