// module.exports = function () {
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
          Seed Post with Description
----------------------------------------------*/



var description = [
  "Listen to the song birds sing, feel the wind dance, watch the mare’s tail clouds graze... What more wonders will spring bring?",
  "Prairie Dogs are here! Remember, drive slowly in the park & observe these fed-protected little ones from a distance.",
  "Take a few moments to experience night in Great Sand Dunes National Park & Preserve!",
  "Happy #WorldWildlifeDay! Diverse marine & terrestrial #FireIsland habitats support a variety of #wildlife. Do you have a fav wild animal?",
  "You'll find an eclectic collection in the @FredDouglassNPS library, including these appropriate for #WomensHistoryMonth! #ReadAcrossAmerica",
  "Glacier NP is far more progressive than most parks. They have also used Karelian Bear dogs to harass bears so they don't get habituated to humans. I wish all parks had this progressive of thinking.",
  "Gracie is also working on her dissertation on the effects of climate change on the glaciers in the park. Those border collie are really smart.",
  "As beautiful as this picture is, it's awful that, in my mind due to the current administration, I can already see oil drilling rigs as part of the picture. Please help save our National Parks!",
  "Happy AmeriCorps Week! Since 1998, 2,000+ AmeriCorps NCCC members have served more than 374,000 hours in more than 50 national park units. Here's just one example of how they help our parks!",
  "Have you heard the news? We've got more than ONE MILLION likes on Facebook! Thank you to all of our fans for supporting us on social media. You can also find us on Parklands.us"
];


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
          lat = coords[0].substring(0, coords[0].length - 2);
          lat = parseFloat(lat);
          long = coords[1].substring(0, coords[1].length - 2);
          long = parseFloat(long);
          long = long * -1;
          if (coords[0].includes('S')) {
            //if lat is in southern hemisphere make num negative
            lat = lat * -1;
          }
        } else if (j === 1) {
          //in the name column
          title = tableRows[i].children[j].children[0].attribs.title;
          title = title.split(' National');
          console.log('THE THE THE title: ', title);
          if (title.length === 1) {
            //in National Park of American Samoa, grab just the American Samoa part
            title = title[0].split(' of ')[1];
            console.log('title after split in title.length =1: ', title);
          } else {
            title = title[0];
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
      console.log('park =', park)
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
          hero: 'https://coolworks-bucket001.s3.amazonaws.com/production/pages/heros/209/content/HERO_Yosemite_Half_Dome.jpg?1480224700',
          hours: 'Yosemite National Park is open 24 hours per day, 365 days per year, and no reservations are required to visit. However, the Hetch Hetchy Entrance Station is open only during daylight hours (approximately) and some roads are closed due to snow from around November through May or June. lb',
          location: 'Yosemite lb PO Box 577 lb Yosemite National Park, CA 95389',
          contact: '(209) 372-0200 lb The public information office is open from 9 am to 5 pm Pacific time (closed for lunch). Once connected, dial 3 then 5. If the ranger is already on the line, you will be returned to the main menu. If the ranger is not there, you can leave a message and they will return your call.'
        }
      }));
    })
    Promise.all(parkModels).then(function(results) {
      //update yosemite with long info
      db.models.park.update({
        // info: 'Yosemite National Park (/joʊˈsɛmᵻti/ yoh-sem-it-ee) is a national park spanning portions of Tuolumne, Mariposa and Madera counties in Northern California. The park, which is managed by the National Park Service, covers an area of 747,956 acres (1,168.681 sq mi; 302,687 ha; 3,026.87 km2) and reaches across the western slopes of the Sierra Nevada mountain range. On average, about 4 million people visit Yosemite each year, and most spend the majority of their time in the seven square miles (18 km2) of Yosemite Valley. The park set a visitation record in 2016, surpassing 5 million visitors for the first time in its history. Designated a World Heritage Site in 1984, Yosemite is internationally recognized for its granite cliffs, waterfalls, clear streams, giant sequoia groves, lakes, mountains, glaciers, and biological diversity. Almost 95% of the park is designated wilderness. Yosemite was central to the development of the national park idea. First, Galen Clark and others lobbied to protect Yosemite Valley from development, ultimately leading to President Abraham Lincoln\'s signing the Yosemite Grant in 1864. Later, John Muir led a successful movement to establish a larger national park encompassing not just the valley, but surrounding mountains and forests as well—paving the way for the United States national park system. Yosemite is one of the largest and least fragmented habitat blocks in the Sierra Nevada, and the park supports a diversity of plants and animals. The park has an elevation range from 2,127 to 13,114 feet (648 to 3,997 m) and contains five major vegetation zones: chaparral/oak woodland, lower montane forest, upper montane forest, subalpine zone, and alpine. Of California\'s 7,000 plant species, about 50% occur in the Sierra Nevada and more than 20% within Yosemite. There is suitable habitat for more than 160 rare plants in the park, with rare local geologic formations and unique soils characterizing the restricted ranges many of these plants occupy. The geology of the Yosemite area is characterized by granitic rocks and remnants of older rock. About 10 million years ago, the Sierra Nevada was uplifted and then tilted to form its relatively gentle western slopes and the more dramatic eastern slopes. The uplift increased the steepness of stream and river beds, resulting in formation of deep, narrow canyons. About one million years ago, snow and ice accumulated, forming glaciers at the higher alpine meadows that moved down the river valleys. Ice thickness in Yosemite Valley may have reached 4,000 feet (1,200 m) during the early glacial episode. The downslope movement of the ice masses cut and sculpted the U-shaped valley that attracts so many visitors to its scenic vistas today. The name \"Yosemite\" (meaning \"killer\" in Miwok) originally referred to the name of a renegade tribe which was driven out of the area (and possibly annihilated) by the Mariposa Battalion. Before then the area was called \"Ahwahnee\" (\"big mouth\") by indigenous people.'
        info: "Stand amongst the granite cathedrals and appreciate the true reach of what we can do to save our special places. When ordinary citizens mobilized to save this iconic landscape, the spirit of the National Park Foundation was born. Today, we carry forward their enthusiasm as we work to inspire the next generation of park lovers. As one of America’s most popular national parks, Yosemite boasts some of the best views, hiking trails, and family vacation opportunities in the country. Yosemite is a land where history was made—our nation's first land dedicated to recreation and enjoyment. As the precedent for all future American national parks, we truly know there would be no national parks without Yosemite. Located in central California, Yosemite National Park was established in 1890 and draws four million annual visitors. Almost 95 percent of the park’s 747,956 acres (roughly the size of Rhode Island) is classified as wilderness. Yosemite National Park offers an abundance of activities and sightseeing destinations. The Valley is a 7 mile wide canyon with incredible rock formations, including El Capitan, the world's tallest granite monolith and one of the world's top rock climbing destinations. Yosemite Falls is the largest waterfall in North America with breathtaking views. Peak visitation at the falls is in the spring as it is comprised entirely of melting snow. The park is also known for its Giant Sequoia trees, which are estimated to be over 3,000 years old. Yosemite is one of the largest and least fragmented habitat blocks in the Sierra Nevada, and the park supports a diversity of plants and animals. The park has an elevation range from 2,127 to 13,114 feet (648 to 3,997 m) and contains five major vegetation zones: chaparral/oak woodland, lower montane forest, upper montane forest, subalpine zone, and alpine. Of California\'s 7,000 plant species, about 50% occur in the Sierra Nevada and more than 20% within Yosemite. There is suitable habitat for more than 160 rare plants in the park, with rare local geologic formations and unique soils characterizing the restricted ranges many of these plants occupy. The geology of the Yosemite area is characterized by granitic rocks and remnants of older rock. About 10 million years ago, the Sierra Nevada was uplifted and then tilted to form its relatively gentle western slopes and the more dramatic eastern slopes. The uplift increased the steepness of stream and river beds, resulting in formation of deep, narrow canyons. About one million years ago, snow and ice accumulated, forming glaciers at the higher alpine meadows that moved down the river valleys. Ice thickness in Yosemite Valley may have reached 4,000 feet (1,200 m) during the early glacial episode. The downslope movement of the ice masses cut and sculpted the U-shaped valley that attracts so many visitors to its scenic vistas today.",
      }, {
        where: {
          name: 'yosemite'
        }
      })
      db.models.park.update({
        info: "North America’s highest point watches over its country, imposing, magnificent, infinite. Mountains tower over this remote wilderness, creating a cold stillness over the tundra. Mt. Denali, formerly Mt. McKinley, is North America's highest mountain, and is contained within Denali National Park in Alaska. The Alaska Range also includes countless other spectacular mountains and many large glaciers. Denali's more than 6 million acres also encompass a complete sub-arctic eco-system with large mammals such as grizzly bears, wolves, Dall sheep, and moose. The park was established as Mt. McKinley National Park on Feb. 26, 1917. The original park was designated a wilderness area, the first national park created specifically to protect wildlife, and incorporated into Denali National Park and Preserve in 1980. The park was designated an international biosphere reserve in 1976. In 2015, Mt. McKinley was renamed to Mt. Denali to pay homage to the Athabaskan people who called the area home—Denali means “the tall one” or “mountain-big” in their native Koyukon language. Today the park accommodates a wide variety of visitor use including wildlife viewing, mountaineering, cycling, and even dog sledding! (Denali National Park and Preserve is actually the only national park with a working dog sled kennel.) It continues to provide a laboratory for research in the natural sciences. Denali National Park and Preserve includes the central, highest portion of the Alaska Range, together with many of the glaciers and glacial valleys running southwards out of the range. To the north the park and preserve encompass the valleys of the McKinley, Toklat and Foraker Rivers, as well as the Kantishna and Wyoming Hills. The George Parks Highway runs along the eastern edge of the park, crossing the Alaska Range at the divide between the valleys of the Chultina River and the Nenana River. The entrance to the park is about 11 miles (18 km) south of Healy. The Denali Visitor Center and the park headquarters are located just inside the entrance. The park road parallels the Alaska Range for 92 miles (148 km), ending at Kantishna. Preserve lands are located on the west side of the park, with one parcel encompassing areas of lakes in the Highpower Creek and Muddy River areas, and the second preserve area covering the southwest end of the high Alaska Range around Mount Dall. In contrast to the park, where hunting is prohibited or restricted to subsistence hunting by local residents, sport hunting is allowed in the preserve lands.",
        hero: "https://www.doi.gov/sites/doi.gov/files/press-release/thumbnail-images/Denali%20-%20Landscape.jpg",
        hours: "Denali is open 24-hours a day, 7 days a week, although services are limited after-hours (generally after 4 pm in winter or 6 pm in summer). There is no gate at the park entrance. Please note that camping is only possible either in designated campgrounds (with a valid reservation) or in the rest of the park with a free backpacking permit.",
        location: "Denali National Park lb P.O. Box 9 lb Denali Park, AK 99755-0009",
        contact: "907-683-9532 lb General park information. The phone is answered 9 am - 4 pm daily, except on Thanksgiving, Christmas Day and New Year's Day. If you reach the voicemail, please leave a message with your number and we'll call you back as soon as we finish helping the visitor on the line ahead of you.",
      }, {
        where: {
          name: 'denali'
        }
      })
      db.models.park.update({
        info: "A truly living mountain range, the Great Smoky Mountains are constantly re-inventing themselves as wind, water, and erosion continuously shape these ageless mountains. Wander the tranquil woods and hills to appreciate what your support can do to protect our nation’s beauty. America’s most visited national park, Great Smoky Mountains, is an ideal getaway. Hike, camp, and experience one of America’s oldest mountain ranges. Established in 1934, Great Smoky Mountains National Park is comprised of ridge upon ridge of seemingly endless forest on the border between North Carolina and Tennessee. Called the Smokies due to the ever-present morning fog, this mountain range is world renowned for the diversity of its plant and animal life, the beauty of its ancient mountains, and its history of southern Appalachian mountain culture. With nearly 80 historic buildings, spectacular displays of wildflowers, and abundant wildlife, Great Smoky Mountains National Park offers myriad activities to enjoy. The Great Smoky Mountains National Park region is divided down its length by the Tennessee – North Carolina border. Visitor centers—Sugarlands and Oconaluftee—mirror each other across the state line separated by many miles of deciduous forest. There are waterfalls throughout the park, with larger falls like Grotto, Laurel, Abrams, Rainbow, and Mingo drawing over 200,000 visitors per year. Most of the rocks in the Great Smoky Mountains consist of Late Precambrian rocks that are part of a formation known as the Ocoee Supergroup. The Ocoee Supergroup consists primarily of slightly metamorphosed sandstones, phyllites, schists, and slate. Early Precambrian rocks, which include the oldest rocks in the Smokies, comprise the dominant rock type in the Raven Fork Valley (near Oconaluftee) and upper Tuckasegee River between Cherokee and Bryson City. They consist primarily of metamorphic gneiss, granite, and schist. Cambrian sedimentary rocks are found among the outer reaches of the Foothills to the northwest and in limestone coves such as Cades Cove. The Precambrian gneiss and schists—the oldest rocks in the Smokies—formed over a billion years ago from the accumulation of marine sediments and igneous rock in a primordial ocean. In the Late Precambrian period, this ocean expanded, and the more recent Ocoee Supergroup rocks formed from accumulations of the eroding land mass onto the ocean's continental shelf.",
        hero: "https://www.goodfreephotos.com/albums/united-states/tennessee/great-smoky-mountains-national-park/dusk-skies-at-great-smoky-mountains-national-park-tennessee.jpg",
        hours: "Primary roads are open 24 hours a day, seven days a week, year-round, weather permitting. This includes Newfound Gap Road (US-441), Little River Road, and Laurel Creek Road. Secondary roads are closed seasonally. Cades Cove Loop Road is open to motor vehicles from sunrise until sunset daily. Pedestrians and bicyclists may access the road 24 hours a day.",
        location: 'Great Smoky Mountains lb 107 Park Headquarters Road lb Gatlinburg TN, 37738',
        contact: "865-436-1200 lb Visitor Information Recorded Message",
      }, {
        where: {
          name: 'great smoky mountains'
        }
      })
      // If NPS decides to fix their API...
      // var npsKey = 'hidden';
      // var parkCodes = 'dena,gaar,glba,katm,kefj,kova,lacl,wrst,grca,pefo,sagu,hosp,chis,deva,jotr,seki,lavo,pinn,redw,seki,blca,grsa,meve,romo,ever,bisc,drto,hale,havo,maca,acad,isro,voya,glac,grba,cave,grsm,thro,cuva,crla,cong,badl,wica,bibe,gumo,arch,brca,care,cany,shen,mora,noca,olym,yell,yose,zion,viis,grte,npsa';
      // var options = {
      //   url: 'https://developer.nps.gov/api/v0/alerts?parkCode=yose',
      //   headers: {
      //     'Authorization': npsKey
      //   }
      // };
      //
      // request(options, function(error, response, body) {
      //   if (error) {
      //     console.log('error! cannot access nps API')
      //   } else {
      //     console.log('status code: ', response.statusCode)
      //     var parkData = body;
      //     console.log('nps parkData', body);
      //   }
      // });



      /*---------------------------------------------
              Seed Posts with Yosemite pics
      ----------------------------------------------*/
      var urls = [
        {url: 'https://twitter.com/AcadiaNPS', name: 'acadia'},
        {url: 'https://twitter.com/HIPacParks', name: 'american samoa'}, //tentative american samoa
        {url: 'https://twitter.com/ArchesNPS', name: 'arches'},
        {url: 'https://twitter.com/BadlandsNPS', name: 'badlands'},
        {url: 'https://twitter.com/BigBendNPS', name: 'big bend'},
        {url: 'https://twitter.com/BiscayneNPS', name: 'biscayne'},
        {url: 'https://twitter.com/BlackCanyonNPS', name: 'black canyon of the gunnison'},
        {url: 'https://twitter.com/BryceCanyonNPS', name: 'bryce canyon'},
        {url: 'https://twitter.com/CanyonlandsNPS', name: 'canyonlands'},
        {url: 'https://twitter.com/CapitolReefNPS', name: 'capitol reef'},
        {url: 'https://twitter.com/CavernsNPS', name: 'carlsbad caverns'},
        {url: 'https://twitter.com/CHISNPS', name: 'channel islands'}, //needs new twitter handle
        {url: 'https://twitter.com/CongareeNPS', name: 'congaree'},
        {url: 'https://twitter.com/CraterLakeNPS', name: 'crater lake'},
        {url: 'https://twitter.com/CVNPNPS', name: 'cuyahoga valley'},
        {url: 'https://twitter.com/DeathValleyNPS', name: 'death valley'},
        {url: 'https://twitter.com/DenaliNPS', name: 'denali'},
        {url: 'https://twitter.com/DryTortugasNPS', name: 'dry tortugas'},
        {url: 'https://twitter.com/EvergladesNPS', name: 'everglades'},
        {url: 'https://twitter.com/GatesArcticNPS', name: 'gates of the arctic'},
        {url: 'https://twitter.com/GlacierBayNPS', name: 'glacier bay'},
        {url: 'https://twitter.com/GlacierNPS', name: 'glacier'},
        {url: 'https://twitter.com/GrandCanyonNPS', name: 'grand canyon'},
        {url: 'https://twitter.com/GrandTetonNPS', name: 'grand teton'},
        {url: 'https://twitter.com/GreatBasinNPS', name: 'great basin'},
        {url: 'https://twitter.com/visitalamosa', name: 'great sand dunes'}, //great sand dunes,
        {url: 'https://twitter.com/GreatSmokyNPS', name: 'great smoky mountains'},
        {url: 'https://twitter.com/GuadalupeMtnsNP', name: 'guadalupe mountains'},
        {url: 'https://twitter.com/HaleakalaNPS', name: 'haleakalā'},
        {url: 'https://twitter.com/Volcanoes_NPS', name: 'hawaii volcanoes'},
        {url: 'https://twitter.com/HotSpringsAltNP', name: 'hot springs'}, //tentative hot springs
        {url: 'https://twitter.com/IsleRoyaleFFA', name: 'isle royale'}, //tentative isle royale
        {url: 'https://twitter.com/JoshuaTreeNPS', name: 'joshua tree'},
        {url: 'https://twitter.com/KatmaiNPS', name: 'katmai'},
        {url: 'https://twitter.com/KenaiFjordsNPS', name: 'kenai fjords'},
        {url: 'https://twitter.com/SequoiaKingsNPS', name: 'kings canyon'}, //kings canyon and sequoia
        {url: 'https://twitter.com/AlaskaNPS', name: 'kobuk valley'}, //kobuk valley
        {url: 'https://twitter.com/LakeClarkNPS', name: 'lake clark'},
        {url: 'https://twitter.com/LassenNPS', name: 'lassen volcanic'},
        {url: 'https://twitter.com/MammothCaveNP', name: 'mammoth cave'},
        {url: 'https://twitter.com/VisitMVC', name: 'mesa verde'}, //tentative mesa verde
        {url: 'https://twitter.com/MountRainierNPS', name: 'mount rainier'},
        {url: 'https://twitter.com/NCascadesNPS', name: 'north cascades'},
        {url: 'https://twitter.com/OlympicNP', name: 'olympic'},
        {url: 'https://twitter.com/PetrifiedNPS', name: 'petrified forest'},
        {url: 'https://twitter.com/PinnaclesNPS', name: 'pinnacles'},
        {url: 'https://twitter.com/RedwoodNPS', name: 'redwood'},
        {url: 'https://twitter.com/RockyNPS', name: 'rocky mountain'},
        {url: 'https://twitter.com/SaguaroNPS', name: 'saguaro'},
        {url: 'https://twitter.com/SequoiaKingsNPS', name: 'sequoia'},
        {url: 'https://twitter.com/ShenandoahNPS', name: 'shenandoah'},
        {url: 'https://twitter.com/TRooseveltNPS', name: 'theodore roosevelt'},
        {url: 'https://twitter.com/stjusvi', name: 'virgin islands'}, //tentative virgin islands
        {url: 'https://twitter.com/VoyageursNPS', name: 'voyageurs'}, //quite inactive (1 photo), should get new twitter handle
        {url: 'https://twitter.com/WindCaveNPS', name: 'wind cave'},
        {url: 'https://twitter.com/WrangellStENPS', name: 'wrangell–st. elias'},
        {url: 'https://twitter.com/YellowstoneNPS', name: 'yellowstone'},
        {url: 'https://twitter.com/YosemiteNPS', name: 'yosemite'},
        {url: 'https://twitter.com/ZionNPS', name: 'zion'},
      ];
      var requests = [];
      urls.forEach(function(individualPark, index, array) {
        db.models.park.find({
          where: {
            name: individualPark.name,
          }
        }).then(function() {
          requests.push(request((individualPark.url + '/media'), function (error, response, html) {
            if (error) {
              console.log('Error requesting url', error);
            } else {
              var $ = cheerio.load(html);
              db.models.park.find({
                where: {
                  name: individualPark.name
                }
              })
              .then(function(results) {
                var numPicsToPull = 10;
                var userId = 1;
                var type;
                var notPhotoCount = 0;
                for (var i = 0; i < (numPicsToPull + notPhotoCount); i++){
                  console.log('super long obvious string: ', individualPark.url);
                  type = 'notphoto';
                  if ($('#stream-items-id').children()[i] === undefined) {
                    //photo list has ended
                    break;
                  }
                  if ($('#stream-items-id').children()[i].children[1].children[3].children[5].children[1].children[1] !== undefined) {
                    if ($('#stream-items-id').children()[i].children[1].children[3].children[5].children[1].children[1].children[1].children[1].attribs['class'] === 'AdaptiveMedia-photoContainer js-adaptive-photo ') {
                      type = 'photo';
                      var postUrl = $('#stream-items-id').children()[i].children[1].children[3].children[5].children[1].children[1].children[1].children[1].attribs['data-image-url'];
                    } else {
                      notPhotoCount++;
                      type = 'notphoto';
                    }

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
                  if (type === 'photo') {
                    db.models.post.create({
                      type: type,
                      filePath: postUrl,
                      parkId: results.dataValues.id,
                      userId: userId,
                      firstName: users[Math.floor(Math.random()*users.length)].firstName,
                      description: description[Math.floor(Math.random()*description.length)]
                    });
                  }
                }
              });
            }
          }));
        });
      })
      Promise.all(requests).then(function() {
        console.log('@@@@@@@@FINISHED SEEDING')
      });

      /*---------------------------------------------
            Seed twitter snp photos with comments
      ----------------------------------------------*/
      // iterate over 543 post photos
      var twitterSnpPhotos = [];
      var randomComment = ['Nature, eh? Incredible!!', 'Wildlife, huh? Spectacular!!', 'Outdoors, right? Amazing!!', 'National parks, hm? Wonderous!']
      var getRandomNumber = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // iterate over all 543 posts and add comment
      for (var i = 1 ; i < 544; i++) {
        twitterSnpPhotos.push(
          db.models.postcomment.create({
            text: randomComment[getRandomNumber(0,3)],
            userId: getRandomNumber(1,4),
            postId: i,
          })
        )
      }
      //run promise on array
      Promise.all(twitterSnpPhotos).then(function(res) {
        console.log('stored!')
      })


      /*---------------------------------------------
            Seed parkPhotos with Yosemite pics
      ----------------------------------------------*/

      var yosemitePics = [
        'http://miriadna.com/desctopwalls/images/max/California,-Yosemite-National-park.jpg',
        'http://www.atlasandboots.com/wp-content/uploads/2016/01/stunning-natural-phenomena-1.jpg',
        'https://drscdn.500px.org/photo/89719719/q%3D80_m%3D2000/f8a6fec97d623db924f2c8e88457a526',
        'https://www.nationalparks.org/sites/default/files/styles/wide_2x/public/shutterstock_142351951.jpg?itok=4VSjqdM1&timestamp=1474998760',
        'http://blog.thomascook.in/wp-content/uploads/2016/06/Yose-1024x581.jpg'
      ];
      var denaliPics = [
        'https://www.nationalparks.org/sites/default/files/denali-grizzly-bears-nps_jacob_w_frank-v-horiz.jpg',
        'https://w-dog.net/wallpapers/6/8/344636208569138/brothers-wolves-denali-national-park-central-alaska.jpg',
        'https://www.walldevil.com/wallpapers/a23/alaska-details-christmas-wallpapers-park-national-caribou-mount-mckinley-denali-travel.jpg',
        'https://w-dog.net/wallpapers/10/14/449266994444348/denali-national-park-alaska-denali-national-park-alaska-northern-lights-forest-winter-snow-tree-spruce.jpg',
        'http://wpnature.com/wp-content/uploads/2016/09/mountain-september-storm-denali-burning-national-park-white-sky-trees-snowy-peaks-yellow-forest-beautiful-valley-orange-clouds-alaska-damra-wallpapers-full-hd.jpg'
      ];
      var greatSmokyPics = [
        'http://www.smokymtndreams.com/blog/wp-content/uploads/2016/04/smokieslarge.jpg',
        'https://www.goodfreephotos.com/albums/united-states/tennessee/great-smoky-mountains-national-park/cascading-rapids-landscape-in-great-smoky-mountains-national-park-tennessee.jpg',
        'https://free4kwallpapers.com/no-watermarks/originals/2015/09/29/bridge-in-the-great-smoky-mountains-national-park.jpg',
        'https://free4kwallpapers.com/no-watermarks/originals/2015/04/25/mountains-next-to-lake-landscape.jpg',
        'https://www.walldevil.com/wallpapers/a90/forest-creek-great-smoky-mountains-national-park-north-carolina-usa.jpg',
      ];
      // var parkPhotosCreation = [];
      // for (var i = 1; i < 60; i++) {
      //   for (var j = 0; j < yosemitePics.length; j++) {
      //     parkPhotosCreation.push(db.models.parkphoto.create({
      //       photoUrl: yosemitePics[j],
      //       parkId: i
      //     }));
      //   }
      // }
      // Promise.all(parkPhotosCreation);
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
            firstName: 'Kay',
            parkId: results.dataValues.id,
            userId: 1,
          }
        });
        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Nature, eh? Incredible!',
            userEmail: 'kaychristensen@gmail.com',
            firstName: 'Kay',
            parkId: results.dataValues.id,
            userId: 1,
          }
        });
        db.models.parkcomment.findOrCreate({
          where: {
            text: '"The “firefall” on Horsetail Fall..event that can only be captured few days in February"',
            userEmail: 'jackieh.bee@gmail.com',
            firstName: 'Jackie',
            parkId: results.dataValues.id,
            userId: 3,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Starting 10 million years ago, vertical movement along the Sierra fault started to uplift the Sierra Nevada.',
            userEmail: 'jackieh.bee@gmail.com',
            firstName: 'Jackie',
            parkId: results.dataValues.id,
            userId: 3,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'A series of glaciations further modified the region starting about 2 to 3 million years ago and ending sometime around 10,000 BP.',
            userEmail: 'tenso2006@gmail.com',
            firstName: 'Tenzin',
            parkId: results.dataValues.id,
            userId: 2,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Despite the richness of high-quality habitats in Yosemite, the brown bear, California condor, and least Bell\'s vireo have become extinct in the park within historical time',
            userEmail: 'tenso2006@gmail.com',
            firstName: 'Tenzin',
            parkId: results.dataValues.id,
            userId: 2,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'The black bears of Yosemite were once famous for breaking into parked cars to steal food.',
            userEmail: 'brianjschultz508@gmail.com',
            firstName: 'Brian',
            parkId: results.dataValues.id,
            userId: 4,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Increasing ozone pollution is causing tissue damage to the massive giant sequoia trees in the park.',
            userEmail: 'brianjschultz508@gmail.com',
            firstName: 'Brian',
            parkId: results.dataValues.id,
            userId: 4,
          }
        });
      });
      db.models.park.find({
        where: {
          name: 'denali'
        }
      }).then(function(results) {
        for (var i = 0; i < denaliPics.length; i++) {
          db.models.parkphoto.create({
            photoUrl: denaliPics[i],
            parkId: results.dataValues.id
          });
        }
      /*---------------------------------------------
                    Seed Parkcomments
      ----------------------------------------------*/
        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Denali was amazing!',
            userEmail: 'kaychristensen@gmail.com',
            firstName: 'Kay',
            parkId: results.dataValues.id,
            userId: 1,
          }
        });
        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Nature, eh? Incredible!',
            userEmail: 'kaychristensen@gmail.com',
            firstName: 'Kay',
            parkId: results.dataValues.id,
            userId: 1,
          }
        });
        db.models.parkcomment.findOrCreate({
          where: {
            text: "The Denali Gray Jay field season is well underway! It may be -33F out, but that doesn't stop us - or the Gray Jays!",
            userEmail: 'jackieh.bee@gmail.com',
            firstName: 'Jackie',
            parkId: results.dataValues.id,
            userId: 3,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: "Happy Marmot Day! The marmots didn't come out of hibernation to predict the weather. Guess this means we have a few more months of winter!",
            userEmail: 'jackieh.bee@gmail.com',
            firstName: 'Jackie',
            parkId: results.dataValues.id,
            userId: 3,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: "There aren't enough words to describe the beauty",
            userEmail: 'tenso2006@gmail.com',
            firstName: 'Tenzin',
            parkId: results.dataValues.id,
            userId: 2,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: "It may be -40F out, but that doesn't keep the moose away. Each needs about 20 pounds of twigs a day.",
            userEmail: 'tenso2006@gmail.com',
            firstName: 'Tenzin',
            parkId: results.dataValues.id,
            userId: 2,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'enali National Park and Preserve includes the central, highest portion of the Alaska Range, together with many of the glaciers and glacial valleys running southwards out of the range.',
            userEmail: 'brianjschultz508@gmail.com',
            firstName: 'Brian',
            parkId: results.dataValues.id,
            userId: 4,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'The oldest rocks in the park are part of the Yukon-Tanana terrane. They originated from ocean sediments deposited between 400 million and 1 billion years ago.',
            userEmail: 'brianjschultz508@gmail.com',
            firstName: 'Brian',
            parkId: results.dataValues.id,
            userId: 4,
          }
        });
      })
      db.models.park.find({
        where: {
          name: 'great smoky mountains'
        }
      }).then(function(results) {
        for (var i = 0; i < greatSmokyPics.length; i++) {
          db.models.parkphoto.create({
            photoUrl: greatSmokyPics[i],
            parkId: results.dataValues.id
          });
        }
      /*---------------------------------------------
                    Seed Parkcomments
      ----------------------------------------------*/
        db.models.parkcomment.findOrCreate({
          where: {
            text: 'The Great Smoky Mountains were amazing!',
            userEmail: 'kaychristensen@gmail.com',
            firstName: 'Kay',
            parkId: results.dataValues.id,
            userId: 1,
          }
        });
        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Nature, eh? Incredible!',
            userEmail: 'kaychristensen@gmail.com',
            firstName: 'Kay',
            parkId: results.dataValues.id,
            userId: 1,
          }
        });
        db.models.parkcomment.findOrCreate({
          where: {
            text: "Three waterfalls, including Tom Branch Falls, can be found within the Deep Creek area of the park!",
            userEmail: 'jackieh.bee@gmail.com',
            firstName: 'Jackie',
            parkId: results.dataValues.id,
            userId: 3,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Middle Prong Trail offers many cascades! Water drops 65 ft over the multiple tiers of Indian Flats Falls!',
            userEmail: 'jackieh.bee@gmail.com',
            firstName: 'Jackie',
            parkId: results.dataValues.id,
            userId: 3,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Morton Overlook provides spectacular mountain vistas and stunning sunsets.',
            userEmail: 'tenso2006@gmail.com',
            firstName: 'Tenzin',
            parkId: results.dataValues.id,
            userId: 2,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Unlike the bears, woodchucks enter into true hibernation. They may only breathe every 5 - 6 minutes!',
            userEmail: 'tenso2006@gmail.com',
            firstName: 'Tenzin',
            parkId: results.dataValues.id,
            userId: 2,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'Did you know that this national park has a species of fish named after it? The Smoky Madtom is a small freshwater catfish!',
            userEmail: 'brianjschultz508@gmail.com',
            firstName: 'Brian',
            parkId: results.dataValues.id,
            userId: 4,
          }
        });

        db.models.parkcomment.findOrCreate({
          where: {
            text: 'I go to nature to be soothed and healed, and to have my senses put in tune once more.',
            userEmail: 'brianjschultz508@gmail.com',
            firstName: 'Brian',
            parkId: results.dataValues.id,
            userId: 4,
          }
        });
      });
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
    text: 'Nature, eh? Incredible!',
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

