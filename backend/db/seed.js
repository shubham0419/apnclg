// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Topic = require('../models/topics.model');
const SubTopic = require('../models/subtopics.model');
const User = require('../models/user.model');
dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    await Topic.deleteMany();
    await SubTopic.deleteMany();
    console.log('Cleared existing data...');

    // Topics
    const algorithms = await Topic.create({
      name: 'Algorithms',
      category: 'Algorithms',
      description: 'Learn various algorithmic techniques',
      order: 1,
      isPending: true
    });

    const dataStructures = await Topic.create({
      name: 'Data Structures',
      category: 'Data Structures',
      description: 'Master fundamental data structures',
      order: 2,
      isPending: true
    });

    const databases = await Topic.create({
      name: 'Databases',
      category: 'Databases',
      description: 'Learn database concepts',
      order: 3,
      isPending: true
    });

    const operatingSystems = await Topic.create({
      name: 'Operating Systems',
      category: 'Operating Systems',
      description: 'Understand OS concepts and mechanisms',
      order: 4,
      isPending: true
    });

    const networks = await Topic.create({
      name: 'Networks',
      category: 'Networks',
      description: 'Learn computer networking fundamentals',
      order: 5,
      isPending: true
    });

    const oops = await Topic.create({
      name: 'Object Oriented Programming',
      category: 'Object Oriented Programming',
      description: 'Learn OOP principles and patterns',
      order: 6,
      isPending: true
    });

    const systemDesign = await Topic.create({
      name: 'System Design',
      category: 'System Design',
      description: 'Learn system design concepts and patterns',
      order: 7,
      isPending: true
    });

    // Algorithms SubTopics
    await SubTopic.insertMany([
      {
        name: 'Sorting Algorithms',
        topic: algorithms._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/sorting/',
          youtubeLink: 'https://youtube.com/watch?v=example1',
          articleLink: 'https://example.com/sorting'
        },
        order: 1
      },
      {
        name: 'Searching Algorithms',
        topic: algorithms._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/binary-search/',
          youtubeLink: 'https://youtube.com/watch?v=example2',
          articleLink: 'https://example.com/searching'
        },
        order: 2
      },
      {
        name: 'Dynamic Programming',
        topic: algorithms._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/dynamic-programming/',
          youtubeLink: 'https://youtube.com/watch?v=example3',
          articleLink: 'https://example.com/dp'
        },
        order: 3
      },
      {
        name: 'Greedy Algorithms',
        topic: algorithms._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/greedy/',
          youtubeLink: 'https://youtube.com/watch?v=example4',
          articleLink: 'https://example.com/greedy'
        },
        order: 4
      },
      {
        name: 'Divide and Conquer',
        topic: algorithms._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/divide-and-conquer/',
          youtubeLink: 'https://youtube.com/watch?v=example5',
          articleLink: 'https://example.com/divide-conquer'
        },
        order: 5
      },
      {
        name: 'Backtracking',
        topic: algorithms._id,
        level: 'HARD',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/backtracking/',
          youtubeLink: 'https://youtube.com/watch?v=example6',
          articleLink: 'https://example.com/backtracking'
        },
        order: 6
      },
      {
        name: 'Graph Algorithms',
        topic: algorithms._id,
        level: 'HARD',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/graph/',
          youtubeLink: 'https://youtube.com/watch?v=example11',
          articleLink: 'https://example.com/graph'
        },
        order: 7
      },
      {
        name: 'String Algorithms',
        topic: algorithms._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/string/',
          youtubeLink: 'https://youtube.com/watch?v=example12',
          articleLink: 'https://example.com/string'
        },
        order: 8
      },
      {
        name: 'Bit Manipulation',
        topic: algorithms._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/bit-manipulation/',
          youtubeLink: 'https://youtube.com/watch?v=example13',
          articleLink: 'https://example.com/bit'
        },
        order: 9
      }
    ]);

    // Data Structures SubTopics
    await SubTopic.insertMany([
      {
        name: 'Arrays and Strings',
        topic: dataStructures._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/array/',
          youtubeLink: 'https://youtube.com/watch?v=example7',
          articleLink: 'https://example.com/arrays'
        },
        order: 1
      },
      {
        name: 'Linked Lists',
        topic: dataStructures._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/linked-list/',
          youtubeLink: 'https://youtube.com/watch?v=example8',
          articleLink: 'https://example.com/linked-lists'
        },
        order: 2
      },
      {
        name: 'Stacks and Queues',
        topic: dataStructures._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/stack/',
          youtubeLink: 'https://youtube.com/watch?v=example9',
          articleLink: 'https://example.com/stacks-queues'
        },
        order: 3
      },
      {
        name: 'Trees and Graphs',
        topic: dataStructures._id,
        level: 'HARD',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/tree/',
          youtubeLink: 'https://youtube.com/watch?v=example10',
          articleLink: 'https://example.com/trees-graphs'
        },
        order: 4
      },
      {
        name: 'Hash Tables',
        topic: dataStructures._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/hash-table/',
          youtubeLink: 'https://youtube.com/watch?v=example14',
          articleLink: 'https://example.com/hash-table'
        },
        order: 5
      },
      {
        name: 'Heaps',
        topic: dataStructures._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/heap/',
          youtubeLink: 'https://youtube.com/watch?v=example15',
          articleLink: 'https://example.com/heap'
        },
        order: 6
      },
      {
        name: 'Trie',
        topic: dataStructures._id,
        level: 'HARD',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/trie/',
          youtubeLink: 'https://youtube.com/watch?v=example16',
          articleLink: 'https://example.com/trie'
        },
        order: 7
      }
    ]);

    // Databases SubTopics
    await SubTopic.insertMany([
      {
        name: 'SQL Basics',
        topic: databases._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: 'https://leetcode.com/tag/sql/',
          youtubeLink: 'https://youtube.com/watch?v=example17',
          articleLink: 'https://example.com/sql'
        },
        order: 1
      },
      {
        name: 'Normalization',
        topic: databases._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example18',
          articleLink: 'https://example.com/normalization'
        },
        order: 2
      },
      {
        name: 'Transactions',
        topic: databases._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example19',
          articleLink: 'https://example.com/transactions'
        },
        order: 3
      },
      {
        name: 'Indexing',
        topic: databases._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example20',
          articleLink: 'https://example.com/indexing'
        },
        order: 4
      }
    ]);

    // Operating Systems SubTopics
    await SubTopic.insertMany([
      {
        name: 'Processes and Threads',
        topic: operatingSystems._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example21',
          articleLink: 'https://example.com/processes'
        },
        order: 1
      },
      {
        name: 'Memory Management',
        topic: operatingSystems._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example22',
          articleLink: 'https://example.com/memory'
        },
        order: 2
      },
      {
        name: 'File Systems',
        topic: operatingSystems._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example23',
          articleLink: 'https://example.com/filesystems'
        },
        order: 3
      },
      {
        name: 'Concurrency',
        topic: operatingSystems._id,
        level: 'HARD',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example24',
          articleLink: 'https://example.com/concurrency'
        },
        order: 4
      }
    ]);

    // Networks SubTopics
    await SubTopic.insertMany([
      {
        name: 'OSI Model',
        topic: networks._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example25',
          articleLink: 'https://example.com/osi'
        },
        order: 1
      },
      {
        name: 'TCP/IP',
        topic: networks._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example26',
          articleLink: 'https://example.com/tcpip'
        },
        order: 2
      },
      {
        name: 'Routing',
        topic: networks._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example27',
          articleLink: 'https://example.com/routing'
        },
        order: 3
      },
      {
        name: 'DNS',
        topic: networks._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example28',
          articleLink: 'https://example.com/dns'
        },
        order: 4
      }
    ]);

    // OOP SubTopics
    await SubTopic.insertMany([
      {
        name: 'Classes and Objects',
        topic: oops._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example29',
          articleLink: 'https://example.com/classes'
        },
        order: 1
      },
      {
        name: 'Inheritance',
        topic: oops._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example30',
          articleLink: 'https://example.com/inheritance'
        },
        order: 2
      },
      {
        name: 'Polymorphism',
        topic: oops._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example31',
          articleLink: 'https://example.com/polymorphism'
        },
        order: 3
      },
      {
        name: 'Encapsulation',
        topic: oops._id,
        level: 'EASY',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example32',
          articleLink: 'https://example.com/encapsulation'
        },
        order: 4
      }
    ]);

    // System Design SubTopics
    await SubTopic.insertMany([
      {
        name: 'Scalability',
        topic: systemDesign._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example33',
          articleLink: 'https://example.com/scalability'
        },
        order: 1
      },
      {
        name: 'Load Balancing',
        topic: systemDesign._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example34',
          articleLink: 'https://example.com/load-balancing'
        },
        order: 2
      },
      {
        name: 'Caching',
        topic: systemDesign._id,
        level: 'MEDIUM',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example35',
          articleLink: 'https://example.com/caching'
        },
        order: 3
      },
      {
        name: 'Database Sharding',
        topic: systemDesign._id,
        level: 'HARD',
        status: 'Pending',
        links: {
          leetcodeLink: '',
          youtubeLink: 'https://youtube.com/watch?v=example36',
          articleLink: 'https://example.com/sharding'
        },
        order: 4
      }
    ]);

    const subtopics = await SubTopic.find();
    const progressCounts = subtopics.reduce((acc, st) => {
      const level = st.level.toLowerCase();
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});
    const totalCount = subtopics.length;

    await User.updateMany({}, {
      $set: {
        'progress.easy.total': progressCounts.easy || 0,
        'progress.medium.total': progressCounts.medium || 0,
        'progress.hard.total': progressCounts.hard || 0,
        'progress.total.total': totalCount
      }
    });

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();