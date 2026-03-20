import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*
  The .authorization(allow => [allow.owner()]) rule below 
  ensures that only the person who created a Todo can 
  read, update, or delete it.
*/
const schema = a.schema({
  Todo: a.model({
    content: a.string(),
  }).authorization(allow => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // This ensures we use the Login (User Pool) for security
    defaultAuthorizationMode: 'userPool',
  },
});