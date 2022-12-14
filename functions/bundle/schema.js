const { gql } = require('apollo-server-micro');
const { getBookmarks, setBookmarks } = require('./bookmarks');
const { nanoid } = require('nanoid');

const wait = numMs => new Promise(res => setTimeout(() => res(), numMs));

const stories = [
  {
    id: 'y7nqO9KWVH6SfQ6RMlPKg',
    author: 'Mary Strawberry',
    title: 'Cornflower',
    summary:
      "Centaurea cyanus, commonly known as cornflower or bachelor's button, is an annual flowering plant in the family Asteraceae native to Europe. In the past, it often grew as a weed in cornfields, hence its name.",
    text: "Centaurea cyanus, commonly known as cornflower or bachelor's button, is an annual flowering plant in the family Asteraceae native to Europe. In the past, it often grew as a weed in cornfields, hence its name. Centaurea cyanus, commonly known as cornflower or bachelor's button, is an annual flowering plant in the family Asteraceae native to Europe. In the past, it often grew as a weed in cornfields, hence its name. Centaurea cyanus, commonly known as cornflower or bachelor's button, is an annual flowering plant in the family Asteraceae native to Europe. In the past, it often grew as a weed in cornfields, hence its name.",
  },
  {
    id: '1n4n7KZYT3MDjkXYmvtEL',
    author: 'Paul Pear',
    title: 'Banana',
    summary:
      'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas.',
    text: 'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas. A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas. A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas.',
  },
  {
    id: 'uT2cyPQK9kpKiNkCQ7QEc',
    author: 'Lucy Lychee',
    title: 'Matcha',
    summary:
      'Matcha is finely ground powder of specially grown and processed green tea leaves, traditionally consumed in East Asia. The green tea plants used for matcha are shade-grown for three to four weeks before harvest; the stems and veins are removed during processing.',
    text: 'Matcha is finely ground powder of specially grown and processed green tea leaves, traditionally consumed in East Asia. The green tea plants used for matcha are shade-grown for three to four weeks before harvest; the stems and veins are removed during processing. Matcha is finely ground powder of specially grown and processed green tea leaves, traditionally consumed in East Asia. The green tea plants used for matcha are shade-grown for three to four weeks before harvest; the stems and veins are removed during processing. Matcha is finely ground powder of specially grown and processed green tea leaves, traditionally consumed in East Asia. The green tea plants used for matcha are shade-grown for three to four weeks before harvest; the stems and veins are removed during processing.',
  },
  {
    id: 'JsjU2i9KcsN8Kwdn6ZOE4',
    author: 'Pippa Pineapple',
    title: 'Stonehenge',
    summary:
      'Stonehenge is a prehistoric monument on Salisbury Plain in Wiltshire, England, two miles west of Amesbury. It consists of an outer ring of vertical sarsen standing stones, each around 13 feet high, seven feet wide, and weighing around 25 tons, topped by connecting horizontal lintel stones.',
    text: 'Stonehenge is a prehistoric monument on Salisbury Plain in Wiltshire, England, two miles west of Amesbury. It consists of an outer ring of vertical sarsen standing stones, each around 13 feet high, seven feet wide, and weighing around 25 tons, topped by connecting horizontal lintel stones. Stonehenge is a prehistoric monument on Salisbury Plain in Wiltshire, England, two miles west of Amesbury. It consists of an outer ring of vertical sarsen standing stones, each around 13 feet high, seven feet wide, and weighing around 25 tons, topped by connecting horizontal lintel stones. Stonehenge is a prehistoric monument on Salisbury Plain in Wiltshire, England, two miles west of Amesbury. It consists of an outer ring of vertical sarsen standing stones, each around 13 feet high, seven feet wide, and weighing around 25 tons, topped by connecting horizontal lintel stones.',
  },
  {
    id: '6JymTLsCFLzIOO_4aXyc0',
    author: 'Betty Botany',
    title: 'Cartography',
    summary:
      'Cartography is the study and practice of making and using maps. Combining science, aesthetics, and technique, cartography builds on the premise that reality can be modeled in ways that communicate spatial information effectively.',
    text: 'Cartography is the study and practice of making and using maps. Combining science, aesthetics, and technique, cartography builds on the premise that reality can be modeled in ways that communicate spatial information effectively. Cartography is the study and practice of making and using maps. Combining science, aesthetics, and technique, cartography builds on the premise that reality can be modeled in ways that communicate spatial information effectively. Cartography is the study and practice of making and using maps. Combining science, aesthetics, and technique, cartography builds on the premise that reality can be modeled in ways that communicate spatial information effectively. Cartography is the study and practice of making and using maps. Combining science, aesthetics, and technique, cartography builds on the premise that reality can be modeled in ways that communicate spatial information effectively.',
  },
];

const typeDefs = gql`
  type Story {
    id: ID!
    author: String
    summary: String!
    text: String
    title: String!
    bookmarkId: ID
  }
  type Bookmark {
    id: ID!
    story: Story!
  }

  type Query {
    stories: [Story!]
    story(id: ID!): Story
    bookmarks: [Bookmark!]
  }

  type Mutation {
    addBookmark(storyId: ID!): Bookmark
    removeBookmark(bookmarkId: ID!): Boolean
  }
`;

const resolvers = {
  Story: {
    bookmarkId: async parent => {
      const bookmarks = await getBookmarks();
      const bookmark = bookmarks.find(b => b.story.id === parent.id);
      return bookmark ? bookmark.id : null;
    },
  },
  Query: {
    async stories() {
      await wait(1000);
      return stories;
    },
    async bookmarks() {
      await wait(1000);
      const bookmarks = await getBookmarks();
      return bookmarks;
    },
    async story(parent, args) {
      await wait(1000);
      const story = stories.find(s => s.id === args.id);
      return story || null;
    },
  },
  Mutation: {
    async addBookmark(parent, args) {
      await wait(1000);
      const bookmarks = await getBookmarks();
      if (!bookmarks.find(bookmark => bookmark.story.id === args.storyId)) {
        const storyToAdd = stories.find(story => story.id === args.storyId);
        if (storyToAdd) {
          const bookmark = { id: nanoid(), story: storyToAdd };
          bookmarks.push(bookmark);

          setBookmarks(bookmarks);
          return bookmark;
        }
      }

      return null;
    },
    async removeBookmark(parent, args) {
      await wait(1000);
      const bookmarks = await getBookmarks();
      const bookmarkToRemove = bookmarks.find(
        bookmark => bookmark.id === args.bookmarkId,
      );

      if (bookmarkToRemove) {
        const newBookmarks = bookmarks.filter(b => b.id !== args.bookmarkId);
        setBookmarks(newBookmarks);
        return true;
      }

      return false;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
