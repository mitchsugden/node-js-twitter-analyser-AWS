# node-js-twitter-analyser-AWS
Streams tweets from a specified search term and performs some arbitrary analysis to generate load. The architecture has been designed to scale on Amazon Web Services, and successfully creates/destroys instances as load fluctuates. 

#AWS configuration:
The client connects to a Load Balancer which manages the number of current instances. I have configured a custom launch configuration using an image running the node application to be used on each new instance. 
An auto-scaling group is used to manage how many instances to create, and how to deal with changes in load accordingly.
