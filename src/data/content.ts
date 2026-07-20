import type {FactItem, LocationSpot, QuizQuestion, Story} from '../types';
import {Images} from '../assets';

export const stories: Story[] = [
  {
    id: 'shadow-below-reef',
    title: 'Shadow Below the Reef',
    summary:
      'A dawn dive near Sleepy Wedge reveals a silent shark and a strange metal arch hidden in coral.',
    content: `Mark had gone underwater before dawn. The flashlight slowly cut through the dark blue ocean, and all around him was the muffled crackle of a walkie-talkie. There was always an eerie silence near the old reef, which the local divers called "Sleepy Wedge." Even the fish moved more slowly here.

He checked his helmet camera and swam deeper between the stone passages. At the bottom lay metal fragments - the remains of a small boat that had disappeared many years ago. The water around him was colder than usual. Mark noticed a long scratch on the hull of the wreck, as if something large had slid past it.

Suddenly, something moved in the darkness.

A large silhouette appeared ahead. Not fast. Not aggressive. Just huge. The shark slowly swam sideways, almost oblivious to the diver. Her movements were so smooth that it seemed as if the water itself was carrying her forward.

Mark froze. Even through his thick suit, he felt a chill run down his back. The camera silently recorded every movement. The shark circled the reef and disappeared into the blue darkness as silently as it had appeared.

Returning to the surface, Mark looked at the recording for a long time. In one frame, another strange silhouette was visible behind the shark - something like an old metal arch hidden among the coral. The next day he decided to go back there again.

But local fishermen advised him not to do this. They said that the reef does not like those who stare into the darkness of the ocean for too long.`,
  },
  {
    id: 'silent-diver-camera',
    title: 'The Silent Diver Camera',
    summary:
      'An old underwater camera washes ashore with footage of a tunnel, a light, and a returning shadow.',
    content: `During a storm, the waves washed an old underwater camera ashore. It was scratched, covered with salt and sand, but the red indicator still blinked weakly. The camera was found by a young diver, Alex, near a small boat station.

In the evening he decided to watch the recordings.

The first few minutes were ordinary: corals, fish, murky water. Then the video became strange. The man holding the camera descended deeper and deeper. The flashlight shone nervously, as if the operator was in a hurry.

An old underwater tunnel between the rocks appeared on the screen. The camera slowly approached it. At some point, a shark flashed in the darkness. Large, almost black due to the depth of the water.

But that was not what was strange.

In one frame, Alex noticed a light inside the tunnel. As if someone was standing there with a flashlight. The camera turned sharply to the side, heavy breathing was heard, and then the recording stopped.

The next day, Alex decided to find this place. He took flippers, spare oxygen, and the same camera. According to the coordinates from the video, he reached the old reef.

The tunnel really existed.

The water inside was dark and cold. The walls were covered with old metal structures, as if there had once been a small underwater station here. At the bottom lay the fragments of a lantern and a torn diving suit strap.

And then Alex heard a sound.

The slow hit of metal on stone.

He turned sharply, but behind him there was only dark water. And far below, almost imperceptibly, the same dark silhouette of a shark swam again.`,
  },
  {
    id: 'fins-near-wreck',
    title: 'Fins Near the Wreck',
    summary:
      'A cargo ship keeps giving back lost cameras, and Lina discovers who may be watching the wreck.',
    content: `The old cargo ship "North Gale" had been lying at the bottom for more than forty years. For tourists it was just a popular place to dive, but among experienced divers there were other stories.

They said that small things always disappeared near the ship: compasses, knives, cameras, flashlights. No one could explain why.

Diver Lina went there with a small group. The water was clear, and schools of silvery fish swam around the ship's hull. She slowly descended into the hold, illuminating the space with the narrow beam of the flashlight.

It was quiet inside.

On the floor lay old flippers, covered in sand. Next to them was a rusty camera in a waterproof case. Lina picked it up and noticed that the battery was still working.

In the last photo, the stern of the ship was visible. And a dark fin behind it.

Suddenly, a crackling sound came over the radio.

"Come up. Now."

The voice was tense. Lina quickly turned around and noticed movement in the adjacent passage. A large shark slowly swam between the metal beams of the ship. It did not attack. It was simply watching.

At the same moment, the light of the flashlight flashed.

When Lina directed the beam forward again, the shark was no longer there.

But in the place where she had just been, another old camera lay.`,
  },
  {
    id: 'blue-signal-underwater',
    title: 'Blue Signal Underwater',
    summary:
      'A repeating electronic pulse leads Denis to an emergency beacon marked Station 04.',
    content: `At a depth of twenty meters, any sound seems alien. That is why Denis immediately noticed a strange signal in the earphone. A short electronic pulse repeated itself every few seconds.

He checked the equipment - everything was working normally.

The signal came from somewhere on the left, from the side of a dark hollow between the rocks. Denis slowly swam there, illuminating the path with a flashlight. Fine sand was rising around, and the water was getting darker and darker.

And then he saw a blue light.

At the bottom lay an old emergency beacon. Its body was cracked, but the lamp was still working. Nearby lay fragments of metal and a torn cable.

Denis leaned closer and suddenly noticed a huge shadow above him.

A shark.

It moved very slowly, almost silently. The light of the beacon was reflected on its fin with blue glare. Denis froze, trying not to move suddenly.

The shark circled the hollow and swam further into the darkness.

When his fear subsided a little, Denis looked more closely at the lighthouse. On its hull was a faded inscription:

"Station 04".

But what scared him most was something else.

Someone had clearly turned on the lighthouse quite recently.`,
  },
  {
    id: 'echoes-coral-gate',
    title: 'Echoes of the Coral Gate',
    summary:
      'A coral arch amplifies every diver sound, until one echo answers from the other side.',
    content: `Mira found the coral gate by accident while following a trail of silver fish. Two stone walls leaned toward each other until they almost touched, leaving a narrow blue passage below.

Every breath she took came back to her as an echo. The sound did not behave like normal water. It returned too late, then too close, as if another diver was copying her from behind the reef.

She moved through the gate and saw scratches along the stone. They were parallel, deep and too wide for any tool she knew. Beyond the gate the ocean floor dropped into a quiet bowl filled with white sand.

The sand suddenly lifted.

A shark passed beneath it, hidden so well that Mira had almost swum above its back. It rose slowly, scattering sand like smoke, then turned toward the coral gate.

Mira expected panic. Instead she felt watched by something ancient and patient. The shark moved past her and disappeared through the arch.

When Mira followed, the echo returned one last time. It was not her breathing anymore.

It sounded like a signal tapping from inside the coral.`,
  },
  {
    id: 'green-lantern-dive',
    title: 'The Green Lantern Dive',
    summary:
      'A glowing dive lamp keeps lighting by itself beside a reef no one visited that week.',
    content: `The resort crew called it the green lantern because its old glass lens turned every beam of light emerald. It belonged to a diver who had stopped coming to the island years ago.

One evening, the lantern appeared on the dock, wet and covered with fresh sand.

Nora took it underwater the next morning. At first it worked like any ordinary lamp, cutting through blue water and drifting plankton. Then the beam flickered and pointed away from her hand.

It guided her to a crack in the reef where a chain had been wedged between rocks. The chain led down into a pocket of darker water.

Below it, a reef shark swam in slow circles around a buried metal box.

Nora did not open the box. The shark never came close, but each time she reached toward the chain, it shifted slightly and blocked the beam.

Back on the dock, the lantern went dark. Later, when she checked her dive notes, she found a green smear across the last page.

It looked exactly like a route line on a map.`,
  },
  {
    id: 'night-signal-trench-nine',
    title: 'Night Signal at Trench Nine',
    summary:
      'A research team records three knocks from a trench that should be empty.',
    content: `Trench Nine was not the deepest place in the ocean, but it was one of the quietest. Research boats avoided it at night because radio signals became thin and unreliable above the drop.

Pavel stayed on deck while two divers checked the sensor cable. Their lamps glowed below like tiny stars.

Then the boat receiver clicked three times.

No one was using that channel.

The divers found the cable wrapped around a rock pillar far below its marked route. Near the knot, the stone was polished smooth, as if a heavy body had circled it again and again.

When the receiver clicked three more times, both divers turned their lamps toward the trench wall.

A pale shark rose from the darkness, not rushing, not hunting. It passed through the light and carried a broken tag near its fin.

The tag number matched a shark recorded in the area eleven years earlier.

That shark had been declared lost after its signal vanished in Trench Nine.`,
  },
  {
    id: 'glass-compass',
    title: 'The Glass Compass',
    summary:
      'A cracked compass points not north, but toward a moving shadow below a wreck.',
    content: `Jonah bought the glass compass from a market stall because it looked strange and old. The seller said it came from a wreck, then refused to say which one.

On his first dive with it, the needle would not settle. It spun whenever he faced open water, then snapped toward a ridge below the reef.

The ridge hid the ribs of a sunken boat. Inside the wheelhouse, Jonah found a brass plate with the same symbol scratched into the compass lid.

The needle twitched again.

Outside the window, a shark drifted past, close enough for Jonah to see scars along its side. The compass followed it perfectly.

Jonah tried turning away. The needle pressed against the glass until it cracked.

He surfaced with the compass shaking in his palm. By morning, the crack had widened into the shape of the reef.

At the center of the tiny map was a black dot that had not been there before.`,
  },
  {
    id: 'reef-sang-low-tide',
    title: 'The Reef That Sang at Low Tide',
    summary:
      'Low tide makes the reef hum, and a diver learns the sound is coming from below.',
    content: `Every local child knew the reef sang at low tide. Most people said it was wind in the rocks or water moving through hidden holes.

Sofia wanted proof.

She placed a recorder near the reef wall and dove as the tide began to fall. The humming was faint at first, more like pressure in the bones than sound in the ears.

Below the reef, she found a row of metal pipes covered with coral. They led into the dark, vibrating softly in the current.

A shark appeared beside the pipes and moved along them as if following a path it knew well.

Sofia kept her distance. The shark did not seem interested in her. It touched one pipe with its side, and the hum changed pitch.

When Sofia listened to the recording later, the sound formed a pattern.

It matched the timing of old lighthouse signals from a station that had fallen into the sea decades ago.`,
  },
  {
    id: 'forgotten-research-buoy',
    title: 'The Forgotten Research Buoy',
    summary:
      'A silent buoy starts broadcasting again after a shark circles beneath it.',
    content: `The yellow research buoy had been dead for six months. Its solar panel was cracked, its antenna bent, and its serial number nearly scraped away.

Then it sent a clean signal at 2:17 in the morning.

Kira went out with a repair team expecting a loose battery or saltwater glitch. Under the buoy, they found the anchor rope stretched tight into the deep.

A shark moved below them, wide and slow. It circled the rope once, then vanished into darker water.

Kira followed the line down until her pressure alarm warned her to stop. At the edge of her light, the rope disappeared through a round opening in the seabed.

Something metal glimmered inside.

When she surfaced, the buoy transmitted again. This time it sent coordinates.

They were not the buoy's location. They pointed to a place far offshore where no marker had ever been placed.`,
  },
  {
    id: 'manta-shadow-station-blue',
    title: 'Manta Shadow Over Station Blue',
    summary:
      'A training dive near a closed station turns strange when a giant shadow blocks the sun.',
    content: `Station Blue had been sealed after a storm damaged its lower entrance. New divers were told to stay above the platform and practice buoyancy in the clear water.

Eli was checking his depth when the sunlight dimmed.

A huge shape crossed above him. For a second he thought it was a manta ray, but the tail movement was wrong. Then the outline split into a shark and the shadow of the station roof behind it.

The shark descended toward the sealed entrance.

Eli watched it nose a loose panel aside and pass through a gap too narrow for any diver with tanks.

Inside, blue light flashed twice.

No one believed him until the instructor reviewed the camera footage. The shark was there. The panel was there.

Behind both, for one frame only, a handprint showed in the dust on the inside of the glass.`,
  },
  {
    id: 'last-light-pelican-drop',
    title: 'The Last Light of Pelican Drop',
    summary:
      'A missing flashlight returns from a deep wall with fresh scratches around its handle.',
    content: `Pelican Drop was a vertical wall that fell into blue nothing. Divers loved it in daylight and avoided it near sunset.

Tomas lost his flashlight there during a routine descent. It slipped from his clip and vanished below before he could grab it.

Three days later, the light appeared on a ledge twenty meters above where he had dropped it.

It was still on.

He dove down to retrieve it and found fresh bite-shaped scratches around the handle. While he examined them, the light blinked twice, though he had not touched the switch.

Far below, a shark turned in the gloom.

Tomas rose slowly, keeping the beam pointed down. The shark followed at a distance, staying just outside the clear water.

Back on the boat, the flashlight blinked once more and died.

Inside the battery compartment, Tomas found a tiny piece of blue paint from an object none of them recognized.`,
  },
  {
    id: 'teeth-marks-anchor-line',
    title: 'Teeth Marks on the Anchor Line',
    summary:
      'A boat anchor line returns from the water with marks that seem too careful to be accidental.',
    content: `The captain noticed the anchor line first. It had not snapped, but it was marked every half meter with clean, crescent cuts.

The crew blamed rocks. The divers blamed old coral.

Ilya put on a camera and followed the line down. Near the bottom, the anchor rested beside a field of broken pottery and black sand.

Something had cleared a circle around it.

A shark entered the camera frame and drifted close to the rope. It did not bite. It opened its mouth just enough to touch the line, then moved away to the next mark.

The spacing was exact.

Ilya realized the cuts were not damage. They were measurements.

When the anchor came up, a small metal tag was hooked around one tooth mark. It carried only three stamped characters: A-17.`,
  },
  {
    id: 'whale-shark-quiet-path',
    title: "The Whale Shark's Quiet Path",
    summary:
      'A gentle giant leads a diver away from danger and toward a hidden field of glowing plankton.',
    content: `Amara had dreamed of seeing a whale shark since she was a child. When one finally appeared beside the reef, it moved like a calm island under the water.

She followed at a respectful distance, filming the pale dots along its body.

The animal slowly turned away from the planned route. Amara almost stopped, but a current tugged hard behind her, pulling loose sand into a narrow channel.

The whale shark kept moving.

A few minutes later, the channel collapsed with a muted thunder of rock. If Amara had stayed on course, she would have been inside it.

The whale shark carried her toward a darker plain where tiny blue lights began to bloom.

Plankton sparked around them like stars.

For the rest of the dive, Amara felt that the ocean had opened a quiet path only because she had learned to follow without taking.`,
  },
];

