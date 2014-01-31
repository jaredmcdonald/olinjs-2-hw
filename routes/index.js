var mongoose = require('mongoose'),
    catSchema = require('../schemas/cat'),
    Cat = mongoose.model('Cat', catSchema);

exports.list = function(req, res){
    Cat.find(function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.render('list', {
                title: 'Ur Cats',
                cats: data,
                msg: req.query.msg || null
            });
        }
    });
};

exports.new = function(req, res){
    var q = req.query;
    if(q.catName && q.catAge && q.catColors) {
        var catColors = q.catColors.split(',').map(function(item){
            return item.trim().toLowerCase();
        }),
        cat = new Cat({
            name: q.catName,
            age: q.catAge,
            colors: catColors
        });
        cat.save(function (err) {
            if (err)
                console.log('Problem saving cat:\n', err);
         });
        res.redirect('/cats?msg=' + 'New cat with name ' + q.catName + ' successfully saved.');
    } else {
        res.render('new', { title : 'New Cat' });
    }
};

exports.filterByColor = function(req, res){
    Cat.find({ colors: { $in: [ req.params.color ] } })
        .sort('age')
        .exec(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.render('list', { title: 'Cats of Color ' + req.params.color, cats: data });
            }
        });
};

exports.deleteOldest = function(req, res){
    var oldestCat = Cat.find()
        .sort('-age')
        .exec(function(findErr, data){
            if (findErr) {
                console.log(findErr);
            } else {
                var oldest = data[0];
                Cat.remove({_id: oldest._id}, function(removeErr){
                    removeErr ?
                        console.log(removeErr) :
                        res.redirect('/cats?msg=Successfully removed cat named ' + oldest.name + ', who was ' + oldest.age);
                });                
            }            
        });

};