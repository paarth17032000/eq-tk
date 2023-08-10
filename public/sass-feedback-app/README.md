# Eqaim - SASS feedback app

## Welcome! 👋

**To do this challenge, you need a strong understanding of Typescript, NextJS and SCSS**

## The challenge

Your challenge is to build out this SASS feedback application and get it looking as close to the design as possible.

Figma design link - [SASS-feedback-app](https://www.figma.com/file/8TVCHh3X0YUl636AZXWaWj/SASS-feedback-app?type=design&node-id=0%3A1&mode=design&t=IDIeKLS8Mi4NP8jT-1)

The tech stack to be used is:
- Typescript [use custom types and interfaces instaed of "any" everywhere]
- NextJS
- SCSS

We provide the data in a local `data.json` file, so use that to populate the content on the first load. If you want to take it up a notch, feel free to build this as a full-stack application!

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size +
- See hover states for all interactive elements on the page ?
- Create, read, update, and delete SASS feedback requests +
- Receive form validations when trying to create/edit feedback requests +
- Sort suggestions by most/least upvotes and most/least comments +
- Filter suggestions by category +
- Add comments and replies to a SASS feedback request +
- Upvote SASS feedback requests +
- Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app) +

### Expected Behaviour

- Suggestions page
  - Only SASS feedback requests with a status of `suggestion` should be shown on the Suggestions page.
- Roadmap
  - Feedback requests with a status of `planned`, `in-progress`, or `live` should show up on the roadmap, and should be placed in the correct column based on their status.
  - Columns should be ordered by upvote totals.
- Creating a product request
  - When creating a new piece of feedback, an ID needs to be assigned which increments the current highest product request ID by 1.
  - The default status for a new piece of feedback is `suggestion`. This places it on the Suggestions page.
- Editing feedback
  - If a piece of feedback has its status updated to `planned`/`in-progress`/`live` it moves through to the roadmap and should show up in the correct column based on its new status.
- Add comments/replies
  - Use the data from the `currentUser` object in the `data.json` file to populate the user data for any new comments or replies.
  - Any comment/reply can have a maximum of 250 characters.

## Where to find everything

All the required assets for this project are in the `/assets` folder. The assets are already exported for the correct screen size and optimized. Some images are reusable at multiple screen sizes. So if you don't see an image in a specific folder, it will typically be in another folder for that page.

The design system in the design file will give you more information about the various colors, fonts, and styles used in this project.

## Create a custom `README.md`

We've provided a template inside the [`README-template.md`](./README-template.md) file in this starter code.

The template provides a guide for what to add. Please feel free to edit our template as much as you like.

## Submitting your solution

Share the github repository URL with us and update the `README-template.md` file with right instructions and steps to run the project in local machine.

