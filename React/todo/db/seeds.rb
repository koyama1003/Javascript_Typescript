# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
 Tag.create([
  {
    name: "Java",
    color: "#7057ff",
    description: "class-based, object-oriented programming language",
  },
  {
    name: "JavaScript",
    color: "#008672",
    description:
      " scripting language used to create and control dynamic website content",
  },
  {
    name: "Python",
    color: "#afdfdf",
    description:
      " interpreted, object-oriented, high-level programming language with dynamic semantics.",
  },
  {
    name: "Ruby",
    color: "#af434f",
    description:
      "interpreted, high-level, general-purpose programming language",
  },
  {
    name: "C",
    color: "#000000",
    description: "general-purpose, procedural computer programming language",
  },
  {
    name: "C++",
    color: "#535252",
    description:
      "general-purpose programming language as an extension of the C programming language",
  },
  {
    name: "C#",
    color: "#ABABAB",
    description: "general-purpose, multi-paradigm programming language",
  },
  {
    name: "Swift",
    color: "#E5712D",
    description:
      " general-purpose, multi-paradigm, compiled programming language developed by Apple Inc",
  },
  {
    name: "Go",
    color: "#0FA5F1",
    description:
      "statically typed, compiled programming language designed at Google",
  },
  {
    name: "PHP",
    color: "#4F328B",
    description:
      "general-purpose scripting language especially suited to web development",
  },
  {
    name: "Kotlin",
    color: "#F251EF",
    description:
      "cross-platform, statically typed, general-purpose programming language with type inference",
  },
  {
    name: "Rust",
    color: "#0B080B",
    description:
      "multi-paradigm programming language designed for performance and safety, especially safe concurrency",
  },
  {
    name: "HTML",
    color: "#F1E9F1",
    description:
      "the standard markup language for documents designed to be displayed in a web browser",
  },
  {
    name: "Ruby on Rails",
    color: "#F60612",
    description:
      "server-side web application framework written in Ruby under the MIT License",
  },
  {
    name: "Django",
    color: "#0E4BE8",
    description:
      "Python-based free and open-source web framework that follows the model-template-views (MTV) architectural pattern",
  },
  {
    name: "Flask",
    color: "#4E5462",
    description: "micro web framework written in Python",
  },
  {
    name: "Sinatra",
    color: "#B2010D",
    description:
      "free and open source software web application library and domain-specific language[2] written in Ruby",
  },
  {
    name: "React.js",
    color: "#57C6F6",
    description:
      "open-source, front end, JavaScript library for building user interfaces or UI components",
  },
  {
    name: "React Native",
    color: "#3292BA",
    description:
      "open-source application framework used to develop applications for Android,iOS,macOS,Windows and UWP",
  },
  {
    name: "Redux",
    color: "#0D35E6",
    description:
      "library with a simple, limited API designed to be a predictable container for application state",
  },
  {
    name: "Next.js",
    color: "#2A2A29",
    description:
      "free and open source web application framework based on Vue.js, Node.js, Webpack and Babel.js",
  },
  {
    name: "Vue.js",
    color: "#64943D",
    description:
      "open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications",
  },
  {
    name: "Nuxt.js",
    color: "#A1F35E",
    description:
      "free and open source web application framework based on Vue.js, Node.js, Webpack and Babel.js",
  },
]
 )

User.create(
  {id:1,
    name: "TestUser",
    email: "test@test.test",
    password: 'password', 
    password_confirmation: 'password',
  }
)
Todo.create(
  {title:"Let's get thing started!",
  body:"You logged in as a test user!",
user_id:1,
status:"yet",
startdate:DateTime.yesterday,
deadline:DateTime.tomorrow
  }
)