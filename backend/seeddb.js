import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./schema/ProductsSchema.js"; // adjust path to your schema

dotenv.config();

// Replace with your MongoDB URI
const MONGO_URI = process.env.DB_URI 

const products = [
 
  {
    "name": "Across Campaign",
    "slug": "Across-Campaign",
    "description": "Exist station our operation realize plant provide often range surface rest issue change.",
    "price": 484.03,
    "category_id": [
      "68c2f824527b3fc6d38c501a"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021",
      "68c2f824527b3fc6d38c501f"
    ],
    "size": [
      "L"
    ],
    "color": [
      "Green",
      "Black"
    ],
    "quantity": 97,
    "rating": 3.4,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/2451/400/400",
      "https://picsum.photos/seed/4854/400/400"
    ]
  },
  {
    "name": "Become Expert",
    "slug": "Become-Expert",
    "description": "Lay alone last name adult series article she beyond yeah instead.",
    "price": 1009.17,
    "category_id": [
      "68c2f824527b3fc6d38c501a",
      "68c2f824527b3fc6d38c500f"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "L",
      "S"
    ],
    "color": [
      "Pink",
      "Black"
    ],
    "quantity": 73,
    "rating": 3.0,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/9985/400/400",
      "https://picsum.photos/seed/6966/400/400"
    ]
  },
  {
    "name": "Finish Down",
    "slug": "Finish-Down",
    "description": "Yet day sometimes design newspaper thus development meeting.",
    "price": 1844.29,
    "category_id": [
      "68c2f824527b3fc6d38c501d",
      "68c2f824527b3fc6d38c5016"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XXL"
    ],
    "color": [
      "Black",
      "Yellow"
    ],
    "quantity": 72,
    "rating": 1.0,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/5884/400/400",
      "https://picsum.photos/seed/4643/400/400"
    ]
  },
  {
    "name": "Activity Mind",
    "slug": "Activity-Mind",
    "description": "Medical Congress building degree point anything exactly seat partner similar attorney me.",
    "price": 996.07,
    "category_id": [
      "68c2f824527b3fc6d38c5017"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c501f"
    ],
    "size": [
      "S"
    ],
    "color": [
      "Red",
      "Green",
      "Yellow"
    ],
    "quantity": 57,
    "rating": 2.4,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/7986/400/400",
      "https://picsum.photos/seed/6624/400/400"
    ]
  },
  {
    "name": "Type Information",
    "slug": "Type-Information",
    "description": "Southern inside tree treatment thank bill bit raise seat you.",
    "price": 427.92,
    "category_id": [
      "68c2f824527b3fc6d38c5014",
      "68c2f824527b3fc6d38c5012"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "M",
      "XXL",
      "L"
    ],
    "color": [
      "Green"
    ],
    "quantity": 68,
    "rating": 3.4,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/3030/400/400",
      "https://picsum.photos/seed/1046/400/400"
    ]
  },
  {
    "name": "Society Onto",
    "slug": "Society-Onto",
    "description": "Serve few reality probably physical never economic.",
    "price": 1757.03,
    "category_id": [
      "68c2f824527b3fc6d38c501d"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021",
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XXL"
    ],
    "color": [
      "Green",
      "Pink",
      "Yellow"
    ],
    "quantity": 97,
    "rating": 2.2,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/8342/400/400",
      "https://picsum.photos/seed/1538/400/400"
    ]
  },
  {
    "name": "Somebody Often",
    "slug": "Somebody-Often",
    "description": "Anything allow hit officer officer charge commercial great.",
    "price": 783.28,
    "category_id": [
      "68c2f824527b3fc6d38c5016",
      "68c2f824527b3fc6d38c5012"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c501f"
    ],
    "size": [
      "S"
    ],
    "color": [
      "Yellow",
      "Black"
    ],
    "quantity": 48,
    "rating": 4.2,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/5650/400/400",
      "https://picsum.photos/seed/3767/400/400"
    ]
  },
  {
    "name": "Spend Value",
    "slug": "Spend-Value",
    "description": "Still along cultural machine ok town we test past performance wide believe.",
    "price": 417.87,
    "category_id": [
      "68c2f824527b3fc6d38c501a"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024",
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c5022"
    ],
    "size": [
      "XXL",
      "M",
      "L"
    ],
    "color": [
      "White"
    ],
    "quantity": 18,
    "rating": 2.2,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/1392/400/400",
      "https://picsum.photos/seed/9868/400/400"
    ]
  },
  {
    "name": "Indicate Know",
    "slug": "Indicate-Know",
    "description": "Everything area none husband direction including suggest candidate thank bag cultural degree.",
    "price": 414.78,
    "category_id": [
      "68c2f824527b3fc6d38c5014",
      "68c2f824527b3fc6d38c500d"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021",
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c501f"
    ],
    "size": [
      "XXL"
    ],
    "color": [
      "White",
      "Black",
      "Green"
    ],
    "quantity": 75,
    "rating": 2.0,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/5397/400/400",
      "https://picsum.photos/seed/3416/400/400"
    ]
  },
  {
    "name": "Teacher Result",
    "slug": "Teacher-Result",
    "description": "When whatever rate data lose door a person pressure.",
    "price": 1431.77,
    "category_id": [
      "68c2f824527b3fc6d38c5016",
      "68c2f824527b3fc6d38c5012"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021",
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XXL"
    ],
    "color": [
      "White",
      "Green"
    ],
    "quantity": 56,
    "rating": 2.9,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/7615/400/400",
      "https://picsum.photos/seed/1411/400/400"
    ]
  },
  {
    "name": "Oil North",
    "slug": "Oil-North",
    "description": "Policy law drug eat single first now.",
    "price": 1308.64,
    "category_id": [
      "68c2f824527b3fc6d38c501c"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XXL",
      "S"
    ],
    "color": [
      "Green",
      "White"
    ],
    "quantity": 48,
    "rating": 3.5,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/8628/400/400",
      "https://picsum.photos/seed/1263/400/400"
    ]
  },
  {
    "name": "Contain Old",
    "slug": "Contain-Old",
    "description": "Heart market center space interview side such great throw risk.",
    "price": 278.27,
    "category_id": [
      "68c2f824527b3fc6d38c501a",
      "68c2f824527b3fc6d38c5015"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c5021"
    ],
    "size": [
      "S"
    ],
    "color": [
      "Pink",
      "Yellow"
    ],
    "quantity": 94,
    "rating": 3.5,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/1492/400/400",
      "https://picsum.photos/seed/3290/400/400"
    ]
  },
  {
    "name": "Couple Through",
    "slug": "Couple-Through",
    "description": "Job sign indeed your themselves wide expert drug capital health.",
    "price": 1473.02,
    "category_id": [
      "68c2f824527b3fc6d38c5014"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "S",
      "M",
      "XXL"
    ],
    "color": [
      "Gray",
      "Yellow"
    ],
    "quantity": 5,
    "rating": 3.6,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/5224/400/400",
      "https://picsum.photos/seed/1396/400/400"
    ]
  },
  {
    "name": "Worker Turn",
    "slug": "Worker-Turn",
    "description": "Public executive place employee probably several two.",
    "price": 1181.09,
    "category_id": [
      "68c2f824527b3fc6d38c5010",
      "68c2f824527b3fc6d38c500d"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024",
      "68c2f824527b3fc6d38c501f"
    ],
    "size": [
      "L",
      "M",
      "XL"
    ],
    "color": [
      "White",
      "Blue"
    ],
    "quantity": 84,
    "rating": 4.9,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/4381/400/400",
      "https://picsum.photos/seed/6088/400/400"
    ]
  },
  {
    "name": "Majority Join",
    "slug": "Majority-Join",
    "description": "Level eat along inside clearly off win.",
    "price": 893.07,
    "category_id": [
      "68c2f824527b3fc6d38c501c"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024",
      "68c2f824527b3fc6d38c5021",
      "68c2f824527b3fc6d38c5023"
    ],
    "size": [
      "L"
    ],
    "color": [
      "Black",
      "Pink"
    ],
    "quantity": 46,
    "rating": 1.7,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/6826/400/400",
      "https://picsum.photos/seed/1815/400/400"
    ]
  },
  {
    "name": "Mouth Skill",
    "slug": "Mouth-Skill",
    "description": "Particular adult tell friend off machine.",
    "price": 1722.2,
    "category_id": [
      "68c2f824527b3fc6d38c5018",
      "68c2f824527b3fc6d38c501b"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024",
      "68c2f824527b3fc6d38c5022",
      "68c2f824527b3fc6d38c501f"
    ],
    "size": [
      "M",
      "S"
    ],
    "color": [
      "Red",
      "Green",
      "Pink"
    ],
    "quantity": 47,
    "rating": 3.8,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/5746/400/400",
      "https://picsum.photos/seed/1924/400/400"
    ]
  },
  {
    "name": "Ground Truth",
    "slug": "Ground-Truth",
    "description": "Send energy cover parent determine pressure prove.",
    "price": 1442.44,
    "category_id": [
      "68c2f824527b3fc6d38c500c",
      "68c2f824527b3fc6d38c501d"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021"
    ],
    "size": [
      "M"
    ],
    "color": [
      "Green"
    ],
    "quantity": 10,
    "rating": 2.4,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/5698/400/400",
      "https://picsum.photos/seed/9479/400/400"
    ]
  },
  {
    "name": "Despite Foot",
    "slug": "Despite-Foot",
    "description": "Middle pattern career network admit nice family light wear.",
    "price": 1983.56,
    "category_id": [
      "68c2f824527b3fc6d38c500f",
      "68c2f824527b3fc6d38c5017"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "XXL",
      "S",
      "M"
    ],
    "color": [
      "Red",
      "White",
      "Black"
    ],
    "quantity": 19,
    "rating": 1.0,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/9376/400/400",
      "https://picsum.photos/seed/5624/400/400"
    ]
  },
  {
    "name": "Late Focus",
    "slug": "Late-Focus",
    "description": "Summer most get out nor step natural myself physical in hold.",
    "price": 772.1,
    "category_id": [
      "68c2f824527b3fc6d38c500c"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c5022",
      "68c2f824527b3fc6d38c5021"
    ],
    "size": [
      "XL"
    ],
    "color": [
      "Green",
      "Red",
      "Gray"
    ],
    "quantity": 34,
    "rating": 2.3,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/9977/400/400",
      "https://picsum.photos/seed/5531/400/400"
    ]
  },
  {
    "name": "No Actually",
    "slug": "No-Actually",
    "description": "Create well good staff if job growth about certain three bank drop.",
    "price": 1698.74,
    "category_id": [
      "68c2f824527b3fc6d38c5019"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024",
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "M"
    ],
    "color": [
      "Gray",
      "Blue",
      "Green"
    ],
    "quantity": 25,
    "rating": 4.7,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/9693/400/400",
      "https://picsum.photos/seed/7923/400/400"
    ]
  },
  {
    "name": "Information Thought",
    "slug": "Information-Thought",
    "description": "Scientist current recently serious over very.",
    "price": 1606.25,
    "category_id": [
      "68c2f824527b3fc6d38c5010",
      "68c2f824527b3fc6d38c5011"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "S",
      "XL",
      "XXL"
    ],
    "color": [
      "Yellow"
    ],
    "quantity": 83,
    "rating": 2.8,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/1953/400/400",
      "https://picsum.photos/seed/5148/400/400"
    ]
  },
  {
    "name": "Join Smile",
    "slug": "Join-Smile",
    "description": "Up market themselves understand at letter truth wait close thousand.",
    "price": 1201.37,
    "category_id": [
      "68c2f824527b3fc6d38c500f"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021",
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "L"
    ],
    "color": [
      "Yellow"
    ],
    "quantity": 25,
    "rating": 3.7,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/9316/400/400",
      "https://picsum.photos/seed/7862/400/400"
    ]
  },
  {
    "name": "Fast Season",
    "slug": "Fast-Season",
    "description": "Will billion often board machine democratic somebody air.",
    "price": 1518.96,
    "category_id": [
      "68c2f824527b3fc6d38c501b",
      "68c2f824527b3fc6d38c500d"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c5022",
      "68c2f824527b3fc6d38c5023"
    ],
    "size": [
      "M",
      "L"
    ],
    "color": [
      "Gray",
      "Red"
    ],
    "quantity": 7,
    "rating": 4.2,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/9117/400/400",
      "https://picsum.photos/seed/5835/400/400"
    ]
  },
  {
    "name": "Side Reach",
    "slug": "Side-Reach",
    "description": "Medical full central require smile between season thus.",
    "price": 72.78,
    "category_id": [
      "68c2f824527b3fc6d38c5016",
      "68c2f824527b3fc6d38c501d"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5022"
    ],
    "size": [
      "M",
      "L"
    ],
    "color": [
      "Yellow",
      "Gray",
      "White"
    ],
    "quantity": 33,
    "rating": 1.1,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/9226/400/400",
      "https://picsum.photos/seed/4872/400/400"
    ]
  },
  {
    "name": "Hope Sometimes",
    "slug": "Hope-Sometimes",
    "description": "Then kid stand your important story hospital organization feel prepare only radio run.",
    "price": 1493.74,
    "category_id": [
      "68c2f824527b3fc6d38c501d"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c501f"
    ],
    "size": [
      "XXL",
      "L",
      "S"
    ],
    "color": [
      "Green",
      "Red",
      "Gray"
    ],
    "quantity": 29,
    "rating": 2.6,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/5735/400/400",
      "https://picsum.photos/seed/3527/400/400"
    ]
  },
  {
    "name": "New Open",
    "slug": "New-Open",
    "description": "Onto red company myself member commercial field.",
    "price": 526.73,
    "category_id": [
      "68c2f824527b3fc6d38c5017",
      "68c2f824527b3fc6d38c5014"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XL",
      "XXL",
      "L"
    ],
    "color": [
      "Green",
      "Black"
    ],
    "quantity": 57,
    "rating": 2.3,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/6644/400/400",
      "https://picsum.photos/seed/5586/400/400"
    ]
  },
  {
    "name": "Along Detail",
    "slug": "Along-Detail",
    "description": "Although sometimes professor force subject fire black language.",
    "price": 653.21,
    "category_id": [
      "68c2f824527b3fc6d38c5015"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c5021"
    ],
    "size": [
      "S",
      "XL"
    ],
    "color": [
      "Gray",
      "Yellow"
    ],
    "quantity": 72,
    "rating": 3.1,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/1645/400/400",
      "https://picsum.photos/seed/6876/400/400"
    ]
  },
  {
    "name": "Site Relationship",
    "slug": "Site-Relationship",
    "description": "Born economy cultural start manage a ahead surface when even television.",
    "price": 896.37,
    "category_id": [
      "68c2f824527b3fc6d38c5019"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021"
    ],
    "size": [
      "M",
      "L"
    ],
    "color": [
      "Blue"
    ],
    "quantity": 54,
    "rating": 3.5,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/2574/400/400",
      "https://picsum.photos/seed/4681/400/400"
    ]
  },
  {
    "name": "So Former",
    "slug": "So-Former",
    "description": "Wonder anything interview protect realize bit use check father test school.",
    "price": 77.9,
    "category_id": [
      "68c2f824527b3fc6d38c5011",
      "68c2f824527b3fc6d38c5018"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "S",
      "XL"
    ],
    "color": [
      "Gray"
    ],
    "quantity": 71,
    "rating": 1.5,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/3220/400/400",
      "https://picsum.photos/seed/1957/400/400"
    ]
  },
  {
    "name": "Unit Hospital",
    "slug": "Unit-Hospital",
    "description": "Modern view water side blue church often direction Congress five or group.",
    "price": 20.28,
    "category_id": [
      "68c2f824527b3fc6d38c5015"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XL",
      "L",
      "M"
    ],
    "color": [
      "Yellow"
    ],
    "quantity": 42,
    "rating": 2.4,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/3169/400/400",
      "https://picsum.photos/seed/4069/400/400"
    ]
  },
  {
    "name": "Discuss Set",
    "slug": "Discuss-Set",
    "description": "Plan today remember site stock likely.",
    "price": 1621.36,
    "category_id": [
      "68c2f824527b3fc6d38c5019",
      "68c2f824527b3fc6d38c500f"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5022",
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c5021"
    ],
    "size": [
      "M",
      "S",
      "XL"
    ],
    "color": [
      "Yellow"
    ],
    "quantity": 57,
    "rating": 2.5,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/3017/400/400",
      "https://picsum.photos/seed/7601/400/400"
    ]
  },
  {
    "name": "Some Side",
    "slug": "Some-Side",
    "description": "Lawyer hundred treatment shake voice left pretty as assume try.",
    "price": 298.51,
    "category_id": [
      "68c2f824527b3fc6d38c5018"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XL",
      "M",
      "XXL"
    ],
    "color": [
      "Blue",
      "Red"
    ],
    "quantity": 92,
    "rating": 4.7,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/5729/400/400",
      "https://picsum.photos/seed/3731/400/400"
    ]
  },
  {
    "name": "Future Team",
    "slug": "Future-Team",
    "description": "Science mouth talk traditional real check support discover campaign about.",
    "price": 869.23,
    "category_id": [
      "68c2f824527b3fc6d38c5010"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024",
      "68c2f824527b3fc6d38c5022",
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "L",
      "S"
    ],
    "color": [
      "Gray",
      "Red"
    ],
    "quantity": 55,
    "rating": 2.2,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/1248/400/400",
      "https://picsum.photos/seed/7942/400/400"
    ]
  },
  {
    "name": "Daughter Animal",
    "slug": "Daughter-Animal",
    "description": "Radio strong decision mission drive rock each consider method enjoy green affect space foreign.",
    "price": 1791.09,
    "category_id": [
      "68c2f824527b3fc6d38c5011",
      "68c2f824527b3fc6d38c5010"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024",
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "XL"
    ],
    "color": [
      "Green"
    ],
    "quantity": 65,
    "rating": 1.0,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/5467/400/400",
      "https://picsum.photos/seed/4041/400/400"
    ]
  },
  {
    "name": "Including Sell",
    "slug": "Including-Sell",
    "description": "View miss officer test analysis compare.",
    "price": 517.76,
    "category_id": [
      "68c2f824527b3fc6d38c501d",
      "68c2f824527b3fc6d38c500f"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5023"
    ],
    "size": [
      "M",
      "XL"
    ],
    "color": [
      "Black",
      "Red"
    ],
    "quantity": 63,
    "rating": 3.1,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/6139/400/400",
      "https://picsum.photos/seed/5265/400/400"
    ]
  },
  {
    "name": "Middle East",
    "slug": "Middle-East",
    "description": "Sometimes build oil per work eye middle.",
    "price": 1093.08,
    "category_id": [
      "68c2f824527b3fc6d38c5017",
      "68c2f824527b3fc6d38c5013"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021"
    ],
    "size": [
      "S"
    ],
    "color": [
      "Yellow",
      "Black"
    ],
    "quantity": 34,
    "rating": 2.9,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/1804/400/400",
      "https://picsum.photos/seed/3922/400/400"
    ]
  },
  {
    "name": "Interview Song",
    "slug": "Interview-Song",
    "description": "Difference half choice away reflect worker politics.",
    "price": 1790.04,
    "category_id": [
      "68c2f824527b3fc6d38c5016"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XXL",
      "L"
    ],
    "color": [
      "White",
      "Green",
      "Black"
    ],
    "quantity": 35,
    "rating": 2.2,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/4133/400/400",
      "https://picsum.photos/seed/6953/400/400"
    ]
  },
  {
    "name": "Others None",
    "slug": "Others-None",
    "description": "International sport blue like itself simply home one wish past behavior simply.",
    "price": 947.6,
    "category_id": [
      "68c2f824527b3fc6d38c501a"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021",
      "68c2f824527b3fc6d38c5022",
      "68c2f824527b3fc6d38c5023"
    ],
    "size": [
      "S",
      "M"
    ],
    "color": [
      "Blue",
      "Green"
    ],
    "quantity": 8,
    "rating": 1.1,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/5041/400/400",
      "https://picsum.photos/seed/3074/400/400"
    ]
  },
  {
    "name": "Protect Consider",
    "slug": "Protect-Consider",
    "description": "Arm various lose college feel purpose.",
    "price": 206.48,
    "category_id": [
      "68c2f824527b3fc6d38c501a"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "L",
      "XL"
    ],
    "color": [
      "White",
      "Pink",
      "Red"
    ],
    "quantity": 77,
    "rating": 2.5,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/2809/400/400",
      "https://picsum.photos/seed/1290/400/400"
    ]
  },
  {
    "name": "Such My",
    "slug": "Such-My",
    "description": "Fill expert business evidence meet next home girl behavior worry.",
    "price": 508.12,
    "category_id": [
      "68c2f824527b3fc6d38c5014"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5024",
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c5022"
    ],
    "size": [
      "S",
      "M",
      "XL"
    ],
    "color": [
      "Red",
      "Pink",
      "Black"
    ],
    "quantity": 75,
    "rating": 1.6,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/4516/400/400",
      "https://picsum.photos/seed/2218/400/400"
    ]
  },
  {
    "name": "Into Purpose",
    "slug": "Into-Purpose",
    "description": "Sign a management agree everything camera industry allow of.",
    "price": 929.79,
    "category_id": [
      "68c2f824527b3fc6d38c5012"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5021"
    ],
    "size": [
      "L",
      "XXL"
    ],
    "color": [
      "Black",
      "Yellow",
      "Green"
    ],
    "quantity": 12,
    "rating": 3.9,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/4190/400/400",
      "https://picsum.photos/seed/1633/400/400"
    ]
  },
  {
    "name": "Discover Forward",
    "slug": "Discover-Forward",
    "description": "Provide risk follow car hair result concern television whom ability threat remain occur.",
    "price": 1197.36,
    "category_id": [
      "68c2f824527b3fc6d38c5015",
      "68c2f824527b3fc6d38c500c"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5021"
    ],
    "size": [
      "M",
      "XXL"
    ],
    "color": [
      "Pink",
      "Black",
      "Yellow"
    ],
    "quantity": 47,
    "rating": 1.9,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/9890/400/400",
      "https://picsum.photos/seed/5814/400/400"
    ]
  },
  {
    "name": "Leave Today",
    "slug": "Leave-Today",
    "description": "Our condition like prepare population both beat material various.",
    "price": 453.72,
    "category_id": [
      "68c2f824527b3fc6d38c500f"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5022",
      "68c2f824527b3fc6d38c501f"
    ],
    "size": [
      "XXL",
      "S",
      "XL"
    ],
    "color": [
      "Pink",
      "Black",
      "Blue"
    ],
    "quantity": 69,
    "rating": 2.7,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/5473/400/400",
      "https://picsum.photos/seed/3138/400/400"
    ]
  },
  {
    "name": "Father City",
    "slug": "Father-City",
    "description": "Cost case them trade cup body later hour throughout cover person sense protect.",
    "price": 1603.94,
    "category_id": [
      "68c2f824527b3fc6d38c5010"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5020"
    ],
    "size": [
      "L",
      "M"
    ],
    "color": [
      "Green"
    ],
    "quantity": 40,
    "rating": 4.5,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/6737/400/400",
      "https://picsum.photos/seed/1400/400/400"
    ]
  },
  {
    "name": "Right Forward",
    "slug": "Right-Forward",
    "description": "Control trouble cold industry after police small.",
    "price": 1322.0,
    "category_id": [
      "68c2f824527b3fc6d38c5012"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5022"
    ],
    "size": [
      "L",
      "XXL",
      "M"
    ],
    "color": [
      "Red"
    ],
    "quantity": 28,
    "rating": 4.2,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/3786/400/400",
      "https://picsum.photos/seed/2600/400/400"
    ]
  },
  {
    "name": "Just Instead",
    "slug": "Just-Instead",
    "description": "Program question perform partner happen case among security movie occur begin.",
    "price": 1493.49,
    "category_id": [
      "68c2f824527b3fc6d38c5010"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XL",
      "XXL",
      "M"
    ],
    "color": [
      "Yellow",
      "Gray"
    ],
    "quantity": 78,
    "rating": 2.7,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/4021/400/400",
      "https://picsum.photos/seed/2169/400/400"
    ]
  },
  {
    "name": "Care Population",
    "slug": "Care-Population",
    "description": "Girl quality physical successful take team standard.",
    "price": 1096.54,
    "category_id": [
      "68c2f824527b3fc6d38c5017"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c5022"
    ],
    "size": [
      "XL"
    ],
    "color": [
      "Blue",
      "Green",
      "Yellow"
    ],
    "quantity": 95,
    "rating": 3.2,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/4392/400/400",
      "https://picsum.photos/seed/2899/400/400"
    ]
  },
  {
    "name": "Technology Interest",
    "slug": "Technology-Interest",
    "description": "Continue have year mouth trade short yes.",
    "price": 198.58,
    "category_id": [
      "68c2f824527b3fc6d38c5019"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c5023",
      "68c2f824527b3fc6d38c5024"
    ],
    "size": [
      "XXL",
      "M",
      "L"
    ],
    "color": [
      "Red"
    ],
    "quantity": 44,
    "rating": 4.6,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/1022/400/400",
      "https://picsum.photos/seed/1655/400/400"
    ]
  },
  {
    "name": "Authority Early",
    "slug": "Authority-Early",
    "description": "Cost child whatever eye responsibility method wife Congress reveal.",
    "price": 999.86,
    "category_id": [
      "68c2f824527b3fc6d38c500e"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5020",
      "68c2f824527b3fc6d38c5021",
      "68c2f824527b3fc6d38c501f"
    ],
    "size": [
      "M"
    ],
    "color": [
      "Gray"
    ],
    "quantity": 37,
    "rating": 3.6,
    "status": "Available",
    "images": [
      "https://picsum.photos/seed/3250/400/400",
      "https://picsum.photos/seed/3710/400/400"
    ]
  },
  {
    "name": "A Return",
    "slug": "A-Return",
    "description": "Once suffer second already easy contain ten listen choose should movie.",
    "price": 534.44,
    "category_id": [
      "68c2f824527b3fc6d38c500f",
      "68c2f824527b3fc6d38c500e"
    ],
    "tag_ids": [
      "68c2f824527b3fc6d38c5022",
      "68c2f824527b3fc6d38c501f",
      "68c2f824527b3fc6d38c5023"
    ],
    "size": [
      "M"
    ],
    "color": [
      "Black",
      "White",
      "Red"
    ],
    "quantity": 100,
    "rating": 4.5,
    "status": "Sold Out",
    "images": [
      "https://picsum.photos/seed/2080/400/400",
      "https://picsum.photos/seed/3521/400/400"
    ]
  }
// Add more products (up to 20)
];

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
