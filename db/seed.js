var db = require('./schema');
var cheerio = require('cheerio');
var request = require('request');
var axios = require('axios');


// Create Yosemite park model
db.models.park.findOrCreate({
  where: {
    name: 'yosemite',
    info: "Yosemite National Park (/joʊˈsɛmᵻti/ yoh-sem-it-ee[4]) is a national park spanning portions of Tuolumne, Mariposa and Madera counties in Northern California.[5][6] The park, which is managed by the National Park Service, covers an area of 747,956 acres (1,168.681 sq mi; 302,687 ha; 3,026.87 km2)[2] and reaches across the western slopes of the Sierra Nevada mountain range.[7] On average, about 4 million people visit Yosemite each year,[3] and most spend the majority of their time in the seven square miles (18 km2) of Yosemite Valley.[8] The park set a visitation record in 2016, surpassing 5 million visitors for the first time in its history.[9] Designated a World Heritage Site in 1984, Yosemite is internationally recognized for its granite cliffs, waterfalls, clear streams, giant sequoia groves, lakes, mountains, glaciers, and biological diversity.[8] Almost 95% of the park is designated wilderness.[10] Yosemite was central to the development of the national park idea. First, Galen Clark and others lobbied to protect Yosemite Valley from development, ultimately leading to President Abraham Lincoln's signing the Yosemite Grant in 1864. Later, John Muir led a successful movement to establish a larger national park encompassing not just the valley, but surrounding mountains and forests as well—paving the way for the United States national park system.[11] Yosemite is one of the largest and least fragmented habitat blocks in the Sierra Nevada, and the park supports a diversity of plants and animals. The park has an elevation range from 2,127 to 13,114 feet (648 to 3,997 m) and contains five major vegetation zones: chaparral/oak woodland, lower montane forest, upper montane forest, subalpine zone, and alpine. Of California's 7,000 plant species, about 50% occur in the Sierra Nevada and more than 20% within Yosemite. There is suitable habitat for more than 160 rare plants in the park, with rare local geologic formations and unique soils characterizing the restricted ranges many of these plants occupy.[8] The geology of the Yosemite area is characterized by granitic rocks and remnants of older rock. About 10 million years ago, the Sierra Nevada was uplifted and then tilted to form its relatively gentle western slopes and the more dramatic eastern slopes. The uplift increased the steepness of stream and river beds, resulting in formation of deep, narrow canyons. About one million years ago, snow and ice accumulated, forming glaciers at the higher alpine meadows that moved down the river valleys. Ice thickness in Yosemite Valley may have reached 4,000 feet (1,200 m) during the early glacial episode. The downslope movement of the ice masses cut and sculpted the U-shaped valley that attracts so many visitors to its scenic vistas today.[8] The name \"Yosemite\" (meaning \"killer\" in Miwok) originally referred to the name of a renegade tribe which was driven out of the area (and possibly annihilated) by the Mariposa Battalion. Before then the area was called \"Ahwahnee\" (\"big mouth\") by indigenous people."
  }
});


/*---------------------------------------------
                  Seed Users
----------------------------------------------*/

var user = [];

user.push(
  {
    firstName: 'Kay',
    lastName: 'Christensen',
    email: 'kaychristensen@gmail.com',
    password: 'rocksteady'
  }
);
user.push(
  {
    firstName: 'Jackie',
    lastName: 'Ho',
    email: 'jackieh.bee@gmail.com',
    password: 'bee'
  }
);
user.push(
  {
    firstName: 'Tenzin',
    lastName: 'Sonam',
    email: 'tenso2006@gmail.com',
    password: '10zen'
  }
);
user.push(
  {
    firstName: 'Brian',
    lastName: 'Schultz',
    email: 'brianjschultz508@gmail.com',
    password: 'bebop'
  }
);

for (var i = 0; i < user.length; i++) {

  axios.post('http://localhost:3000/signup', user[i]).then(function(res) {
    if (res.data) {
      console.log('successful signup');
    }
  })
}

/*---------------------------------------------
      Seed Parkphotos with Yosemite pics
----------------------------------------------*/
var url = 'https://twitter.com/YosemiteNPS/media';
var numPicsToPull = 12;
var userId = 1;

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
      console.log('query results', results);
      for (var i = 0; i < numPicsToPull; i++){
        var photoUrl = $('#stream-items-id').children()[i].children[1].children[3].children[5].children[1].children[1].children[1].children[1].attribs['data-image-url'];
        if (i < 3) {
          userId = 1;
        } else if (i > 2 && i < 6) {
          userId = 2;
        } else if (i > 5 && i < 9) {
          userId = 3;
        } else if (i > 8) {
          userId = 4;
        }
        db.models.post.create({
          type: 'photo',
          filePath: photoUrl,
          parkId: results.dataValues.id,
          userId: userId
        });
      }
    });
  }
});