export const locations: LocationSpot[] = [
  {
    id: 'tiger-beach',
    title: 'Tiger Beach',
    country: 'Bahamas',
    coordinates: {latitude: 26.685, longitude: -79.109},
    image: Images.locationTigerBeach,
    description:
      'Tiger Beach is one of the most famous places in the world to observe tiger sharks in their natural environment. The water here is so clear that even at great depths you can see the movements of large marine animals. Divers often notice how the sharks slowly move along the sandy bottom without showing aggression. The place is popular with underwater photographers because of soft blue light, coral areas, small reefs and open water routes.',
  },
  {
    id: 'gansbaai',
    title: 'Gansbaai',
    country: 'South Africa',
    coordinates: {latitude: -34.58, longitude: 19.351},
    image: Images.locationGansbaai,
    description:
      'Gansbaai is one of the most famous ocean areas for observing great white sharks. The coast is harsh and cool, and the water has a dark blue hue due to strong Atlantic currents. Nearby islands with colonies of fur seals attract sharks to this region. Divers and researchers often use underwater cages for safe observation, especially when fog and waves make the area feel wild and dramatic.',
  },
  {
    id: 'isla-guadalupe',
    title: 'Isla Guadalupe',
    country: 'Mexico',
    coordinates: {latitude: 29.097, longitude: -118.287},
    image: Images.locationIslaGuadalupe,
    description:
      'Guadalupe Island is far from tourist coasts and is known for very clean water. Divers can see marine animals at a great distance, and great white sharks often pass near the rocky parts of the island. Underwater, the place feels almost cosmic: dark blue depth, rays of light from above and deep shadows between volcanic rocks.',
  },
  {
    id: 'neptune-islands',
    title: 'Neptune Islands',
    country: 'Australia',
    coordinates: {latitude: -35.24, longitude: 136.12},
    image: Images.locationNeptuneIslands,
    description:
      'Neptune Islands is a group of islands off southern Australia, known for strong ocean currents and rich marine life. Large sharks pass by rocky underwater routes, while turquoise water moves over stone platforms and narrow passages. The place feels isolated because of wind and waves, but on sunny days the light creates beautiful moving rays through the water.',
  },
  {
    id: 'beqa-lagoon',
    title: 'Beqa Lagoon',
    country: 'Fiji',
    coordinates: {latitude: -18.376, longitude: 178.123},
    image: Images.locationBeqaLagoon,
    description:
      'Beqa Lagoon is known for warm water, vibrant corals and tropical marine life. Reef sharks and larger species can pass near the deep lagoon channels. Divers love the calm water, colorful fish, coral walls and sun glare moving through the water. In the evening, the ocean can turn almost purple and the lagoon feels like a complete underwater world.',
  },
  {
    id: 'cocos-island',
    title: 'Cocos Island',
    country: 'Costa Rica',
    coordinates: {latitude: 5.528, longitude: -87.057},
    image: Images.locationCocosIsland,
    description:
      'Cocos Island sits far out in the Pacific and is surrounded by deep water, strong currents and volcanic slopes. Hammerhead sharks often gather near cleaning stations where smaller fish move around them. The island is a dream location for experienced divers because every descent can reveal schools of fish, rays and large silhouettes moving through blue water.',
  },
  {
    id: 'malpelo-island',
    title: 'Malpelo Island',
    country: 'Colombia',
    coordinates: {latitude: 4.001, longitude: -81.604},
    image: Images.locationMalpeloIsland,
    description:
      'Malpelo Island rises from deep Pacific water like a stone tower. The underwater terrain is steep, dramatic and full of current lines where sharks travel. Divers come here for hammerheads, silky sharks and massive schools of fish. The place feels remote and serious, with dark rock walls dropping quickly into the blue.',
  },
  {
    id: 'socorro-island',
    title: 'Socorro Island',
    country: 'Mexico',
    coordinates: {latitude: 18.783, longitude: -110.971},
    image: Images.locationSocorroIsland,
    description:
      'Socorro Island is part of the Revillagigedo Archipelago and is known for encounters with large ocean animals. Sharks, manta rays and dolphins can appear in open water around volcanic structures. Visibility changes with current and season, but the feeling of depth is always present. It is a strong expedition-style destination for divers who like wide ocean spaces.',
  },
  {
    id: 'rangiroa',
    title: 'Rangiroa',
    country: 'French Polynesia',
    coordinates: {latitude: -14.967, longitude: -147.633},
    image: Images.locationRangiroa,
    description:
      'Rangiroa is a huge atoll with passes where lagoon water rushes into the ocean. Reef sharks and grey sharks often hold position in the current, creating one of the most recognizable underwater scenes in Polynesia. The water can be bright, clear and full of movement, with coral slopes, sand channels and deep blue edges.',
  },
  {
    id: 'fuvahmulah',
    title: 'Fuvahmulah',
    country: 'Maldives',
    coordinates: {latitude: -0.298, longitude: 73.424},
    image: Images.locationFuvahmulah,
    description:
      'Fuvahmulah is a southern island in the Maldives with access to deep pelagic routes. Tiger sharks are regularly observed near the island, and other ocean species may appear with the currents. The underwater landscape combines tropical clarity with sudden depth, giving divers a feeling that the open ocean is very close.',
  },
  {
    id: 'osprey-reef',
    title: 'Osprey Reef',
    country: 'Australia',
    coordinates: {latitude: -13.917, longitude: 146.633},
    image: Images.locationOspreyReef,
    description:
      'Osprey Reef lies in the Coral Sea and is known for steep walls, clear water and shark activity. The reef rises from deep blue water, creating dramatic vertical scenery for divers. Grey reef sharks and silvertip sharks can appear along the walls, while coral gardens and small fish bring color to the upper slopes.',
  },
  {
    id: 'aliwal-shoal',
    title: 'Aliwal Shoal',
    country: 'South Africa',
    coordinates: {latitude: -30.255, longitude: 30.836},
    image: Images.locationAliwalShoal,
    description:
      'Aliwal Shoal is a rocky reef system shaped by warm Indian Ocean currents. It is known for ragged-tooth sharks, reef life and seasonal visitors. The terrain includes gullies, caves and ledges where marine animals move with the surge. The site can feel energetic and unpredictable, which makes it exciting for confident divers.',
  },
  {
    id: 'bimini',
    title: 'Bimini',
    country: 'Bahamas',
    coordinates: {latitude: 25.728, longitude: -79.291},
    image: Images.locationBimini,
    description:
      'Bimini is close to deep water channels and is famous for clear blue conditions. Divers may see reef sharks, nurse sharks and sometimes hammerheads during the right season. The sandy bottom, warm light and shallow reefs make the area easier to explore than many remote shark destinations, while still feeling full of ocean mystery.',
  },
  {
    id: 'ningaloo-reef',
    title: 'Ningaloo Reef',
    country: 'Australia',
    coordinates: {latitude: -22.686, longitude: 113.668},
    image: Images.locationNingalooReef,
    description:
      'Ningaloo Reef is one of the best-known places to see whale sharks during migration season. The reef is close to shore, with clear water, coral gardens and rich marine life. Whale sharks move slowly through the water, giving divers and snorkelers a rare chance to observe the largest fish in the world in a calm setting.',
  },
  {
    id: 'darwin-island',
    title: 'Darwin Island',
    country: 'Galapagos',
    coordinates: {latitude: 1.678, longitude: -91.99},
    image: Images.locationDarwinIsland,
    description:
      'Darwin Island is one of the legendary dive areas of the Galapagos. Strong currents bring nutrients and attract large schools of fish, hammerheads and other sharks. The underwater world feels raw and powerful, with rocky platforms, deep drops and constant movement. It is a destination for experienced divers who want true open-ocean energy.',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which shark is known for its striped body pattern?',
    options: ['Hammerhead Shark', 'Whale Shark', 'Tiger Shark', 'Reef Shark'],
    answerIndex: 2,
  },
  {
    id: 'q2',
    question: 'What do divers usually use to breathe underwater?',
    options: ['Flashlight', 'Oxygen Tank', 'Rope', 'Compass'],
    answerIndex: 1,
  },
  {
    id: 'q3',
    question: 'Which ocean is the largest in the world?',
    options: [
      'Atlantic Ocean',
      'Indian Ocean',
      'Arctic Ocean',
      'Pacific Ocean',
    ],
    answerIndex: 3,
  },
  {
    id: 'q4',
    question: 'What helps divers see clearly underwater?',
    options: ['Helmet', 'Mask', 'Gloves', 'Boots'],
    answerIndex: 1,
  },
  {
    id: 'q5',
    question: 'Which shark has a head shaped like a hammer?',
    options: ['Blue Shark', 'Bull Shark', 'Hammerhead Shark', 'Sand Shark'],
    answerIndex: 2,
  },
  {
    id: 'q6',
    question: 'What color is most common for deep ocean water?',
    options: ['Red', 'Blue', 'Orange', 'Yellow'],
    answerIndex: 1,
  },
  {
    id: 'q7',
    question: 'Which object is used to take underwater photos?',
    options: ['Underwater Camera', 'Radio', 'Notebook', 'Binoculars'],
    answerIndex: 0,
  },
  {
    id: 'q8',
    question: 'What are diver fins mainly used for?',
    options: [
      'Writing notes',
      'Swimming faster',
      'Carrying oxygen',
      'Cleaning equipment',
    ],
    answerIndex: 1,
  },
  {
    id: 'q9',
    question: 'Which shark is the biggest in the world?',
    options: ['Tiger Shark', 'Great White Shark', 'Whale Shark', 'Reef Shark'],
    answerIndex: 2,
  },
  {
    id: 'q10',
    question: 'What usually grows on coral reefs?',
    options: ['Ice', 'Coral and sea plants', 'Sandstorms', 'Lava rocks'],
    answerIndex: 1,
  },
  {
    id: 'q11',
    question: 'What tool helps divers navigate underwater?',
    options: ['Compass', 'Spoon', 'Telescope', 'Clock'],
    answerIndex: 0,
  },
  {
    id: 'q12',
    question: 'Which animal is often seen near coral reefs?',
    options: ['Penguin', 'Camel', 'Tropical Fish', 'Wolf'],
    answerIndex: 2,
  },
  {
    id: 'q13',
    question: 'What is the main source of light underwater for divers?',
    options: ['Moonlight', 'Underwater Torch', 'Fire', 'Lantern Smoke'],
    answerIndex: 1,
  },
  {
    id: 'q14',
    question: 'Which ocean animal is known for moving silently through water?',
    options: ['Dolphin', 'Shark', 'Crab', 'Seal'],
    answerIndex: 1,
  },
  {
    id: 'q15',
    question: 'What do divers usually check before going underwater?',
    options: [
      'Weather and equipment',
      'Car keys',
      'TV signal',
      'Street lights',
    ],
    answerIndex: 0,
  },
];

