import { ApolloServer } from 'npm:@apollo/server@^4.11.3';
import { startStandaloneServer } from 'npm:@apollo/server@^4.11.3/standalone';

const typeDefs = `#graphql
  scalar Date

  enum Environment {
    DEV
    STAGING
    PROD
  }

  type FeatureFlag {
    id: ID!
    name: String!
    description: String!
    enabled: Boolean!
    environment: Environment!
    lastModified: Date!
    owner: String!
    rolloutPercentage: Float
    dependencies: [String]
    expiresAt: Date
  }

  input FeatureFlagInput {
    name: String!
    description: String!
    enabled: Boolean!
    environment: Environment!
    owner: String!
    rolloutPercentage: Float
    dependencies: [String]
    expiresAt: Date
  }

  type Query {
    featureFlags(environment: Environment): [FeatureFlag!]!
    featureFlag(id: ID!): FeatureFlag
  }

  type Mutation {
    createFeatureFlag(input: FeatureFlagInput!): FeatureFlag!
    updateFeatureFlag(id: ID!, input: FeatureFlagInput!): FeatureFlag!
    toggleFeatureFlag(id: ID!): FeatureFlag!
    deleteFeatureFlag(id: ID!): Boolean!
  }
`;

// Sample data - replace with MongoDB integration later
const featureFlags = [
  {
    id: '1',
    name: 'dark_mode',
    description: 'Enable dark mode theme',
    enabled: true,
    environment: 'DEV',
    lastModified: new Date(),
    owner: 'system',
    rolloutPercentage: 100,
    dependencies: [],
    expiresAt: null
  }
];

const resolvers = {
  Query: {
    featureFlags: (_, { environment }) => {
      if (environment) {
        return featureFlags.filter(flag => flag.environment === environment);
      }
      return featureFlags;
    },
    featureFlag: (_, { id }) => featureFlags.find(flag => flag.id === id),
  },
  Mutation: {
    createFeatureFlag: (_, { input }) => {
      const newFlag = {
        id: String(featureFlags.length + 1),
        ...input,
        lastModified: new Date(),
      };
      featureFlags.push(newFlag);
      return newFlag;
    },
    updateFeatureFlag: (_, { id, input }) => {
      const index = featureFlags.findIndex(flag => flag.id === id);
      if (index === -1) throw new Error('Feature flag not found');
      
      const updatedFlag = {
        ...featureFlags[index],
        ...input,
        id,
        lastModified: new Date(),
      };
      featureFlags[index] = updatedFlag;
      return updatedFlag;
    },
    toggleFeatureFlag: (_, { id }) => {
      const index = featureFlags.findIndex(flag => flag.id === id);
      if (index === -1) throw new Error('Feature flag not found');
      
      featureFlags[index] = {
        ...featureFlags[index],
        enabled: !featureFlags[index].enabled,
        lastModified: new Date(),
      };
      return featureFlags[index];
    },
    deleteFeatureFlag: (_, { id }) => {
      const index = featureFlags.findIndex(flag => flag.id === id);
      if (index === -1) return false;
      
      featureFlags.splice(index, 1);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Feature Flag Server ready at ${url}`);
