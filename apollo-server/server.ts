import { ApolloServer } from 'npm:@apollo/server@^4.11.3';
import { startStandaloneServer } from 'npm:@apollo/server@^4.11.3/standalone';

const typeDefs = `#graphql
  scalar Date

  type Environment {
    id: ID!
    name: String!
    description: String
    order: Int!
    createdAt: Date!
    lastModified: Date!
  }

  input EnvironmentInput {
    name: String!
    description: String
    order: Int!
  }

  type FeatureFlag {
    id: ID!
    name: String!
    description: String!
    enabled: Boolean!
    environmentId: ID!
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
    environmentId: ID!
    owner: String!
    rolloutPercentage: Float
    dependencies: [String]
    expiresAt: Date
  }

  type Query {
    environments: [Environment!]!
    environment(id: ID!): Environment
    featureFlags(environmentId: ID): [FeatureFlag!]!
    featureFlag(id: ID!): FeatureFlag
  }

  type Mutation {
    # Environment mutations
    createEnvironment(input: EnvironmentInput!): Environment!
    updateEnvironment(id: ID!, input: EnvironmentInput!): Environment!
    deleteEnvironment(id: ID!): Boolean!
    
    # Feature flag mutations
    createFeatureFlag(input: FeatureFlagInput!): FeatureFlag!
    updateFeatureFlag(id: ID!, input: FeatureFlagInput!): FeatureFlag!
    toggleFeatureFlag(id: ID!): FeatureFlag!
    deleteFeatureFlag(id: ID!): Boolean!
  }
`;

// Sample data
const environments = [
  {
    id: '1',
    name: 'Development',
    description: 'Development environment',
    order: 1,
    createdAt: new Date(),
    lastModified: new Date()
  },
  {
    id: '2',
    name: 'Staging',
    description: 'Staging environment',
    order: 2,
    createdAt: new Date(),
    lastModified: new Date()
  },
  {
    id: '3',
    name: 'Production',
    description: 'Production environment',
    order: 3,
    createdAt: new Date(),
    lastModified: new Date()
  }
];

const featureFlags = [
  {
    id: '1',
    name: 'dark_mode',
    description: 'Enable dark mode theme',
    enabled: true,
    environmentId: '1',
    lastModified: new Date(),
    owner: 'system',
    rolloutPercentage: 100,
    dependencies: [],
    expiresAt: null
  }
];

const resolvers = {
  FeatureFlag: {
    environment: (parent) => environments.find(env => env.id === parent.environmentId),
  },
  Query: {
    environments: () => environments,
    environment: (_, { id }) => environments.find(env => env.id === id),
    featureFlags: (_, { environmentId }) => {
      if (environmentId) {
        return featureFlags.filter(flag => flag.environmentId === environmentId);
      }
      return featureFlags;
    },
    featureFlag: (_, { id }) => featureFlags.find(flag => flag.id === id),
  },
  Mutation: {
    createEnvironment: (_, { input }) => {
      const newEnvironment = {
        id: String(environments.length + 1),
        ...input,
        createdAt: new Date(),
        lastModified: new Date(),
      };
      environments.push(newEnvironment);
      return newEnvironment;
    },
    updateEnvironment: (_, { id, input }) => {
      const index = environments.findIndex(env => env.id === id);
      if (index === -1) throw new Error('Environment not found');
      
      const updatedEnvironment = {
        ...environments[index],
        ...input,
        id,
        lastModified: new Date(),
      };
      environments[index] = updatedEnvironment;
      return updatedEnvironment;
    },
    deleteEnvironment: (_, { id }) => {
      const index = environments.findIndex(env => env.id === id);
      if (index === -1) return false;
      
      // Check if any feature flags are using this environment
      const hasFlags = featureFlags.some(flag => flag.environmentId === id);
      if (hasFlags) {
        throw new Error('Cannot delete environment with associated feature flags');
      }
      
      environments.splice(index, 1);
      return true;
    },
    createFeatureFlag: (_, { input }) => {
      // Verify environment exists
      const environmentExists = environments.some(env => env.id === input.environmentId);
      if (!environmentExists) throw new Error('Environment not found');

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
      
      // Verify environment exists
      const environmentExists = environments.some(env => env.id === input.environmentId);
      if (!environmentExists) throw new Error('Environment not found');

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