const factTexts = [
  'Sharks existed on Earth long before dinosaurs appeared.',
  'Some shark species can detect tiny electrical signals in the water.',
  'Whale sharks are the largest fish in the world.',
  'Most sharks constantly move to help water pass through their gills.',
  'Divers often use underwater flashlights even during daytime dives.',
  'Coral reefs are home to thousands of ocean species.',
  'Tiger sharks are known for dark stripes on their bodies.',
  'Ocean water changes color depending on depth and sunlight.',
  'Some underwater caves remain unexplored for decades.',
  'Sharks have several rows of teeth that replace themselves naturally.',
  'Underwater cameras use special waterproof protection systems.',
  'Many deep-water creatures glow in darkness naturally.',
  'Divers communicate underwater using hand signals.',
  'Reef sharks usually stay close to coral areas.',
  'The Pacific Ocean is the largest ocean on Earth.',
  'Ocean currents can travel across entire continents.',
  'Some sharks can sense movement from very far away.',
  'Underwater visibility changes depending on weather and water conditions.',
  'Hammerhead sharks have a unique wide-shaped head structure.',
  'Oxygen tanks allow divers to stay underwater longer.',
  'Some coral reefs can be seen from space.',
  'Sharks play an important role in ocean ecosystems.',
  'Underwater pressure increases quickly with depth.',
  'Many divers keep photo journals after expeditions.',
  'Blue water often appears darker in deep ocean zones.',
  'Certain sharks migrate thousands of kilometers every year.',
  'Sonar technology helps researchers study underwater movement.',
  'Sea caves can create unusual underwater echoes.',
  'Divers wear fins to move more efficiently underwater.',
  'Sunlight reaches only part of the ocean before fading into darkness.',
];

export const facts: FactItem[] = factTexts.map((text, index) => ({
  id: `fact-${index + 1}`,
  title: `Facts #${index + 1}`,
  text,
}));
