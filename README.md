# Movie rental store database

This is a modification of a school assignment. The task is to create a stock management system for a movie rental store.

## Run

`npm start`

## Motivation

In the original assignment, solutions are not allowed to use external libraries. The task naturally lends itself to
databases, but without libraries to manage those, solutions are limited to crude database-like structures.

This is my take on this task without restrictions. I'm using a more modern language than that of the original
assignment, and I'm using libraries to manage a real database.

## Highlights

- Class-inheritance techniques are not used.
    - Objects are never enhanced, so even prototype-inheritance is avoided.
    - No technique similar to virtual function overriding is used.
- Functions are left out in the open, rather than being static properties of classes.
    - Objects have no (additional) methods attached to them. Instead of calling instance methods on objects, we pass
      objects to outside functions.
    - This works because all instance variables are public. Encapsulation is nice, but ultimately unnecessary in
      practice, since the naive technique of, "just don't touch anything you shouldn't" turns out to work just as well.
      It produces the same code (when was the last time you tried to access a private variable?) but allows the language
      to be simpler.
- Declarative approaches are preferred over imperative.
- The process of storing and fetching data is handled by the database.
    - The behaviors of the actions are mostly encoded in the queries.
    - Queries are combined when possible, so as to minimize the amount of time which would be lost in communicating over
      a network.

## School policy

It is against the policy of my university's computer science department for students to post solutions to homework
assignments online.

The professor for the course has given me explicit permission to post this repository publicly since it is in a
different language from the one specified in the assignment and uses techniques which are impermissible on the
assignment. As a result, very little of this code has potential to be reused and submitted by another student.

The professor has also stipulated that I cannot note which course or assignment this code is associated with, in order
to minimize the chance that future students will be able to find and use this repository, especially if the language for
that course changes to JavaScript (though I think that's highly unlikely).