db.models.postcomment.findOrCreate({
  where: {
    text: 'Yosemite was amazing!',
    postId: 540,
    userId: 1
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'Nature, eh? Incredible!',
    postId: 540,
    userId: 2
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: '"The “firefall” on Horsetail Fall..event that can only be captured few days in February"',
    postId: 539,
    userId: 1
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'Starting 10 million years ago, vertical movement along the Sierra fault started to uplift the Sierra Nevada.',
    postId: 538,
    userId: 3
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'A series of glaciations further modified the region starting about 2 to 3 million years ago and ending sometime around 10,000 BP.',
    postId: 535,
    userId: 1
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'Despite the richness of high-quality habitats in Yosemite, the brown bear, California condor, and least Bell\'s vireo have become extinct in the park within historical time',
    postId: 534,
    userId: 2
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'The black bears of Yosemite were once famous for breaking into parked cars to steal food.',
    postId: 533,
    userId: 4
  }
});

db.models.postcomment.findOrCreate({
  where: {
    text: 'Increasing ozone pollution is causing tissue damage to the massive giant sequoia trees in the park.',
    postId: 532,
    userId: 3
  }
});


/*---------------------------------------------
          Seed Parks with Ratings
----------------------------------------------*/
var ratings = [];
for (var i = 1 ; i < users.length + 1; i++) {
  for (var j = 1; j < 60; j++) {
    ratings.push(db.models.rating.findOrCreate({
      where: {
        userId: i,
        parkId: j,
        ratingVal: Math.ceil(Math.random() * 5)
      }
    }))
  }
}
Promise.all(ratings).then(function(parkRatings) {
  var parkRatingsArray = [];
  console.log('PARKRATINGS[0].dataValues', parkRatings[0][0].dataValues);
  
  for (var i = 0; i < parkRatings.length; i++) {
    if (i === 0) {
      var average;
      var total = 0;
      var parkId;
    }
    if ((i + 1) % users.length === 0) {
      average = total/users.length;
      var total = 0;
      parkRatingsArray.push(
        db.models.park.update({
          rating: average
        },
        {
          fields: ['rating'],
          where: {id: parkId}
        })
      )
      var parkId;
    }
    parkId = parkRatings[i][0].dataValues.parkId;
    total += parkRatings[i][0].dataValues.ratingVal;
  }
    //update the park with the average rating
  Promise.all(parkRatingsArray);
});
// }


