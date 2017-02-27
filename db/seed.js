var db = require('./schema');
var cheerio = require('cheerio');
var request = require('request');
var axios = require('axios');
var Promise = require('bluebird');
var parkModels = [];
/*---------------------------------------------
                  Seed Users
----------------------------------------------*/

var users = [];

users.push(
  {
    firstName: 'Kay',
    lastName: 'Christensen',
    email: 'kaychristensen@gmail.com',
    password: 'rocksteady'
  }
);
users.push(
  {
    firstName: 'Jackie',
    lastName: 'Ho',
    email: 'jackieh.bee@gmail.com',
    password: 'bee'
  }
);
users.push(
  {
    firstName: 'Tenzin',
    lastName: 'Sonam',
    email: 'tenso2006@gmail.com',
    password: '10zen'
  }
);
users.push(
  {
    firstName: 'Brian',
    lastName: 'Schultz',
    email: 'brianjschultz508@gmail.com',
    password: 'bebop'
  }
);

for (var i = 0; i < users.length; i++) {

  axios.post('http://localhost:3000/signup', users[i]).then(function(res) {
    if (res.data) {
      console.log('successful signup');
    }
  });
}

/*---------------------------------------------
                  Seed Parks
----------------------------------------------*/
var url = 'https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States';
var infoUrl;
var parks = [];
request(url, function (error, response, html) {
  if (error) {
    console.log('Error requesting url', error);
  } else {
    var $ = cheerio.load(html);
    //grab the table
    var tableRows = $('table').children();
    //initialize variables to store park info
    var title, imgPath, infoSnippet, long, lat;
    //iterate over all parks (rows) in table
    for (var i = 1; i < 60; i++) {
      var park = {};
      //loop through the columns in table
      for (var j = 1; j < tableRows[i].children.length; j++) {
        //if j is on the column with coords
        if (j === 5) {
          if (i === 57) {
            //special case at 57 where children divs had extra spacing divs
            coords = tableRows[i].children[j].children[7].children[0].children[0].children[2].children[0].children[0].children[0].data;
          } else if (tableRows[i].children[j].children[3].children.length === 0) {
            //special case where child node is not correct node, but 2 nexts away
            coords = tableRows[i].children[j].children[3].next.next.children[0].children[0].children[2].children[0].children[0].children[0].data;
          } else {
            //most cases
            coords = tableRows[i].children[j].children[3].children[0].children[0].children[2].children[0].children[0].children[0].data;
          }
          //split the selected coords on the space
          coords = coords.split(' ');
          //splice off the degree and hemisphere then convert to num from string
          lat = coords[0].substring(0, coords[0].length - 3);
          lat = parseInt(lat);
          long = coords[1].substring(0, coords[1].length - 3);
          long = parseInt(long);
          long = long * -1;
          if (coords[0].includes('S')) {
            //if lat is in southern hemisphere make num negative
            lat = lat * -1;
          }
        } else if (j === 1) {
          //in the name column
          title = tableRows[i].children[j].children[0].attribs.title;
          title = title.split(' National')[0];
          if (title.length === 1) {
            //in National Park of American Samoa, grab just the American Samoa part
            title = title.split(' of ')[1];
          }
          title = title.toLowerCase();
        } else if (j === 3) {
          //in img column, need to add https: to front of src
          imgPath = 'https:' + tableRows[i].children[j].children[0].children[0].attribs.src;
        }
        if (j === 13) {
          //in info column, build out info
          infoSnippet = '';
          for (var k = 0; k < tableRows[i].children[13].children.length; k++) {
            if (tableRows[i].children[13].children[k].data) {
              //if curent element is text
              infoSnippet += tableRows[i].children[13].children[k].data;
            } else if (tableRows[i].children[13].children[k].children[0].data){
              //if current element is a link with text
              infoSnippet += tableRows[i].children[13].children[k].children[0].data;
            }
          }
        }
        if (j === 5) {
          //unnecessary columns between 6 and 12
          j = 12;
        } else {
          //columns have useless info every other column
          j++;          
        }
      }
      //build out park object to push into array
      park.name = title;
      park.photo = imgPath;
      park.long = long;
      park.lat = lat;
      park.info = infoSnippet;
      //push park obj into array
      parks.push(park);
    }
    parks.forEach(function(park, index, array) {
      //for every park in parks create a row in the park db model
      parkModels.push(db.models.park.findOrCreate({
        where: {
          name: park.name,
          photo: park.photo,
          long: park.long,
          lat: park.lat,
          info: park.info,
        }
      }));
    })
    Promise.all(parkModels).then(function(results) {
      /*---------------------------------------------
              Seed Posts with Yosemite pics
      ----------------------------------------------*/
      var url = 'https://twitter.com/YosemiteNPS/media';
      var numPicsToPull = 10;
      var userId = 1;
      var type;
      var notPhotoCount = 0;
      db.models.park.update({
        info: 'Yosemite National Park (/joʊˈsɛmᵻti/ yoh-sem-it-ee) is a national park spanning portions of Tuolumne, Mariposa and Madera counties in Northern California. The park, which is managed by the National Park Service, covers an area of 747,956 acres (1,168.681 sq mi; 302,687 ha; 3,026.87 km2) and reaches across the western slopes of the Sierra Nevada mountain range. On average, about 4 million people visit Yosemite each year, and most spend the majority of their time in the seven square miles (18 km2) of Yosemite Valley. The park set a visitation record in 2016, surpassing 5 million visitors for the first time in its history. Designated a World Heritage Site in 1984, Yosemite is internationally recognized for its granite cliffs, waterfalls, clear streams, giant sequoia groves, lakes, mountains, glaciers, and biological diversity. Almost 95% of the park is designated wilderness. Yosemite was central to the development of the national park idea. First, Galen Clark and others lobbied to protect Yosemite Valley from development, ultimately leading to President Abraham Lincoln\'s signing the Yosemite Grant in 1864. Later, John Muir led a successful movement to establish a larger national park encompassing not just the valley, but surrounding mountains and forests as well—paving the way for the United States national park system. Yosemite is one of the largest and least fragmented habitat blocks in the Sierra Nevada, and the park supports a diversity of plants and animals. The park has an elevation range from 2,127 to 13,114 feet (648 to 3,997 m) and contains five major vegetation zones: chaparral/oak woodland, lower montane forest, upper montane forest, subalpine zone, and alpine. Of California\'s 7,000 plant species, about 50% occur in the Sierra Nevada and more than 20% within Yosemite. There is suitable habitat for more than 160 rare plants in the park, with rare local geologic formations and unique soils characterizing the restricted ranges many of these plants occupy. The geology of the Yosemite area is characterized by granitic rocks and remnants of older rock. About 10 million years ago, the Sierra Nevada was uplifted and then tilted to form its relatively gentle western slopes and the more dramatic eastern slopes. The uplift increased the steepness of stream and river beds, resulting in formation of deep, narrow canyons. About one million years ago, snow and ice accumulated, forming glaciers at the higher alpine meadows that moved down the river valleys. Ice thickness in Yosemite Valley may have reached 4,000 feet (1,200 m) during the early glacial episode. The downslope movement of the ice masses cut and sculpted the U-shaped valley that attracts so many visitors to its scenic vistas today. The name \"Yosemite\" (meaning \"killer\" in Miwok) originally referred to the name of a renegade tribe which was driven out of the area (and possibly annihilated) by the Mariposa Battalion. Before then the area was called \"Ahwahnee\" (\"big mouth\") by indigenous people.'
      }, {
        where: {
          name: 'yosemite'
        }
      })
      db.models.park.find({
        where: {
          name: 'yosemite',
          // info: 'Yosemite National Park (/joʊˈsɛmᵻti/ yoh-sem-it-ee[4]) is a national park spanning portions of Tuolumne, Mariposa and Madera counties in Northern California.[5][6] The park, which is managed by the National Park Service, covers an area of 747,956 acres (1,168.681 sq mi; 302,687 ha; 3,026.87 km2)[2] and reaches across the western slopes of the Sierra Nevada mountain range.[7] On average, about 4 million people visit Yosemite each year,[3] and most spend the majority of their time in the seven square miles (18 km2) of Yosemite Valley.[8] The park set a visitation record in 2016, surpassing 5 million visitors for the first time in its history.[9] Designated a World Heritage Site in 1984, Yosemite is internationally recognized for its granite cliffs, waterfalls, clear streams, giant sequoia groves, lakes, mountains, glaciers, and biological diversity.[8] Almost 95% of the park is designated wilderness.[10] Yosemite was central to the development of the national park idea. First, Galen Clark and others lobbied to protect Yosemite Valley from development, ultimately leading to President Abraham Lincoln\'s signing the Yosemite Grant in 1864. Later, John Muir led a successful movement to establish a larger national park encompassing not just the valley, but surrounding mountains and forests as well—paving the way for the United States national park system.[11] Yosemite is one of the largest and least fragmented habitat blocks in the Sierra Nevada, and the park supports a diversity of plants and animals. The park has an elevation range from 2,127 to 13,114 feet (648 to 3,997 m) and contains five major vegetation zones: chaparral/oak woodland, lower montane forest, upper montane forest, subalpine zone, and alpine. Of California\'s 7,000 plant species, about 50% occur in the Sierra Nevada and more than 20% within Yosemite. There is suitable habitat for more than 160 rare plants in the park, with rare local geologic formations and unique soils characterizing the restricted ranges many of these plants occupy.[8] The geology of the Yosemite area is characterized by granitic rocks and remnants of older rock. About 10 million years ago, the Sierra Nevada was uplifted and then tilted to form its relatively gentle western slopes and the more dramatic eastern slopes. The uplift increased the steepness of stream and river beds, resulting in formation of deep, narrow canyons. About one million years ago, snow and ice accumulated, forming glaciers at the higher alpine meadows that moved down the river valleys. Ice thickness in Yosemite Valley may have reached 4,000 feet (1,200 m) during the early glacial episode. The downslope movement of the ice masses cut and sculpted the U-shaped valley that attracts so many visitors to its scenic vistas today.[8] The name \"Yosemite\" (meaning \"killer\" in Miwok) originally referred to the name of a renegade tribe which was driven out of the area (and possibly annihilated) by the Mariposa Battalion. Before then the area was called \"Ahwahnee\" (\"big mouth\") by indigenous people.',
        }
      }).then(function() {
        request(url, function (error, response, html) {
          if (error) {
            console.log('Error requesting url', error);
          } else {
            var $ = cheerio.load(html);
            db.models.park.find({
              where: {
                name: 'yosemite'
              }
            })
            .then(function(results) {
              for (var i = 0; i < (numPicsToPull + notPhotoCount); i++){
                if ($('#stream-items-id').children()[i].children[1].children[3].children[5].children[1].children[1].children[1].children[1].attribs['class'] === 'AdaptiveMedia-photoContainer js-adaptive-photo ') {
                  type = 'photo';
                  var postUrl = $('#stream-items-id').children()[i].children[1].children[3].children[5].children[1].children[1].children[1].children[1].attribs['data-image-url'];
                } else {
                  notPhotoCount++;
                  type = 'notphoto';
                }
                if ((i - notPhotoCount) < 3) {
                  userId = 1;
                } else if ((i - notPhotoCount) > 2 && (i - notPhotoCount) < 6) {
                  userId = 2;
                } else if ((i - notPhotoCount) > 5 && (i - notPhotoCount) < 9) {
                  userId = 3;
                } else if ((i - notPhotoCount) > 8) {
                  userId = 4;
                }
                console.log('results in seeeeeeeed: ', results)
                if (type === 'photo') {
                  db.models.post.create({
                    type: type,
                    filePath: postUrl,
                    parkId: results.dataValues.id,
                    userId: userId
                  });
                }
              }
            });
          }
        });
        /*---------------------------------------------
              Seed parkPhotos with Yosemite pics
        ----------------------------------------------*/

        var yosemitePics = [
          'http://miriadna.com/desctopwalls/images/max/California,-Yosemite-National-park.jpg',
          'http://www.atlasandboots.com/wp-content/uploads/2016/01/stunning-natural-phenomena-1.jpg',
          'https://drscdn.500px.org/photo/89719719/q%3D80_m%3D2000/f8a6fec97d623db924f2c8e88457a526',
          'http://www.valleyviews.biz/images/homeslideshow/home_yosemite_hd8.jpg',
          'http://blog.thomascook.in/wp-content/uploads/2016/06/Yose-1024x581.jpg'
         ]

        db.models.park.find({
          where: {
            name: 'yosemite'
          }
        }).then(function(results) {
          for (var i = 0; i < yosemitePics.length; i++) {
            db.models.parkphoto.create({
              photoUrl: yosemitePics[i],
              parkId: results.dataValues.id
            });
          }
          /*---------------------------------------------
                        Seed Parkcomments
          ----------------------------------------------*/
          db.models.parkcomment.findOrCreate({
            where: {
              text: 'Yosemite was amazing!',
              userEmail: 'kaychristensen@gmail.com',
              parkId: results.dataValues.id,
            }
          });
          db.models.parkcomment.findOrCreate({
            where: {
              text: 'Nature, eh? Incredible!',
              userEmail: 'kaychristensen@gmail.com',
              parkId: results.dataValues.id,
            }
          });
          db.models.parkcomment.findOrCreate({
            where: {
              text: '"The “firefall” on Horsetail Fall..event that can only be captured few days in February"',
              userEmail: 'jackieh.bee@gmail.com',
              parkId: results.dataValues.id,
            }
          });

          db.models.parkcomment.findOrCreate({
            where: {
              text: 'Starting 10 million years ago, vertical movement along the Sierra fault started to uplift the Sierra Nevada.',
              userEmail: 'jackieh.bee@gmail.com',
              parkId: results.dataValues.id,
            }
          });

          db.models.parkcomment.findOrCreate({
            where: {
              text: 'A series of glaciations further modified the region starting about 2 to 3 million years ago and ending sometime around 10,000 BP.',
              userEmail: 'tenso2006@gmail.com',
              parkId: results.dataValues.id,
            }
          });

          db.models.parkcomment.findOrCreate({
            where: {
              text: 'Despite the richness of high-quality habitats in Yosemite, the brown bear, California condor, and least Bell\'s vireo have become extinct in the park within historical time',
              userEmail: 'tenso2006@gmail.com',
              parkId: results.dataValues.id,
            }
          });

          db.models.parkcomment.findOrCreate({
            where: {
              text: 'The black bears of Yosemite were once famous for breaking into parked cars to steal food.',
              userEmail: 'brianjschultz508@gmail.com',
              parkId: results.dataValues.id,
            }
          });

          db.models.parkcomment.findOrCreate({
            where: {
              text: 'Increasing ozone pollution is causing tissue damage to the massive giant sequoia trees in the park.',
              userEmail: 'brianjschultz508@gmail.com',
              parkId: results.dataValues.id,
            }
          });
        });

      })
    })
  }
});






/*---------------------------------------------
              Seed Postcomments
----------------------------------------------*/

db.models.postcomment.findOrCreate({
  where: {
    text: 'Yosemite was amazing!',
    postId: 1,
    userId: 1
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'nature eh! Incredible',
    postId: 1,
    userId: 2
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: '"The “firefall” on Horsetail Fall..event that can only be captured few days in February"',
    postId: 2,
    userId: 1
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'Starting 10 million years ago, vertical movement along the Sierra fault started to uplift the Sierra Nevada.',
    postId: 1,
    userId: 3
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'A series of glaciations further modified the region starting about 2 to 3 million years ago and ending sometime around 10,000 BP.',
    postId: 3,
    userId: 1
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'Despite the richness of high-quality habitats in Yosemite, the brown bear, California condor, and least Bell\'s vireo have become extinct in the park within historical time',
    postId: 3,
    userId: 2
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'The black bears of Yosemite were once famous for breaking into parked cars to steal food.',
    postId: 1,
    userId: 4
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'Increasing ozone pollution is causing tissue damage to the massive giant sequoia trees in the park.',
    postId: 3,
    userId: 3
  }
});


