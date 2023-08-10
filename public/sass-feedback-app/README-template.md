# Eqaim - SASS feedback app solution

The candidate needs to update this file

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Steps](#steps)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete SASS feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a SASS feedback request
- Upvote SASS feedback requests
- Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Steps
- Write down the detailed steps here

--------------------------------------------------------------------------------------------------------

# Steps to run project
- git clone https://github.com/paarth17032000/eq-tk.git
- cd eq-tk/
- npm i
- npm run dev

# Layout
-  Everything on the dashboard is present in page.tsx and some styles are present in global.css and the favicon and site name are present in layout.tsx
- folder structure
  -- app 
    |
    |-->page.tsx : suggestion page layout is present
    |
    |-->[feedback]
    |       |-page.tsx : here particular comment details are present
    |
    |-->add-feedback
    |       |-page.tsx : code related to adding a feedback with suggestion as default status
    |
    |-->edit-feedback
    |       |--[edit] 
    |             |--page.tsx : suggestion page layout is present
    |
    |-->roadmap
    |       |-page.tsx: roadmap page layout where there are feedbacks based on categories.


    -- in components folder we have a utils folder which has a utils function to check data in local storage
    -- in data folder there is data.json
    -- in types folder there is interfaces

## Features

# Suggestion:
- User opens localhost:3000 and has data fetched from localStorage where data is set with key 'eqaim'
- User can see all suggestion , select a tag, select a filter, upvote a feedback , go to roadmap page and go to add feedback
- User can click on feedback to go to feedback comments and details

# Add-Feedback:
- User can create a feedback with a default status of 'suggestion' and can not proceed until all feilds are full
- After succes user is sent to suggestions page

# Particular-Feedback ( Feedback Comments ):
- User can add a comment of not more than 250 characters
- User can click on Edit Feedback to go to edit feedback screen

# Edit-Feedback:
- User can change category/status/title/description of a feedback
- Changes will be applied and if status is changes it will be shown in respective place
- User can also delete the feedback

# Roadmap:
- User can see different status categories based on 'planned', 'in-progress' or 'live'
- User can click on them to go to feedback comments and details.


### Other points:
- hover states are added 
- types are defined
- tailwind and headless-ui is used for better styling and fonts are used from google fonts
- assets are present in public folder

### Thankyou! you can view website on https://eq-tk.vercel.app/
