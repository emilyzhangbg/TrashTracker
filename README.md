<h1>TrashTracker</h1>
A Project created by Senthan Sivatharan, Fan Yang, Julien Liang and Emily Zhang for SetHacks 2021
Demo: https://trashtracker.fanyang284.repl.co/trashtracker/

<h1>Inspiration</h1>
Every year more and more trash is left unattended, causing great harm to our communities and the environment. According to the Environmental Protection Agency, the amount of trash generated per year has increased by over three times from 1960 to 2018. On an individual level, it often feels as if there is little one can do. We seek to change that by providing everybody with a better picture of the environment around us and allowing everyone to make a contribution to the preservation of our communities. People like Joe feel the consequences of this, seeing his own community be ravaged by waste.

Persona #0: Joanna's Story

While leading a group field trip for Anishinaabe youth, Joanna noticed that plastic waste littered the forests, and the natural wildlife was in great disrepair. Joanna is keenly aware of the effects of western colonisation of North America, particularly on the natural habitat her ancestors used to live in harmony with. For Joanna, throughout the years, the seemingly always-increasing trail of trash has destroyed the natural ecosystem, polluting the earth, the life, and the air, and she is deeply concerned for the future of nature. She wants to do something to protect the land her ancestors lived on, but doesn’t know how she can make a difference.

That is why we have created TrashTracker - which will help people like Joe and Joanna to actively partake in a process that unites communities and helps clean the planet.

<h1>What it does</h1>
TrashTracker is a simple and interactive way to report trash whenever and wherever you see it. Simply open the app and with the click of a button the information you provide will be inputted to form a greater picture for all to see. If you are walking down the street and spot plastic waste near you, simply press “I found waste”, and TrashTracker will automatically add a marker to the map, exactly on the location where you found waste. Others will then be able to access and see these markers, creating a visual representation of our world’s trash.

<h1>How we built it</h1>
Using the MapBox API, we were able to construct a scale representation of the globe. We then used the API’s marker objects to create markers. Using some client-side JavaScript, we retrieved the user location. After lots of documentation, we were able to construct markers at the user’s location. In order to implement persistent storage, we needed to create a backend, for which we used Django. At this point, we implemented marker removal through DCL-based distributed computing.

<h1>Challenges we ran into</h1>
<ul>
  <li>Learning Mapbox API</li>
  <li>Implementing persistent storage to display trash locations across all users</li>
  <li>CSS</li>
</ul>

<h1>Accomplishments that we're proud of</h1>
<ul>
  <li>Figuring out you can host Django on repl.it</li>
  <li>Friendly and easy to use user-interface</li>
  <li>‘Fully’ functional backend</li>
</ul>

<h1>What we learned</h1>
Throughout the development of the TrashTracker, we learned the value of communication in group coding projects. Communication is important in order to split up tasks among the group to maximize efficiency and to get everyone's opinions for improvement. We also learned about the importance of readable and concise code, to ensure that it is understandable to groupmates.

We all also gained invaluable experience in using tools such as DCL, Qoom, Django and the Mapbox API.

<h1>What's next for TrashTracker</h1>
The most obvious way to advance the TrashTracker would be to increase the number of users which will make it so that the information we provide is more complete and of value. We also plan to implement a feature to allow users to upload a picture, to allow for a better representation of the trash when coupled with DCL-based machine learning that will identify the type of trash present.
