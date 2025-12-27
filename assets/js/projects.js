 // ====== Projects data ====== 
const user_github_site = "https://github.com/nievyx"
const projects = [


    {
    title: "Flask Inventory App",
    name: "flaskinventoryapp",
    desc: "A lightweight Flask web app to manage store inventory with CRUD (Create, Read, Update, Delete) functionality. Built with Flask and SQLite for efficient local database management.",
        // NEW: longer explanation just for the popup
    longDesc: `
        This project is a small but complete inventory management system built with Flask.
        It supports creating, editing, deleting and listing products, with validation and
        SQLite as the backing database.

        I built it to learn how to structure a Flask app with blueprints and ORM models,
        and to practice thinking about data flows from the database up to the UI.
    `,

    // NEW: bullet points just for the popup
    highlights: [
        "Full CRUD for products (create, read, update, delete)",
        "Uses SQLAlchemy models and migrations",
        "Search and filter inventory records",
        "Clear separation between routes, templates and models"
    ],

    // NEW: what you learned / focus
    learning: [
        "Structuring a Flask project for growth",
        "Designing RESTful routes for basic resources",
        "Working with SQLite and SQLAlchemy relationships"
    ],
        stack: ["Python", "Flask", "SQLite", "SQLAlchemy"],
        links: { 
            repo: user_github_site + "/FlaskInventoryApp", 
            demo: null 
    }
    },
    {
    title: "Automated Stock Checker + Add to Cart",
    name: "playwright-auto-checker",
    desc: "A Python automation tool that monitors product stock on e-commerce sites using Playwright. Sends real-time SMS alerts when selected products become available, with optional auto-add-to-cart functionality.",
    longDesc: `
      A Playwright-powered script that opens product pages, checks availability and can
      auto-add items to the basket. It sends SMS notifications with Twilio when stock
      appears, so you don't have to refresh pages manually.
    `,
    highlights: [
      "Headless stock checking using Playwright",
      "Config-driven list of products to monitor",
      "Optional auto-add-to-cart behaviour",
      "Twilio SMS alerts with product details"
    ],
    learning: [
      "Browser automation with Playwright",
      "Handling dynamic content and selectors",
      "Keeping secrets safe with environment variables"
    ],
    stack: ["Python 3.11", "Playwright", "Twilio API", "dotenv", "JSON"],
    links: { 
        repo: user_github_site + "/playwright-auto-checker", 
        demo: null
    }
    },
    {
    title: "Terminal RPG Game",
    name: "class-based-rpg-python",
    desc: "A classic turn-based console RPG built entirely in Python. Explore maps, battle enemies, manage your party, and progress through a fantasy world — all from your terminal.",
    longDesc:  "",
    highlights: [],
    learning: [],
    stack: ["Python", "OOP", "JSON", "Game Loops"],
    links: { 
        repo: user_github_site + "/class-based-rpg-python", 
        demo: null ,
    }
    },
    {
    title: "Django Blog",
    name: "django_project",
    desc: "A Django project featuring user registration, authentication, and full CRUD functionality for blog posts. Includes two main apps — Blog and Users — and uses Crispy Forms with Bootstrap 4 for clean, responsive UI.",
    stack: ["Python", "Django 5.2", "Crispy Forms", "Bootstrap 4", "SQLite"],
    links: { 
        repo: user_github_site + "/Django_Project", 
        demo: null 
    }
    },
    {     title: 'Tic-tac-Toe Minimax AI',
        name: 'tic-tac-toe-minimax-ai',
        desc: 'A tic-tac-toe game featuring an AI opponent powered by the Minimax algorithm, recursively analysing each move to achieve perfect play. Background music is handled via a lightweight miniaudio wrapper.',
        longDesc: "",
        highlights: [
             'Unbeatable AI using the minimax decision algorithm',
        'Recursive game tree evaluation with terminal state scoring',
        'Modular architecture separating game logic, AI, and audio',
        'Integrated audio playback via a custom miniaudio wrapper'
        ],
        learning: [],
        stack: ['c++', 'Minimax Algorithm', 'miniAudio','Native Audio APIS'],
        links: {
            repo: 'https://github.com/nievyx/tictactoe-minimax-ai',
            demo: null,
        },}
];

 /**
  * BACKUP / REFERENCE PROJECT OBJECT
  *
  * Kept as a reference for project data shape during
  * the migration from static frontend data to API-driven content.
  *
  * Not imported or used at runtime.
  * Safe to delete once API is fully trusted.
  */
 const PROJECT_TEMPLATE ={
     title: '',
     name: '',
     desc: '',
     longDesc: "",
     highlights: [],
     learning: [],
     stack: [],
     links: {
         repo: null,
         demo: null,
 },
 };

//export { projects }; TODO: Delete me!