export const categories = ["A+", "A", "B+", "B", "C+", "C", "D+", "D"];

// Player names and groups
const names = {
  "A+": [
    "संकेत सावंत",
    "अनिरुद्ध दंडवते",
    "आशिष धुरी",
    "ओम जाधव",
    "हृषीकेश करगुटकर",
    "मनीष पाटील",
  ],
  A: [
    "जयेश मालुसरे",
    "प्रतीक सोळंकी",
    "सुशांत",
    "अजय जाधव",
    "स्मितेश वाक्कर",
    "प्रफुल्ल पारदळे",
  ],
  "B+": [
    "रोशन चिपटे",
    "प्रतिश पारदळे",
    "रोहन वारखंडकर",
    "समीर साखळे",
    "प्रशांत बारगोडे",
    "निलेश नाचणेकर",
  ],
  B: [
    "प्रतीक बामणे",
    "संकेत कदम",
    "सुबोध कांबळे",
    "अवनीश",
    "यतिन राऊत",
    "सचिन पाटील",
  ],
  "C+": [
    "नितीन वाळके",
    "सुदेश बाने",
    "रोहन पारदळे",
    "शुभम राऊत",
    "संकेत खळे",
    "गौरव राणे",
  ],
  C: [
    "ओंकार सावंत",
    "राज पाटील",
    "आशु पाटील",
    "श्रेयस गांवकर",
    "राहुल कणेरकर",
    "रोहित सावंत",
  ],
  "D+": [
    "सिद्धार्थ कानडे",
    "सचिन कदम",
    "हर्ष रेडेकर",
    "निखिल चमणकर",
    "सनी बोंबरे",
    "प्रशांत ठाकूर",
  ],
  D: [
    "अखिलेश लाले",
    "श्रेयश ठाकूर",
    "गौरव भालेकर",
    "यश बोंबरे",
    "अनुज राणे",
    "विघ्नेश घाडशी",
  ],
};

// Left-handed batsmen
const leftHandedBatters = new Set([
  "आशिष धुरी",
  "मितेश मालुसरे",
  "गौरव भालेकर",
  "सिद्धार्थ कानडे",
  "श्रेयश ठाकूर",
]);

const teams = [
  "Park Dominators",
  "Park Royal Challengers",
  "Park Panthers",
  "Chintamani Blasters",
  "SameHit Strikers",
  "Mauli Packers",
];

export const players = categories.flatMap((category) =>
  names[category].map((name, index) => {
    const isLeftHanded = leftHandedBatters.has(name);

    return {
      id: `${category}-${index}`,
      name,
      category,

      role:
        category === "A+"
          ? "अष्टपैलू"
          : category === "A"
            ? "फलंदाज / गोलंदाज"
            : category === "B+"
              ? "फलंदाज"
              : "खेळाडू",

      batting: isLeftHanded ? "Left-hand batter" : "Right-hand batter",

      bowling: isLeftHanded ? "Left-arm bowler" : "Right-arm bowler",

      basePrice: 100,
      currentBid: 100,
      image: `/images/${name}.png`,
    };
  }),
);

export { teams };

export const winners = Array.from({ length: 8 }, (_, i) => ({
  season: i + 1,
  name: `सीझन ${i + 1} विजेता`,
  team: `विजेता संघ ${2018 + i}`,
  image: `/winners/season-${i + 1}.jpeg`,
}));
