# Art-Wall

- [Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Libraries and Dependencies](#libraries-and-dependencies)
  - [Client (Front End)](#client-front-end)
    - [Wireframes](#wireframes)
    - [Component Tree](#component-tree)
    - [Component Architecture](#component-architecture)
    - [Time Estimates](#time-estimates)
  - [Server (Back End)](#server-back-end)
    - [ERD Model](#erd-model)
- [Post-MVP](#post-mvp)
- [Code Showcase](#code-showcase)
- [Code Issues & Resolutions](#code-issues--resolutions)

<br>

## Overview

**Art-Wall** is a community where Artists can find space to showcase their artwork, register to create a profile and make worthwhile connections.  Likewise, Artists who wish to provide space for Art-Walls can help local artists shine by joining the community.   

<br>

## MVP

The **Art-Wall** is a tool that will allow Artists to search for spaces in the database by name, city and state.  This will make it easier for them to quickly and efficiently showcase and sell their artwork, make connections in their area, and reach a broader audience.  Hosts will provide space and will have a way to showcase their own establishments via a public profile on the site.  You will have to create an Artist profile (even if you aren't ACTUALLY an artist) to create a location profile.  

<br>

### Goals

- To have a fully functioning website that people can use to connect. Without logging in, you can view locations and look at featured artist profiles.
- Once a user exists (signs up for account), if they are logged in, they can edit their profile, add, update and delete artwork, contact locations, add and delete locations links from their profile or delete their account. 
- A user may create a location which will make them a host.  They can then update or delete that location.  
- Must implement an is_admin boolean (to authorize ownership of location).
- Hosts will additionally be able to add and delete from their featured artist's list. Their profiles will have a link to a map with location.
- Add Contact form modal on artist detail page. 



<br>

### Libraries and Dependencies

|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|      React       | for front-end functionality and DOM manipulation |
|   React Router   | for routing the client-side|
| Ruby on Rails | for the back-end server |
|     Axios      | will make front-end calls to communicate with the db |
|  PostgreSQL  |for database management|

<br>

### Client (Front End)

#### Wireframes

[Design](https://www.figma.com/file/gqodXoEwbmVdMPhlApo2a7/Art-Wall?node-id=0%3A1)


#### Component Tree

[Component Tree](https://res.cloudinary.com/willnolin/image/upload/v1626979573/Art_Wall_3_nkax0f.png)

#### Component Architecture
 

``` structure

src
|__ App.js
|__ App.css
|__ index.js
|__ index.css
|__ Context.js
|__ assets/
      |__ fonts
      |__ images
|__ layouts/
      |__ Layout.css
      |__ Layout.jsx
|__ components/
      |__ css/
        |__ Header.css
        |__ Nav.css
        |__ Footer.css
        |__ Search.css 
      |__ Header.jsx
      |__ Nav.jsx
      |__ Footer.jsx
      |__ Search.jsx
      |__ FeaturedArtists.jsx
      |__ FeaturedLocations.jsx
      |__ Contact.jsx
|__ services/
      |__ api-config.js
      |__ auth.js
      |__ locations.js
      |__ artworks.js
      |__ users.js
|__ screens/
      |__ Login.jsx
      |__ Register.jsx
      |__ Landing.jsx
      |__ LocationList.jsx
      |__ LocationDetail.jsx
      |__ ArtistDetail.jsx
      |__ css/
        |__ Login.css
        |__ Register.css
        |__ Landing.css
        |__ LocationList.css
        |__ LocationDetail.css
        |__ ArtistDetail.css
|__controlled_components/      
      |__ EditLocation.jsx
      |__ CreateLocation.jsx
      |__ EditArtist.jsx
      |__ EditArtwork.jsx
      |__ css/
        |__ EditLocation.css
        |__ CreateLocation.css
        |__ EditArtist.css
        |__ EditArtwork.css
```

#### Time Estimates

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Create user model with controllers, routes  |    H     |     3 hrs      |         |        |
| Create artwork model with contorollers, routes   |    H     |     1 hrs      |         |        |
| Create location model with controllers, routes   |    H     |     1 hrs      |         |       |
| Migrate, test routes / associations    |    H     |     2 hrs      |         |       |
| Implement / Test user authentication for CUD |    H     |     5 hrs      |         |       |
| Custom routes / methods    |    H     |     3 hrs      |         |      |
| Create seed file to test and Finish back-end   |    H     |     3 hrs      |         |      |
| Build Landing Screen / Create LocationList and LocationDetail Component Screens    |    H     |     3 hrs      |         |       |
| Render List of Locations (name, image, city) to LocationList screen    |    H     |     3 hrs      |         |        |
| Link to detail. Render Location details to LocationDetail screen    |    H     |     3 hrs      |         |       |
| Create Artist Detail page. Render appropriate user data to the screen    |    H     |     3 hrs      |         |       |
| Link to Artist detail from Location detail page.    |    H     |     3 hrs      |         |       |
| Create EditLocation, CreateLocation, EditArtist, AddArtwork screens|    H     |     1 hrs      |         |       |
| Create Form in CreateLocation, Test Post  |    H     |     3 hrs      |         |       |
| Create FeaturedArtists component with ability add new artist  |    H     |     3 hrs      |         |       |
| Copy Form to EditLocation w/filled inputs, render FeaturedArtists   |    H     |     3 hrs      |         |       |
| Test Put, Delete for Edit Location|    H     |     2 hrs      |         |       |
| Create Form in EditArtist (profile) page   |    H     |     1 hrs      |         |       |
| Test Put, Delete for Edit Artist    |    H     |     3 hrs      |         |       |
| Create Form in AddArtwork |    H     |     1 hrs      |         |       |
| Render new Artwork to ArtistDetail screen   |    H     |     3 hrs      |         |       |
| CSS  |    H     |     6 hrs      |         |       |
| TOTAL               |          |     59 hrs      |        |         |



<br>

### Server (Back End)

#### ERD Model

[ERD](https://res.cloudinary.com/willnolin/image/upload/v1626978260/Screen_Shot_2021-07-22_at_2.23.50_PM_ynyg1w.png)
<br>

***

## Post-MVP

For PMVP, I would like to:  
- Create and Render FeaturedLocations to ArtistDetail screen 
- Create a separate roles for hosts and artists. (Hosts will no longer need an artist profile) 
- Add "Add to My Locations" button to ArtistDetail which updates FeaturedLocations       
- Implement a map view where the user can view all the locations on a map. 
- Make the contact forms functional and able to send emails to the owner of that location.  Also emails to verify registration.
- Build an ArtWork detail page.
- Create a customer user account where people can purchase the art.  

***

## Code Showcase



## Code Issues & Resolutions


