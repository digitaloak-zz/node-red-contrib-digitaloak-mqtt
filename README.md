### MQTT input node: digitaloak-mqtt-in
Based on core Node-RED "mqtt in" node which uses "mqtt-broker" config node.

#### Features
- subscribe dynamically to topics  
- unsubscribe automatically after first msg received  
- unsubscribe dynamically specific node/nodes from topic  
- pass messages through node when msg.topic not set  

#### Description
Subscribe to topics specyfing msg.topic  
Unsubscribe node from topic automatically after first msg received, via setting checkbox in config node: "Unsubscribe from topic after first msg received"  
Unsubscribe specific node from specific topic,via setting a string value in msg.payload in format "_unsubscribe:\<nodeName>" ie. "_unsubscribe:waitingForResponse"  
Pass msgs via node - don't set msg.topic  

#### Usage example
Is available here: https://flows.nodered.org/flow/5492f72a81324cd3d11b51faf0304ce3

#### Support & Discussion
Please join: https://riot.digitaloak.it/#/room/#node-red-contrib-digitaloak-mqtt:digitaloak.it

#### Comments
1. One node can be subscribed to the same topic more than once, so if you send two msgs with msg.topic set to i.e. "testTopic", then node will receive two msgs for one msg published to the topic. 
<b>It's not battle tested yet</b>, so I will be happy for any feedback.

