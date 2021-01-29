
# Vremya
<div>
	<img src="https://img.shields.io/github/issues/koyama1003/ToDo?style=for-the-badge">
	<img src="https://img.shields.io/github/stars/koyama1003/ToDo?style=for-the-badge">

</div>
This is a todo list application.
In this application you can
<ul>
    <li>Create a Todo</li>
  <li>add tags to every Todo</li>
    <li>See Todo status on charts.</li>
</ul>

# Demo
![todo_2](https://user-images.githubusercontent.com/54470822/102028540-24922380-3dee-11eb-8432-454d48ea3b63.png)
![todo_1](https://user-images.githubusercontent.com/54470822/102028539-22c86000-3dee-11eb-8e69-66630f06b862.png)

# Versions
<ul>
	<li>Ruby 2.7.2</li>
<li>Ruby on Rails 6.0.3.4</li>
<li>React 17.0.1</li>
<li>Redux 4.0.5</li>
<li>Chart.js 2.9.4</li>
	<li>Yarn 1.22.5</li>
</ul>

# Requirement 
Gems
<ul>
	<li>bcrypt</li>
	<li>rack-cors</li>
</ul>
Please attach gemfile and excuse "bundle install".
<br />
<br />
Libraries
<ul>
	<li>axios</li>
	<li>moment.js</li>
	<li>material-ui</li>
	<li>react-router-dom</li>
	<li>chart.js(react-chartjs-2)</li>
	<li>redux</li>
	<li>clsx</li>
</ul>

# Database
sqlite<br/>
(choosed sqlite because mySQl doesn't work correctly with ruby 2.7.2 on Windows PC )
![ER Diagram](https://user-images.githubusercontent.com/54470822/102029019-31b01200-3df0-11eb-890d-9308ab3d8812.png)

# Usage
cd todo<br />rails db:migrate<br/>rails db:seed<br />rails s<br/>cd front <br />yarn start<br/>
*Ruby on rails will work on port :3001, and React will be on port:3000.
# Author
 koyama1003
* Twitter : https://twitter.com/koyama_engineer
 
