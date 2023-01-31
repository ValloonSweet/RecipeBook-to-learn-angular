# Recipe Book

This is for learning Angular basic concepts and design architecture. 

This project is created by Angular and Firebase(as backend Auth and database) and is including almost Angular features such as Component Data binding, Dependency injection, Observable, Form, Authentication & Routing, Modules and NgRx for state management.

The most interesting thing is NgRx and Effects.

![The state structure](./readme//NgRx%20state%20management.png)

This is the structure of app level state. It is very similar to React/Redux.
No problem to design state for Angluar.

![The NgRx effects workflow](./readme//NgRx%20Effect%20workflow.png)

In angular, Side logic(fetching data via Http or redirecting) is separated from Reducer logic with NgRx Effects.

I summarized the auth login flow as example.
When click 'login' button, this component dispatch the LOGIN_START action.
Actually, there is no any reducer logic for this action. (***Step 1***)

Instead, login$ effect is declared and does actions for login(***Step 2***), sending POST request to Firebase and get access token(***Step 3***).

After got success from ***Step 3***, then this effect dispatch another action that is declared on effects with undispatchable(***Step 4***).

At this point, Reducer is called and state is updated with User Data from Firebase(***Step 5***).

Finally, in effects, store User data on local storage and redirect!(***Step 7***)

It seems to be very complex for simple login logic.
But it is separating all parts perfectly.
It will be very helpful for Large scale projects!
