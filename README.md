# ToDo App - Amplify

(Hosted) Link: [My app](https://dev.d37i31rmywhz2b.amplifyapp.com/) 

Everything that works:
- Notes:
  - Adding
  - Deleting
  - Change Status
  - Add, View, and change due dates
  - Search
  - Sort
- User:
  - Logging in
  - Logging out
  - Private Lists

Reach Goals (this is the night before so it's actually super reach):
- Assigning ToDo items to Cognito user pool.
  - Basically check all users in user pool (an organisation's users) -> Tricky, does Cognito allow user pool access?
  - then "assign" the ToDo item to that user. -> Share with button that opens a text field with auto complete Mapped to Users from cognito pool
  - (Done) Will need a new field in graphQL which is most likely: [String] 

Enjoyed:
- React
  - The ease of use, interop with JSX and flexibility in choosing methods of doing stuff
  - The overall build system and interactions with the Amplify SDK are also very transparent making it easy to understand
- Amplify
  - The amazing CLI, integration with AWS services and ease of configuration when compared to other offerings (Firebase, Azure, etc.)

Did Not enjoy:
- CSS
  - It felt very finicky and most of the time it was just trial and error to get something right
  - Probably also just a time thing
- GraphQL
  - This is a time thing, still a little fuzzy on queries and resolvers and some of the more advanced GraphQL topics
  - Appreciate the fact that it's all converted to strings when comparing because (although inefficient) allows for some cheating

Some stuff that I experienced:
1. Auth with the Amplify SDK has moderately confusing documentation that feels very hand-wavey. The entire thing was actually resolved
with one string in each graphQL request that specifies the AUTH provider.
2. Although Amplify is actually very helpful, client side integration of AWS implicit types/models for GraphQL is a little weak
which can actually lead to some confusion to newcomers in the AWS/Amplify space.
3. GraphQL is actually super smart, I would like to use it more overall.